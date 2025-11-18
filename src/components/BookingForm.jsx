import { useEffect, useMemo, useState } from 'react'

function BookingForm({ selectedService }) {
  const [stylists, setStylists] = useState([])
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    date: '',
    time_slot: '',
    notes: '',
    stylist_id: '',
  })
  const [status, setStatus] = useState(null)

  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${base}/stylists`)
      const data = await res.json()
      setStylists(data)
    }
    load()
  }, [])

  useEffect(() => {
    // reset stylist when service changes
    setForm(prev => ({ ...prev, stylist_id: '' }))
  }, [selectedService?._id])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const canSubmit = useMemo(() => {
    return selectedService && form.customer_name && form.customer_phone && form.date && form.time_slot
  }, [selectedService, form])

  const submit = async (e) => {
    e.preventDefault()
    if (!selectedService) return
    setStatus({ type: 'loading', msg: 'Creating booking…' })
    try {
      const payload = {
        customer_name: form.customer_name,
        customer_phone: form.customer_phone,
        date: form.date,
        time_slot: form.time_slot,
        notes: form.notes || undefined,
        stylist_id: form.stylist_id || undefined,
        service_id: selectedService._id,
        service_name: selectedService.name,
        stylist_name: stylists.find(s => s._id === form.stylist_id)?.name,
        duration_minutes: selectedService.duration_minutes,
        status: 'confirmed'
      }
      const res = await fetch(`${base}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        const err = await res.json().catch(()=>({detail:'Error'}))
        throw new Error(err.detail || 'Failed to create booking')
      }
      const data = await res.json()
      setStatus({ type: 'success', msg: `Booked with ${data.stylist_name || 'Any stylist'} on ${data.date} at ${data.time_slot}` })
      // reset minimal
    } catch (e) {
      setStatus({ type: 'error', msg: e.message })
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-blue-200 text-sm">Your name</label>
          <input name="customer_name" value={form.customer_name} onChange={onChange}
            className="w-full mt-1 bg-slate-800/60 border border-blue-500/20 rounded-lg p-2 text-white" placeholder="Jane Doe" />
        </div>
        <div>
          <label className="text-blue-200 text-sm">Phone</label>
          <input name="customer_phone" value={form.customer_phone} onChange={onChange}
            className="w-full mt-1 bg-slate-800/60 border border-blue-500/20 rounded-lg p-2 text-white" placeholder="(555) 123-4567" />
        </div>
        <div>
          <label className="text-blue-200 text-sm">Date</label>
          <input type="date" name="date" value={form.date} onChange={onChange}
            className="w-full mt-1 bg-slate-800/60 border border-blue-500/20 rounded-lg p-2 text-white" />
        </div>
        <div>
          <label className="text-blue-200 text-sm">Time</label>
          <input type="time" name="time_slot" value={form.time_slot} onChange={onChange}
            className="w-full mt-1 bg-slate-800/60 border border-blue-500/20 rounded-lg p-2 text-white" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-blue-200 text-sm">Preferred stylist (optional)</label>
          <select name="stylist_id" value={form.stylist_id} onChange={onChange}
            className="w-full mt-1 bg-slate-800/60 border border-blue-500/20 rounded-lg p-2 text-white">
            <option value="">Any</option>
            {stylists.map(st => (
              <option key={st._id} value={st._id}>{st.name}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-blue-200 text-sm">Notes</label>
          <textarea name="notes" value={form.notes} onChange={onChange}
            className="w-full mt-1 bg-slate-800/60 border border-blue-500/20 rounded-lg p-2 text-white" rows={3} placeholder="Anything we should know?" />
        </div>
      </div>
      <button disabled={!canSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg">Book appointment</button>

      {status?.type === 'success' && (
        <p className="text-green-300 text-sm">{status.msg}</p>
      )}
      {status?.type === 'error' && (
        <p className="text-red-300 text-sm">{status.msg}</p>
      )}
      {status?.type === 'loading' && (
        <p className="text-blue-200 text-sm">{status.msg}</p>
      )}
    </form>
  )
}

export default BookingForm
