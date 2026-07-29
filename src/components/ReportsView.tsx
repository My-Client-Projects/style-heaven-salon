import React, { useState } from 'react';
import { ViewMode, Transaction } from '../types';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

interface ReportsViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenInventory: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  onNavigate,
  onOpenInventory,
}) => {
  const [timeRange, setTimeframe] = useState('Last 8 Weeks');
  const [transactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [showAiStrategy, setShowAiStrategy] = useState(false);

  // CSV Export feature
  const handleExportExcel = () => {
    const csvRows = [
      ['Client Name', 'Service Category', 'Staff Member', 'Date', 'Amount (Rs)'],
      ...transactions.map((t) => [t.clientName, t.category, t.staffName, t.date, t.amount]),
      ['Total June Revenue', 'Financial Summary', 'Style Heaven', 'June 2026', '1284500'],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Style_Heaven_June_2026_Sales_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 md:ml-64 w-[calc(100%-16rem)] max-md:ml-0 max-md:w-full transition-all">
      {/* Header with Title & Export Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span className="font-eyebrow text-[10px] text-[#8C8394] mb-1 block uppercase tracking-widest">
            PERFORMANCE OVERVIEW
          </span>
          <h2 className="font-headline-md text-2xl md:text-3xl text-[#241E2B]">
            June Financial Summary
          </h2>
        </div>

        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2 px-6 py-2.5 border border-[#241E2B] text-[#241E2B] rounded-full font-bold text-xs hover:bg-[#241E2B] hover:text-white transition-all shadow-xs active:scale-95"
        >
          <span className="material-symbols-outlined text-base">download</span>
          <span>Export to Excel</span>
        </button>
      </div>

      {/* High-Level KPIs Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Revenue Card */}
        <div className="bg-white p-5 rounded-xl border border-[#E3DCE6] custom-shadow group hover:border-[#B94A6E] transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-full bg-[#F7EDF0] flex items-center justify-center text-[#9a3256]">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-[#7E9384] font-bold text-[11px] bg-[#7E9384]/10 px-2 py-0.5 rounded">
              +12.4%
            </span>
          </div>
          <span className="font-meta-label text-[10px] text-[#8C8394] uppercase mb-0.5 block">
            TOTAL REVENUE
          </span>
          <div className="text-2xl font-headline-md text-[#241E2B]">Rs 1,284,500</div>
          <div className="mt-3 h-1.5 w-full bg-[#EFEBF2] rounded-full overflow-hidden">
            <div className="h-full bg-[#9a3256] w-[78%]"></div>
          </div>
        </div>

        {/* Bills Generated Card */}
        <div className="bg-white p-5 rounded-xl border border-[#E3DCE6] custom-shadow group hover:border-[#B94A6E] transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-full bg-[#F7EDF0] flex items-center justify-center text-[#9a3256]">
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
            <span className="text-[#7E9384] font-bold text-[11px] bg-[#7E9384]/10 px-2 py-0.5 rounded">
              312 Total
            </span>
          </div>
          <span className="font-meta-label text-[10px] text-[#8C8394] uppercase mb-0.5 block">
            BILLS GENERATED
          </span>
          <div className="text-2xl font-headline-md text-[#241E2B]">312</div>
          <p className="text-xs font-body text-[#5B5265] mt-3 italic">Avg. ticket: Rs 4,116</p>
        </div>

        {/* Returning Clients Card */}
        <div className="bg-white p-5 rounded-xl border border-[#E3DCE6] custom-shadow group hover:border-[#B94A6E] transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-full bg-[#F7EDF0] flex items-center justify-center text-[#9a3256]">
              <span className="material-symbols-outlined">person_add</span>
            </div>
            <span className="text-[#7E9384] font-bold text-[11px] bg-[#7E9384]/10 px-2 py-0.5 rounded">
              +5% vs May
            </span>
          </div>
          <span className="font-meta-label text-[10px] text-[#8C8394] uppercase mb-0.5 block">
            RETURNING CLIENTS
          </span>
          <div className="text-2xl font-headline-md text-[#241E2B]">64%</div>
          <p className="text-xs font-body text-[#5B5265] mt-3">Industry avg: 52%</p>
        </div>
      </div>

      {/* Middle Section: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue by Week Bar Chart (col-span-2) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-[#E3DCE6] custom-shadow">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-headline-sm text-sm text-[#241E2B]">Revenue by Week</h3>
              <p className="text-xs text-[#8C8394]">Tracking weekly growth across June & late May</p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border border-[#E3DCE6] rounded-lg text-xs font-body p-1.5 bg-[#EFEBF2]/40 text-[#241E2B] focus:outline-none"
            >
              <option value="Last 8 Weeks">Last 8 Weeks</option>
              <option value="Year to Date">Year to Date</option>
            </select>
          </div>

          <div className="flex items-end justify-between h-56 gap-2 px-2 pt-4">
            {/* Bars */}
            {[
              { label: 'W1', height: '45%', val: 'Rs 110k' },
              { label: 'W2', height: '52%', val: 'Rs 128k' },
              { label: 'W3', height: '48%', val: 'Rs 118k' },
              { label: 'W4', height: '62%', val: 'Rs 152k' },
              { label: 'W5', height: '75%', val: 'Rs 184k' },
              { label: 'W6', height: '82%', val: 'Rs 205k' },
              { label: 'W7', height: '88%', val: 'Rs 220k' },
              { label: 'W8', height: '94%', val: 'Rs 267k' },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group relative">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#241E2B] text-white text-[10px] px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap pointer-events-none z-10">
                  {bar.val}
                </div>
                <div
                  className={`w-full rounded-t-sm transition-all duration-500 ${
                    i >= 5 ? 'bg-[#B94A6E] group-hover:bg-[#9a3256]' : 'bg-[#E7C3D0] group-hover:bg-[#B94A6E]'
                  }`}
                  style={{ height: bar.height }}
                ></div>
                <span className={`text-[11px] mt-2 font-bold ${i >= 5 ? 'text-[#9a3256]' : 'text-[#8C8394]'}`}>
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Distribution Donut Chart */}
        <div className="bg-white p-5 rounded-xl border border-[#E3DCE6] custom-shadow">
          <h3 className="font-headline-sm text-sm text-[#241E2B] mb-4">Service Distribution</h3>

          <div className="relative flex items-center justify-center h-40 mb-6">
            <svg className="w-36 h-36 transform -rotate-90">
              {/* Colour (42%) */}
              <circle
                cx="72"
                cy="72"
                r="56"
                fill="transparent"
                stroke="#9a3256"
                strokeWidth="12"
                strokeDasharray="147.7 351.8"
              />
              {/* Cut & Styling (26%) */}
              <circle
                cx="72"
                cy="72"
                r="56"
                fill="transparent"
                stroke="#E7C3D0"
                strokeWidth="12"
                strokeDasharray="91.4 351.8"
                strokeDashoffset="-147.7"
              />
              {/* Nails & Skin (18%) */}
              <circle
                cx="72"
                cy="72"
                r="56"
                fill="transparent"
                stroke="#F7EDF0"
                strokeWidth="12"
                strokeDasharray="63.3 351.8"
                strokeDashoffset="-239.1"
              />
              {/* Retail (14%) */}
              <circle
                cx="72"
                cy="72"
                r="56"
                fill="transparent"
                stroke="#EFEBF2"
                strokeWidth="12"
                strokeDasharray="49.2 351.8"
                strokeDashoffset="-302.4"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-headline-md text-base text-[#241E2B]">4</span>
              <span className="text-[10px] text-[#8C8394]">Sectors</span>
            </div>
          </div>

          <ul className="space-y-2 text-xs">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9a3256]"></span>
                <span className="text-[#5B5265]">Colour</span>
              </div>
              <span className="font-bold text-[#241E2B]">42%</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E7C3D0]"></span>
                <span className="text-[#5B5265]">Cut & Styling</span>
              </div>
              <span className="font-bold text-[#241E2B]">26%</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F7EDF0] border border-[#E3DCE6]"></span>
                <span className="text-[#5B5265]">Nails & Skin</span>
              </div>
              <span className="font-bold text-[#241E2B]">18%</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EFEBF2]"></span>
                <span className="text-[#5B5265]">Retail</span>
              </div>
              <span className="font-bold text-[#241E2B]">14%</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent High-Value Transactions Table */}
      <div className="bg-white rounded-xl border border-[#E3DCE6] custom-shadow overflow-hidden">
        <div className="p-4 bg-[#F7EDF0]/30 border-b border-[#E3DCE6] flex justify-between items-center">
          <h3 className="font-ui-header text-xs text-[#241E2B]">Recent High-Value Transactions</h3>
          <button
            onClick={() => onNavigate('billing')}
            className="text-[#9a3256] font-bold text-xs hover:underline"
          >
            View All Billing
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-xs">
            <thead>
              <tr className="text-[#8C8394] text-[10px] uppercase font-meta-label border-b border-[#E3DCE6] bg-[#EFEBF2]/40">
                <th className="px-5 py-3">Client Name</th>
                <th className="px-5 py-3">Service Category</th>
                <th className="px-5 py-3">Staff Member</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3DCE6]">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-[#EFEBF2]/40 transition-colors">
                  <td className="px-5 py-3.5 flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full text-[10px] flex items-center justify-center font-bold ${t.avatarBg}`}>
                      {t.initials}
                    </div>
                    <span className="font-bold text-[#241E2B]">{t.clientName}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="bg-[#F7EDF0] text-[#9a3256] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[#5B5265]">{t.staffName}</td>
                  <td className="px-5 py-3.5 text-[#8C8394]">{t.date}</td>
                  <td className="px-5 py-3.5 text-right font-bold text-[#241E2B]">
                    Rs {t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Inventory Insight */}
        <div className="bg-[#241E2B] text-white p-6 rounded-xl relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="font-headline-sm text-base mb-1.5">Inventory Insight</h4>
            <p className="font-body text-xs opacity-80 mb-5">
              3 retail products are running low on stock. Restock suggested before peak season.
            </p>
            <button
              onClick={onOpenInventory}
              className="bg-[#B94A6E] text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-[#9a3256] transition-all shadow-xs"
            >
              View Inventory
            </button>
          </div>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#B94A6E]/20 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* AI Strategy Assistant */}
        <div 
          onClick={() => setShowAiStrategy(!showAiStrategy)}
          className="bg-white p-6 rounded-xl border border-[#E3DCE6] flex items-center justify-between custom-shadow cursor-pointer hover:border-[#B94A6E] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#F7EDF0] flex items-center justify-center text-[#9a3256]">
              <span className="material-symbols-outlined text-xl">smart_toy</span>
            </div>
            <div>
              <h4 className="font-ui-header text-sm text-[#241E2B]">AI Strategy Assistant</h4>
              <p className="font-body text-xs text-[#8C8394]">
                Increase loyalty points for Nails category to boost retention.
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#8C8394]">
            {showAiStrategy ? 'expand_less' : 'arrow_forward_ios'}
          </span>
        </div>
      </div>

      {/* AI Strategy Detail Panel */}
      {showAiStrategy && (
        <div className="p-4 bg-[#F7EDF0] border border-[#E7C3D0] rounded-xl space-y-2 text-xs animate-fadeIn">
          <div className="flex items-center gap-2 text-[#9a3256] font-bold">
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <span>Style Heaven AI Revenue Strategy</span>
          </div>
          <p className="text-[#241E2B]">
            <strong>Insight:</strong> 18% of revenue comes from Nails & Skin, but repeat frequency is 2.2x higher when paired with Hair Spa treatments.
          </p>
          <p className="text-[#5B5265]">
            <strong>Actionable Recommendation:</strong> Launch a "Gel & Gloss" bundle during Thursday afternoon slots to increase average ticket by Rs 2,200 per client session.
          </p>
        </div>
      )}
    </div>
  );
};
