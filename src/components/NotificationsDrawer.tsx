import React from 'react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  icon: string;
  type: 'booking' | 'stock' | 'payment';
}

interface NotificationsDrawerProps {
  onClose: () => void;
  onClear: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  onClose,
  onClear,
}) => {
  const notifications: NotificationItem[] = [
    {
      id: 'n-1',
      title: 'New Online Booking',
      desc: 'Amaya Silva booked Balayage + Styling for Tue, Jul 28.',
      time: '10 mins ago',
      icon: 'event',
      type: 'booking',
    },
    {
      id: 'n-2',
      title: 'Low Stock Alert',
      desc: 'Keratin Serum (50ml) reached threshold (2 units remaining).',
      time: '1 hour ago',
      icon: 'inventory_2',
      type: 'stock',
    },
    {
      id: 'n-3',
      title: 'Settlement Received',
      desc: 'Bill #SH-2026-8812 settled (Rs 13,775 via Card).',
      time: '2 hours ago',
      icon: 'payments',
      type: 'payment',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#241E2B]/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-sm h-full shadow-2xl p-5 flex flex-col space-y-4 border-l border-[#E3DCE6]">
        <div className="flex justify-between items-center border-b border-[#E3DCE6] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#B94A6E]">notifications</span>
            <h3 className="font-headline-sm text-base text-[#241E2B]">Notifications</h3>
          </div>
          <button onClick={onClose} className="text-[#8C8394] hover:text-[#241E2B]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3.5 rounded-xl border border-[#E3DCE6] bg-[#FFFDFC] hover:bg-[#F7EDF0]/50 transition-colors space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#241E2B] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#B94A6E]">{n.icon}</span>
                  <span>{n.title}</span>
                </span>
                <span className="text-[10px] text-[#8C8394]">{n.time}</span>
              </div>
              <p className="text-xs text-[#5B5265] pl-5">{n.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-[#E3DCE6] flex gap-2">
          <button
            onClick={onClear}
            className="flex-1 py-2 border border-[#E3DCE6] rounded-full text-xs font-bold text-[#8C8394] hover:bg-[#EFEBF2]"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-[#241E2B] text-white rounded-full text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
