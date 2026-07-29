import React, { useState } from 'react';
import { ViewMode, Client } from '../types';

interface ClientsViewProps {
  clients: Client[];
  activeClient: Client;
  onSelectClient: (client: Client) => void;
  onNavigate: (view: ViewMode) => void;
  onOpenNewAppointment: () => void;
  onEditClientProfile: (client: Client) => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  activeClient,
  onSelectClient,
  onNavigate,
  onOpenNewAppointment,
  onEditClientProfile,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<{ title: string; url: string } | null>(null);
  const [showFormulaArchive, setShowFormulaArchive] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 md:ml-64 w-[calc(100%-16rem)] max-md:ml-0 max-md:w-full transition-all">
      {/* Top Client Switcher Pills */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
        <span className="text-xs font-bold text-[#8C8394] uppercase tracking-wider mr-2">Clients:</span>
        {clients.map((c) => {
          const isSelected = c.id === activeClient.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelectClient(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#241E2B] text-[#FFFDFC] shadow-xs'
                  : 'bg-[#EFEBF2] text-[#5B5265] hover:bg-[#E3DCE6]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#E7C3D0] text-[#9a3256] text-[10px] flex items-center justify-center font-bold">
                {c.initials}
              </span>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Client Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-2 border-b border-[#E3DCE6]/60">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#F7EDF0] flex items-center justify-center text-[#9a3256] font-headline-md text-2xl md:text-3xl border border-[#E7C3D0]/50 shadow-xs">
            {activeClient.initials}
          </div>
          <div>
            <h2 className="font-headline-lg text-2xl md:text-3xl text-[#241E2B] mb-0.5">
              {activeClient.name}
            </h2>
            <p className="font-body text-xs text-[#8C8394] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              <span>Client since {activeClient.clientSince}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={() => onEditClientProfile(activeClient)}
            className="bg-white border border-[#E3DCE6] px-5 py-2 rounded-full font-bold text-xs text-[#241E2B] hover:bg-[#EFEBF2] transition-colors flex items-center gap-1.5 active:scale-95 shadow-xs"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => onNavigate('billing')}
            className="bg-[#241E2B] text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-[#9a3256] transition-colors flex items-center gap-1.5 active:scale-95 shadow-xs"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Row (Full Width) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E3DCE6] rounded-xl p-4 custom-shadow flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#EFEBF2] flex items-center justify-center text-[#5B5265]">
            <span className="material-symbols-outlined">event_available</span>
          </div>
          <div>
            <p className="font-eyebrow text-[#8C8394] text-[10px]">VISITS</p>
            <p className="font-headline-sm text-lg text-[#241E2B]">{activeClient.visits}</p>
          </div>
        </div>

        <div className="bg-white border border-[#E3DCE6] rounded-xl p-4 custom-shadow flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#F7EDF0] flex items-center justify-center text-[#9a3256]">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div>
            <p className="font-eyebrow text-[#8C8394] text-[10px]">SPENT</p>
            <p className="font-headline-sm text-lg text-[#241E2B]">Rs {activeClient.spent.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white border border-[#E3DCE6] rounded-xl p-4 custom-shadow flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#d2e8d7] flex items-center justify-center text-[#495c4f]">
            <span className="material-symbols-outlined">card_membership</span>
          </div>
          <div>
            <p className="font-eyebrow text-[#8C8394] text-[10px]">LOYALTY POINTS</p>
            <p className="font-headline-sm text-lg text-[#241E2B]">{activeClient.loyaltyPoints.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: History & Gallery (col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Visit History Table */}
          <div className="bg-white border border-[#E3DCE6] rounded-xl custom-shadow overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#E3DCE6] flex justify-between items-center bg-[#FFFDFC]">
              <h3 className="font-ui-header text-sm text-[#241E2B]">Visit History</h3>
              <button 
                onClick={() => alert(`Full history containing ${activeClient.visitHistory.length} recorded appointments.`)}
                className="text-[#B94A6E] font-bold text-xs hover:underline"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-xs">
                <thead className="bg-[#EFEBF2]/60">
                  <tr>
                    <th className="px-5 py-2.5 font-eyebrow text-[10px] text-[#8C8394]">DATE</th>
                    <th className="px-5 py-2.5 font-eyebrow text-[10px] text-[#8C8394]">SERVICE</th>
                    <th className="px-5 py-2.5 font-eyebrow text-[10px] text-[#8C8394]">STYLIST</th>
                    <th className="px-5 py-2.5 font-eyebrow text-[10px] text-[#8C8394]">AMOUNT</th>
                    <th className="px-5 py-2.5 font-eyebrow text-[10px] text-[#8C8394]">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3DCE6]">
                  {activeClient.visitHistory.map((rec) => (
                    <tr key={rec.id} className="hover:bg-[#EFEBF2]/40 transition-colors cursor-pointer">
                      <td className="px-5 py-3.5 text-[#241E2B]">{rec.date}</td>
                      <td className="px-5 py-3.5 text-[#241E2B] font-bold">{rec.service}</td>
                      <td className="px-5 py-3.5 text-[#5B5265]">{rec.stylist}</td>
                      <td className="px-5 py-3.5 text-[#241E2B] font-bold">Rs {rec.amount.toLocaleString()}</td>
                      <td className="px-5 py-3.5">
                        <span className="bg-[#7E9384]/15 text-[#7E9384] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          {rec.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hair Photo Gallery */}
          {activeClient.photos && activeClient.photos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeClient.photos.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPhoto(p)}
                  className="relative rounded-xl overflow-hidden h-56 group border border-[#E3DCE6] cursor-pointer custom-shadow"
                >
                  <img
                    src={p.url}
                    alt={p.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241E2B]/70 via-transparent to-transparent flex items-end p-4">
                    <p className="text-white text-xs font-bold drop-shadow-sm flex items-center justify-between w-full">
                      <span>{p.title}</span>
                      <span className="material-symbols-outlined text-sm opacity-80 group-hover:opacity-100">fullscreen</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Preferences, Formulas & Contact (col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Preferences Card */}
          <div className="bg-[#F7EDF0]/40 border border-[#E3DCE6] rounded-xl p-5 custom-shadow">
            <h3 className="font-ui-header text-sm text-[#241E2B] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9a3256]">favorite</span>
              <span>Preferences</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8C8394] text-base mt-0.5">person</span>
                <div>
                  <p className="font-bold text-[#241E2B]">Preferred Stylist</p>
                  <p className="text-[#5B5265]">{activeClient.preferences.preferredStylist}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8C8394] text-base mt-0.5">schedule</span>
                <div>
                  <p className="font-bold text-[#241E2B]">Preferred Time</p>
                  <p className="text-[#5B5265]">{activeClient.preferences.preferredTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8C8394] text-base mt-0.5">local_cafe</span>
                <div>
                  <p className="font-bold text-[#241E2B]">Drink Choice</p>
                  <p className="text-[#5B5265]">{activeClient.preferences.drinkChoice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes & Formulas Card */}
          <div className="bg-white border-2 border-[#241E2B] rounded-xl p-5 custom-shadow relative pt-6">
            <div className="absolute -top-3 left-5 bg-[#241E2B] text-white text-[9px] px-3 py-0.5 rounded-full uppercase tracking-widest font-bold">
              Formulas
            </div>

            <h3 className="font-ui-header text-sm text-[#241E2B] mb-3">Notes & Formulas</h3>

            <div className="space-y-4">
              {/* Sensitive scalp alert highlight box */}
              <div className="p-3 bg-[#EFEBF2] rounded-lg border-l-4 border-[#B94A6E]">
                <p className="font-body text-xs text-[#241E2B] italic leading-relaxed">
                  "{activeClient.formulas.note}"
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="font-tiny text-[10px] font-bold text-[#8C8394] uppercase tracking-wide">
                  Last Formula ({activeClient.formulas.lastFormulaName})
                </p>
                <div className="bg-[#FFFDFC] border border-[#E3DCE6] rounded p-2.5 text-xs">
                  <p className="text-[#241E2B]">
                    <span className="text-[#B94A6E] font-bold">Color:</span> {activeClient.formulas.colorCode}
                  </p>
                  <p className="text-[#241E2B] mt-0.5">
                    <span className="text-[#B94A6E] font-bold">Time:</span> {activeClient.formulas.processingTime}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowFormulaArchive(!showFormulaArchive)}
                className="w-full py-2 border border-[#E3DCE6] rounded-lg font-tiny text-xs font-bold text-[#241E2B] hover:bg-[#EFEBF2] transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">history_edu</span>
                <span>{showFormulaArchive ? 'Hide Formula Archive' : 'View Formula Archive'}</span>
              </button>

              {showFormulaArchive && (
                <div className="p-3 bg-[#F7EDF0] rounded-lg text-xs space-y-2 border border-[#E7C3D0] animate-fadeIn">
                  <p className="font-bold text-[#9a3256]">Formula History Archive:</p>
                  <div className="border-b border-[#E3DCE6] pb-1">
                    <p className="font-bold text-[#241E2B]">Sep 05, 2024 - Root Touch-up</p>
                    <p className="text-[11px] text-[#5B5265]">7.0 Natural Brown + 20vol organic developer (30 mins)</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#241E2B]">Jul 28, 2024 - Full Highlights</p>
                    <p className="text-[11px] text-[#5B5265]">Clay lightener + 9.12 Pearl Gloss Toner (40 mins)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="bg-white border border-[#E3DCE6] rounded-xl p-5 custom-shadow">
            <h3 className="font-ui-header text-sm text-[#241E2B] mb-3">Contact Info</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-[#E3DCE6]/60 pb-2">
                <p className="text-[#8C8394]">Phone</p>
                <p className="text-[#241E2B] font-bold">{activeClient.phone}</p>
              </div>
              <div className="flex justify-between items-center border-b border-[#E3DCE6]/60 pb-2">
                <p className="text-[#8C8394]">Email</p>
                <p className="text-[#241E2B] font-bold truncate max-w-[170px]">{activeClient.email}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[#8C8394]">Last Appt</p>
                <p className="text-[#241E2B] font-bold">{activeClient.lastApptAgo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-[#241E2B]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-[#FFFDFC] rounded-2xl p-4 max-w-2xl w-full border border-[#E3DCE6] shadow-2xl relative space-y-3"
          >
            <div className="flex justify-between items-center border-b border-[#E3DCE6] pb-2">
              <h4 className="font-ui-header text-sm text-[#241E2B]">{selectedPhoto.title}</h4>
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="text-[#8C8394] hover:text-[#241E2B] p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="h-96 rounded-xl overflow-hidden bg-[#241E2B]">
              <img src={selectedPhoto.url} alt={selectedPhoto.title} className="w-full h-full object-contain" />
            </div>
            <div className="text-right">
              <button 
                onClick={() => setSelectedPhoto(null)} 
                className="bg-[#241E2B] text-white px-4 py-1.5 rounded-full text-xs font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
