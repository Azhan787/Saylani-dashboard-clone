import { useState } from 'react'
import { Wallet, CheckCircle2, Clock3, Copy, Check, Eye } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { paymentStats, paymentHistory } from '../../data/payments'
import { formatCurrency, copyToClipboard } from '../../utils/helpers'
import { useToast } from '../../components/ui/Toast'

export default function Payment() {
  const [selected, setSelected] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const { showToast } = useToast()

  function handleCopy(voucherId) {
    copyToClipboard(voucherId)
    setCopiedId(voucherId)
    showToast('Voucher ID copied to clipboard.', 'success')
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={Wallet} iconColor="text-brand-blueLight" iconBg="bg-brand-blue/10" value={formatCurrency(paymentStats.totalFees)} label="Total Fees" />
        <StatCard icon={CheckCircle2} iconColor="text-brand-green" iconBg="bg-brand-green/10" value={formatCurrency(paymentStats.paid)} label="Paid" />
        <StatCard icon={Clock3} iconColor="text-amber-400" iconBg="bg-amber-400/10" value={formatCurrency(paymentStats.pending)} label="Pending" />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-muted border-b border-base-border">
                <th className="px-5 py-3 font-medium">Month</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Due Date</th>
                <th className="px-5 py-3 font-medium">Voucher ID</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((p) => (
                <tr key={p.id} className="border-b border-base-border last:border-0">
                  <td className="px-5 py-4 text-ink-primary whitespace-nowrap">{p.month}</td>
                  <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">Rs: {p.amount} /-</td>
                  <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{p.type}</td>
                  <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{p.dueDate}</td>
                  <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {p.voucherId}
                      <button
                        onClick={() => handleCopy(p.voucherId)}
                        aria-label="Copy voucher ID"
                        className="text-ink-muted hover:text-ink-primary p-1 rounded-md hover:bg-base-surface2"
                      >
                        {copiedId === p.voucherId ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={p.status}>{p.status}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelected(p)}
                      className="flex items-center gap-1.5 text-brand-blueLight text-xs font-medium hover:underline"
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Voucher Details"
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelected(null)}>
              Close
            </Button>
            <Button onClick={() => selected && handleCopy(selected.voucherId)}>Copy Voucher ID</Button>
          </>
        }
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted text-sm">Month</span>
              <span className="text-ink-primary text-sm font-medium">{selected.month}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-muted text-sm">Amount</span>
              <span className="text-ink-primary text-sm font-medium">Rs: {selected.amount} /-</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-muted text-sm">Type</span>
              <span className="text-ink-primary text-sm font-medium">{selected.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-muted text-sm">Due Date</span>
              <span className="text-ink-primary text-sm font-medium">{selected.dueDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-muted text-sm">Voucher ID</span>
              <span className="text-ink-primary text-sm font-medium">{selected.voucherId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-muted text-sm">Status</span>
              <Badge tone={selected.status}>{selected.status}</Badge>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
