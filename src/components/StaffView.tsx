import React, { useState } from 'react';
import { Stylist } from '../types';

interface StaffViewProps {
  stylists: Stylist[];
  onUpdateUtilization: (stylistId: string, newUtil: number) => void;
}

export const StaffView: React.FC<StaffViewProps> = ({
  stylists,
  onUpdateUtilization,
}) => {
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(stylists[0] || null);

  const activeChairClients: Record<string, string> = {
    'st-1': 'Minoli Alwis (Full Foil & Toning)',
    'st-2': 'Amaya Silva (Balayage & Blowdry)',
    'st-3': 'Dinithi Perera (Gel Polish Refill)',
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-[#F7EDF0] p-6 rounded-2xl border border-[#E3DCE6] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-sm text-xl text-[#241E2B] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#B94A6E]">badge</span>
            Staff Roster & Performance
          </h2>
          <p className="text-xs text-[#5B5265] mt-1">
            Monitor stylist chair utilization, shift attendance, active clients, and daily commission targets.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white rounded-xl border border-[#E3DCE6] text-center shadow-xs">
            <span className="text-[10px] uppercase font-eyebrow text-[#8C8394] block">Average Utilization</span>
            <span className="font-headline-sm text-sm font-bold text-[#B94A6E]">
              {Math.round(stylists.reduce((acc, s) => acc + s.utilization, 0) / stylists.length)}%
            </span>
          </div>
        </div>
      </div>

      {/* Main Staff Grid & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stylist Cards List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-headline-sm text-sm text-[#241E2B] uppercase tracking-wider font-eyebrow">
            Active Team Members ({stylists.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stylists.map((s) => {
              const activeClient = activeChairClients[s.id] || 'Available for Walk-ins';
              const isSelected = selectedStylist?.id === s.id;

              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedStylist(s)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#B94A6E] shadow-md ring-2 ring-[#B94A6E]/20'
                      : 'bg-white border-[#E3DCE6] hover:border-[#B94A6E]/50 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-xs"
                        style={{ backgroundColor: s.colorTag }}
                      >
                        {s.avatarLetter}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#241E2B]">{s.name}</h4>
                        <p className="text-xs text-[#8C8394]">{s.title}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#d2e8d7] text-[#0d1f15] font-bold text-[10px] rounded-full">
                      In Salon
                    </span>
                  </div>

                  {/* Utilization Progress Bar */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#5B5265]">Shift Load</span>
                      <span className="text-[#B94A6E]">{s.utilization}%</span>
                    </div>
                    <div className="w-full bg-[#EFEBF2] h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#B94A6E] transition-all duration-500 rounded-full"
                        style={{ width: `${s.utilization}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Active Client Info */}
                  <div className="mt-4 pt-3 border-t border-[#E3DCE6] flex items-center gap-2 text-xs text-[#5B5265]">
                    <span className="material-symbols-outlined text-sm text-[#B94A6E]">chair</span>
                    <span className="truncate">{activeClient}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stylist Details Panel */}
        <div className="bg-white p-6 rounded-2xl border border-[#E3DCE6] shadow-xs space-y-5 h-fit">
          {selectedStylist ? (
            <>
              <div className="flex items-center gap-3 border-b border-[#E3DCE6] pb-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-md"
                  style={{ backgroundColor: selectedStylist.colorTag }}
                >
                  {selectedStylist.avatarLetter}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#241E2B]">{selectedStylist.name}</h3>
                  <p className="text-xs text-[#8C8394]">{selectedStylist.title}</p>
                  <p className="text-[10px] text-[#7E9384] font-bold mt-0.5">Specialist • Senior Level</p>
                </div>
              </div>

              {/* Adjust Utilization */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#241E2B]">
                  Adjust Shift Utilization ({selectedStylist.utilization}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedStylist.utilization}
                  onChange={(e) => {
                    const newVal = Number(e.target.value);
                    onUpdateUtilization(selectedStylist.id, newVal);
                    setSelectedStylist({ ...selectedStylist, utilization: newVal });
                  }}
                  className="w-full accent-[#B94A6E] cursor-pointer"
                />
                <p className="text-[10px] text-[#8C8394]">
                  Controls available booking slots for this stylist on the online portal and calendar.
                </p>
              </div>

              {/* Daily Performance Metrics */}
              <div className="space-y-3 pt-2">
                <h4 className="font-eyebrow text-[10px] uppercase text-[#8C8394]">Today's Performance</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-[#EFEBF2] rounded-xl">
                    <span className="text-[#8C8394] block text-[10px]">Completed</span>
                    <span className="font-bold text-[#241E2B]">5 Clients</span>
                  </div>
                  <div className="p-3 bg-[#EFEBF2] rounded-xl">
                    <span className="text-[#8C8394] block text-[10px]">Commission</span>
                    <span className="font-bold text-[#9a3256]">Rs 4,250</span>
                  </div>
                  <div className="p-3 bg-[#EFEBF2] rounded-xl">
                    <span className="text-[#8C8394] block text-[10px]">Rating</span>
                    <span className="font-bold text-[#241E2B]">4.9 ⭐</span>
                  </div>
                  <div className="p-3 bg-[#EFEBF2] rounded-xl">
                    <span className="text-[#8C8394] block text-[10px]">Shift Hours</span>
                    <span className="font-bold text-[#241E2B]">08:30 - 17:30</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E3DCE6] flex gap-2">
                <button
                  onClick={() => alert(`Message sent to ${selectedStylist.name}`)}
                  className="flex-1 py-2 bg-[#241E2B] text-white rounded-full text-xs font-bold hover:bg-[#B94A6E] transition-colors"
                >
                  Send Message
                </button>
              </div>
            </>
          ) : (
            <p className="text-xs text-[#8C8394] text-center">Select a staff member to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};
