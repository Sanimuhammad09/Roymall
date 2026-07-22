import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin/orders')({
  component: Orders,
})

function Orders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')

  const orders = [
    {
      id: '#RS-1092',
      customer: 'Olamide Adeyemi',
      email: 'o.adeyemi@email.com',
      date: 'Oct 24, 2023',
      status: 'Processing',
      statusColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      total: '₦84,500.00'
    },
    {
      id: '#RS-1091',
      customer: 'Chukwudi Okafor',
      email: 'chuks.ok@gmail.com',
      date: 'Oct 23, 2023',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800 border-green-200',
      total: '₦125,000.00'
    },
    {
      id: '#RS-1089',
      customer: 'Fatima Bello',
      email: 'f.bello@luxury.ng',
      date: 'Oct 22, 2023',
      status: 'Shipped',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
      total: '₦56,200.00'
    },
    {
      id: '#RS-1085',
      customer: 'Amina Yusuf',
      email: 'ayusuf@outlook.com',
      date: 'Oct 21, 2023',
      status: 'Cancelled',
      statusColor: 'bg-red-100 text-red-800 border-red-200',
      total: '₦210,000.00'
    },
    {
      id: '#RS-1082',
      customer: 'Tobi Martins',
      email: 't.martins@design.com',
      date: 'Oct 21, 2023',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800 border-green-200',
      total: '₦42,000.00'
    }
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All Statuses' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="max-w-7xl mx-auto">

      {/* Action Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <p className="font-label-md text-label-md text-gray-500 uppercase tracking-widest mb-2 font-bold text-sm">Management</p>
          <h3 className="font-headline-lg text-headline-lg text-regal-navy text-3xl font-bold">Recent Transactions</h3>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 border border-metallic-gold text-metallic-gold font-label-md text-label-md uppercase tracking-wider hover:bg-metallic-gold hover:text-white transition-all duration-300 font-bold text-sm">
            <span className="material-symbols-outlined text-sm">download</span>
            Export CSV
          </button>
          <Link to="/admin/orders/new" className="px-6 py-3 bg-regal-navy text-white font-label-md text-label-md uppercase tracking-wider hover:bg-regal-navy/90 transition-all duration-300 font-bold text-sm flex items-center justify-center">
            New Order
          </Link>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-6 mb-8 border border-gray-200 flex flex-wrap gap-4 items-center">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Status</label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 focus:border-metallic-gold focus:ring-0 text-sm font-medium py-1.5 px-3 min-w-[140px] outline-none bg-white"
          >
            <option>All Statuses</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Date Range</label>
          <div className="flex items-center gap-2">
            <input className="border border-gray-200 focus:border-metallic-gold focus:ring-0 text-sm py-1.5 px-2 outline-none" type="date"/>
            <span className="text-gray-400">to</span>
            <input className="border border-gray-200 focus:border-metallic-gold focus:ring-0 text-sm py-1.5 px-2 outline-none" type="date"/>
          </div>
        </div>
        <button 
          onClick={() => {
            setSearchTerm('')
            setStatusFilter('All Statuses')
          }}
          className="mt-5 text-metallic-gold font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:underline"
        >
          <span className="material-symbols-outlined text-sm">filter_list_off</span>
          Clear Filters
        </button>
      </div>

      {/* Orders Table Section */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-regal-navy text-white">
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Order ID</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Customer</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Date</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Status</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Total</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest text-center text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-metallic-gold/5 transition-colors cursor-pointer group">
                  <td className="px-6 py-5 font-bold text-regal-navy font-label-md">{order.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{order.customer}</span>
                      <span className="text-xs text-gray-500">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-bold uppercase tracking-tighter border ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-price-lg text-price-lg text-regal-navy font-bold">{order.total}</td>
                  <td className="px-6 py-5 text-center">
                    <button className="text-metallic-gold hover:text-regal-navy transition-colors">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <p className="text-xs text-gray-500 font-medium">Showing 1 to {filteredOrders.length} of 48 entries</p>
          <div className="flex items-center gap-2">
            <button className="p-1 border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50 text-gray-500 bg-white" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="px-3 py-1 bg-regal-navy text-white text-xs font-bold">1</button>
            <button className="px-3 py-1 border border-gray-200 text-xs hover:bg-gray-50 bg-white text-gray-600">2</button>
            <button className="px-3 py-1 border border-gray-200 text-xs hover:bg-gray-50 bg-white text-gray-600">3</button>
            <button className="p-1 border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 bg-white">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Insight / Promotion Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-[32px]">
        <div className="bg-regal-navy text-white p-12 flex flex-col justify-center border-l-4 border-metallic-gold">
          <h4 className="font-headline-md text-headline-md text-metallic-gold mb-4 text-2xl font-bold">Market Analysis</h4>
          <p className="font-body-lg text-body-lg text-gray-300 leading-relaxed mb-8">
            Orders for the 'Imperial Oud' collection have increased by 24% this week. Consider adjusting inventory levels for the upcoming festive season.
          </p>
          <a className="inline-flex items-center gap-2 text-metallic-gold font-bold uppercase tracking-widest text-sm hover:translate-x-2 transition-transform duration-300" href="#">
            View Detailed Report
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </a>
        </div>
        <div className="relative overflow-hidden group min-h-[300px]">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApHGf2rwk-uFzTFMpSmyEialO9fKipVkzlrEFghflu04cDo-pWsZ76mSPSLp2h15ITFV7LP-DOooo10__SnI4RnvZQcyvAujDXVHI2p59kiqxCD_pbyZYnpP_2no7SGrWjA4ly3Vs0sGC_kQJgFkhyDWyGmNp7K69v1NWZZbYXJWZMo4pUVCw5Gw35iafmAOzyY0LbzXr4XazEyOHCoEdPbOjYXRl3dl7qQpdo5I05YHGMd9vYHqWA')" }}
          ></div>
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
          <div className="absolute bottom-8 left-8">
            <span className="bg-metallic-gold text-regal-navy px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-3 inline-block">Best Seller</span>
            <h5 className="text-white font-headline-md text-headline-md text-2xl font-bold">Santal Reserve</h5>
          </div>
        </div>
      </div>
    </div>
  )
}
