import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'

export const Route = createFileRoute('/admin/')({
  component: Dashboard,
})

function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: () => api.adminGetOverview(),
  })

  if (isLoading) return <div className="p-8">Loading dashboard...</div>
  if (error) return <div className="p-8 text-red-500">Failed to load dashboard data.</div>

  const metrics = data || {}

  return (
    <div className="max-w-7xl mx-auto">

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Sales */}
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="font-label-md text-label-md text-gray-500 uppercase tracking-wider font-bold">Total Sales</p>
            <span className="text-yellow-700 font-bold text-[12px] flex items-center">+12.5%</span>
          </div>
          <h2 className={`font-price-lg text-price-lg text-regal-navy mb-4 font-bold text-3xl transition-colors duration-500`}>
            ${(metrics.totalRevenue || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </h2>
          <div className="h-12 w-full">
            <svg className="w-full h-full" viewBox="0 0 100 30">
              <path className="stroke-metallic-gold stroke-2 fill-none" d="M0,25 Q15,5 30,15 T60,5 T100,20"></path>
            </svg>
          </div>
        </div>
        
        {/* Total Orders */}
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="font-label-md text-label-md text-gray-500 uppercase tracking-wider font-bold">Total Orders</p>
            <span className="material-symbols-outlined text-metallic-gold">shopping_bag</span>
          </div>
          <h2 className="font-price-lg text-price-lg text-regal-navy mb-4 font-bold text-3xl">{metrics.totalOrders || 0}</h2>
          <div className="h-12 w-full">
            <svg className="w-full h-full" viewBox="0 0 100 30">
              <path className="stroke-metallic-gold stroke-2 fill-none" d="M0,20 Q20,10 40,25 T80,10 T100,5"></path>
            </svg>
          </div>
        </div>
        
        {/* Stock Levels */}
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="font-label-md text-label-md text-gray-500 uppercase tracking-wider font-bold">Active Appointments</p>
            <span className="text-regal-navy font-bold text-[12px]">Pending & Confirmed</span>
          </div>
          <h2 className="font-price-lg text-price-lg text-regal-navy mb-4 font-bold text-3xl">{metrics.activeAppointments || 0}</h2>
          <div className="w-full bg-gray-100 h-1 mt-2">
            <div className="bg-metallic-gold h-full w-[94%]"></div>
          </div>
        </div>
        
        {/* New Customers */}
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="font-label-md text-label-md text-gray-500 uppercase tracking-wider font-bold">Total Customers</p>
            <span className="text-yellow-700 font-bold text-[12px]">Total registered</span>
          </div>
          <h2 className="font-price-lg text-price-lg text-regal-navy mb-4 font-bold text-3xl">{metrics.totalCustomers || 0}</h2>
          <div className="h-12 w-full">
            <svg className="w-full h-full" viewBox="0 0 100 30">
              <path className="stroke-metallic-gold stroke-2 fill-none" d="M0,28 Q25,20 50,22 T75,10 T100,12"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Dashboard Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Recent Orders Table */}
        <div className="flex-[2] bg-white border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline-md text-headline-md text-regal-navy font-bold text-2xl">Recent Orders</h3>
            <button className="font-label-md text-label-md text-metallic-gold uppercase tracking-widest border-b border-metallic-gold pb-0.5 hover:text-yellow-600 transition-colors font-bold text-xs">View All Orders</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="pb-4 font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Order ID</th>
                  <th className="pb-4 font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Customer</th>
                  <th className="pb-4 font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Date</th>
                  <th className="pb-4 font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Status</th>
                  <th className="pb-4 font-label-md text-label-md text-gray-500 uppercase font-bold text-xs text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(metrics.recentOrders || []).map((order: any, idx: number) => (
                  <tr key={order.id || idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 font-body-md text-regal-navy font-bold">#{order.orderNumber || order.id?.substring(0,8)}</td>
                    <td className="py-5 font-body-md text-gray-800">{order.user?.firstName} {order.user?.lastName}</td>
                    <td className="py-5 font-body-md text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-5">
                      <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${
                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                        order.status === 'PENDING' ? 'bg-gray-200 text-gray-700' :
                        order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-5 font-price-lg text-[18px] text-right font-bold text-regal-navy">
                      ${(order.totalAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </td>
                  </tr>
                ))}
                {(!metrics.recentOrders || metrics.recentOrders.length === 0) && (
                  <tr><td colSpan={5} className="py-5 text-center text-gray-500">No recent orders</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Low Stock Alerts */}
        <div className="flex-1 bg-regal-navy text-white p-8 border border-metallic-gold/30">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline-md text-headline-md text-metallic-gold font-bold text-2xl">Low Stock Alerts</h3>
            <span className="material-symbols-outlined text-red-500">warning</span>
          </div>
          <div className="space-y-6">
            {(metrics.lowStockProducts || []).map((prod: any) => (
              <div key={prod.id} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-16 h-16 bg-white overflow-hidden relative border border-metallic-gold/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-gray-400">inventory_2</span>
                </div>
                <div className="flex-1">
                  <p className="font-headline-md text-[18px] text-white font-bold">{prod.name}</p>
                  <p className="font-label-md text-[12px] text-white/60 uppercase tracking-widest font-bold">SKU: {prod.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-price-lg text-[16px] font-bold text-red-400">{prod.stockQuantity} left</p>
                </div>
              </div>
            ))}
            {(!metrics.lowStockProducts || metrics.lowStockProducts.length === 0) && (
              <div className="text-gray-400 text-sm">All products are adequately stocked.</div>
            )}
          </div>
          <Link to="/admin/inventory" className="block text-center w-full mt-12 py-3 bg-metallic-gold text-regal-navy font-bold uppercase tracking-widest text-[12px] hover:bg-yellow-500 transition-colors">Manage Inventory</Link>
        </div>
      </div>

      {/* System Notifications & Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-6 flex items-center justify-between border border-transparent hover:border-metallic-gold/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-metallic-gold/20 flex items-center justify-center text-metallic-gold">
              <span className="material-symbols-outlined">inventory</span>
            </div>
            <div>
              <h4 className="font-bold text-regal-navy text-lg">Inventory Sync Required</h4>
              <p className="text-sm text-gray-500">Last synced 4 hours ago. 3 items differ from warehouse.</p>
            </div>
          </div>
          <button className="bg-regal-navy text-white px-4 py-2 text-sm font-bold uppercase tracking-tighter hover:bg-regal-navy/90 transition-all">Sync Now</button>
        </div>
        
        <div className="bg-gray-100 p-6 flex items-center justify-between border border-transparent hover:border-metallic-gold/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <h4 className="font-bold text-regal-navy text-lg">Customer Inquiries</h4>
              <p className="text-sm text-gray-500">You have 5 unread messages from premium members.</p>
            </div>
          </div>
          <Link to="/admin/inquiries" className="block text-center border border-regal-navy text-regal-navy px-4 py-2 text-sm font-bold uppercase tracking-tighter hover:bg-regal-navy hover:text-white transition-all">Go to Inbox</Link>
        </div>
      </div>
    </div>
  )
}
