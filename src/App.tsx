import React, { useState } from 'react';
import { ViewMode, Client, Appointment, Stylist, CartItem } from './types';
import { INITIAL_CLIENTS, INITIAL_APPOINTMENTS, INITIAL_STYLISTS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/DashboardView';
import { CalendarView } from './components/CalendarView';
import { ClientsView } from './components/ClientsView';
import { BillingView } from './components/BillingView';
import { ReportsView } from './components/ReportsView';
import { PublicBookingView } from './components/PublicBookingView';
import { AddAppointmentModal } from './components/AddAppointmentModal';
import { ReceiptModal } from './components/ReceiptModal';
import { StaffModal } from './components/StaffModal';
import { InventoryModal } from './components/InventoryModal';
import { SettingsModal } from './components/SettingsModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Domain State
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [activeClient, setActiveClient] = useState<Client>(INITIAL_CLIENTS[0]);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [stylists, setStylists] = useState<Stylist[]>(INITIAL_STYLISTS);
  const [todayRevenue, setTodayRevenue] = useState<number>(28450);

  // Modals & Overlay States
  const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);

  // Receipt Modal State
  const [receiptData, setReceiptData] = useState<{
    items: CartItem[];
    grandTotal: number;
    paymentMethod: string;
  } | null>(null);

  // Handlers
  const handleAddAppointment = (newApt: Appointment) => {
    setAppointments((prev) => [newApt, ...prev]);
  };

  const handlePaymentComplete = (amount: number) => {
    setTodayRevenue((prev) => prev + amount);
  };

  const handleOpenReceiptModal = (
    items: CartItem[],
    grandTotal: number,
    paymentMethod: string
  ) => {
    setReceiptData({ items, grandTotal, paymentMethod });
  };

  const handleUpdateStylistUtilization = (stylistId: string, newUtil: number) => {
    setStylists((prev) =>
      prev.map((s) => (s.id === stylistId ? { ...s, utilization: newUtil } : s))
    );
  };

  const handleOnlineBookingConfirmed = (
    serviceName: string,
    dateStr: string,
    timeStr: string,
    price: number,
    stylistName: string
  ) => {
    const matchedStylist = stylists.find((s) => stylistName.includes(s.name)) || stylists[0];

    const newApt: Appointment = {
      id: `online-${Date.now()}`,
      clientName: activeClient.name,
      service: serviceName,
      stylistId: matchedStylist.id,
      stylistName: matchedStylist.name,
      startTime: timeStr.includes('11:30') ? '11:30' : '09:00',
      endTime: timeStr.includes('11:30') ? '13:00' : '11:00',
      tag: serviceName.toLowerCase().includes('nail') ? 'NAILS' : 'PINK',
      tagColor: serviceName.toLowerCase().includes('nail') ? 'sage' : 'bloom',
      price: price,
      status: 'Scheduled',
      date: dateStr,
    };

    setAppointments((prev) => [newApt, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FFFDFC] text-[#241E2B] flex flex-col font-body selection:bg-[#E7C3D0] selection:text-[#241E2B] relative">
      {/* Sidebar Navigation (Desktop) */}
      <Sidebar
        currentView={currentView}
        onNavigate={(v) => {
          if (v === 'staff') setShowStaffModal(true);
          else if (v === 'inventory') setShowInventoryModal(true);
          else setCurrentView(v);
        }}
        onGenerateReport={() => setCurrentView('reports')}
        onOpenSupport={() => alert('Style Heaven Support Concierge: Call +94 11 234 5678 or email concierge@styleheaven.lk')}
      />

      {/* Top Header */}
      <TopHeader
        currentView={currentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={(v) => setCurrentView(v)}
        onOpenNewAppointment={() => setShowAddAppointmentModal(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
        onToggleNotifications={() => setShowNotificationsDrawer(!showNotificationsDrawer)}
        unreadNotificationsCount={unreadNotificationsCount}
      />

      {/* Main View Container */}
      <main className="flex-1 pb-20 md:pb-8">
        {currentView === 'dashboard' && (
          <DashboardView
            onNavigate={(v) => setCurrentView(v)}
            onSelectClient={(client) => setActiveClient(client)}
            appointments={appointments}
            clients={clients}
            todayRevenue={todayRevenue}
            onConfirmAllBookings={() => setUnreadNotificationsCount(0)}
            onOrderStock={() => setShowInventoryModal(true)}
          />
        )}

        {currentView === 'calendar' && (
          <CalendarView
            onNavigate={(v) => setCurrentView(v)}
            appointments={appointments}
            stylists={stylists}
            onOpenAddAppointment={() => setShowAddAppointmentModal(true)}
            onSelectAppointment={(apt) => {
              const matched = clients.find((c) => c.name === apt.clientName);
              if (matched) {
                setActiveClient(matched);
                setCurrentView('clients');
              } else {
                setCurrentView('billing');
              }
            }}
          />
        )}

        {currentView === 'clients' && (
          <ClientsView
            clients={clients}
            activeClient={activeClient}
            onSelectClient={(c) => setActiveClient(c)}
            onNavigate={(v) => setCurrentView(v)}
            onOpenNewAppointment={() => setShowAddAppointmentModal(true)}
            onEditClientProfile={(c) => {
              const newPhone = prompt('Update Phone Number:', c.phone);
              if (newPhone) {
                const updated = { ...c, phone: newPhone };
                setClients((prev) => prev.map((x) => (x.id === c.id ? updated : x)));
                setActiveClient(updated);
              }
            }}
          />
        )}

        {currentView === 'billing' && (
          <BillingView
            activeClient={activeClient}
            stylists={stylists}
            onNavigate={(v) => setCurrentView(v)}
            onPaymentComplete={handlePaymentComplete}
            onOpenReceiptModal={(items, grandTotal, paymentMethod) =>
              handleOpenReceiptModal(items, grandTotal, paymentMethod)
            }
          />
        )}

        {currentView === 'reports' && (
          <ReportsView
            onNavigate={(v) => setCurrentView(v)}
            onOpenInventory={() => setShowInventoryModal(true)}
          />
        )}

        {currentView === 'booking' && (
          <PublicBookingView
            stylists={stylists}
            onNavigate={(v) => setCurrentView(v)}
            onBookingConfirmed={handleOnlineBookingConfirmed}
          />
        )}
      </main>

      {/* Mobile Sticky Navigation Footer */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FFFDFC]/95 backdrop-blur-md border-t border-[#E3DCE6] flex justify-around items-center py-2 z-40 shadow-lg">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentView === 'dashboard' ? 'text-[#9a3256] font-bold' : 'text-[#8C8394]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">dashboard</span>
          <span className="text-[9px]">Home</span>
        </button>

        <button
          onClick={() => setCurrentView('calendar')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentView === 'calendar' ? 'text-[#9a3256] font-bold' : 'text-[#8C8394]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">calendar_month</span>
          <span className="text-[9px]">Calendar</span>
        </button>

        <button
          onClick={() => setCurrentView('billing')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentView === 'billing' ? 'text-[#9a3256] font-bold' : 'text-[#8C8394]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">payments</span>
          <span className="text-[9px]">Billing</span>
        </button>

        <button
          onClick={() => setCurrentView('clients')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentView === 'clients' ? 'text-[#9a3256] font-bold' : 'text-[#8C8394]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">group</span>
          <span className="text-[9px]">Clients</span>
        </button>

        <button
          onClick={() => setCurrentView('booking')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentView === 'booking' ? 'text-[#9a3256] font-bold' : 'text-[#8C8394]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">storefront</span>
          <span className="text-[9px]">Booking</span>
        </button>
      </nav>

      {/* Modals & Overlays */}
      {showAddAppointmentModal && (
        <AddAppointmentModal
          stylists={stylists}
          onClose={() => setShowAddAppointmentModal(false)}
          onAdd={handleAddAppointment}
        />
      )}

      {receiptData && (
        <ReceiptModal
          activeClient={activeClient}
          items={receiptData.items}
          grandTotal={receiptData.grandTotal}
          paymentMethod={receiptData.paymentMethod}
          onClose={() => setReceiptData(null)}
        />
      )}

      {showStaffModal && (
        <StaffModal
          stylists={stylists}
          onClose={() => setShowStaffModal(false)}
          onUpdateUtilization={handleUpdateStylistUtilization}
        />
      )}

      {showInventoryModal && (
        <InventoryModal onClose={() => setShowInventoryModal(false)} />
      )}

      {showSettingsModal && (
        <SettingsModal onClose={() => setShowSettingsModal(false)} />
      )}

      {showNotificationsDrawer && (
        <NotificationsDrawer
          onClose={() => setShowNotificationsDrawer(false)}
          onClear={() => setUnreadNotificationsCount(0)}
        />
      )}
    </div>
  );
}
