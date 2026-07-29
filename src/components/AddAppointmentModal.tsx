import React, { useState } from 'react';
import { Stylist, Appointment } from '../types';
import { SERVICE_ITEMS } from '../data/mockData';

interface AddAppointmentModalProps {
  stylists: Stylist[];
  onClose: () => void;
  onAdd: (newApt: Appointment) => void;
}

export const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  stylists,
  onClose,
  onAdd,
}) => {
  const [clientName, setClientName] = useState('');
  const [service, setService] = useState(SERVICE_ITEMS[0].name);
  const [stylistId, setStylistId] = useState(stylists[0]?.id || 's1');
  const [startTime, setStartTime] = useState('11:00');
  const [endTime, setEndTime] = useState('12:00');
  const [tag, setTag] = useState('PINK');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    const matchedStylist = stylists.find((s) => s.id === stylistId);
    const matchedService = SERVICE_ITEMS.find((s) => s.name === service);

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      clientName,
      service,
      stylistId,
      stylistName: matchedStylist?.name || 'Nimali',
      startTime,
      endTime,
      tag,
      tagColor: tag === 'NAILS' ? 'sage' : tag === 'BRIDAL' ? 'brass' : 'bloom',
      price: matchedService?.price || 5000,
      status: 'Scheduled',
      date: 'Tuesday, 28 July',
    };

    onAdd(newApt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#241E2B]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-[#E3DCE6] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E3DCE6] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#B94A6E]">event</span>
            <h3 className="font-headline-sm text-base text-[#241E2B]">New Appointment</h3>
          </div>
          <button onClick={onClose} className="text-[#8C8394] hover:text-[#241E2B]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-[#241E2B] mb-1">Client Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Maya Lin"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full p-2.5 border border-[#E3DCE6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B94A6E]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#241E2B] mb-1">Service Treatment</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full p-2.5 border border-[#E3DCE6] rounded-lg bg-white"
            >
              {SERVICE_ITEMS.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} (Rs {s.price.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#241E2B] mb-1">Stylist</label>
              <select
                value={stylistId}
                onChange={(e) => setStylistId(e.target.value)}
                className="w-full p-2.5 border border-[#E3DCE6] rounded-lg bg-white"
              >
                {stylists.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.title})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#241E2B] mb-1">Category Tag</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full p-2.5 border border-[#E3DCE6] rounded-lg bg-white"
              >
                <option value="PINK">PINK (Hair/Colour)</option>
                <option value="NAILS">NAILS (Manicure/Pedicure)</option>
                <option value="BRIDAL">BRIDAL (Trial/Makeup)</option>
                <option value="TRIM">TRIM (Quick Styling)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#241E2B] mb-1">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2.5 border border-[#E3DCE6] rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-[#241E2B] mb-1">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2.5 border border-[#E3DCE6] rounded-lg"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#E3DCE6] rounded-full font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#B94A6E] text-white rounded-full font-bold text-xs hover:bg-[#9a3256]"
            >
              Save Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
