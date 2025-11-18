import { useEffect, useState } from 'react'

function ServiceList({ onSelect, selectedId }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/services`)
      const data = await res.json()
      setServices(data)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p className="text-blue-200">Loading services…</p>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map(s => (
        <button key={s._id}
          onClick={() => onSelect(s)}
          className={`text-left bg-slate-800/60 border ${selectedId===s._id?'border-blue-500':'border-blue-500/20'} rounded-xl p-4 hover:border-blue-500 transition`}
        >
          <h3 className="text-white font-semibold">{s.name}</h3>
          <p className="text-blue-200/80 text-sm line-clamp-2">{s.description}</p>
          <div className="flex items-center justify-between mt-3 text-blue-200">
            <span>{s.duration_minutes} min</span>
            <span className="font-semibold">${s.price}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

export default ServiceList
