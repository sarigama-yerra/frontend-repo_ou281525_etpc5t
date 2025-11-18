import { useState } from 'react'
import Header from './components/Header'
import ServiceList from './components/ServiceList'
import BookingForm from './components/BookingForm'
import BookingList from './components/BookingList'

function App() {
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')

  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const seed = async () => {
    const res = await fetch(`${base}/seed`, { method: 'POST' })
    if (!res.ok) throw new Error('Seed failed')
    return res.json()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        <Header onSeed={seed} />

        <div className="grid lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
              <h2 className="text-white text-xl font-semibold mb-4">Choose a service</h2>
              <ServiceList onSelect={setSelectedService} selectedId={selectedService?._id} />
            </section>

            <section className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
              <h2 className="text-white text-xl font-semibold mb-4">Book your appointment</h2>
              {!selectedService ? (
                <p className="text-blue-200">Pick a service to continue.</p>
              ) : (
                <div>
                  <p className="text-blue-200 mb-4">Selected: <span className="text-white font-semibold">{selectedService.name}</span> • {selectedService.duration_minutes} min • ${selectedService.price}</p>
                  <BookingForm selectedService={selectedService} />
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl font-semibold">Today's bookings</h2>
                <input type="date" value={selectedDate} onChange={(e)=>setSelectedDate(e.target.value)}
                  className="bg-slate-900/60 border border-blue-500/20 rounded-lg p-2 text-white" />
              </div>
              <BookingList date={selectedDate} />
            </section>

            <section className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6 text-blue-200 text-sm">
              <p>Tip: If this is a fresh project, click "Add sample data" to load a few services and stylists.</p>
            </section>
          </aside>
        </div>

        <footer className="py-10 text-center text-blue-300/60 text-sm">
          <p>Built with Flames Blue</p>
        </footer>
      </div>
    </div>
  )
}

export default App
