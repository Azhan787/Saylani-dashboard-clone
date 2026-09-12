import { motion } from 'framer-motion'
import logo from '../assets/tayyebah-logo.png'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-base-bg flex flex-col items-center justify-center gap-4">
      <motion.img
        src={logo}
        alt="Tayyebah Academy logo"
        className="w-16 h-16 rounded-2xl object-contain"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="text-center">
        <p className="text-lg font-display font-bold text-ink-primary">Tayyebah Academy</p>
        <p className="text-sm text-ink-muted mt-1">Loading...</p>
      </div>
    </div>
  )
}
