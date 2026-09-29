/**
 * Comprehensive Knowledge Base & Fallback Assistant for ShareMeal
 * Ensures users always receive immediate, accurate, and helpful answers
 * even when the external n8n workflow is inactive or undergoing edits.
 */

export interface KnowledgeResponse {
  answer: string;
  source: 'n8n' | 'local_assistant';
  suggestedFollowUps?: string[];
}

export function getShareMealAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|namaste)/i.test(q)) {
    return `👋 Hello! Welcome to **ShareMeal**! 

I'm your assistant here to help reduce food waste and feed those in need in Visakhapatnam. 

How can I help you today?
• 🍱 **Donate Food** — share surplus from parties, hotels, canteens, or home
• 🔍 **Find Food** — browse available free surplus meals for shelters and NGOs
• 🛵 **Volunteer** — deliver food packages from donors to shelters
• 📦 **Track Donation** — check status of an existing donation ID (e.g., SM10245)
• 🛡️ **Food Safety** — view hygiene and shelf-life guidelines`;
  }

  // How to donate food
  if (q.includes('donate') || q.includes('how to give') || q.includes('surplus food') || q.includes('post food')) {
    return `🍱 **How to Donate Food on ShareMeal:**

1. Click **"Donate Food"** in the top navigation bar.
2. Fill in the food details:
   • Food name & category (Cooked food, Vegetables, Fruits, Dairy, Bakery)
   • Quantity & estimated number of servings
   • Food type (🟢 Pure Veg or 🔴 Non-Veg)
   • Preparation time and "Best Before" safe consumption window
   • Safe packaging type (sealed containers, foil, crates)
3. Enter your pickup address in Visakhapatnam & preferred pickup hours.
4. (Optional) Attach a photo of the food.
5. Click **"Submit Food Donation"**!

Once posted, verified NGOs, shelters, and nearby volunteers are instantly notified for pickup!`;
  }

  // Find food / Request food / NGOs
  if (q.includes('find food') || q.includes('request') || q.includes('ngo') || q.includes('shelter') || q.includes('orphanage') || q.includes('need food') || q.includes('hungry')) {
    return `🤝 **How to Request or Find Surplus Food:**

1. Go to the **"Find Food"** marketplace in the top navigation.
2. Browse active donation listings across:
   • 🍲 Cooked Meals (Biryani, Fried Rice, Pasta, Dal)
   • 🍎 Fresh Fruits (Apples, Oranges, Bananas, Papaya)
   • 🥦 Fresh Vegetables (Tomatoes, Potatoes, Greens)
   • 🥛 Dairy & Bakery items
3. Filter by **Vegetarian / Non-Vegetarian** or search by food name.
4. Click **"Request Food"** on any available card.
5. Enter your organization/shelter name, number of beneficiaries, and preferred pickup window.
6. A verified volunteer or donor will coordinate the delivery or pickup!`;
  }

  // Volunteer
  if (q.includes('volunteer') || q.includes('driver') || q.includes('deliver') || q.includes('join as volunteer')) {
    return `🛵 **Join ShareMeal as a Food Rescue Volunteer:**

Volunteers are the heartbeat of ShareMeal, delivering surplus food safely from donors to orphanages and shelters!

**How to sign up:**
1. Click **"Volunteer"** in the top navigation menu.
2. Provide your name, contact phone, and service areas in Visakhapatnam (Beach Road, MVP Colony, Maddilapalem, Gajuwaka, etc.).
3. Choose your vehicle type (Two-Wheeler, Auto, Car/Van).
4. Select your preferred availability days and hours.
5. Once registered, you will be notified of pickup tasks near you! Every completed run comes with an impact certificate.`;
  }

  // Fruits / Vegetables / Dairy / Items
  if (q.includes('fruit') || q.includes('vegetable') || q.includes('dairy') || q.includes('milk') || q.includes('papaya') || q.includes('apple') || q.includes('items') || q.includes('available')) {
    return `🥗 **Currently Available Surplus Categories:**

• **Fruits**: Fresh Oranges & Crisp Apples, Ripe Bananas & Sweet Mangoes, Fresh Watermelon & Papaya Chunks.
• **Vegetables**: Organic Farm Tomatoes & Spinach Greens, Potatoes & Carrots, Fresh Cauliflower & Bell Peppers.
• **Dairy**: Fresh Pasteurized Milk Packets & Curd, Cottage Cheese (Paneer) & Butter Blocks, Flavored Yogurt Cups.
• **Cooked Food**: Vegetable Biryani & Dal Makhani, Mixed Vegetable Rice & Sambar, Creamy Pasta, Chicken Fried Rice.
• **Bakery**: Fresh Breads, Pastries, Chocolate Chip Cookies & Muffins.

To claim any of these items, head over to the **"Find Food"** tab!`;
  }

  // Food Safety / Hygiene
  if (q.includes('safety') || q.includes('hygiene') || q.includes('quality') || q.includes('spoil') || q.includes('temperature') || q.includes('standards')) {
    return `🛡️ **ShareMeal Food Safety Standards:**

• **2-Hour Rule**: Cooked food must be packed and refrigerated or distributed within safe temperature thresholds.
• **Temperature Guidelines**: Hot food must be held above 60°C (140°F); perishable cold food below 5°C (41°F).
• **Packaging**: Only clean, food-grade containers, foil trays, or insulated boxes are accepted.
• **Quality Check**: Food with altered smell, discoloration, or passed best-before windows is never accepted or distributed.
• Learn more by visiting our dedicated **"Food Safety"** page in the top menu.`;
  }

  // Tracking
  if (q.includes('track') || q.includes('status') || q.includes('id') || q.includes('sm10')) {
    return `📦 **How to Track a Donation:**

1. Click **"Track ID"** in the top navigation.
2. Enter your donation tracking ID (e.g., **SM10245**, **SM10246**, **SM10247**).
3. You will see a live status timeline:
   • 📝 Posted / Scheduled
   • 🤝 Requested by NGO / Shelter
   • 🛵 Assigned to Volunteer Driver
   • 🚚 Out for Delivery
   • ✅ Successfully Delivered & Received!`;
  }

  // Contact / Help / Location
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('address') || q.includes('location') || q.includes('helpline')) {
    return `📞 **ShareMeal Contact & Helpline:**

• **Helpline**: +91 9876543210 (Available 7 AM – 10 PM)
• **Emergency Food Rescue**: +91 9812345678
• **Email**: support@sharemeal.org / deepika@sharemeal.org
• **Operating Hub**: Beach Road & AU Campus, Visakhapatnam, Andhra Pradesh 530001
• **Operating Hours**: 24/7 for urgent surplus batch rescue`;
  }

  // Thank you / Bye
  if (q.includes('thank') || q.includes('thanks') || q.includes('bye') || q.includes('goodbye')) {
    return `❤️ You're very welcome! Thank you for being a part of the ShareMeal community and helping us end hunger and food waste. Let me know if you need anything else!`;
  }

  // Default helpful response
  return `I understand you're asking about **"${query}"**.

Here is how **ShareMeal** can help you right now:
1. **Donate Food**: Have extra food from an event or restaurant? Post a donation in 60 seconds under the **"Donate Food"** tab.
2. **Find / Request Food**: Need food for an orphanage or community shelter? Browse active donations in the **"Find Food"** tab.
3. **Become a Volunteer**: Help pick up and deliver food in your city under the **"Volunteer"** tab.
4. **Track Donation**: Check progress using your donation ID under the **"Track ID"** tab.

Feel free to ask a specific question like *"How do I donate food?"* or *"What items are currently available?"*!`;
}
