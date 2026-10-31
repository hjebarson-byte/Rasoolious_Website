import rasooliciousLogo from '../assets/rasoolicious-logo.jpg';
import rasooliciousText from '../assets/rasoolicious-text.jpg';

export const BRAND_CONFIG = {
  name: "RASOOLICIOUS",
  shortName: "Rasoolicious",
  tagline: "A Little Love in Every Bite.",
  headline: "Our Signature Brownies",
  subheadline: "Every brownie has a story. Discover yours with our five signature flavours.",
  announcement: "A Little Love in Every Bite. • Free delivery on orders over ₹999 • Code: RASOOL10",
  currency: "₹",
  freeShippingThreshold: 999,
  logo: rasooliciousLogo,
  logoText: rasooliciousText,
  contact: {
    phone: "+91 94865 18486",
    email: "orders@rasoolicious.com",
    address: "Rasoolicious Brownie Atelier, Main Road, Marthandam, Kanniyakumari, Tamil Nadu 629165",
    hours: "Tue – Sun: 8:00 AM – 9:00 PM (Closed Mondays)",
  },
  social: {
    instagram: "https://instagram.com/rasoolicious",
    facebook: "https://facebook.com/rasoolicious",
    pinterest: "https://pinterest.com/rasoolicious",
  },
  coupons: [
    { code: "RASOOL10", discountPercent: 10, minSpend: 400, description: "10% off your entire order" },
    { code: "SWEETBOX", flatDiscount: 150, minSpend: 800, description: "₹150 off orders over ₹800" },
    { code: "DELICIOUS50", flatDiscount: 50, minSpend: 300, description: "₹50 off your treat" },
  ],
};
