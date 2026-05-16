export default function Timer({ timeLeft, total }) {
  const pct = (timeLeft / total) * 100
  const urgent = timeLeft <= 5

  return (
    <div className="flex items-center gap-3">
      <span className={`text-2xl font-bold tabular-nums w-8 text-right ${urgent ? 'text-brand-error' : 'text-brand-text'}`}>
        {timeLeft}
      </span>
      <div className="flex-1 bg-brand-border rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-1000 linear ${urgent ? 'bg-brand-error' : 'bg-brand-primary'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
