import React, { useState } from 'react';
import { ViewMode, Client, Appointment } from '../types';

interface DashboardViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectClient: (client: Client) => void;
  appointments: Appointment[];
  clients: Client[];
  todayRevenue: number;
  onConfirmAllBookings: () => void;
  onOrderStock: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onSelectClient,
  appointments,
  clients,
  todayRevenue,
  onConfirmAllBookings,
  onOrderStock,
}) => {
  const [onlineBookingsCount, setOnlineBookingsCount] = useState(4);
  const [confirmedMessage, setConfirmedMessage] = useState<string | null>(null);
  const [tipIndex, setTipIndex] = useState(0);

  const staffTips = [
    "Amaya likes extra tea tree oil during her rinse. It's noted in her profile.",
    "David prefers a matte finish styling clay and an espresso during consults.",
    "Rashmi is sensitive to ammonia; always use 20vol organic developer.",
    "Recommend Silk Hair Mask retail item for clients undergoing Balayage.",
  ];

  const handleConfirmAll = () => {
    setOnlineBookingsCount(0);
    setConfirmedMessage('All 4 online bookings have been confirmed & scheduled!');
    onConfirmAllBookings();
    setTimeout(() => setConfirmedMessage(null), 4000);
  };

  const nextUpClients = [
    {
      initials: 'AS',
      name: 'Amaya Silva',
      service: 'Balayage • 10:30 AM',
      status: 'In chair',
      statusBg: 'bg-[#E7C3D0]/30 text-[#9a3256]',
      clientId: 'c1',
    },
    {
      initials: 'RP',
      name: 'Rashmi Perera',
      service: 'Gel manicure • 11:15 AM',
      status: 'Arrived',
      statusBg: 'bg-[#7E9384]/20 text-[#7E9384]',
      clientId: 'c3',
    },
    {
      initials: 'KD',
      name: 'Kasuni de Alwis',
      service: 'Root Touch-up • 12:45 PM',
      status: 'Booked',
      statusBg: 'bg-[#B08D3F]/20 text-[#B08D3F]',
      clientId: 'c1',
    },
    {
      initials: 'MJ',
      name: 'Minuri Jayasinghe',
      service: 'Full Pedicure • 01:30 PM',
      status: 'Booked',
      statusBg: 'bg-[#B08D3F]/20 text-[#B08D3F]',
      clientId: 'c1',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 md:ml-64 w-[calc(100%-16rem)] max-md:ml-0 max-md:w-full transition-all">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-headline-lg text-2xl md:text-3xl text-[#241E2B]">
            Good morning, Nimali.
          </h2>
          <p className="font-lede text-[#8C8394] text-sm mt-1">
            Here's how your salon is performing today, Monday, Oct 23rd.
          </p>
        </div>

        <button
          onClick={() => onNavigate('billing')}
          className="bg-[#241E2B] text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold text-xs hover:bg-[#5B5265] transition-all ambient-shadow group active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">add_card</span>
          <span>+ New Bill</span>
        </button>
      </section>

      {/* Confirmation Banner if active */}
      {confirmedMessage && (
        <div className="bg-[#d2e8d7] border border-[#7E9384] text-[#0d1f15] px-4 py-3 rounded-xl flex items-center justify-between text-xs font-bold animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>{confirmedMessage}</span>
          </div>
          <button onClick={() => setConfirmedMessage(null)} className="text-[#0d1f15] hover:opacity-70">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Bento Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Today's Revenue */}
        <div className="md:col-span-2 bg-white rounded-xl p-5 border border-[#E3DCE6] ambient-shadow flex flex-col justify-between relative overflow-hidden group">
          <div className="z-10">
            <span className="font-eyebrow text-[#8C8394]">TODAY'S REVENUE</span>
            <div className="flex items-baseline gap-2 mt-2">
              <h3 className="font-headline-md text-2xl text-[#241E2B]">
                Rs. {todayRevenue.toLocaleString()}
              </h3>
              <span className="text-[#7E9384] font-tiny text-xs font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                6 bills settled
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between z-10">
            <div className="h-10 w-full flex items-end gap-1 px-1">
              {/* Sparkline bars */}
              <div className="bg-[#EFEBF2] w-1/6 h-[25%]" title="8am: Rs 3,500"></div>
              <div className="bg-[#EFEBF2] w-1/6 h-[45%]" title="9am: Rs 6,200"></div>
              <div className="bg-[#E7C3D0] w-1/6 h-[85%]" title="10am: Rs 12,000"></div>
              <div className="bg-[#B94A6E] w-1/6 h-[65%]" title="11am: Rs 9,500"></div>
              <div className="bg-[#EFEBF2] w-1/6 h-[35%]" title="12pm: Rs 4,500"></div>
            </div>
          </div>

          <div className="absolute top-2 right-2 p-3 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-7xl text-[#241E2B]">payments</span>
          </div>
        </div>

        {/* Yesterday Comparison */}
        <div className="bg-white rounded-xl p-5 border border-[#E3DCE6] ambient-shadow flex flex-col justify-between">
          <div>
            <span className="font-eyebrow text-[#8C8394]">YESTERDAY</span>
            <h3 className="font-headline-sm text-lg text-[#241E2B] mt-1.5">
              Rs. 61,200
            </h3>
            <p className="font-tiny text-xs text-[#7E9384] font-bold mt-0.5">
              +12% vs last Mon
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E3DCE6]/60">
            <p className="font-tiny text-xs text-[#5B5265]">
              Performance is peaking during afternoon slots.
            </p>
          </div>
        </div>

        {/* Bookings & No Shows */}
        <div className="bg-white rounded-xl p-5 border border-[#E3DCE6] ambient-shadow flex flex-col justify-between">
          <div>
            <span className="font-eyebrow text-[#8C8394]">BOOKINGS</span>
            <div className="flex items-center gap-3 mt-1.5">
              <h3 className="font-headline-sm text-lg text-[#241E2B]">{appointments.length}</h3>
              <span className="font-tiny text-xs text-[#5B5265]">Today</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2.5">
            <div className="p-1.5 bg-[#ffdad6] rounded-lg">
              <span className="material-symbols-outlined text-[#ba1a1a] text-lg">event_busy</span>
            </div>
            <div>
              <p className="font-tiny text-xs font-bold text-[#ba1a1a]">3 No-shows</p>
              <p className="text-[10px] text-[#8C8394]">This week</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Panels */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Up Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E3DCE6] ambient-shadow overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 border-b border-[#E3DCE6] flex justify-between items-center bg-[#F7EDF0]/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#B94A6E] text-lg">schedule</span>
              <h4 className="font-ui-header text-sm text-[#241E2B]">Next Up</h4>
            </div>
            <button
              onClick={() => onNavigate('calendar')}
              className="font-tiny text-xs text-[#B94A6E] font-bold hover:underline"
            >
              View Calendar
            </button>
          </div>

          <div className="divide-y divide-[#E3DCE6]">
            {nextUpClients.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  const matched = clients.find((c) => c.name === item.name);
                  if (matched) {
                    onSelectClient(matched);
                    onNavigate('clients');
                  }
                }}
                className="px-5 py-3.5 flex items-center justify-between hover:bg-[#EFEBF2]/40 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#E7C3D0]/20 flex items-center justify-center text-[#B94A6E] font-bold text-xs">
                    {item.initials}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#241E2B] group-hover:text-[#B94A6E] transition-colors">
                      {item.name}
                    </p>
                    <p className="font-tiny text-[11px] text-[#5B5265]">{item.service}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-0.5 rounded-full font-tiny text-[10px] font-bold ${item.statusBg}`}>
                    {item.status}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('billing');
                    }}
                    className="material-symbols-outlined text-[#8C8394] hover:text-[#241E2B] opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Bill Client"
                  >
                    payments
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Stack: Needs Attention + Staff Tip */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-[#E3DCE6] ambient-shadow p-5 space-y-3.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#ba1a1a]">priority_high</span>
              <h4 className="font-ui-header text-sm text-[#241E2B]">Needs Attention</h4>
            </div>

            {/* Confirmation Alert */}
            <div className="p-3 bg-[#F7EDF0]/60 rounded-lg border-l-4 border-[#B94A6E]">
              <p className="font-tiny text-xs font-bold text-[#241E2B]">
                {onlineBookingsCount} Online Bookings
              </p>
              <p className="font-tiny text-[11px] text-[#5B5265] mb-1.5">
                {onlineBookingsCount > 0 ? 'Waiting for confirmation' : 'All bookings confirmed!'}
              </p>
              {onlineBookingsCount > 0 && (
                <button
                  onClick={handleConfirmAll}
                  className="font-tiny text-xs font-bold text-[#B94A6E] underline hover:text-[#9a3256]"
                >
                  Confirm all
                </button>
              )}
            </div>

            {/* Inventory Alert */}
            <div className="p-3 bg-[#ffdad6]/30 rounded-lg border-l-4 border-[#ba1a1a]">
              <p className="font-tiny text-xs font-bold text-[#241E2B]">
                Low Stock: Keratin Serum
              </p>
              <p className="font-tiny text-[11px] text-[#5B5265] mb-1.5">
                2 units remaining (Threshold: 5)
              </p>
              <button
                onClick={onOrderStock}
                className="font-tiny text-xs font-bold text-[#ba1a1a] underline hover:opacity-80"
              >
                Order now
              </button>
            </div>

            {/* Unpaid Bills Alert */}
            <div className="p-3 bg-[#B08D3F]/10 rounded-lg border-l-4 border-[#B08D3F]">
              <p className="font-tiny text-xs font-bold text-[#241E2B]">Unpaid Bills (2)</p>
              <p className="font-tiny text-[11px] text-[#5B5265] mb-1.5">
                From Saturday session
              </p>
              <button
                onClick={() => onNavigate('billing')}
                className="font-tiny text-xs font-bold text-[#B08D3F] underline hover:opacity-80"
              >
                View details
              </button>
            </div>
          </div>

          {/* Quick Insights / Atmospheric Card */}
          <div className="relative rounded-xl overflow-hidden h-44 ambient-shadow group cursor-pointer"
               onClick={() => setTipIndex((prev) => (prev + 1) % staffTips.length)}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0_vFASHZ8Ln1-c5S92cK64a6K2J63xjx3cw-2imlH7DwYVrFmrfvcmlEW0ELyvu21iQTDPYNJrmlPMq65qqEtEgVr8f4A5R3WlNE_TrzSyj9eFUUo9pQ8hQ2uIpHGt9dfeffzViFx8tusOjjvhZuLCnLa0z3_f9Dp-t7SLGp9xi_vbLORZbQudTZmFhVE7wUnrSeXxdgx4WtyW8Ydi8f1lureVbyuen_dS968sRUSuCAjKt7ZLmw"
              alt="Salon products"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241E2B]/90 via-[#241E2B]/40 to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center justify-between">
                <h5 className="text-white font-headline-sm text-sm">Staff Tip</h5>
                <span className="text-[10px] text-white/70 font-tiny">Click to cycle</span>
              </div>
              <p className="text-white/90 font-tiny text-xs italic mt-1">
                "{staffTips[tipIndex]}"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
