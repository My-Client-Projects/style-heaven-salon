import React, { useState } from 'react';
import { ViewMode, Stylist, ServiceItem } from '../types';
import { SERVICE_ITEMS } from '../data/mockData';

interface PublicBookingViewProps {
  stylists: Stylist[];
  onNavigate: (view: ViewMode) => void;
  onBookingConfirmed: (serviceName: string, dateStr: string, timeStr: string, price: number, stylistName: string) => void;
}

export const PublicBookingView: React.FC<PublicBookingViewProps> = ({
  stylists,
  onNavigate,
  onBookingConfirmed,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICE_ITEMS[0]);
  const [selectedDate, setSelectedDate] = useState('Tue, Jul 28');
  const [selectedTime, setSelectedTime] = useState('11:30 AM');
  const [selectedStylist, setSelectedStylist] = useState('Nimali (Master Stylist)');
  const [clientName, setClientName] = useState('Amaya Silva');
  const [clientPhone, setClientPhone] = useState('+94 77 123 4567');
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const dates = [
    'Mon, Jul 27',
    'Tue, Jul 28',
    'Wed, Jul 29',
    'Thu, Jul 30',
    'Fri, Jul 31',
    'Sat, Aug 01',
  ];

  const timeSlots = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

  const handleConfirm = () => {
    onBookingConfirmed(
      selectedService.name,
      selectedDate,
      selectedTime,
      selectedService.price,
      selectedStylist
    );
    setIsSuccessModal(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 w-full transition-all">
      {/* Hero Visual Card Header */}
      <div className="relative rounded-2xl overflow-hidden h-64 md:h-72 ambient-shadow border border-[#E3DCE6]">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEvSY4GkHe7CU7fYEeQvrnkHuT_JOuR8E0d7sZsh4HNBO9H6Cofk-Y29YxppWhfWE6hbGcFobcOu4q1MmLs10MMzDCUvq67jZFMYynP8D7y_lHKF9jB0P-UAb4_fg9Tw62YoON5d_eWf7zL4X79u9Bgp0V6HbuQ4tkqRA_9AEvPyMWNLARkTKM6EV74nxn4SlfJD9Lav2XjcTfzSuvIryZ_8SXYRkkBdbyPY_XryxXy6HSv5Wmh8w"
          alt="Style Heaven Salon Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241E2B] via-[#241E2B]/50 to-transparent flex flex-col justify-end p-6 text-white">
          <p className="font-eyebrow text-xs text-[#E7C3D0] uppercase tracking-widest mb-1">
            ONLINE RESERVATIONS
          </p>
          <h1 className="font-headline-lg text-3xl md:text-4xl text-white">
            Book at Style Heaven
          </h1>
          <p className="font-body text-xs text-white/80 mt-1 max-w-md">
            Colombo's Premier Beauty & Hair Suite. Reserve your custom experience seamlessly.
          </p>
        </div>
      </div>

      {/* Digital Concierge Banner */}
      <div className="bg-[#FFFDFC] border border-[#E3DCE6] p-4 rounded-xl shadow-xs flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#B94A6E] shrink-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDELjAhWU4G57UL41avS3wG-g2f77pTrql2HRZwmCa29-HaqNcoYxvkjsHuKikn_xCqIdsu0et4rnVLtEjq20MzEsrDO1GnZcPvyT9hPnGzrVZ7cN7JJrEXSuGh2o4lzPGzB4yfr2wRvskHQplITNniB0aJzm52ubmQBFl6wQI6P9Sr2LZmfhyUl9pGkhHsIltufXhSyKzMcAqw8IBW1GBnWTVTs2i8bh-eVUzb2TX0I3hKwhKWEzE"
            alt="Digital Concierge"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="bg-[#F7EDF0] text-[#9a3256] text-[10px] font-bold px-2 py-0.5 rounded-full">
            Digital Concierge
          </span>
          <p className="font-body text-xs text-[#241E2B] mt-1 italic">
            "Hello! I can reserve your preferred stylist & luxury treatment in under 2 minutes."
          </p>
        </div>
      </div>

      {/* Step 1: Select Service */}
      <div className="bg-white border border-[#E3DCE6] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#E3DCE6] pb-3">
          <span className="w-6 h-6 rounded-full bg-[#241E2B] text-white flex items-center justify-center font-bold text-xs">
            1
          </span>
          <h3 className="font-headline-sm text-base text-[#241E2B]">Select Service</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SERVICE_ITEMS.map((srv) => {
            const isSelected = selectedService.id === srv.id;
            return (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                  isSelected
                    ? 'border-2 border-[#B94A6E] bg-[#F7EDF0]/50 shadow-xs'
                    : 'border-[#E3DCE6] hover:border-[#B94A6E]/50 bg-white'
                }`}
              >
                <div>
                  <h4 className="font-bold text-xs text-[#241E2B]">{srv.name}</h4>
                  <p className="font-tiny text-[11px] text-[#8C8394] mt-0.5">{srv.description}</p>
                  <p className="font-tiny text-[10px] text-[#B94A6E] font-bold mt-1">
                    {srv.durationMin > 0 ? `${srv.durationMin} mins` : 'Retail'}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-headline-sm text-sm text-[#241E2B]">
                    LKR {srv.price.toLocaleString()}
                  </span>
                  <div className="mt-1 flex justify-end">
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-[#B94A6E] bg-[#B94A6E]' : 'border-[#8C8394]'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 2: Select Date & Time */}
      <div className="bg-white border border-[#E3DCE6] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#E3DCE6] pb-3">
          <span className="w-6 h-6 rounded-full bg-[#241E2B] text-white flex items-center justify-center font-bold text-xs">
            2
          </span>
          <h3 className="font-headline-sm text-base text-[#241E2B]">Select Date & Time</h3>
        </div>

        {/* Dates Row */}
        <div>
          <label className="block text-xs font-bold text-[#8C8394] uppercase tracking-wider mb-2">
            Available Dates
          </label>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {dates.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDate(d)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedDate === d
                    ? 'bg-[#241E2B] text-white shadow-xs'
                    : 'bg-[#EFEBF2] text-[#5B5265] hover:bg-[#E3DCE6]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots Grid */}
        <div>
          <label className="block text-xs font-bold text-[#8C8394] uppercase tracking-wider mb-2">
            Preferred Time Slot
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {timeSlots.map((ts) => (
              <button
                key={ts}
                onClick={() => setSelectedTime(ts)}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                  selectedTime === ts
                    ? 'border-2 border-[#B94A6E] bg-[#F7EDF0] text-[#9a3256]'
                    : 'border-[#E3DCE6] bg-white text-[#5B5265] hover:border-[#B94A6E]'
                }`}
              >
                {ts}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step 3: Preferred Stylist & Guest Details */}
      <div className="bg-white border border-[#E3DCE6] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#E3DCE6] pb-3">
          <span className="w-6 h-6 rounded-full bg-[#241E2B] text-white flex items-center justify-center font-bold text-xs">
            3
          </span>
          <h3 className="font-headline-sm text-base text-[#241E2B]">Stylist & Guest Details</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#241E2B] mb-1">Preferred Stylist</label>
            <select
              value={selectedStylist}
              onChange={(e) => setSelectedStylist(e.target.value)}
              className="w-full p-2.5 border border-[#E3DCE6] rounded-lg text-xs font-bold bg-[#FFFDFC]"
            >
              <option value="Nimali (Master Stylist)">Nimali (Master Stylist)</option>
              <option value="Shanika (Senior Stylist)">Shanika (Senior Stylist)</option>
              <option value="Dilki (Color Expert)">Dilki (Color Expert)</option>
              <option value="Any Available Stylist">Any Available Stylist</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#241E2B] mb-1">Your Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full p-2.5 border border-[#E3DCE6] rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#241E2B] mb-1">Mobile Number</label>
            <input
              type="text"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full p-2.5 border border-[#E3DCE6] rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Cancellation Policy Banner */}
        <div className="p-3 bg-[#EFEBF2] rounded-lg border-l-4 border-[#8C8394] text-xs text-[#5B5265]">
          <span className="font-bold text-[#241E2B]">Cancellation Policy:</span> Cancellations made 24 hours prior to appointment carry no charge. A LKR 1,000 deposit holds your slot.
        </div>
      </div>

      {/* Bottom Sticky Total Investment & Confirm Bar */}
      <div className="sticky bottom-4 z-30 bg-[#241E2B] text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center">
        <div>
          <p className="text-[10px] text-white/70 uppercase tracking-wider font-tiny">TOTAL INVESTMENT</p>
          <p className="font-headline-md text-xl text-white">
            LKR {selectedService.price.toLocaleString()}
          </p>
        </div>

        <button
          onClick={handleConfirm}
          className="bg-[#B94A6E] text-white px-8 py-3 rounded-full font-headline-sm text-xs hover:bg-[#9a3256] transition-all active:scale-95 shadow-md flex items-center gap-2"
        >
          <span>Confirm Booking</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      {/* Success Modal */}
      {isSuccessModal && (
        <div className="fixed inset-0 z-50 bg-[#241E2B]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#E3DCE6] shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#7E9384]/20 text-[#7E9384] flex items-center justify-center mx-auto text-3xl">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div>
              <h3 className="font-headline-md text-xl text-[#241E2B]">Reservation Confirmed!</h3>
              <p className="text-xs text-[#5B5265] mt-1">
                Your appointment for <strong>{selectedService.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> has been added to the master calendar.
              </p>
            </div>

            <div className="p-3 bg-[#F7EDF0] rounded-xl text-xs text-[#9a3256] font-bold">
              SMS confirmation sent to {clientPhone}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsSuccessModal(false);
                  onNavigate('calendar');
                }}
                className="flex-1 py-2.5 bg-[#241E2B] text-white rounded-full font-bold text-xs"
              >
                Go to Calendar
              </button>
              <button
                onClick={() => setIsSuccessModal(false)}
                className="flex-1 py-2.5 border border-[#E3DCE6] text-[#241E2B] rounded-full font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
