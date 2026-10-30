import type { Order } from '../types/adminTypes';
import { BRAND_CONFIG } from '../../config/brand';

/**
 * Generates a direct WhatsApp link to chat with the customer with a friendly prefilled message
 */
export const getCustomerWhatsAppUrl = (phone: string, orderId: string, customerName: string): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  const text = encodeURIComponent(
    `Hi ${customerName}! Thank you for ordering from ${BRAND_CONFIG.shortName} (Order #${orderId}). Your fresh brownies are being prepared with love and will be delivered to your address soon! 🍫✨`
  );
  return `https://wa.me/${phoneWithCountry}?text=${text}`;
};

/**
 * Generates a direct WhatsApp link with the structured order summary to send to the bakery owner
 */
export const getOwnerWhatsAppOrderSlip = (order: Order): string => {
  const ownerRawPhone = BRAND_CONFIG.contact.phone || '9489201823';
  const cleanPhone = ownerRawPhone.replace(/[^0-9]/g, '');
  const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const itemsList = order.items
    .map(i => `• ${i.quantity}x ${i.name} (${i.weight || '500g'}) - ₹${i.totalPrice || (i.unitPrice * i.quantity)}`)
    .join('\n');

  const giftMsg = order.hasGiftMessage && order.giftMessage
    ? `\n🎁 *Gift Note:* "${order.giftMessage.message}" (From: ${order.giftMessage.from})`
    : '';

  const note = order.notes ? `\n📝 *Customer Note:* "${order.notes}"` : '';

  const message = `🍫 *NEW ${BRAND_CONFIG.name} ORDER!*

📦 *Order ID:* #${order.id}
👤 *Customer:* ${order.customerName}
📞 *Phone:* ${order.phone}
📍 *Address:* ${order.address}, ${order.locality} - ${order.pincode}

🛒 *Items Ordered:*
${itemsList}${giftMsg}${note}

💰 *Total Amount:* ₹${order.total}
💳 *Payment:* ${order.paymentStatus} (${order.paymentMethod})
🕒 *Date:* ${order.date}`;

  return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
};

/**
 * Generates a direct WhatsApp link with daily sales and dispatch summary for the owner
 */
export const getOwnerDailySummaryWhatsAppUrl = (orders: Order[], dateStr: string): string => {
  const ownerRawPhone = BRAND_CONFIG.contact.phone || '9489201823';
  const cleanPhone = ownerRawPhone.replace(/[^0-9]/g, '');
  const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const pending = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled');
  const delivered = orders.filter(o => o.status === 'completed');
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  const pendingList = pending.length > 0
    ? pending.map(o => `• #${o.id} - ${o.customerName} (${o.locality}): ₹${o.total}`).join('\n')
    : 'None (All delivered!)';

  const message = `📊 *${BRAND_CONFIG.name} Daily Dispatch Summary*
📅 *Date:* ${dateStr}

💰 *Total Sales:* ₹${revenue.toLocaleString('en-IN')}
📦 *Total Orders:* ${orders.length}
⏳ *Pending Delivery:* ${pending.length}
✅ *Delivered:* ${delivered.length}

🚚 *Orders Pending Delivery:*
${pendingList}`;

  return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
};
