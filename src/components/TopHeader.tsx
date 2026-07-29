import React from 'react';
import { ViewMode } from '../types';

interface TopHeaderProps {
  currentView: ViewMode;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigate: (view: ViewMode) => void;
  onOpenNewAppointment: () => void;
  onOpenSettings: () => void;
  onToggleNotifications: () => void;
  unreadNotificationsCount: number;
  onOpenMobileMenu?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentView,
  searchQuery,
  onSearchChange,
  onNavigate,
  onOpenNewAppointment,
  onOpenSettings,
  onToggleNotifications,
  unreadNotificationsCount,
  onOpenMobileMenu,
}) => {
  const managerAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuBM-XRcJcGTl7eM4nJe1yghGPe9iaDafSgbEgNjVn8unb5ACJbj_lCgi4ivgGK0iXKlejHLN7drxTLKDd8fm088qhKm6j1Ra2BkD-QPGeJ7RxbArgZdg16I8tbeV8yZB8paWB6hZpyC6sp-5c1KMYMD5UxYNYBMrWQsslME1P65jiIF9ee4wI3Lbt3d2yEnBixQpsaMrmh38Uh6uObmofTLNOLVYd3jvsSm-zPCuYm4u-wEkxuoydM";

  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Morning Dashboard';
      case 'appointments':
        return 'Appointments Manager';
      case 'calendar':
        return 'Calendar View';
      case 'clients':
        return 'Client Directory';
      case 'billing':
        return 'Billing & POS';
      case 'reports':
        return 'June 2026 Sales Report';
      case 'booking':
        return 'Book at Style Heaven';
      case 'staff':
        return 'Staff Roster & Performance';
      case 'inventory':
        return 'Inventory & Stock Control';
      default:
        return 'Style Heaven Suite';
    }
  };

  return (
    <header className="flex justify-between items-center px-6 w-full sticky top-0 z-40 bg-[#FFFDFC]/85 backdrop-blur-md h-16 border-b border-[#E3DCE6] shadow-xs md:ml-64 w-[calc(100%-16rem)] max-md:ml-0 max-md:w-full transition-all">
      {/* Left side: View Title / Mobile Menu Button & Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenMobileMenu || (() => onNavigate('dashboard'))}
          className="md:hidden text-[#241E2B] p-2 hover:bg-[#EFEBF2] rounded-xl flex items-center gap-1 active:scale-95 transition-all"
          title="Open Menu"
        >
          <span className="material-symbols-outlined text-xl text-[#B94A6E]">menu</span>
          <span className="font-bold text-xs">Menu</span>
        </button>

        <div className="flex items-center gap-3">
          <h2 className="font-ui-header text-sm text-[#9a3256] hidden sm:block">
            {getViewTitle()}
          </h2>
          {currentView === 'calendar' && (
            <div className="hidden lg:flex items-center gap-3 border-l border-[#E3DCE6] pl-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7E9384]"></span>
                <span className="font-tiny text-[11px] text-[#5B5265]">14 booked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E3DCE6]"></span>
                <span className="font-tiny text-[11px] text-[#5B5265]">4 slots free</span>
              </div>
            </div>
          )}
        </div>

        {/* Global Search Bar */}
        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8394] text-lg pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search clients, services, or staff..."
            className="bg-[#EFEBF2] border-none rounded-full pl-9 pr-4 py-1.5 text-xs text-[#241E2B] focus:outline-none focus:ring-1 focus:ring-[#B94A6E] w-56 lg:w-72 transition-all placeholder:text-[#8C8394]"
          />
        </div>
      </div>

      {/* Right side: Quick Action, Notifications, Settings, Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {currentView === 'billing' ? (
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-[#9a3256] text-[#FFFDFC] px-4 py-1.5 rounded-full font-bold text-xs hover:opacity-90 active:scale-95 transition-all shadow-xs"
          >
            Dashboard
          </button>
        ) : (
          <button
            onClick={onOpenNewAppointment}
            className="bg-[#B94A6E] text-white px-4 py-1.5 rounded-full font-bold text-xs hover:opacity-90 active:scale-95 transition-all shadow-xs flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span className="hidden sm:inline">Quick Appointment</span>
            <span className="sm:hidden">+ Appt</span>
          </button>
        )}

        <div className="flex items-center gap-2 border-l border-[#E3DCE6] pl-3">
          {/* Notification Button */}
          <button
            onClick={onToggleNotifications}
            className="relative p-1.5 text-[#5B5265] hover:text-[#B94A6E] hover:bg-[#EFEBF2] rounded-full transition-colors"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#B94A6E] rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 text-[#5B5265] hover:text-[#B94A6E] hover:bg-[#EFEBF2] rounded-full transition-colors"
            title="Settings"
          >
            <span className="material-symbols-outlined text-xl">settings</span>
          </button>

          {/* User Manager Avatar */}
          <div
            onClick={() => onNavigate('clients')}
            className="w-8 h-8 rounded-full overflow-hidden border border-[#E3DCE6] cursor-pointer hover:ring-2 hover:ring-[#B94A6E] transition-all"
            title="Logged in as Nimali (Salon Manager)"
          >
            <img
              src={managerAvatar}
              alt="Manager Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
