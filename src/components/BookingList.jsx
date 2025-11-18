import { useEffect, useState } from 'react'

function BookingList({ date }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    setLoading(true)
    const q = date ? `?date=${encodeURIComponent(date)}` : ''
    const res = await fetch(`${base}/bookings${q}`)
    const data = await res.json()
    setBookings(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [date])

  if (loading) return <p className="text-blue-200">Loading bookings…</p>

  if (!bookings.length) return <p className="text-blue-200">No bookings yet.</p>

  return (
    <div className="space-y-3">
      {bookings.map(b => (
        <div key={b._id} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="font-semibold">{b.service_name} • {b.time_slot}</p>
              <p className="text-blue-200 text-sm">{b.customer_name} • {b.customer_phone}</p>
              {b.stylist_name && <p className="text-blue-200 text-sm">Stylist: {b.stylist_name}</p>}
            </div>
            <span className="text-sm text-blue-300 capitalize">{b.status}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookingList
