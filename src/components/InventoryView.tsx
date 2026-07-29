import React, { useState } from 'react';
import { InventoryItem } from '../types';
import { INITIAL_INVENTORY } from '../data/mockData';

export const InventoryView: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [orderedMessage, setOrderedMessage] = useState<string | null>(null);

  const categories = ['ALL', 'Hair Care', 'Hair Color', 'Nails', 'Skincare', 'Retail'];

  const handleRestock = (id: string, name: string, amount: number = 10) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: item.stock + amount } : item))
    );
    setOrderedMessage(`Restocked +${amount} units for "${name}"!`);
    setTimeout(() => setOrderedMessage(null), 3500);
  };

  const handleRestockAllLow = () => {
    let count = 0;
    setInventory((prev) =>
      prev.map((item) => {
        if (item.stock <= item.threshold) {
          count++;
          return { ...item, stock: item.stock + 15 };
        }
        return item;
      })
    );
    setOrderedMessage(`Automatically restocked +15 units for ${count} low stock items!`);
    setTimeout(() => setOrderedMessage(null), 4000);
  };

  const filteredItems = inventory.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const lowStockCount = inventory.filter((i) => i.stock <= i.threshold).length;
  const totalStockValue = inventory.reduce((acc, i) => acc + i.stock * i.unitPrice, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#F7EDF0] p-6 rounded-2xl border border-[#E3DCE6] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-sm text-xl text-[#241E2B] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#B94A6E]">inventory_2</span>
            Inventory & Stock Control
          </h2>
          <p className="text-xs text-[#5B5265] mt-1">
            Track salon products, professional backbar formulations, stock alerts, and automated restock orders.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {lowStockCount > 0 && (
            <button
              onClick={handleRestockAllLow}
              className="px-5 py-2.5 bg-[#241E2B] text-white rounded-full font-bold text-xs hover:bg-[#B94A6E] transition-all shadow-md flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">published_with_changes</span>
              Restock Low Items ({lowStockCount})
            </button>
          )}
        </div>
      </div>

      {/* Success Notification Message */}
      {orderedMessage && (
        <div className="p-4 bg-[#d2e8d7] text-[#0d1f15] font-bold text-xs rounded-xl flex items-center gap-2 animate-fadeIn shadow-xs border border-[#7E9384]/30">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{orderedMessage}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-[#E3DCE6] shadow-xs">
          <span className="text-[10px] font-eyebrow uppercase text-[#8C8394] block">Total Product SKUs</span>
          <span className="font-headline-sm text-2xl font-bold text-[#241E2B] mt-1 block">
            {inventory.length}
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E3DCE6] shadow-xs">
          <span className="text-[10px] font-eyebrow uppercase text-[#8C8394] block">Low Stock Alerts</span>
          <span className={`font-headline-sm text-2xl font-bold mt-1 block ${lowStockCount > 0 ? 'text-[#ba1a1a]' : 'text-[#7E9384]'}`}>
            {lowStockCount} Items
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E3DCE6] shadow-xs">
          <span className="text-[10px] font-eyebrow uppercase text-[#8C8394] block">Total Stock Valuation</span>
          <span className="font-headline-sm text-2xl font-bold text-[#9a3256] mt-1 block">
            Rs {totalStockValue.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E3DCE6] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8394] text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search product name or formula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#EFEBF2] pl-9 pr-3 py-2 rounded-xl text-xs text-[#241E2B] focus:outline-none focus:ring-1 focus:ring-[#B94A6E]"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#241E2B] text-white shadow-xs'
                    : 'bg-[#EFEBF2] text-[#5B5265] hover:bg-[#E3DCE6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Items Table */}
      <div className="bg-white rounded-2xl border border-[#E3DCE6] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-[#F7EDF0] text-[#8C8394] uppercase text-[10px] font-eyebrow border-b border-[#E3DCE6]">
              <tr>
                <th className="p-3.5">Product Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Stock Level</th>
                <th className="p-3.5">Unit Price</th>
                <th className="p-3.5">Stock Value</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3DCE6]">
              {filteredItems.map((item) => {
                const isLow = item.stock <= item.threshold;
                const totalVal = item.stock * item.unitPrice;

                return (
                  <tr key={item.id} className="hover:bg-[#EFEBF2]/40 transition-colors">
                    <td className="p-3.5 font-bold text-[#241E2B]">
                      {item.name}
                      {isLow && (
                        <span className="ml-2 px-2 py-0.5 bg-[#ffdad6] text-[#ba1a1a] rounded-md text-[9px] uppercase tracking-wider font-extrabold">
                          Low Stock
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-[#5B5265]">{item.category}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isLow ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#7E9384]/20 text-[#7E9384]'
                        }`}
                      >
                        {item.stock} units
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-[#241E2B]">
                      Rs {item.unitPrice.toLocaleString()}
                    </td>
                    <td className="p-3.5 font-bold text-[#9a3256]">
                      Rs {totalVal.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleRestock(item.id, item.name, 10)}
                        className="px-3.5 py-1.5 bg-[#241E2B] text-white rounded-full text-[10px] font-bold hover:bg-[#B94A6E] transition-colors"
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
      </div>
    </div>
  );
};
