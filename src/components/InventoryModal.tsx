import React, { useState } from 'react';
import { InventoryItem } from '../types';
import { INITIAL_INVENTORY } from '../data/mockData';

interface InventoryModalProps {
  onClose: () => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({ onClose }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [orderedMessage, setOrderedMessage] = useState<string | null>(null);

  const handleRestock = (id: string, name: string) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: item.stock + 10 } : item))
    );
    setOrderedMessage(`Successfully ordered +10 units of ${name}!`);
    setTimeout(() => setOrderedMessage(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#241E2B]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full border border-[#E3DCE6] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E3DCE6] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#B94A6E]">inventory_2</span>
            <h3 className="font-headline-sm text-base text-[#241E2B]">Inventory & Stock Control</h3>
          </div>
          <button onClick={onClose} className="text-[#8C8394] hover:text-[#241E2B]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {orderedMessage && (
          <div className="p-3 bg-[#d2e8d7] text-[#0d1f15] font-bold text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{orderedMessage}</span>
          </div>
        )}

        <div className="overflow-x-auto max-h-80">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-[#EFEBF2] text-[#8C8394] uppercase text-[10px] font-eyebrow">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">In Stock</th>
                <th className="p-3">Unit Price</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3DCE6]">
              {inventory.map((item) => {
                const isLow = item.stock <= item.threshold;
                return (
                  <tr key={item.id} className="hover:bg-[#EFEBF2]/40 transition-colors">
                    <td className="p-3 font-bold text-[#241E2B]">{item.name}</td>
                    <td className="p-3 text-[#5B5265]">{item.category}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isLow ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#7E9384]/20 text-[#7E9384]'
                      }`}>
                        {item.stock} units {isLow && '(LOW)'}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-[#241E2B]">Rs {item.unitPrice.toLocaleString()}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleRestock(item.id, item.name)}
                        className="px-3 py-1 bg-[#241E2B] text-white rounded-full text-[10px] font-bold hover:bg-[#B94A6E] transition-colors"
                      >
                        + Restock 10
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="text-right pt-2 border-t border-[#E3DCE6]">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#241E2B] text-white rounded-full font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
