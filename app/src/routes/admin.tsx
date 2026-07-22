import { createFileRoute, Outlet, Link, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  const location = useLocation()
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { name: 'Orders', path: '/admin/orders', icon: 'shopping_cart' },
    { name: 'Inventory', path: '/admin/inventory', icon: 'inventory_2' },
    { name: 'Customers', path: '/admin/customers', icon: 'group' },
    { name: 'Analytics', path: '/admin/analytics', icon: 'analytics' },
    { name: 'Settings', path: '/admin/settings', icon: 'settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex font-body-md text-gray-900 selection:bg-metallic-gold selection:text-regal-navy">
      {/* Side Navigation Bar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-regal-navy border-r border-metallic-gold/20 flex flex-col py-8 px-4 z-50">
        <div className="mb-12 px-2">
          <img src="/logo.jpg" alt="Roymall Scents" className="w-full max-w-[160px] object-contain mb-2" />
          <p className="font-label-md text-label-md text-white/60 uppercase tracking-widest mt-1 text-[10px]">Admin Portal</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            // Need to match exactly for Dashboard (/admin), otherwise path matching handles the rest
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
            return (
              <Link 
                key={item.name} 
                to={item.path as any}
                className={`flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 ${isActive ? 'text-yellow-800 bg-yellow-100 font-bold' : 'text-white/70 hover:text-white hover:bg-regal-navy/50'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-label-md text-label-md text-sm">{item.name}</span>
              </Link>
            )
          })}
        </nav>
        
        <div className="mt-auto flex items-center gap-3 px-2 border-t border-metallic-gold/10 pt-6">
          <div className="w-10 h-10 bg-metallic-gold flex items-center justify-center text-regal-navy font-bold rounded">AU</div>
          <div>
            <p className="font-label-md text-label-md text-white font-bold text-sm">Admin User</p>
            <p className="text-[10px] text-white/50">Super Administrator</p>
          </div>
        </div>
      </aside>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-gray-50 border-b border-gray-200 flex justify-between items-center px-8 z-40">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 bg-white border-none focus:ring-1 focus:ring-metallic-gold font-body-md text-body-md placeholder-gray-400 outline-none" 
              placeholder="Search analytics, orders, or scents..." 
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6 text-gray-500">
          <button className="hover:text-regal-navy transition-all duration-200 relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="hover:text-regal-navy transition-all duration-200">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 mt-16 p-8 min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
