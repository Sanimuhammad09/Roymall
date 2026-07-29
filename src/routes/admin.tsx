import { createFileRoute, Outlet, Link, useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useAuth } from '../lib/auth'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useRef } from 'react'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isLoading, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  const { data: notifications } = useQuery({
    queryKey: ['admin-notifications'],
    queryFn: api.adminGetNotifications,
    refetchInterval: 30000 // Refresh every 30s
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'ADMIN')) {
      navigate({ to: '/signin' })
    }
  }, [user, isLoading, navigate])

  if (isLoading || !user || user.role !== 'ADMIN') {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-regal-navy font-bold">Loading...</div>
  }
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { name: 'Orders', path: '/admin/orders', icon: 'shopping_cart' },
    { name: 'Inventory', path: '/admin/inventory', icon: 'inventory_2' },
    { name: 'Customers', path: '/admin/customers', icon: 'group' },
    { name: 'Appointments', path: '/admin/appointments', icon: 'calendar_today' },
    { name: 'Inquiries', path: '/admin/inquiries', icon: 'mail' },
    { name: 'Analytics', path: '/admin/analytics', icon: 'analytics' },
    { name: 'Settings', path: '/admin/settings', icon: 'settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex font-body-md text-gray-900 selection:bg-metallic-gold selection:text-regal-navy overflow-x-hidden">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Side Navigation Bar */}
      <aside className={`h-screen w-64 fixed left-0 top-0 bg-regal-navy border-r border-metallic-gold/20 flex flex-col py-8 px-4 z-50 transform transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-12 px-2 flex justify-between items-center">
          <div>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/logo.jpg" alt="Roymall Scents" className="w-full max-w-[140px] object-contain mb-2 hover:opacity-80 transition-opacity cursor-pointer" />
            </Link>
            <p className="font-label-md text-label-md text-white/60 uppercase tracking-widest mt-1 text-[10px]">Admin Portal</p>
          </div>
          <button 
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            // Need to match exactly for Dashboard (/admin), otherwise path matching handles the rest
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
            return (
              <Link 
                key={item.name} 
                to={item.path as any}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 ${isActive ? 'text-yellow-800 bg-yellow-100 font-bold' : 'text-white/70 hover:text-white hover:bg-regal-navy/50'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-label-md text-label-md text-sm">{item.name}</span>
              </Link>
            )
          })}
        </nav>
        
        <div className="mt-auto flex items-center gap-3 px-2 border-t border-metallic-gold/10 pt-6">
          <div className="w-10 h-10 bg-metallic-gold flex items-center justify-center text-regal-navy font-bold rounded flex-shrink-0">
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div className="overflow-hidden">
            <p className="font-label-md text-label-md text-white font-bold text-sm truncate">{user.firstName} {user.lastName}</p>
            <p className="text-[10px] text-white/50 truncate">Super Administrator</p>
          </div>
        </div>
      </aside>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 bg-gray-50 border-b border-gray-200 flex justify-between items-center px-4 md:px-8 z-30 transition-all duration-300">
        <div className="flex items-center gap-4 flex-1">
          <button 
            className="md:hidden text-gray-500 hover:text-regal-navy flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex items-center flex-1 max-w-[150px] sm:max-w-xl ml-2 sm:ml-0 transition-all">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:ring-1 focus:ring-metallic-gold font-body-md text-sm placeholder-gray-400 outline-none" 
                placeholder="Search..." 
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-6 text-gray-500 ml-2 md:ml-4 flex-shrink-0">
          <div className="relative" ref={notifRef}>
            <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="hover:text-regal-navy transition-all duration-200 relative p-1">
              <span className="material-symbols-outlined">notifications</span>
              {notifications?.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            
            {/* Notification Dropdown */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded shadow-xl border border-gray-200 z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-headline-md text-sm font-bold text-regal-navy">Notifications</h3>
                  <span className="text-[10px] text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{notifications?.length || 0} New</span>
                </div>
                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                  {notifications && notifications.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {notifications.map((notif: any) => (
                        <div 
                          key={notif.id}
                          onClick={() => {
                            setIsNotifOpen(false)
                            navigate({ to: notif.link })
                          }}
                          className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 items-start"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                            notif.type === 'ORDER' ? 'bg-blue-100 text-blue-600' :
                            notif.type === 'LOW_STOCK' ? 'bg-red-100 text-red-600' :
                            notif.type === 'APPOINTMENT' ? 'bg-purple-100 text-purple-600' :
                            'bg-metallic-gold/20 text-metallic-gold'
                          }`}>
                            <span className="material-symbols-outlined text-[16px]">
                              {notif.type === 'ORDER' ? 'shopping_bag' :
                               notif.type === 'LOW_STOCK' ? 'warning' :
                               notif.type === 'APPOINTMENT' ? 'calendar_month' : 'mail'}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-regal-navy">{notif.title}</h4>
                            <p className="text-[11px] text-gray-600 font-body-md mt-1 leading-relaxed">{notif.message}</p>
                            <p className="text-[9px] text-gray-400 mt-2 uppercase tracking-widest">
                              {new Date(notif.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <span className="material-symbols-outlined text-4xl opacity-20 mb-2">notifications_off</span>
                      <p className="text-xs font-body-md">No new notifications</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button onClick={logout} title="Logout" className="hover:text-regal-navy transition-all duration-200 p-1">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full md:ml-64 mt-16 p-4 md:p-8 min-h-screen bg-gray-50 transition-all duration-300 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}

