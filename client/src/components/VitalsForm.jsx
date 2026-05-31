export default function VitalsForm({ vitals, onChange }) {
  const inputClass = `w-full px-4 py-3 rounded-xl bg-gray-800
    border border-gray-700 text-white text-sm
    focus:outline-none focus:ring-2 focus:ring-blue-500
    focus:border-transparent transition placeholder-gray-500`;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <label className="text-xs text-gray-400 mb-1 block">
          Blood Pressure
        </label>
        <input
          name="blood_pressure"
          value={vitals.blood_pressure}
          onChange={onChange}
          placeholder="120/80"
          className={inputClass}
        />
      </div>
      <div>
        <label className="text-xs text-gray-400 mb-1 block">
          Pulse (bpm)
        </label>
        <input
          name="pulse"
          value={vitals.pulse}
          onChange={onChange}
          placeholder="72"
          className={inputClass}
        />
      </div>
      <div>
        <label className="text-xs text-gray-400 mb-1 block">
          Temperature (°F)
        </label>
        <input
          name="temperature"
          value={vitals.temperature}
          onChange={onChange}
          placeholder="98.6"
          className={inputClass}
        />
      </div>
      <div>
        <label className="text-xs text-gray-400 mb-1 block">
          O2 Saturation (%)
        </label>
        <input
          name="oxygen_saturation"
          value={vitals.oxygen_saturation}
          onChange={onChange}
          placeholder="98"
          className={inputClass}
        />
      </div>
    </div>
  );
}