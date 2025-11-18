export default function StylistPicker({ stylists, selected, onSelect }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {stylists.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s)}
          className={`rounded-xl border p-4 text-left transition-all ${
            selected?.id === s.id ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30' : 'border-white/10 hover:border-white/20'
          }`}
        >
          <h4 className="text-white font-medium">{s.name}</h4>
          <p className="text-xs text-blue-200/80 mt-1">{s.specialties?.join(', ') || 'All services'}</p>
        </button>
      ))}
    </div>
  )
}
