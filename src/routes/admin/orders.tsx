import { createFileRoute as createRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { OrderDetailsModal } from '../../components/OrderDetailsModal'

export const Route = createRoute('/admin/orders')({
  component: Orders,
})

function Orders() {
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState('ALL')
  const [page, setPage] = useState(1)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const limit = 10

  const queryKey = ['admin-orders', page, filter]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      const params: any = { page, limit }
      if (filter !== 'ALL') params.status = filter
      return api.adminGetOrders(params)
    }
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => api.adminUpdateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
    }
  })

  const orders = data?.data || []
  const meta = data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 }

  // Status mapping colors
  const statusColors: Record<string, string> = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'PROCESSING': 'bg-blue-100 text-blue-800',
    'SHIPPED': 'bg-purple-100 text-purple-800',
    'DELIVERED': 'bg-green-100 text-green-800',
    'CANCELLED': 'bg-red-100 text-red-800',
  }

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-regal-navy text-3xl font-bold">Order Management</h2>
          <p className="font-body-md text-gray-500 mt-1">Track and manage customer orders across all regions.</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Filters & Table (Spans 4 columns if no order selected) */}
        <div className="lg:col-span-4">
          
          {/* Filters */}
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2 no-scrollbar border-b border-gray-200">
            {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(tab => (
              <button 
                key={tab}
                className={`pb-2 font-label-md text-xs uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${filter === tab ? 'border-metallic-gold text-metallic-gold font-bold' : 'border-transparent text-gray-500 hover:text-regal-navy'}`}
                onClick={() => { setFilter(tab); setPage(1); }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-white border border-gray-200 relative">
            {isLoading && <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 font-bold text-regal-navy">Loading...</div>}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-gray-500">Order ID</th>
                    <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-gray-500">Date</th>
                    <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-gray-500">Customer</th>
                    <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-gray-500">Items</th>
                    <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-gray-500">Status</th>
                    <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-gray-500">Total</th>
                    <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-gray-500 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 font-body-md text-regal-navy font-bold">
                        {order.orderNumber || order.id.slice(0,8).toUpperCase()}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-500 font-body-md">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-bold text-regal-navy text-sm font-body-md">{order.user?.firstName} {order.user?.lastName}</p>
                        <p className="text-xs text-gray-500">{order.user?.email}</p>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 font-body-md">
                        {order.items?.length || 0} items
                      </td>
                      <td className="px-6 py-5">
                        <select 
                          value={order.status}
                          onChange={(e) => updateStatusMutation.mutate({ id: order.id, status: e.target.value })}
                          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 outline-none border border-transparent hover:border-gray-200 cursor-pointer ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="px-6 py-5 font-price-lg text-price-lg text-regal-navy font-bold">
                        ₦{(order.totalAmount || 0).toLocaleString(undefined, {minimumFractionDigits:2})}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button onClick={() => setSelectedOrderId(order.id)} className="font-label-md text-label-md text-metallic-gold uppercase tracking-widest border-b border-metallic-gold pb-0.5 hover:text-yellow-600 transition-colors font-bold text-xs">View Details</button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500 font-body-md">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Placeholder */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <p className="text-xs text-gray-500 font-medium font-body-md">Showing {Math.min((page - 1) * limit + 1, meta.total)} to {Math.min(page * limit, meta.total)} of {meta.total} results</p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-metallic-gold transition-colors disabled:opacity-30 text-gray-600 bg-white"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <span className="w-8 h-8 flex items-center justify-center border border-metallic-gold bg-metallic-gold text-regal-navy font-bold">{page}</span>
                <button 
                  onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                  disabled={page === meta.totalPages || meta.totalPages === 0}
                  className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-metallic-gold transition-colors disabled:opacity-30 bg-white"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <OrderDetailsModal 
        isOpen={!!selectedOrderId}
        orderId={selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
      />
    </div>
  )
}
