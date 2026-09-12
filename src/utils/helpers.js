export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('')
}

export function formatCurrency(amount) {
  return `Rs: ${amount.toLocaleString()} /-`
}

export function copyToClipboard(text) {
  if (navigator?.clipboard?.writeText) {
    return navigator.clipboard.writeText(text)
  }
  return Promise.resolve()
}
