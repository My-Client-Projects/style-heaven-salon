import React from 'react';
import { CartItem, Client } from '../types';

interface ReceiptModalProps {
  activeClient: Client;
  items: CartItem[];
  grandTotal: number;
  paymentMethod: string;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  activeClient,
  items,
  grandTotal,
  paymentMethod,
  onClose,
}) => {
  const invoiceNo = `SH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#241E2B]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#E3DCE6] shadow-2xl space-y-4 print:shadow-none print:border-none">
        {/* Invoice Header */}
        <div className="text-center border-b border-[#E3DCE6] pb-4">
          <h2 className="font-headline-sm text-xl text-[#241E2B]">Style Heaven</h2>
          <p className="font-ui-nav text-[10px] text-[#8C8394] uppercase tracking-widest mt-0.5">
            Luxury Salon & Spa Suite
          </p>
          <p className="text-[11px] text-[#5B5265] mt-1">Invoice #{invoiceNo} • {dateStr}</p>
        </div>

        {/* Client & Payment Info */}
        <div className="bg-[#F7EDF0]/40 p-3 rounded-xl text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-[#8C8394]">Client:</span>
            <span className="font-bold text-[#241E2B]">{activeClient.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C8394]">Payment Method:</span>
            <span className="font-bold text-[#9a3256]">{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C8394]">Status:</span>
            <span className="font-bold text-[#7E9384]">Settled & Paid</span>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="space-y-2 text-xs">
          <p className="font-eyebrow text-[9px] text-[#8C8394] uppercase tracking-wider">
            ITEMIZED SERVICES
          </p>
          <div className="divide-y divide-[#E3DCE6]/60">
            {items.map((item, idx) => (
              <div key={idx} className="py-2 flex justify-between items-center">
                <div>
                  <p className="font-bold text-[#241E2B]">{item.name}</p>
                  <p className="text-[10px] text-[#8C8394]">Stylist: {item.stylistName}</p>
                </div>
                <span className="font-bold text-[#241E2B]">Rs {item.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grand Total */}
        <div className="pt-3 border-t-2 border-[#241E2B] flex justify-between items-center">
          <span className="font-headline-sm text-sm text-[#241E2B]">Grand Total Settled</span>
          <span className="font-headline-md text-xl text-[#9a3256]">
            Rs {grandTotal.toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 border border-[#241E2B] text-[#241E2B] rounded-full font-bold text-xs hover:bg-[#EFEBF2] transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">print</span>
            <span>Print Receipt</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-[#241E2B] text-white rounded-full font-bold text-xs hover:bg-[#9a3256] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
