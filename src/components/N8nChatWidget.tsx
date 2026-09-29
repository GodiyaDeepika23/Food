import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  RotateCcw, 
  Sparkles, 
  Info, 
  ExternalLink,
  ChevronDown,
  Loader2,
  CheckCircle2,
  Settings,
  Zap
} from 'lucide-react';
import { getShareMealAnswer } from '../utils/chatbotKnowledge';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  source?: 'n8n' | 'assistant';
}

const PROXY_PRODUCTION_URL = '/api/n8n-chat';
const PROXY_TEST_URL = '/api/n8n-chat-test';
const DIRECT_PRODUCTION_URL = 'https://godiyadeepika.app.n8n.cloud/webhook/15c252a3-0ad0-405f-bc58-ee7ba4a2f74a/chat';
const DIRECT_TEST_URL = 'https://godiyadeepika.app.n8n.cloud/webhook-test/15c252a3-0ad0-405f-bc58-ee7ba4a2f74a/chat';

const SUGGESTED_PROMPTS = [
  '🍱 How do I donate surplus food?',
  '🤝 How can an NGO request meals?',
  '🛵 How do I volunteer as a delivery driver?',
  '🥗 What items are currently available?'
];

export function N8nChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('sharemeal_n8n_chat_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved chat messages', e);
      }
    }
    return [
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: '👋 Hello! I am the ShareMeal AI Assistant, integrated with your n8n workflow. How can I help you today with food donations, meal requests, or volunteering?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'assistant'
      }
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [n8nLiveStatus, setN8nLiveStatus] = useState<'connected' | 'draft_pending' | 'checking'>('checking');
  const [sessionId] = useState(() => {
    const savedId = localStorage.getItem('sharemeal_n8n_session_id');
    if (savedId) return savedId;
    const newId = 'session-' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('sharemeal_n8n_session_id', newId);
    return newId;
  });

  const [isTestMode, setIsTestMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showN8nHelp, setShowN8nHelp] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sharemeal_n8n_chat_v2', JSON.stringify(messages));
    } catch (e) {
      console.error('Error saving chat', e);
    }
  }, [messages]);

  const activeProxyUrl = isTestMode ? PROXY_TEST_URL : PROXY_PRODUCTION_URL;
  const activeDirectUrl = isTestMode ? DIRECT_TEST_URL : DIRECT_PRODUCTION_URL;

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputMessage).trim();
    if (!messageText || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    const payload = {
      action: 'sendMessage',
      chatInput: messageText,
      message: messageText,
      sessionId: sessionId,
      timestamp: new Date().toISOString()
    };

    let botResponseText = '';
    let responseSource: 'n8n' | 'assistant' = 'assistant';

    try {
      // 5-second timeout for n8n to avoid user waiting forever
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      let res: Response | null = null;
      try {
        res = await fetch(activeProxyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
      } catch (proxyError) {
        // Fallback to direct URL if proxy is unavailable in environment
        try {
          res = await fetch(activeDirectUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain, */*'
            },
            body: JSON.stringify(payload),
            signal: controller.signal
          });
        } catch {
          res = null;
        }
      } finally {
        clearTimeout(timeoutId);
      }

      if (res && res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (typeof data.output === 'string') botResponseText = data.output;
          else if (Array.isArray(data) && data[0]?.output) botResponseText = data[0].output;
          else if (data.text) botResponseText = data.text;
          else if (data.response) botResponseText = data.response;
          else if (data.message) botResponseText = data.message;
          else if (typeof data === 'string') botResponseText = data;
        } else {
          botResponseText = await res.text();
        }

        if (botResponseText) {
          responseSource = 'n8n';
          setN8nLiveStatus('connected');
        }
      } else {
        // n8n returned 404 or draft mode
        setN8nLiveStatus('draft_pending');
      }
    } catch (e) {
      console.warn('n8n connection check:', e);
      setN8nLiveStatus('draft_pending');
    }

    // If n8n is inactive or didn't return text, use ShareMeal knowledge engine
    if (!botResponseText) {
      botResponseText = getShareMealAnswer(messageText);
      responseSource = 'assistant';
    }

    const botMsg: ChatMessage = {
      id: 'msg-' + (Date.now() + 1),
      sender: 'bot',
      text: botResponseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: responseSource
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleClearChat = () => {
    const initial: ChatMessage[] = [
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: '👋 Chat history cleared. How can I help you today with food donations or requests?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'assistant'
      }
    ];
    setMessages(initial);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="mb-2 bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md text-white text-xs font-medium py-1.5 px-3.5 rounded-full shadow-lg flex items-center gap-2 border border-slate-700/50 cursor-pointer transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Ask ShareMeal AI</span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle chat assistant"
          className={`relative p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer ${
            isOpen 
              ? 'bg-slate-800 text-white' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[600px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-emerald-200" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-800 rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-tight">ShareMeal Assistant</h3>
                  <span className="text-[10px] bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 px-1.5 py-0.5 rounded-full font-semibold">
                    AI
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-100/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  <span>{n8nLiveStatus === 'connected' ? 'n8n Live Workflow' : 'Online & Ready'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowN8nHelp(!showN8nHelp)}
                title="n8n Integration Info"
                className="p-1.5 rounded-xl hover:bg-white/10 text-emerald-100 transition-colors cursor-pointer"
              >
                <Info className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                title="Settings"
                className="p-1.5 rounded-xl hover:bg-white/10 text-emerald-100 transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearChat}
                title="Restart Conversation"
                className="p-1.5 rounded-xl hover:bg-white/10 text-emerald-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Chat"
                className="p-1.5 rounded-xl hover:bg-white/10 text-emerald-100 transition-colors cursor-pointer"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* n8n Status / Help Drawer */}
          {showN8nHelp && (
            <div className="bg-emerald-50 border-b border-emerald-200 p-3.5 text-xs text-emerald-950 space-y-2 animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <Zap className="w-4 h-4 text-emerald-600" /> n8n Webhook Integration
                </span>
                <button onClick={() => setShowN8nHelp(false)} className="text-emerald-700 hover:text-emerald-900">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-800">
                Connected to: <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200 font-mono text-[10px]">godiyadeepika.app.n8n.cloud/webhook/15c252a3...</code>
              </p>
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200/80 text-[11px] space-y-1">
                <p className="font-semibold text-emerald-900">To enable live responses from your custom n8n agent:</p>
                <ol className="list-decimal pl-4 space-y-0.5 text-emerald-800">
                  <li>Open your workflow in n8n Cloud editor.</li>
                  <li>Toggle the switch in the top-right to <strong>Active</strong>.</li>
                  <li>Your custom n8n logic will automatically handle every message!</li>
                </ol>
              </div>
            </div>
          )}

          {/* Settings Drawer */}
          {showSettings && (
            <div className="bg-slate-50 border-b border-slate-200 p-3.5 text-xs space-y-2.5 animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between font-semibold text-slate-700">
                <span>Webhook Target</span>
                <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setIsTestMode(false)}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium border text-center transition-all cursor-pointer ${
                    !isTestMode 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Production (/webhook/)
                </button>
                <button
                  onClick={() => setIsTestMode(true)}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium border text-center transition-all cursor-pointer ${
                    isTestMode 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Test Mode (/webhook-test/)
                </button>
              </div>

              <p className="text-[10px] text-slate-500 leading-relaxed">
                {isTestMode 
                  ? '⚡ Test mode routes to /webhook-test/ for canvas executions.' 
                  : '🟢 Production mode routes to your active webhook endpoint.'}
              </p>
            </div>
          )}

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1.5 mt-1 px-1 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'bot' && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-500 font-medium">
                      {msg.source === 'n8n' ? '⚡ n8n' : '✨ Assistant'}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
                <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                  <Bot className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse delay-200"></span>
                  <span className="text-[11px] text-slate-500 ml-1">Finding the best answer...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 3 && (
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-3 py-1.5 text-[11px] font-medium bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-full border border-slate-200 transition-colors shrink-0 cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about donating food, receiving meals, or volunteering..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                aria-label="Send message"
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white rounded-xl shadow-xs transition-colors shrink-0 flex items-center justify-center cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
              <span>Webhook: 15c252a3</span>
              <span className="font-semibold text-emerald-700">ShareMeal Helpdesk</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
