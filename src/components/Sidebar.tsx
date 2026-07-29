import React from 'react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onGenerateReport: () => void;
  onOpenSupport: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onGenerateReport,
  onOpenSupport,
}) => {
  const navItems: { id: ViewMode; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar_month' },
    { id: 'clients', label: 'Clients', icon: 'group' },
    { id: 'billing', label: 'Billing', icon: 'payments' },
    { id: 'staff', label: 'Staff', icon: 'badge' },
    { id: 'inventory', label: 'Inventory', icon: 'inventory_2' },
    { id: 'reports', label: 'Sales Reports', icon: 'analytics' },
    { id: 'booking', label: 'Online Booking', icon: 'storefront' },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-[#F7EDF0] dark:bg-[#342e3b] border-r border-[#E3DCE6] py-5 px-4 gap-2 z-50 overflow-y-auto hide-scrollbar">
      {/* Brand Header */}
      <div 
        onClick={() => onNavigate('dashboard')} 
        className="mb-6 px-3 cursor-pointer group"
      >
        <h1 className="font-headline-sm text-lg text-[#241E2B] dark:text-[#FFFDFC] group-hover:text-[#B94A6E] transition-colors">
          Style Heaven
        </h1>
        <p className="font-ui-nav text-[11px] text-[#8C8394] uppercase tracking-widest mt-0.5">
          Premium Suite
        </p>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                isActive
                  ? 'bg-[#E7C3D0]/40 text-[#9a3256] font-bold shadow-xs'
                  : 'text-[#5B5265] hover:bg-[#EFEBF2] hover:text-[#241E2B] hover:translate-x-1'
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${isActive ? 'text-[#9a3256]' : 'text-[#8C8394] group-hover:text-[#241E2B]'}`}>
                {item.icon}
              </span>
              <span className="font-ui-nav text-xs font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer / Quick Actions */}
      <div className="mt-auto border-t border-[#E3DCE6]/60 pt-4 space-y-2">
        <button
          onClick={onGenerateReport}
          className="w-full bg-[#241E2B] text-[#FFFDFC] py-3 rounded-full font-bold text-xs hover:bg-[#B94A6E] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">summarize</span>
          Generate Report
        </button>

        <button
          onClick={onOpenSupport}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[#5B5265] hover:bg-[#EFEBF2] hover:text-[#241E2B] transition-all rounded-lg text-left"
        >
          <span className="material-symbols-outlined text-xl text-[#8C8394]">help</span>
          <span className="font-ui-nav text-xs font-medium">Support</span>
        </button>

        <button
          onClick={() => alert('Logged out of Style Heaven Suite.')}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[#5B5265] hover:bg-[#EFEBF2] hover:text-[#ba1a1a] transition-all rounded-lg text-left"
        >
          <span className="material-symbols-outlined text-xl text-[#8C8394] group-hover:text-[#ba1a1a]">logout</span>
          <span className="font-ui-nav text-xs font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};
