import React, { useState } from 'react';
import { ViewMode, Appointment, Stylist } from '../types';

interface CalendarViewProps {
  onNavigate: (view: ViewMode) => void;
  appointments: Appointment[];
  stylists: Stylist[];
  onOpenAddAppointment: () => void;
  onSelectAppointment: (apt: Appointment) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  onNavigate,
  appointments,
  stylists,
  onOpenAddAppointment,
  onSelectAppointment,
}) => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('day');
  const [currentDateString, setCurrentDateString] = useState('Tuesday, 28 July');

  // Helper to compute top position & height for 80px per hour grid (09:00 start)
  const getSlotStyle = (startTime: string, endTime: string) => {
    const startParts = startTime.split(':').map(Number);
    const endParts = endTime.split(':').map(Number);

    const startMinutesFrom9 = (startParts[0] - 9) * 60 + startParts[1];
    const endMinutesFrom9 = (endParts[0] - 9) * 60 + endParts[1];

    const topPx = (startMinutesFrom9 / 60) * 80;
    const heightPx = Math.max(((endMinutesFrom9 - startMinutesFrom9) / 60) * 80, 70);

    return {
      top: `${topPx}px`,
      height: `${heightPx}px`,
    };
  };

  const timeHours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 md:ml-64 w-[calc(100%-16rem)] max-md:ml-0 max-md:w-full transition-all">
      {/* Calendar Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div>
          <p className="font-eyebrow text-xs text-[#B94A6E] mb-1 uppercase tracking-widest">
            Daily Schedule
          </p>
          <h1 className="font-headline-md text-2xl md:text-3xl text-[#241E2B]">
            {currentDateString}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode toggle */}
          <div className="flex p-1 bg-[#EFEBF2] rounded-lg border border-[#E3DCE6]">
            <button
              onClick={() => setTimeframe('day')}
              className={`px-3 py-1.5 font-bold text-xs rounded transition-all ${
                timeframe === 'day' ? 'bg-[#FFFDFC] text-[#241E2B] shadow-xs' : 'text-[#5B5265]'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setTimeframe('week')}
              className={`px-3 py-1.5 font-bold text-xs rounded transition-all ${
                timeframe === 'week' ? 'bg-[#FFFDFC] text-[#241E2B] shadow-xs' : 'text-[#5B5265]'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1.5 font-bold text-xs rounded transition-all ${
                timeframe === 'month' ? 'bg-[#FFFDFC] text-[#241E2B] shadow-xs' : 'text-[#5B5265]'
              }`}
            >
              Month
            </button>
          </div>

          <button
            onClick={onOpenAddAppointment}
            className="bg-[#B94A6E] text-[#FFFDFC] px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>+ Add appointment</span>
          </button>
        </div>
      </div>

      {/* Stylist Columns Header */}
      <div className="grid grid-cols-[80px_repeat(3,1fr)] border-b border-[#E3DCE6] bg-white/70 backdrop-blur shadow-xs rounded-t-xl overflow-hidden">
        <div className="flex items-center justify-center p-3 border-r border-[#E3DCE6] text-[#8C8394] font-eyebrow text-[10px]">
          TIME
        </div>

        {stylists.map((st) => (
          <div key={st.id} className="p-3 flex items-center gap-2.5 border-r border-[#E3DCE6] last:border-r-0">
            <div className={`w-9 h-9 rounded-full bg-[#F7EDF0] border border-[#E7C3D0] flex items-center justify-center font-bold text-xs text-[#9a3256]`}>
              {st.avatarLetter}
            </div>
            <div>
              <p className="font-ui-header text-xs text-[#241E2B]">{st.name}</p>
              <p className="text-[10px] text-[#8C8394] uppercase font-bold">{st.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar View Body Grid */}
      <div className="bg-white border-x border-b border-[#E3DCE6] rounded-b-xl overflow-hidden shadow-xs relative">
        <div className="relative min-h-[560px]">
          {/* Time Hour Rows */}
          {timeHours.map((hour, idx) => (
            <div
              key={idx}
              className="relative flex items-center justify-center h-[80px] text-xs font-bold text-[#8C8394] border-r border-b border-[#E3DCE6]/60 w-[80px]"
            >
              {hour}
            </div>
          ))}

          {/* Column Dividers Background */}
          <div className="absolute inset-0 grid grid-cols-[80px_repeat(3,1fr)] pointer-events-none">
            <div className="border-r border-[#E3DCE6]"></div>
            <div className="border-r border-[#E3DCE6]/40"></div>
            <div className="border-r border-[#E3DCE6]/40"></div>
            <div></div>
          </div>

          {/* Current Time Indicator Line (e.g. at 10:15 = 100px from top) */}
          <div className="absolute top-[100px] left-[80px] right-0 h-[2px] bg-[#B94A6E] z-20 pointer-events-none">
            <div className="absolute -left-[5px] -top-[4px] w-2.5 h-2.5 rounded-full bg-[#B94A6E]"></div>
          </div>

          {/* Lunch Breaks for Stylists */}
          {/* Nimali lunch break 12:00-13:00 */}
          <div className="absolute top-[240px] left-[80px] w-[calc((100%-80px)/3)] h-[80px] px-1.5 pt-1.5 z-10">
            <div className="h-full w-full bg-[#EFEBF2]/50 border border-dashed border-[#E3DCE6] rounded-lg flex items-center justify-center">
              <span className="text-[#8C8394] text-[10px] font-bold uppercase tracking-widest">Lunch Break</span>
            </div>
          </div>

          {/* Shanika lunch break 12:00-13:00 */}
          <div className="absolute top-[240px] left-[calc(80px+((100%-80px)/3))] w-[calc((100%-80px)/3)] h-[80px] px-1.5 pt-1.5 z-10">
            <div className="h-full w-full bg-[#EFEBF2]/50 border border-dashed border-[#E3DCE6] rounded-lg flex items-center justify-center">
              <span className="text-[#8C8394] text-[10px] font-bold uppercase tracking-widest">Lunch Break</span>
            </div>
          </div>

          {/* Render Appointments positioned on grid columns */}
          {appointments.map((apt) => {
            // Determine column index based on stylistId or stylistName
            let colIndex = 0;
            if (apt.stylistId === 's2' || apt.stylistName === 'Shanika') colIndex = 1;
            if (apt.stylistId === 's3' || apt.stylistName === 'Dilki') colIndex = 2;

            const posStyle = getSlotStyle(apt.startTime, apt.endTime);
            const colWidth = `calc((100% - 80px) / 3)`;
            const leftOffset = `calc(80px + ${colIndex} * ${colWidth})`;

            // Tag styling
            let cardBgClass = 'bg-[#B94A6E]/10 border-l-4 border-[#B94A6E]';
            let tagBgClass = 'bg-[#B94A6E] text-white';

            if (apt.tagColor === 'sage' || apt.tag === 'NAILS') {
              cardBgClass = 'bg-[#7E9384]/10 border-l-4 border-[#7E9384]';
              tagBgClass = 'bg-[#7E9384] text-white';
            } else if (apt.tagColor === 'brass' || apt.tag === 'BRIDAL') {
              cardBgClass = 'bg-[#B08D3F]/10 border-l-4 border-[#B08D3F]';
              tagBgClass = 'bg-[#B08D3F] text-white';
            } else if (apt.status === 'Walk-in') {
              cardBgClass = 'bg-white border border-[#E3DCE6]';
              tagBgClass = 'bg-[#8C8394] text-white';
            }

            return (
              <div
                key={apt.id}
                onClick={() => onSelectAppointment(apt)}
                style={{
                  position: 'absolute',
                  left: leftOffset,
                  width: colWidth,
                  ...posStyle,
                }}
                className="px-1.5 pt-1.5 z-15"
              >
                <div
                  className={`h-full w-full rounded-lg p-2.5 flex flex-col justify-between shadow-xs transition-transform hover:-translate-y-0.5 cursor-pointer ${cardBgClass}`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <span className="font-bold text-[#241E2B] text-xs truncate">
                        {apt.clientName}
                      </span>
                      {apt.tag && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${tagBgClass}`}>
                          {apt.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5B5265] mt-0.5 line-clamp-1">{apt.service}</p>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#241E2B]/80 mt-1">
                    <span className="material-symbols-outlined text-xs">schedule</span>
                    <span>{apt.startTime} - {apt.endTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Secondary Info Section (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Client Queue / Upcoming Arrivals */}
        <div className="bg-white border border-[#E3DCE6] p-4 rounded-xl shadow-xs">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-ui-header text-xs text-[#241E2B]">Upcoming Arrivals</h3>
            <button 
              onClick={() => onNavigate('clients')}
              className="text-[11px] font-bold text-[#B94A6E] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-2.5 border-b border-[#E3DCE6]/60">
              <div className="w-9 h-9 rounded-full bg-[#EFEBF2] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwn1hUdCcusZ2mXhS-g9AcK_yCvWK8NADx3p3ICNHIVbHZK0ZXjIMwpXGev6RvyRJEgtGjol39vrc35nNZWHUMS0taLkOuJrjSOnWLpnLjIzBWyODO9fbcgztzR3xQOjOmz8D3BmYhKARrzbm05NFIzJsaUYxoRMh00y6nqruJn6do4rr98zP6CzUczuPJAk70N5gxdhRFCqVW6ZVsb2kADeWDbw5i4jWbkUCXymMdhcttGwekJ4Y"
                  alt="Amaya Silva"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-[#241E2B] truncate">Amaya Silva</p>
                <p className="text-[10px] text-[#8C8394]">Arriving in 15 mins</p>
              </div>
              <span className="px-2.5 py-0.5 bg-[#7E9384]/20 text-[#7E9384] text-[9px] font-bold rounded-full">
                Arrived
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EFEBF2] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7qTHMGcKCkW5OKwgVt3BllSYG2VWraVj3ibISHHnXnW8-vWEQ8QcsNlDyf9wZLql6GVNIy5S9qQIA0mUAdtXtMZqf1njz4zOaU0YXCrPpCJCMneYck2ZtlCVpq6aFp5L_LySJzNxvQ5W8oE7rcdIa76PYW2huyYZPw7CaGUUFjSHDRIs4iliOAZSLHwa1qW8ioBdznsLLA-uFp0niZQDnWdWQJnOeNTK4spNgIVgsAspj_kxSn88"
                  alt="David Miller"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-[#241E2B] truncate">David Miller</p>
                <p className="text-[10px] text-[#8C8394]">Due at 10:30</p>
              </div>
              <span className="px-2.5 py-0.5 bg-[#EFEBF2] text-[#8C8394] text-[9px] font-bold rounded-full">
                Scheduled
              </span>
            </div>
          </div>
        </div>

        {/* Stats/Metrics Revenue Forecast */}
        <div className="bg-[#F7EDF0] border border-[#E3DCE6] p-4 rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-ui-header text-xs text-[#241E2B] mb-0.5">Revenue Forecast</h3>
            <p className="text-[11px] text-[#5B5265]">Expected for today</p>
          </div>

          <div className="py-2">
            <p className="text-2xl font-headline-md text-[#B94A6E]">LKR 42,500</p>
            <div className="flex items-center gap-1 text-[#7E9384] text-[11px] font-bold mt-0.5">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              <span>+12% from last Tuesday</span>
            </div>
          </div>

          <div className="h-1.5 bg-[#E3DCE6] rounded-full overflow-hidden">
            <div className="h-full bg-[#B94A6E] w-[78%]"></div>
          </div>
        </div>

        {/* Stylist Status Utilization */}
        <div className="bg-white border border-[#E3DCE6] p-4 rounded-xl shadow-xs">
          <h3 className="font-ui-header text-xs text-[#241E2B] mb-3">Staff Utilization</h3>

          <div className="space-y-3">
            {stylists.map((st) => (
              <div key={st.id} className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#241E2B] w-16">{st.name}</span>
                <div className="flex-1 h-1.5 bg-[#EFEBF2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#B94A6E] rounded-full"
                    style={{ width: `${st.utilization}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-[#8C8394] w-8 text-right">
                  {st.utilization}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
