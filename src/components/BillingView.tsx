import React, { useState } from 'react';
import { ViewMode, Client, ServiceItem, CartItem, Stylist } from '../types';
import { SERVICE_ITEMS } from '../data/mockData';

interface BillingViewProps {
  activeClient: Client;
  stylists: Stylist[];
  onNavigate: (view: ViewMode) => void;
  onPaymentComplete: (amount: number) => void;
  onOpenReceiptModal: (items: CartItem[], grandTotal: number, paymentMethod: string) => void;
}

export const BillingView: React.FC<BillingViewProps> = ({
  activeClient,
  stylists,
  onNavigate,
  onPaymentComplete,
  onOpenReceiptModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'Hair' | 'Colour' | 'Nails' | 'Skin' | 'Bridal' | 'Products'>('Hair');
  
  // Initial cart matching Screen 4
  const [cart, setCart] = useState<CartItem[]>([
    {
      cartId: 'c-1',
      serviceId: 'srv-1',
      name: 'Balayage',
      price: 12000,
      stylistName: 'Nimali',
    },
    {
      cartId: 'c-2',
      serviceId: 'srv-2',
      name: 'Blow-dry',
      price: 2500,
      stylistName: 'Dilki',
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'Mobile'>('Card');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('3000');

  const categories: ('Hair' | 'Colour' | 'Nails' | 'Skin' | 'Bridal' | 'Products')[] = [
    'Hair', 'Colour', 'Nails', 'Skin', 'Bridal', 'Products',
  ];

  const filteredServices = SERVICE_ITEMS.filter((s) => s.category === activeCategory);

  const handleAddToCart = (item: ServiceItem) => {
    const newItem: CartItem = {
      cartId: `cart-${Date.now()}-${Math.random()}`,
      serviceId: item.id,
      name: item.name,
      price: item.price,
      stylistName: stylists[0]?.name || 'Nimali',
    };
    setCart((prev) => [...prev, newItem]);
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleUpdateStylist = (cartId: string, stylistName: string) => {
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, stylistName } : item))
    );
  };

  const handleAddCustomService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const priceNum = parseFloat(customPrice) || 0;
    const customItem: CartItem = {
      cartId: `custom-${Date.now()}`,
      serviceId: 'custom',
      name: customName,
      price: priceNum,
      stylistName: stylists[0]?.name || 'Nimali',
    };
    setCart((prev) => [...prev, customItem]);
    setCustomName('');
    setCustomPrice('3000');
    setShowCustomModal(false);
  };

  // Calculations
  const subtotal = cart.reduce((acc, i) => acc + i.price, 0);
  const discountRate = 0.05; // 5% loyalty discount
  const discountAmount = Math.round(subtotal * discountRate);
  const grandTotal = subtotal - discountAmount;

  const handleTakePayment = () => {
    if (cart.length === 0) {
      alert('Your cart is empty! Please add services before taking payment.');
      return;
    }
    onPaymentComplete(grandTotal);
    onOpenReceiptModal(cart, grandTotal, paymentMethod);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full transition-all">
      {/* Top Session Navigation Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline-md text-2xl md:text-3xl text-[#241E2B]">
            New Bill - {activeClient.name}
          </h1>

          {/* Sensitive scalp banner */}
          <div className="mt-2 inline-flex items-center gap-2 bg-[#B08D3F]/10 px-3.5 py-1.5 rounded-full border border-[#B08D3F]/30">
            <span className="material-symbols-outlined text-[#B08D3F] text-base">sticky_note_2</span>
            <span className="font-tiny text-xs text-[#B08D3F] font-bold">
              {activeClient.formulas?.note || 'Sensitive scalp — use ammonia-free developer.'}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('clients')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#EFEBF2] text-[#241E2B] font-bold rounded-full text-xs hover:bg-[#E3DCE6] transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-base">history</span>
            <span>History</span>
          </button>
          <button
            onClick={() => onNavigate('clients')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#EFEBF2] text-[#241E2B] font-bold rounded-full text-xs hover:bg-[#E3DCE6] transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            <span>Profile</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Services on Left, Cart Sidebar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Category Tabs & Service Bento Cards */}
        <div className="lg:col-span-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex gap-2 border-b border-[#E3DCE6] overflow-x-auto hide-scrollbar pb-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-2.5 px-4 font-ui-header text-sm whitespace-nowrap transition-colors border-b-2 ${
                    isActive
                      ? 'text-[#9a3256] border-[#9a3256] font-bold'
                      : 'text-[#5B5265] border-transparent hover:text-[#241E2B]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Service Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-[#E3DCE6] p-4 rounded-xl flex flex-col justify-between h-40 cursor-pointer shadow-xs hover:-translate-y-1 hover:shadow-md transition-all group"
                onClick={() => handleAddToCart(service)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-headline-sm text-sm text-[#241E2B] group-hover:text-[#B94A6E] transition-colors">
                      {service.name}
                    </h4>
                    <p className="font-tiny text-[11px] text-[#8C8394] mt-1">
                      {service.description}
                    </p>
                  </div>
                  <span className={`p-2 rounded-full material-symbols-outlined text-lg ${service.bgClass}`}>
                    {service.icon}
                  </span>
                </div>

                <div className="flex justify-between items-end">
                  <span className="font-headline-sm text-sm text-[#241E2B]">
                    Rs {service.price.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(service);
                    }}
                    className="w-8 h-8 rounded-full bg-[#241E2B] text-white flex items-center justify-center hover:bg-[#B94A6E] transition-colors shadow-xs"
                    title="Add to cart"
                  >
                    <span className="material-symbols-outlined text-lg">add</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Custom Service Card */}
            <div
              onClick={() => setShowCustomModal(true)}
              className="bg-[#EFEBF2]/50 border border-dashed border-[#8C8394] p-4 rounded-xl flex flex-col items-center justify-center h-40 cursor-pointer hover:bg-[#EFEBF2] transition-all group"
            >
              <span className="material-symbols-outlined text-[#8C8394] text-3xl group-hover:text-[#241E2B] transition-colors">
                add_circle
              </span>
              <p className="font-ui-header text-xs text-[#8C8394] mt-2 group-hover:text-[#241E2B] transition-colors">
                Custom Service
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Cart Sidebar (lg:col-span-4) */}
        <aside className="lg:col-span-4 bg-white border border-[#E3DCE6] rounded-xl shadow-xs overflow-hidden flex flex-col h-fit sticky top-20">
          <div className="p-4 border-b border-[#E3DCE6] bg-[#F7EDF0]/30 flex justify-between items-center">
            <h3 className="font-headline-sm text-sm text-[#241E2B]">Cart</h3>
            <span className="bg-[#241E2B] text-white text-[9px] px-2 py-0.5 rounded-full font-bold">
              {cart.length} ITEMS
            </span>
          </div>

          {/* Cart Items List */}
          <div className="p-4 space-y-3.5 max-h-72 overflow-y-auto hide-scrollbar divide-y divide-[#E3DCE6]/60">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-[#8C8394]">
                <span className="material-symbols-outlined text-3xl mb-1">shopping_bag</span>
                <p className="text-xs">Cart is empty. Tap a service to add.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId} className="pt-2 first:pt-0 flex justify-between items-start gap-2">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-ui-header text-xs text-[#241E2B]">{item.name}</h5>
                      <button
                        onClick={() => handleRemoveFromCart(item.cartId)}
                        className="text-[#8C8394] hover:text-[#ba1a1a] transition-colors p-0.5"
                        title="Remove item"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-[#5B5265]">
                      <span className="material-symbols-outlined text-xs">person</span>
                      <span>Stylist:</span>
                      <select
                        value={item.stylistName}
                        onChange={(e) => handleUpdateStylist(item.cartId, e.target.value)}
                        className="bg-[#EFEBF2] border-none text-[11px] font-bold py-0.5 px-1 rounded text-[#241E2B] focus:outline-none"
                      >
                        {stylists.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <span className="font-ui-header text-xs text-[#241E2B]">
                    {item.price.toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Summary & Payment Section */}
          <div className="p-4 bg-[#EFEBF2]/30 border-t border-[#E3DCE6] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5B5265]">
                <span>Subtotal</span>
                <span>Rs {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-[#7E9384] font-bold">
                <span>Loyalty Discount (5%)</span>
                <span>- Rs {discountAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between pt-2 border-t border-[#E3DCE6] font-bold">
                <span className="font-ui-header text-sm text-[#241E2B]">Grand Total</span>
                <span className="font-headline-sm text-base text-[#241E2B]">
                  Rs {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <p className="font-eyebrow text-[9px] text-[#8C8394] uppercase tracking-wider">
                PAYMENT METHOD
              </p>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('Cash')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs transition-all ${
                    paymentMethod === 'Cash'
                      ? 'border-2 border-[#B94A6E] bg-[#F7EDF0] text-[#9a3256] font-bold'
                      : 'border-[#E3DCE6] bg-white text-[#5B5265] hover:border-[#B94A6E]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">payments</span>
                  <span className="text-[10px] mt-0.5">Cash</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('Card')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-2 border-[#B94A6E] bg-[#F7EDF0] text-[#9a3256] font-bold'
                      : 'border-[#E3DCE6] bg-white text-[#5B5265] hover:border-[#B94A6E]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">credit_card</span>
                  <span className="text-[10px] mt-0.5">Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('Mobile')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs transition-all ${
                    paymentMethod === 'Mobile'
                      ? 'border-2 border-[#B94A6E] bg-[#F7EDF0] text-[#9a3256] font-bold'
                      : 'border-[#E3DCE6] bg-white text-[#5B5265] hover:border-[#B94A6E]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">smartphone</span>
                  <span className="text-[10px] mt-0.5">Mobile</span>
                </button>
              </div>
            </div>

            {/* Take Payment Button */}
            <button
              onClick={handleTakePayment}
              className="w-full py-3.5 bg-[#241E2B] text-white rounded-full font-headline-sm text-sm hover:bg-[#B94A6E] transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Take Payment</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Custom Service Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-[#241E2B]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#E3DCE6] shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#E3DCE6] pb-2">
              <h3 className="font-headline-sm text-base text-[#241E2B]">Add Custom Service</h3>
              <button onClick={() => setShowCustomModal(false)} className="text-[#8C8394] hover:text-[#241E2B]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddCustomService} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#241E2B] mb-1">Service Description</label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Special Scalp Treatment"
                  className="w-full p-2.5 border border-[#E3DCE6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B94A6E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#241E2B] mb-1">Price (Rs)</label>
                <input
                  type="number"
                  required
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="w-full p-2.5 border border-[#E3DCE6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B94A6E]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 border border-[#E3DCE6] rounded-full font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#241E2B] text-white rounded-full font-bold text-xs hover:bg-[#B94A6E]"
                >
                  Add to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
