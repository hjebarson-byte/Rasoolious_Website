import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle
} from 'lucide-react';
import { SIGNATURE_FLAVOURS } from '../data/products';
import { useAdmin } from '../admin/context/AdminContext';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { QuantitySelector } from '../components/QuantitySelector';
import { ProductCard } from '../components/ProductCard';
import { Gift } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useAdmin();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const product = (products as Product[]).find((p) => p.id === id || p.slug === id);
  const isSoldOut = product?.status === 'Sold Out' || product?.available === false;
  const isLimited = product?.status === 'Limited Stock';
  const displayPrice = product ? (product.salePrice || product.price) : 0;
  const displayOriginalPrice = product ? (product.originalPrice || (product.salePrice && product.salePrice < product.price ? product.price : undefined)) : undefined;

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'storage' | 'delivery' | 'reviews'>('ingredients');
  const [selectedFlavours, setSelectedFlavours] = useState<string[]>([
    'The Original',
    'The Rasool',
    'Nutella',
    'Biscoff',
  ]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-36 pb-20 text-center max-w-md mx-auto px-4 min-h-[60vh] flex flex-col justify-center items-center">
        <div className="text-4xl mb-4">🧁</div>
        <h2 className="font-serif text-3xl text-chocolate-900 mb-2">
          Treat Not Found
        </h2>
        <p className="text-sm text-chocolate-600 mb-6">
          The bake you are looking for might have sold out or moved.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-full bg-chocolate-900 text-cream-50 text-xs font-semibold hover:bg-caramel-600 transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart(
      product,
      quantity,
      product.id === 'rasoolicious-gift-box' ? selectedFlavours : undefined
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    if (isSoldOut) return;
    addToCart(
      product,
      quantity,
      product.id === 'rasoolicious-gift-box' ? selectedFlavours : undefined
    );
    navigate('/checkout');
  };

  // Related products from same or similar category
  const relatedProducts = (products as Product[]).filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="pt-28 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-chocolate-500 mb-8">
          <Link to="/" className="hover:text-chocolate-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-chocolate-900 transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-chocolate-900 transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-chocolate-900 font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Main Product Showcase Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-4xl p-6 sm:p-10 border border-cream-200 shadow-soft mb-16">
          
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-cream-100 border border-cream-200 shadow-soft-sm">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3.5 py-1 text-xs font-bold tracking-wider rounded-full bg-caramel-500 text-white shadow-soft-sm">
                  {product.badge}
                </span>
              )}
              {product.isEggless && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-emerald-800 border border-emerald-600 text-xs font-semibold flex items-center gap-1.5 shadow-soft-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>100% Eggless</span>
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? 'border-caramel-500 shadow-soft'
                        : 'border-cream-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Information & Purchase Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-chocolate-500 mb-2.5">
                <span className="font-bold tracking-wider uppercase text-caramel-600">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-chocolate-800">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-sm">{product.rating}</span>
                  <span className="text-chocolate-400">({product.reviews} customer reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="font-serif text-3xl sm:text-4xl text-chocolate-950 font-normal leading-tight">
                  {product.name}
                </h1>
                {isSoldOut ? (
                  <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full font-bold text-xs uppercase tracking-wider">
                    Sold Out for Today
                  </span>
                ) : isLimited ? (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-xs uppercase tracking-wider">
                    Limited Batch Left
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs uppercase tracking-wider">
                    In Stock · Fresh Today
                  </span>
                )}
              </div>

              {/* Price and weight */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-bold text-3xl text-chocolate-900">
                  ₹{displayPrice}
                </span>
                {displayOriginalPrice && displayOriginalPrice > displayPrice && (
                  <span className="text-base text-chocolate-400 line-through">
                    ₹{displayOriginalPrice}
                  </span>
                )}
                {product.weight && (
                  <span className="text-xs text-chocolate-500 px-2 py-0.5 rounded-full bg-cream-100 border border-cream-200">
                    Net Wt: {product.weight}
                  </span>
                )}
                {product.pieces && (
                  <span className="text-xs text-chocolate-500 px-2 py-0.5 rounded-full bg-cream-100 border border-cream-200">
                    {product.pieces}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-chocolate-700 text-sm sm:text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Quality & Delivery Highlights */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-cream-50 border border-cream-200 text-xs text-chocolate-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-caramel-600 shrink-0" />
                  <span>Baked fresh this morning</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-caramel-600 shrink-0" />
                  <span>100% Belgian Cocoa</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-caramel-600 shrink-0" />
                  <span>French Cultured Butter</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-caramel-600 shrink-0" />
                  <span>Allergens: {product.allergens.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* If Gift Box: Interactive 4-Brownie Selector */}
            {product.id === 'rasoolicious-gift-box' && (
              <div className="pt-4 border-t border-cream-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-chocolate-950 flex items-center gap-2">
                      <Gift className="w-4 h-4 text-caramel-600" />
                      <span>Build Your Own Box</span>
                    </h4>
                    <p className="text-xs text-chocolate-600">
                      Choose any four brownies from our signature collection
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      selectedFlavours.length === 4
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-caramel-50 text-caramel-700'
                    }`}
                  >
                    {selectedFlavours.length} / 4 Selected
                  </span>
                </div>

                {/* 4 Chosen Slots */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((slotIdx) => {
                    const flv = selectedFlavours[slotIdx];
                    return (
                      <div
                        key={slotIdx}
                        className={`h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1 text-center relative transition-all ${
                          flv
                            ? 'bg-cream-50 border-caramel-300'
                            : 'border-dashed border-cream-300 text-chocolate-300'
                        }`}
                      >
                        {flv ? (
                          <>
                            <span className="text-[11px] font-bold text-chocolate-900 leading-tight">
                              {flv}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...selectedFlavours];
                                updated.splice(slotIdx, 1);
                                setSelectedFlavours(updated);
                              }}
                              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]"
                            >
                              ×
                            </button>
                          </>
                        ) : (
                          <span className="text-[10px] text-chocolate-400">Slot {slotIdx + 1}</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pick From 5 Signature Flavours */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-chocolate-700 uppercase tracking-wider block">
                    Tap to add flavours:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SIGNATURE_FLAVOURS.map((name) => {
                      const count = selectedFlavours.filter((f) => f === name).length;
                      const isFull = selectedFlavours.length >= 4;
                      return (
                        <div
                          key={name}
                          className="flex items-center justify-between p-2 rounded-xl bg-white border border-cream-200 text-xs"
                        >
                          <span className="font-medium text-chocolate-900 truncate pr-1">{name}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                const idx = selectedFlavours.lastIndexOf(name);
                                if (idx !== -1) {
                                  const updated = [...selectedFlavours];
                                  updated.splice(idx, 1);
                                  setSelectedFlavours(updated);
                                }
                              }}
                              disabled={count === 0}
                              className="w-5 h-5 rounded-full bg-cream-100 flex items-center justify-center text-chocolate-700 disabled:opacity-30"
                            >
                              -
                            </button>
                            <span className="w-3 text-center font-bold text-chocolate-900">{count}</span>
                            <button
                              type="button"
                              onClick={() => {
                                if (selectedFlavours.length < 4) {
                                  setSelectedFlavours([...selectedFlavours, name]);
                                }
                              }}
                              disabled={isFull}
                              className="w-5 h-5 rounded-full bg-chocolate-900 text-white flex items-center justify-center disabled:opacity-30"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="pt-4 border-t border-cream-100 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-chocolate-800 uppercase tracking-wide">
                  Quantity:
                </span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                  size="md"
                />
                <span className="text-xs text-chocolate-500 ml-auto">
                  Total: <strong className="text-chocolate-900 text-sm">₹{displayPrice * quantity}</strong>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Add to cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdded || isSoldOut}
                  className={`w-full sm:flex-1 py-4 px-6 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-soft transition-all duration-200 active:scale-95 ${
                    isSoldOut
                      ? 'bg-stone-300 text-stone-600 cursor-not-allowed'
                      : isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-chocolate-900 text-cream-50 hover:bg-caramel-600'
                  }`}
                >
                  {isSoldOut ? (
                    <span>Sold Out for Today</span>
                  ) : isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Basket</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Basket</span>
                    </>
                  )}
                </button>

                {/* Buy Now */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={isSoldOut}
                  className={`w-full sm:w-auto px-7 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-soft ${
                    isSoldOut
                      ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      : 'bg-caramel-500 hover:bg-caramel-600 text-white'
                  }`}
                >
                  Buy Now
                </button>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`p-3.5 rounded-full border transition-all ${
                    wishlisted
                      ? 'bg-rose-50 text-rose-600 border-rose-300'
                      : 'bg-white text-chocolate-700 hover:text-rose-600 border-cream-300'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-soft mb-16">
          <div className="flex items-center gap-4 sm:gap-8 border-b border-cream-200 pb-4 overflow-x-auto no-scrollbar">
            {[
              { id: 'ingredients', label: 'Ingredients & Sourcing' },
              { id: 'storage', label: 'Storage & Warming Guide' },
              { id: 'delivery', label: 'Fresh Delivery Details' },
              { id: 'reviews', label: `Reviews (${product.reviews})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-sm font-semibold whitespace-nowrap transition-colors relative py-2 ${
                  activeTab === tab.id
                    ? 'text-chocolate-950 font-bold'
                    : 'text-chocolate-500 hover:text-chocolate-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-caramel-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-6">
            {activeTab === 'ingredients' && (
              <div className="space-y-4 text-sm text-chocolate-700">
                <p>
                  Every batch of <strong>{product.name}</strong> is crafted without preservatives, artificial emulsifiers, or margarine.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {(Array.isArray(product.ingredients)
                    ? product.ingredients
                    : typeof product.ingredients === 'string'
                    ? (product.ingredients as string).split(',').map((s) => s.trim())
                    : []
                  ).map((ing: string, i: number) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full bg-cream-100 text-chocolate-800 text-xs font-medium border border-cream-200"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-chocolate-500 pt-2">
                  * Contains: <strong>{product.allergens.join(', ')}</strong>. Prepared in an environment where tree nuts and dairy are handled.
                </p>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-3 text-sm text-chocolate-700">
                <p className="font-semibold text-chocolate-900">How to keep it fresh:</p>
                <p>{product.storageInfo}</p>
                <div className="p-4 rounded-2xl bg-caramel-50 border border-caramel-200 text-xs text-chocolate-800">
                  💡 <strong>Chef's Pro Tip:</strong> Pop your brownie slab in the microwave for 12–15 seconds or a preheated oven at 160°C for 3 minutes before eating. The chocolate chunks will liquefy into an irresistible molten core!
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-3 text-sm text-chocolate-700">
                <p className="font-semibold text-chocolate-900">Care in transit:</p>
                <p>{product.deliveryInfo}</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-chocolate-600 pt-2">
                  <li>Dispatched daily between 9:00 AM and 6:00 PM.</li>
                  <li>Delivered in bespoke rigid bakery boxes lined with thermal insulated foil & non-toxic food-safe ice chill pads.</li>
                  <li>Orders placed before 2:00 PM qualify for same-day delivery in selected city pincodes.</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <div className="text-center pr-4 border-r border-cream-200">
                    <span className="font-bold text-3xl text-chocolate-900">{product.rating}</span>
                    <div className="flex text-amber-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-chocolate-900 text-sm">
                      Verified Bakery Reviews
                    </h4>
                    <p className="text-xs text-chocolate-500">
                      98% of customers recommended this treat to a friend.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      user: 'Kavita R.',
                      date: 'Yesterday',
                      comment: 'Absolute perfection. The texture is unmatched. You can taste the quality of the cocoa immediately.',
                      rating: 5,
                    },
                    {
                      user: 'David P.',
                      date: '3 days ago',
                      comment: 'Arrived warmly packed and looking like a million bucks. Highly recommend giving this as a gift.',
                      rating: 5,
                    },
                  ].map((r, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-cream-50/70 border border-cream-100 text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-chocolate-900">{r.user}</span>
                        <span className="text-chocolate-400">{r.date}</span>
                      </div>
                      <div className="flex text-amber-400 mb-1.5">
                        {[...Array(r.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-chocolate-700">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-chocolate-900 mb-6 font-medium">
              You Might Also Crave
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
