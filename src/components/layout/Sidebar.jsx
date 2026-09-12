import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, X, LogOut } from 'lucide-react'
import logo from '../../assets/tayyebah-logo.png'
import { initials, cn } from '../../utils/helpers'

export default function Sidebar({
  navItems,
  user,
  onLogout,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  desktopBreakpoint = 'lg',
}) {
  const desktopClasses = desktopBreakpoint === 'xl'
    ? { sidebar: 'hidden xl:flex', toggle: 'hidden xl:flex', mobile: 'xl:hidden' }
    : { sidebar: 'hidden lg:flex', toggle: 'hidden lg:flex', mobile: 'lg:hidden' }

  const content = (
    <div className="flex flex-col h-full">
      <div className={cn('flex items-center gap-3 px-5 pt-6 pb-5', collapsed && 'justify-center px-2')}>
        <img src={logo} alt="Tayyebah Academy logo" className="w-9 h-9 rounded-lg object-contain bg-white/5" />
        {!collapsed && (
          <span className="font-display font-bold text-ink-primary leading-tight text-sm">
            Tayyebah
            <br />
            Academy
          </span>
        )}
        <button
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={`${desktopClasses.toggle} ml-auto text-ink-muted hover:text-ink-primary transition-colors p-1`}
        >
          <ChevronLeft size={18} className={cn('transition-transform', collapsed && 'rotate-180')} />
        </button>
        <button
          onClick={onCloseMobile}
          aria-label="Close menu"
          className={`${desktopClasses.mobile} ml-auto text-ink-muted hover:text-ink-primary`}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'bg-brand-blue/15 text-brand-blueLight'
                  : 'text-ink-secondary hover:bg-base-surface2 hover:text-ink-primary'
              )
            }
          >
            <item.icon size={19} />
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>

      <div className={cn('px-3 pb-5 pt-3 border-t border-base-border mt-2', collapsed && 'px-2')}>
        <div className={cn('flex items-center gap-3 px-2 py-2', collapsed && 'justify-center px-0')}>
          <div className="w-9 h-9 rounded-full bg-brand-blue/20 text-brand-blueLight flex items-center justify-center text-xs font-bold shrink-0">
            {initials(user?.fullName)}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm text-ink-primary font-medium truncate">{user?.fullName}</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={onLogout}
              aria-label="Log out"
              className="text-ink-muted hover:text-red-400 transition-colors p-1.5"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
        {collapsed && (
          <button
            onClick={onLogout}
            aria-label="Log out"
            className="w-full flex justify-center mt-2 text-ink-muted hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          `${desktopClasses.sidebar} flex-col bg-base-surface border-r border-base-border shrink-0 transition-all duration-200`,
          collapsed ? 'w-[76px]' : 'w-64'
        )}
      >
        {content}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={`fixed inset-0 bg-black/60 z-40 ${desktopClasses.mobile}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
            />
            <motion.aside
              className={`fixed top-0 left-0 bottom-0 w-72 bg-base-surface border-r border-base-border z-50 ${desktopClasses.mobile}`}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
