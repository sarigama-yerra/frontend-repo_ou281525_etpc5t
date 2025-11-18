export default function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold">SB</span>
          </div>
          <div>
            <h1 className="text-white font-semibold leading-tight">Salon Booking</h1>
            <p className="text-xs text-blue-200/70 -mt-0.5">Book your next style in seconds</p>
          </div>
        </div>
        <a href="/test" className="text-sm text-blue-200 hover:text-white transition-colors">System check</a>
      </div>
    </header>
  )
}
