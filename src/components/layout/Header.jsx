import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, MessageSquare, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react'
import Breadcrumbs from './Breadcrumbs'
import { initials } from '../../utils/helpers'

export default function Header({ breadcrumbs, onOpenMobile, user, onLogout, profilePath, settingsPath, desktopBreakpoint = 'lg' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <header className="flex items-center justify-between gap-4 px-5 lg:px-8 py-4 border-b border-base-border bg-base-bg/80 backdrop-blur sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobile}
          aria-label="Open menu"
          className={`${desktopBreakpoint === 'xl' ? 'xl:hidden' : 'lg:hidden'} text-ink-secondary hover:text-ink-primary shrink-0`}
        >
          <Menu size={22} />
        </button>
        <div className="min-w-0 overflow-hidden">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button className="hidden sm:inline-flex items-center gap-2 text-xs font-medium bg-base-surface2 border border-base-border rounded-xl px-3.5 py-2 text-ink-secondary hover:text-ink-primary hover:border-base-borderLight transition-colors">
          <MessageSquare size={15} />
          Feedback
        </button>
        <button
          aria-label="Notifications"
          className="text-ink-secondary hover:text-ink-primary p-2 rounded-xl hover:bg-base-surface2 transition-colors relative"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-green" />
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-base-surface2 transition-colors"
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <div className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-blueLight flex items-center justify-center text-xs font-bold">
              {initials(user?.fullName)}
            </div>
            <ChevronDown size={14} className="text-ink-muted hidden sm:block" />
          </button>
          {open && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-48 bg-base-surface2 border border-base-border rounded-xl shadow-soft py-1.5 overflow-hidden"
            >
              <Link
                to={profilePath}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-secondary hover:text-ink-primary hover:bg-base-border/40"
              >
                <User size={15} /> Profile
              </Link>
              {settingsPath ? (
                <Link
                  to={settingsPath}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-secondary hover:text-ink-primary hover:bg-base-border/40"
                >
                  <Settings size={15} /> Settings
                </Link>
              ) : (
                <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-secondary hover:text-ink-primary hover:bg-base-border/40">
                  <Settings size={15} /> Settings
                </button>
              )}
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-base-border/40"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
