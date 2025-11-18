export default function ServiceCard({ service, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(service)}
      className={`group relative w-full text-left rounded-xl border p-4 transition-all ${
        selected ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30' : 'border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-white font-medium">{service.name}</h3>
          <p className="text-sm text-blue-200/80 line-clamp-2">{service.description || 'No description'}</p>
        </div>
        <div className="text-right">
          <p className="text-white font-semibold">${service.price?.toFixed(2)}</p>
          <p className="text-xs text-blue-200/80">{service.duration_minutes} min</p>
        </div>
      </div>
    </button>
  )
}
