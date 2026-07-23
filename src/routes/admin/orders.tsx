import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'

export const Route = createFileRoute('/admin/orders')({
  component: Orders,
})

function Orders() {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [page, setPage] = useState(1)
  const limit = 10

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  const queryKey = ['admin-orders', page, statusFilter, searchTerm]
  
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      const params: any = { page, limit }
      if (statusFilter !== 'All Statuses') params.status = statusFilter.toUpperCase()
      if (searchTerm) params.search = searchTerm
      return api.adminGetOrders(params)
    }
  })

  const { data: orderDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: ['admin-order', selectedOrderId],
    queryFn: () => selectedOrderId ? api.adminGetOrder(selectedOrderId) : null,
    enabled: !!selectedOrderId
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => api.adminUpdateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      if (selectedOrderId) {
        queryClient.invalidateQueries({ queryKey: ['admin-order', selectedOrderId] })
      }
    }
  })

  const orders = data?.data || []
  const meta = data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 }

  const handleStatusUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedOrderId) {
      updateStatusMutation.mutate({ id: selectedOrderId, status: e.target.value })
    }
  }

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
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-6 mb-8 border border-gray-200 flex flex-wrap gap-4 items-center">
        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Search</label>
          <input 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setPage(1)
            }}
            placeholder="Search by order ID or email..."
            className="border border-gray-200 focus:border-metallic-gold focus:ring-0 text-sm font-medium py-1.5 px-3 outline-none w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Status</label>
          <select 
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="border border-gray-200 focus:border-metallic-gold focus:ring-0 text-sm font-medium py-1.5 px-3 min-w-[140px] outline-none bg-white"
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
        <button 
          onClick={() => {
            setSearchTerm('')
            setStatusFilter('All Statuses')
            setPage(1)
          }}
          className="mt-5 text-metallic-gold font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:underline"
        >
          <span className="material-symbols-outlined text-sm">filter_list_off</span>
          Clear Filters
        </button>
      </div>

      {/* Orders Table Section */}
      <div className="bg-white border border-gray-200 overflow-hidden relative">
        {isLoading && <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 font-bold text-regal-navy">Loading...</div>}
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
              {orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-metallic-gold/5 transition-colors cursor-pointer group" onClick={() => setSelectedOrderId(order.id)}>
                  <td className="px-6 py-5 font-bold text-regal-navy font-label-md">#{order.orderNumber || order.id.substring(0,8)}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{order.user?.firstName} {order.user?.lastName}</span>
                      <span className="text-xs text-gray-500">{order.user?.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-bold uppercase tracking-tighter border ${
                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-800 border-green-200' :
                        order.status === 'PENDING' ? 'bg-gray-200 text-gray-700 border-gray-300' :
                        order.status === 'CANCELLED' ? 'bg-red-100 text-red-800 border-red-200' :
                        'bg-yellow-100 text-yellow-800 border-yellow-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-price-lg text-price-lg text-regal-navy font-bold">
                    ₦{(order.totalAmount || 0).toLocaleString(undefined, {minimumFractionDigits:2})}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button className="text-metallic-gold hover:text-regal-navy transition-colors">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && !isLoading && (
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
          <p className="text-xs text-gray-500 font-medium">Showing {Math.min((page - 1) * limit + 1, meta.total)} to {Math.min(page * limit, meta.total)} of {meta.total} entries</p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1 border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50 text-gray-500 bg-white"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="px-3 py-1 bg-regal-navy text-white text-xs font-bold">{page}</span>
            <button 
              onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages || meta.totalPages === 0}
              className="p-1 border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50 text-gray-500 bg-white"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Order Detail Drawer/Modal */}
      {selectedOrderId && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto flex flex-col transform transition-transform">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="font-headline-md text-xl font-bold text-regal-navy">Order Details</h3>
              <button onClick={() => setSelectedOrderId(null)} className="text-gray-400 hover:text-gray-800">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 flex-1">
              {isLoadingDetail ? (
                <div className="text-center py-10 font-bold text-gray-500">Loading order details...</div>
              ) : orderDetail ? (
                <div className="space-y-8">
                  {/* Status update */}
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500 mb-2 block tracking-wider">Update Status</label>
                    <div className="flex gap-2">
                      <select 
                        value={orderDetail.status}
                        onChange={handleStatusUpdate}
                        disabled={updateStatusMutation.isPending}
                        className="flex-1 border border-gray-200 p-2 text-sm font-medium focus:border-metallic-gold outline-none"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                      {updateStatusMutation.isPending && <span className="text-sm self-center text-metallic-gold">Updating...</span>}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-gray-50 p-4 border border-gray-200">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-regal-navy mb-3">Customer Information</h4>
                    <p className="text-sm mb-1"><span className="text-gray-500">Name:</span> {orderDetail.user?.firstName} {orderDetail.user?.lastName}</p>
                    <p className="text-sm mb-1"><span className="text-gray-500">Email:</span> {orderDetail.user?.email}</p>
                    <p className="text-sm"><span className="text-gray-500">Date:</span> {new Date(orderDetail.createdAt).toLocaleString()}</p>
                  </div>

                  {/* Shipping Info */}
                  <div className="bg-gray-50 p-4 border border-gray-200">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-regal-navy mb-3">Shipping Details</h4>
                    <p className="text-sm mb-1">
                      <span className="text-gray-500">Address:</span> 
                      {typeof orderDetail.shippingAddress === 'object' 
                        ? `${orderDetail.shippingAddress?.street}, ${orderDetail.shippingAddress?.city}, ${orderDetail.shippingAddress?.state}, ${orderDetail.shippingAddress?.country}`
                        : orderDetail.shippingAddress}
                    </p>
                    {typeof orderDetail.shippingAddress === 'object' && orderDetail.shippingAddress?.phone && (
                      <p className="text-sm mb-1"><span className="text-gray-500">Phone:</span> {orderDetail.shippingAddress.phone}</p>
                    )}
                  </div>

                  {/* Items */}
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-regal-navy mb-3">Order Items</h4>
                    <ul className="space-y-4">
                      {orderDetail.items?.map((item: any) => (
                        <li key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                          <div className="flex items-center gap-3">
                            {item.product?.images?.[0]?.url && (
                              <img src={item.product.images?.[0]?.url || 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=No+Image'} className="w-12 h-12 object-cover border border-gray-200" alt={item.product.name} />
                            )}
                            <div>
                              <p className="font-bold text-sm text-regal-navy">{item.product?.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-bold text-sm text-regal-navy">₦{(item.priceAtPurchase || item.price || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <p className="font-bold text-gray-500 uppercase tracking-widest text-sm">Total Amount</p>
                    <p className="font-price-lg font-bold text-xl text-regal-navy">₦{(orderDetail.totalAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-red-500">Order not found.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
