import React, { useState } from 'react';
import { Appointment, Stylist, ViewMode } from '../types';

interface AppointmentsViewProps {
  appointments: Appointment[];
  stylists: Stylist[];
  onNavigate: (view: ViewMode) => void;
  onOpenAddAppointment: () => void;
  onUpdateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  onSelectClientByName: (clientName: string) => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  appointments,
  stylists,
  onNavigate,
  onOpenAddAppointment,
  onUpdateAppointmentStatus,
  onSelectClientByName,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterStylist, setFilterStylist] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const statuses = ['ALL', 'Scheduled', 'Arrived', 'In chair', 'Completed', 'Walk-in'];

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = filterStatus === 'ALL' || apt.status === filterStatus;
    const matchesStylist = filterStylist === 'ALL' || apt.stylistId === filterStylist;
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesStylist && matchesSearch;
  });

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'In chair':
        return 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/20 animate-pulse';
      case 'Arrived':
        return 'bg-[#e0e3f2] text-[#293042] border border-[#293042]/20';
      case 'Scheduled':
      case 'Booked':
        return 'bg-[#d2e8d7] text-[#0d1f15] border border-[#0d1f15]/10';
      case 'Completed':
        return 'bg-[#EFEBF2] text-[#8C8394] border border-[#E3DCE6]';
      case 'Walk-in':
        return 'bg-[#F7EDF0] text-[#9a3256] border border-[#9a3256]/20';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#F7EDF0] p-5 rounded-2xl border border-[#E3DCE6]">
        <div>
          <h2 className="font-headline-sm text-xl text-[#241E2B] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#B94A6E]">format_list_bulleted</span>
            Appointments Manager
          </h2>
          <p className="text-xs text-[#5B5265] mt-1">
            Manage client bookings, update service status, and transition appointments to Billing.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onOpenAddAppointment}
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#B94A6E] text-white rounded-full font-bold text-xs hover:bg-[#9a3256] transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">add</span>
            New Appointment
          </button>
          <button
            onClick={() => onNavigate('calendar')}
            className="px-4 py-2.5 bg-white border border-[#E3DCE6] text-[#241E2B] rounded-full font-bold text-xs hover:bg-[#EFEBF2] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base text-[#8C8394]">calendar_month</span>
            Calendar View
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E3DCE6] shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8394] text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search by client or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#EFEBF2] pl-9 pr-3 py-2 rounded-xl text-xs text-[#241E2B] focus:outline-none focus:ring-1 focus:ring-[#B94A6E]"
            />
          </div>

          {/* Stylist Filter */}
          <div>
            <select
              value={filterStylist}
              onChange={(e) => setFilterStylist(e.target.value)}
              className="w-full bg-[#EFEBF2] px-3 py-2 rounded-xl text-xs text-[#241E2B] font-medium focus:outline-none"
            >
              <option value="ALL">All Stylists</option>
              {stylists.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.title})
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                  filterStatus === st
                    ? 'bg-[#241E2B] text-white shadow-xs'
                    : 'bg-[#EFEBF2] text-[#5B5265] hover:bg-[#E3DCE6]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments List / Table */}
      <div className="bg-white rounded-2xl border border-[#E3DCE6] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7EDF0] text-[#8C8394] text-[10px] font-eyebrow uppercase border-b border-[#E3DCE6]">
                <th className="p-3.5">Time & Date</th>
                <th className="p-3.5">Client</th>
                <th className="p-3.5">Service</th>
                <th className="p-3.5">Assigned Stylist</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3DCE6] text-xs font-body">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#8C8394]">
                    No appointments match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#EFEBF2]/40 transition-colors">
                    <td className="p-3.5 font-bold text-[#241E2B]">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-[#B94A6E]">schedule</span>
                        <span>{apt.startTime} - {apt.endTime}</span>
                      </div>
                      <span className="text-[10px] text-[#8C8394] block mt-0.5 font-normal">
                        {apt.date || 'Today (Jul 29)'}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <button
                        onClick={() => onSelectClientByName(apt.clientName)}
                        className="font-bold text-[#241E2B] hover:text-[#B94A6E] text-left transition-colors"
                      >
                        {apt.clientName}
                      </button>
                    </td>

                    <td className="p-3.5">
                      <span className="font-medium text-[#241E2B]">{apt.service}</span>
                      {apt.notes && (
                        <p className="text-[10px] text-[#8C8394] truncate max-w-xs">{apt.notes}</p>
                      )}
                    </td>

                    <td className="p-3.5 text-[#5B5265]">
                      <span className="px-2 py-1 bg-[#EFEBF2] rounded-md font-medium text-[11px]">
                        {apt.stylistName}
                      </span>
                    </td>

                    <td className="p-3.5 font-bold text-[#241E2B]">
                      Rs {apt.price.toLocaleString()}
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusBadge(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {apt.status === 'Scheduled' && (
                          <button
                            onClick={() => onUpdateAppointmentStatus(apt.id, 'Arrived')}
                            className="px-2.5 py-1 bg-[#241E2B] text-white rounded-lg text-[10px] font-bold hover:bg-[#B94A6E] transition-colors"
                          >
                            Mark Arrived
                          </button>
                        )}
                        {apt.status === 'Arrived' && (
                          <button
                            onClick={() => onUpdateAppointmentStatus(apt.id, 'In chair')}
                            className="px-2.5 py-1 bg-[#B94A6E] text-white rounded-lg text-[10px] font-bold hover:bg-[#9a3256] transition-colors"
                          >
                            In Chair
                          </button>
                        )}
                        {apt.status === 'In chair' && (
                          <button
                            onClick={() => {
                              onUpdateAppointmentStatus(apt.id, 'Completed');
                              onNavigate('billing');
                            }}
                            className="px-2.5 py-1 bg-[#7E9384] text-white rounded-lg text-[10px] font-bold hover:opacity-90 transition-colors"
                          >
                            Checkout POS
                          </button>
                        )}
                        {apt.status === 'Completed' && (
                          <button
                            onClick={() => onNavigate('billing')}
                            className="px-2.5 py-1 border border-[#E3DCE6] text-[#5B5265] rounded-lg text-[10px] font-bold hover:bg-[#EFEBF2]"
                          >
                            Receipt
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
