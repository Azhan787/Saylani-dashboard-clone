import Card from '../ui/Card'

export default function StatCard({ icon: Icon, iconColor = 'text-brand-green', iconBg = 'bg-brand-green/10', value, label, className, responsive = false, compact = false }) {
  return (
    <Card className={`${compact ? 'p-4 sm:p-5' : 'p-6'} flex items-center justify-between min-w-0 ${className || ''}`}>
      <div className="min-w-0 max-w-full overflow-hidden">
        <p className={`${responsive ? 'text-lg sm:text-xl xl:text-2xl' : 'text-3xl'} max-w-full break-words whitespace-normal leading-tight font-bold text-ink-primary`}>
          {value}
        </p>
        <p className="text-sm text-ink-secondary mt-1">{label}</p>
      </div>
      {Icon && (
        <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon size={20} className={iconColor} />
        </div>
      )}
    </Card>
  )
}
