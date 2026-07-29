import React, { useState } from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [salonName, setSalonName] = useState('Style Heaven');
  const [taxRate, setTaxRate] = useState('5.0');
  const [currency, setCurrency] = useState('Rs');
  const [smsReminders, setSmsReminders] = useState(true);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => {
      setSavedMsg(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#241E2B]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#E3DCE6] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E3DCE6] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#B94A6E]">settings</span>
            <h3 className="font-headline-sm text-base text-[#241E2B]">Suite Settings</h3>
          </div>
          <button onClick={onClose} className="text-[#8C8394] hover:text-[#241E2B]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {savedMsg && (
          <div className="p-3 bg-[#d2e8d7] text-[#0d1f15] font-bold text-xs rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>Settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-[#241E2B] mb-1">Salon / Suite Name</label>
            <input
              type="text"
              value={salonName}
              onChange={(e) => setSalonName(e.target.value)}
              className="w-full p-2.5 border border-[#E3DCE6] rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#241E2B] mb-1">Currency Symbol</label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2.5 border border-[#E3DCE6] rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-[#241E2B] mb-1">Service Tax Rate (%)</label>
              <input
                type="text"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full p-2.5 border border-[#E3DCE6] rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#EFEBF2] rounded-xl">
            <div>
              <p className="font-bold text-[#241E2B]">Automated SMS Reminders</p>
              <p className="text-[10px] text-[#8C8394]">Send booking confirmations to clients</p>
            </div>
            <input
              type="checkbox"
              checked={smsReminders}
              onChange={(e) => setSmsReminders(e.target.checked)}
              className="w-4 h-4 accent-[#B94A6E]"
            />
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
              className="px-6 py-2 bg-[#241E2B] text-white rounded-full font-bold text-xs hover:bg-[#B94A6E]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
