import { useState, useMemo } from 'react'

export default function DateTimePicker({ value, onChange, duration = 60 }) {
  const [date, setDate] = useState(value ? value.slice(0, 10) : new Date().toISOString().slice(0, 10))
  const [time, setTime] = useState(value ? value.slice(11, 16) : '10:00')

  const times = useMemo(() => {
    const slots = []
    for (let h = 9; h <= 18; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hh = String(h).padStart(2, '0')
        const mm = String(m).padStart(2, '0')
        slots.push(`${hh}:${mm}`)
      }
    }
    return slots
  }, [])

  const handleChange = (d, t) => {
    const dateStr = d || date
    const timeStr = t || time
    setDate(dateStr)
    setTime(timeStr)
    const iso = new Date(`${dateStr}T${timeStr}:00`).toISOString()
    onChange(iso)
  }

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <div className="rounded-xl border border-white/10 p-3">
        <label className="block text-sm text-blue-200/80 mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => handleChange(e.target.value, null)}
          className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />
      </div>
      <div className="rounded-xl border border-white/10 p-3">
        <label className="block text-sm text-blue-200/80 mb-1">Time</label>
        <select
          value={time}
          onChange={(e) => handleChange(null, e.target.value)}
          className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          {times.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
