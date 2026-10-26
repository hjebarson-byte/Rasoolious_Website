import rasooliciousLogo from '../assets/rasoolicious-logo.jpg';
import rasooliciousText from '../assets/rasoolicious-text.jpg';

export const BRAND_CONFIG = {
  name: "RASOOLICIOUS",
  shortName: "Rasoolicious",
  tagline: "The Messenger of Deliciousness",
  headline: "Baked to make your day better.",
  subheadline: "Handcrafted artisanal brownies and molten chocolate fudge slabs made fresh in small batches with decadent Belgian couverture chocolate.",
  announcement: "Fresh batch out of the oven! Free delivery on orders over ₹999 • Code: RASOOL10",
  currency: "₹",
  freeShippingThreshold: 999,
  logo: rasooliciousLogo,
  logoText: rasooliciousText,
  contact: {
    phone: "+91 94892 01823",
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
