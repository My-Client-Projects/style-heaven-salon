import React, { useState } from 'react';
import { Stylist } from '../types';

interface StaffModalProps {
  stylists: Stylist[];
  onClose: () => void;
  onUpdateUtilization: (stylistId: string, newUtil: number) => void;
}

export const StaffModal: React.FC<StaffModalProps> = ({
  stylists,
  onClose,
  onUpdateUtilization,
}) => {
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(stylists[0] || null);

  return (
    <div className="fixed inset-0 z-50 bg-[#241E2B]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full border border-[#E3DCE6] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E3DCE6] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#B94A6E]">badge</span>
            <h3 className="font-headline-sm text-base text-[#241E2B]">Staff Roster & Utilization</h3>
          </div>
          <button onClick={onClose} className="text-[#8C8394] hover:text-[#241E2B]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* List of Staff */}
          <div className="space-y-2">
            <p className="font-eyebrow text-[10px] text-[#8C8394] uppercase tracking-wider">
              STYLIST TEAM
            </p>
            {stylists.map((st) => (
              <div
                key={st.id}
                onClick={() => setSelectedStylist(st)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                  selectedStylist?.id === st.id
                    ? 'border-2 border-[#B94A6E] bg-[#F7EDF0]'
                    : 'border-[#E3DCE6] hover:bg-[#EFEBF2]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#241E2B] text-white flex items-center justify-center font-bold text-xs">
                  {st.avatarLetter}
                </div>
                <div>
                  <p className="font-bold text-xs text-[#241E2B]">{st.name}</p>
                  <p className="text-[10px] text-[#8C8394]">{st.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Staff Detail & Adjuster */}
          {selectedStylist && (
            <div className="md:col-span-2 bg-[#F7EDF0]/40 border border-[#E3DCE6] p-4 rounded-xl space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#B94A6E] text-white flex items-center justify-center font-headline-md text-lg">
                  {selectedStylist.avatarLetter}
                </div>
                <div>
                  <h4 className="font-headline-sm text-base text-[#241E2B]">{selectedStylist.name}</h4>
                  <p className="text-[#8C8394] font-bold">{selectedStylist.title}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#E3DCE6]">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#241E2B]">Shift Schedule</span>
                  <span className="text-[#7E9384] font-bold">08:30 AM - 05:30 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#241E2B]">Specialty</span>
                  <span className="text-[#5B5265]">Balayage & Color Correction</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#241E2B]">Current Utilization</span>
                  <span className="font-headline-sm text-sm text-[#9a3256]">{selectedStylist.utilization}%</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="block font-bold text-[#241E2B]">Adjust Utilization Rate</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={selectedStylist.utilization}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSelectedStylist({ ...selectedStylist, utilization: val });
                    onUpdateUtilization(selectedStylist.id, val);
                  }}
                  className="w-full accent-[#B94A6E]"
                />
              </div>
            </div>
          )}
        </div>

        <div className="text-right pt-2 border-t border-[#E3DCE6]">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#241E2B] text-white rounded-full font-bold text-xs"
          >
            Close Roster
          </button>
        </div>
      </div>
    </div>
  );
};
