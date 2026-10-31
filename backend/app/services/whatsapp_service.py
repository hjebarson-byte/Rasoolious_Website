import urllib.parse
import logging
from typing import Optional
import httpx
from app.config import settings

logger = logging.getLogger("uvicorn")

def clean_phone(phone: str) -> str:
    digits = "".join([c for c in phone if c.isdigit()])
    if not digits.startswith("91") and len(digits) == 10:
        return f"91{digits}"
    return digits

def generate_owner_whatsapp_slip(order_dict: dict) -> str:
    """
    Generates a pre-formatted WhatsApp wa.me link with order slip for Chef Rasool (9486518486)
    """
    owner_phone = clean_phone(settings.OWNER_PHONE)

    items_text = ""
    for item in order_dict.get("items", []):
        name = item.get("product_name", item.get("name", "Brownie Slab"))
        qty = item.get("quantity", 1)
        price = item.get("total_price", item.get("unit_price", 0) * qty)
        flavours = item.get("selected_flavours")
        flavour_note = f" [{flavours}]" if flavours else ""
        items_text += f"\n• {qty}x {name}{flavour_note} - ₹{price}"

    notes_text = f"\n📝 *Note:* {order_dict.get('notes')}" if order_dict.get("notes") else ""

    message = (
        f"🍫 *NEW RASOOLICIOUS ORDER!*\n\n"
        f"📦 *Order ID:* #{order_dict.get('id')}\n"
        f"👤 *Customer:* {order_dict.get('customer_name')}\n"
        f"📞 *Phone:* {order_dict.get('phone')}\n"
        f"📍 *Address:* {order_dict.get('address')}, {order_dict.get('locality')} - {order_dict.get('pincode')}\n\n"
        f"🛒 *Items Ordered:*{items_text}{notes_text}\n\n"
        f"💰 *Total Amount:* ₹{order_dict.get('total')}\n"
        f"💳 *Payment:* {order_dict.get('payment_status')} ({order_dict.get('payment_method')})\n"
        f"🕒 *Slot:* {order_dict.get('slot', 'Standard')}"
    )

    encoded_msg = urllib.parse.quote(message)
    return f"https://wa.me/{owner_phone}?text={encoded_msg}"

def generate_customer_whatsapp_chat(phone: str, customer_name: str, order_id: str) -> str:
    """
    Generates a customer greeting link addressing them by name with their order ID.
    """
    cust_phone = clean_phone(phone)
    message = (
        f"Hi {customer_name}! Thank you for choosing Rasoolicious (Order #{order_id}). "
        f"Your fresh handcrafted brownies are being packaged with love and will reach you shortly! 🍫✨"
    )
    return f"https://wa.me/{cust_phone}?text={urllib.parse.quote(message)}"

def generate_daily_summary_link(orders: list, date_str: str) -> str:
    """
    Generates daily dispatch summary link to send to owner WhatsApp.
    """
    owner_phone = clean_phone(settings.OWNER_PHONE)
    
    def get_val(item, attr):
        if isinstance(item, dict):
            return item.get(attr)
        return getattr(item, attr, None)

    total_rev = sum([float(get_val(o, "total") or 0.0) for o in orders])
    pending = [o for o in orders if get_val(o, "status") == "pending"]
    delivered = [o for o in orders if get_val(o, "status") == "completed"]

    pending_list = "\n".join([
        f"• #{get_val(o, 'id')} - {get_val(o, 'customer_name')} ({get_val(o, 'locality')}): ₹{get_val(o, 'total')}" 
        for o in pending
    ]) or "None (All delivered!)"

    message = (
        f"📊 *Rasoolicious Daily Dispatch Summary*\n"
        f"📅 *Date:* {date_str}\n\n"
        f"💰 *Total Sales Today:* ₹{total_rev:,.2f}\n"
        f"📦 *Total Orders:* {len(orders)}\n"
        f"⏳ *Pending Delivery:* {len(pending)}\n"
        f"✅ *Delivered:* {len(delivered)}\n\n"
        f"🚚 *Orders Pending Dispatch:*\n{pending_list}"
    )

    return f"https://wa.me/{owner_phone}?text={urllib.parse.quote(message)}"


async def send_real_whatsapp_to_owner(order_dict: dict) -> dict:
    """
    Sends a real automated WhatsApp message directly to the bakery owner's phone (+91 9486518486).
    Supports Meta WhatsApp Cloud API, Twilio, and UltraMsg.
    Always returns the wa.me link as instant fallback.
    """
    owner_phone = clean_phone(settings.OWNER_PHONE)
    
    items_text = ""
    for item in order_dict.get("items", []):
        name = item.get("product_name", item.get("name", "Brownie Slab"))
        qty = item.get("quantity", 1)
        price = item.get("total_price", item.get("unit_price", 0) * qty)
        flavours = item.get("selected_flavours")
        flavour_note = f" [{flavours}]" if flavours else ""
        items_text += f"\n• {qty}x {name}{flavour_note} - ₹{price}"

    notes_text = f"\n📝 Note: {order_dict.get('notes')}" if order_dict.get("notes") else ""

    message_body = (
        f"🍫 NEW RASOOLICIOUS ORDER!\n\n"
        f"📦 Order ID: #{order_dict.get('id')}\n"
        f"👤 Customer: {order_dict.get('customer_name')}\n"
        f"📞 Phone: {order_dict.get('phone')}\n"
        f"📍 Address: {order_dict.get('address')}, {order_dict.get('locality')} - {order_dict.get('pincode')}\n\n"
        f"🛒 Items Ordered:{items_text}{notes_text}\n\n"
        f"💰 Total Amount: ₹{order_dict.get('total')}\n"
        f"💳 Payment: {order_dict.get('payment_status')} ({order_dict.get('payment_method')})\n"
        f"🕒 Slot: {order_dict.get('slot', 'Standard')}"
    )

    fallback_url = generate_owner_whatsapp_slip(order_dict)
    delivery_status = "fallback_ready"
    provider_response = None

    # 1. Try Meta WhatsApp Cloud API (Official)
    if settings.WHATSAPP_API_TOKEN and settings.WHATSAPP_PHONE_NUMBER_ID:
        try:
            url = f"https://graph.facebook.com/v19.0/{settings.WHATSAPP_PHONE_NUMBER_ID}/messages"
            headers = {
                "Authorization": f"Bearer {settings.WHATSAPP_API_TOKEN}",
                "Content-Type": "application/json"
            }
            payload = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": owner_phone,
                "type": "text",
                "text": {"preview_url": False, "body": message_body}
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(url, json=payload, headers=headers)
                if res.status_code in [200, 201]:
                    delivery_status = "delivered_meta_cloud"
                    provider_response = res.json()
                    logger.info(f"[WHATSAPP ALERT] Sent automated WhatsApp to +{owner_phone} via Meta Cloud API!")
                else:
                    logger.warning(f"[WHATSAPP WARNING] Meta API responded with {res.status_code}: {res.text}")
        except Exception as e:
            logger.error(f"[WHATSAPP ERROR] Meta Cloud API call failed: {e}")

    # 2. Try Twilio WhatsApp API
    elif settings.TWILIO_ACCOUNT_SID and settings.TWILIO_AUTH_TOKEN:
        try:
            url = f"https://api.twilio.com/2010-04-01/Accounts/{settings.TWILIO_ACCOUNT_SID}/Messages.json"
            data = {
                "From": settings.TWILIO_WHATSAPP_NUMBER,
                "To": f"whatsapp:+{owner_phone}",
                "Body": message_body
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(url, data=data, auth=(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN))
                if res.status_code in [200, 201]:
                    delivery_status = "delivered_twilio"
                    provider_response = res.json()
                    logger.info(f"[WHATSAPP ALERT] Sent automated WhatsApp to +{owner_phone} via Twilio!")
        except Exception as e:
            logger.error(f"[WHATSAPP ERROR] Twilio call failed: {e}")

    # 3. Try UltraMsg API
    elif settings.ULTRAMSG_INSTANCE_ID and settings.ULTRAMSG_TOKEN:
        try:
            url = f"https://api.ultramsg.com/{settings.ULTRAMSG_INSTANCE_ID}/messages/chat"
            payload = {
                "token": settings.ULTRAMSG_TOKEN,
                "to": owner_phone,
                "body": message_body
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(url, json=payload)
                if res.status_code == 200 and res.json().get("sent") == "true":
                    delivery_status = "delivered_ultramsg"
                    provider_response = res.json()
                    logger.info(f"[WHATSAPP ALERT] Sent automated WhatsApp to +{owner_phone} via UltraMsg!")
        except Exception as e:
            logger.error(f"[WHATSAPP ERROR] UltraMsg call failed: {e}")

    if delivery_status == "fallback_ready":
        print(f"[AUTOMATED WHATSAPP NOTIFICATION DISPATCHED TO QUEUE]")
        print(f"Target Owner Phone: +{owner_phone}")
        print(f"Direct WhatsApp URL: {fallback_url}")

    return {
        "status": delivery_status,
        "recipient": owner_phone,
        "whatsapp_url": fallback_url,
        "provider_response": provider_response
    }

