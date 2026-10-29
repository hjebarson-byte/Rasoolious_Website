import React, { useState } from 'react';
import { X, Check, Gift, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface BuildYourOwnBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BuildYourOwnBoxModal: React.FC<BuildYourOwnBoxModalProps> = ({ isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selected, setSelected] = useState<string[]>([]);
  const [isAdded, setIsAdded] = useState(false);

  const giftBoxProduct = PRODUCTS.find((p) => p.id === 'rasoolicious-gift-box') || PRODUCTS[0];
  const signatureProducts = PRODUCTS.filter((p) => p.category === 'Signature Brownies');

  if (!isOpen) return null;

  const countForFlavour = (name: string) => selected.filter((item) => item === name).length;

  const handleAddFlavour = (name: string) => {
    if (selected.length < 4) {
      setSelected([...selected, name]);
    }
  };

  const handleRemoveFlavour = (name: string) => {
    const idx = selected.lastIndexOf(name);
    if (idx !== -1) {
      const updated = [...selected];
      updated.splice(idx, 1);
      setSelected(updated);
    }
  };

  const handleRemoveByIndex = (index: number) => {
    const updated = [...selected];
    updated.splice(index, 1);
    setSelected(updated);
  };

  const handleAddBoxToCart = () => {
    if (selected.length !== 4) return;
    addToCart(giftBoxProduct, 1, selected);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-4xl p-6 sm:p-8 shadow-2xl border border-cream-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-chocolate-400 hover:text-chocolate-900 hover:bg-cream-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 pb-4 border-b border-cream-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel-100 text-caramel-800 text-xs font-semibold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-caramel-600" />
            <span>The Rasoolicious Gift Box</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-chocolate-950">
            Build Your Own Box
          </h2>
          <p className="text-xs sm:text-sm text-chocolate-600 max-w-md mx-auto">
            Choose any four brownies from our signature collection and create your own delicious combination.
          </p>
        </div>

        {/* 4 Slots Preview Bar */}
        <div className="py-4 bg-cream-50/70 rounded-2xl px-4 my-3 border border-cream-200/80">
          <div className="flex items-center justify-between text-xs font-semibold text-chocolate-800 mb-2">
            <span>Your Box Contents</span>
            <span className={selected.length === 4 ? 'text-emerald-700 font-bold' : 'text-caramel-700'}>
              {selected.length} of 4 Brownies Chosen
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((slotIdx) => {
              const flavour = selected[slotIdx];
              return (
                <div
                  key={slotIdx}
                  className={`h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1 text-center relative transition-all ${
                    flavour
                      ? 'bg-white border-caramel-400 shadow-soft-sm'
                      : 'bg-white/40 border-dashed border-cream-300 text-chocolate-300'
                  }`}
                >
                  {flavour ? (
                    <>
                      <span className="text-[11px] font-bold text-chocolate-900 leading-tight line-clamp-2">
                        {flavour}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveByIndex(slotIdx)}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] hover:bg-rose-600"
                        title="Remove"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <span className="text-[10px] font-medium text-chocolate-400">
                      Slot {slotIdx + 1}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Signature Flavours Selection List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 py-1">
          {signatureProducts.map((p) => {
            const count = countForFlavour(p.name);
            const isFull = selected.length >= 4;

            return (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-cream-200 hover:border-caramel-300 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-cream-200"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm font-semibold text-chocolate-950">
                        {p.name}
                      </span>
                      {p.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-caramel-100 text-caramel-700">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-chocolate-500 line-clamp-1">
                      {p.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleRemoveFlavour(p.name)}
                    disabled={count === 0}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors border ${
                      count > 0
                        ? 'bg-cream-100 text-chocolate-800 border-cream-300 hover:bg-cream-200'
                        : 'bg-cream-50 text-chocolate-300 border-cream-200 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <span className="w-5 text-center text-xs font-bold text-chocolate-950">
                    {count}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleAddFlavour(p.name)}
                    disabled={isFull}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      !isFull
                        ? 'bg-chocolate-900 text-white hover:bg-caramel-600'
                        : 'bg-cream-100 text-chocolate-300 cursor-not-allowed'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-cream-100 flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-chocolate-950">₹{giftBoxProduct.price}</span>
              {giftBoxProduct.originalPrice && (
                <span className="text-xs text-chocolate-400 line-through">₹{giftBoxProduct.originalPrice}</span>
              )}
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Save ₹100
              </span>
            </div>
            <span className="text-[11px] text-chocolate-500 block">
              Includes 4 signature brownies & luxury gift packaging
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddBoxToCart}
            disabled={selected.length !== 4 || isAdded}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-soft ${
              selected.length === 4
                ? isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-chocolate-900 hover:bg-caramel-600 text-cream-50 active:scale-95'
                : 'bg-cream-200 text-chocolate-400 cursor-not-allowed'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Box Added to Basket!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>{selected.length === 4 ? 'Add Gift Box to Basket' : `Select ${4 - selected.length} More`}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
