import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'

export const Route = createFileRoute('/admin/inventory')({
  component: Inventory,
})

function Inventory() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('ALL')
  const [page, setPage] = useState(1)
  const limit = 10

  const queryKey = ['admin-products', page, filter]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      // Backend might not support 'LOW STOCK' filter natively on /products, 
      // but we will fetch all and map them for the table. 
      // Assuming GET /products supports pagination and returns { data, meta }
      const res = await api.getProducts({ page: String(page), limit: String(limit) })
      // If the API returns raw array instead of paginated object, handle it:
      if (Array.isArray(res)) {
        return { data: res, meta: { total: res.length, page: 1, limit: res.length, totalPages: 1 } }
      }
      return res
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.adminDeleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      queryClient.invalidateQueries({ queryKey: ['admin-overview'] })
    }
  })

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id)
    }
  }

  const products = data?.data || []
  const meta = data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 }

  const filteredProducts = products.filter((prod: any) => {
    const stock = prod.stockQuantity || 0
    if (filter === 'IN STOCK') return stock > 10
    if (filter === 'LOW STOCK') return stock > 0 && stock <= 10
    if (filter === 'OUT OF STOCK') return stock === 0
    return true
  })

  const totalValue = products.reduce((acc: number, prod: any) => acc + ((prod.price || 0) * (prod.stockQuantity || 0)), 0)
  const lowStockCount = products.filter((p: any) => (p.stockQuantity || 0) > 0 && (p.stockQuantity || 0) <= 10).length
  const outOfStockCount = products.filter((p: any) => (p.stockQuantity || 0) === 0).length

  return (
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-regal-navy font-bold text-3xl">Inventory Management</h2>
          <p className="text-gray-500 font-body-md mt-1">Manage your luxury scent collection and stock levels.</p>
        </div>
        <Link to="/admin/inventory/new" className="bg-regal-navy text-white px-6 py-3 font-label-md text-label-md flex items-center gap-2 hover:bg-regal-navy/90 transition-all font-bold text-sm tracking-wider">
          <span className="material-symbols-outlined text-[20px]">add</span>
          ADD NEW PRODUCT
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Inventory Value (calculated for current page if not provided by backend) */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Page Inv. Value</p>
            <span className="material-symbols-outlined text-metallic-gold">payments</span>
          </div>
          <h3 className="font-price-lg text-price-lg text-regal-navy font-bold text-2xl">₦{totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
        </div>

        {/* Total SKU */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Total SKU</p>
            <span className="material-symbols-outlined text-metallic-gold">inventory_2</span>
          </div>
          <h3 className="font-price-lg text-price-lg text-regal-navy font-bold text-2xl">{meta.total}</h3>
        </div>

        {/* Out of Stock (on page) */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Out of Stock</p>
            <span className="material-symbols-outlined text-red-600">warning</span>
          </div>
          <h3 className="font-price-lg text-price-lg text-red-600 font-bold text-2xl">{outOfStockCount}</h3>
        </div>

        {/* Low Stock (on page) */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Low Stock</p>
            <span className="material-symbols-outlined text-yellow-600">inventory</span>
          </div>
          <h3 className="font-price-lg text-price-lg text-yellow-600 font-bold text-2xl">{lowStockCount}</h3>
        </div>
      </div>

      {/* Product Management View */}
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden relative">
        {isLoading && <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 font-bold text-regal-navy">Loading...</div>}
        <div className="p-6 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex bg-white border border-gray-200 rounded p-1">
              <button 
                onClick={() => setFilter('ALL')}
                className={`px-3 py-1 text-[12px] font-bold rounded transition-colors ${filter === 'ALL' ? 'bg-regal-navy text-white' : 'text-gray-500 hover:text-regal-navy'}`}
              >ALL</button>
              <button 
                onClick={() => setFilter('IN STOCK')}
                className={`px-3 py-1 text-[12px] font-bold rounded transition-colors ${filter === 'IN STOCK' ? 'bg-regal-navy text-white' : 'text-gray-500 hover:text-regal-navy'}`}
              >IN STOCK</button>
              <button 
                onClick={() => setFilter('LOW STOCK')}
                className={`px-3 py-1 text-[12px] font-bold rounded transition-colors ${filter === 'LOW STOCK' ? 'bg-regal-navy text-white' : 'text-gray-500 hover:text-regal-navy'}`}
              >LOW STOCK</button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-label-md text-label-md text-gray-500 uppercase tracking-wider text-xs font-bold">Product</th>
                <th className="px-6 py-4 font-label-md text-label-md text-gray-500 uppercase tracking-wider text-xs font-bold">Category</th>
                <th className="px-6 py-4 font-label-md text-label-md text-gray-500 uppercase tracking-wider text-xs font-bold">Stock Level</th>
                <th className="px-6 py-4 font-label-md text-label-md text-gray-500 uppercase tracking-wider text-right text-xs font-bold">Price</th>
                <th className="px-6 py-4 font-label-md text-label-md text-gray-500 uppercase tracking-wider text-right text-xs font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((item: any) => {
                const stock = item.stockQuantity || 0
                const isLowStock = stock > 0 && stock <= 10
                const isOutOfStock = stock === 0
                const primaryImage = item.images?.find((img: any) => img.isPrimary)?.url || item.images?.[0]?.url || item.image

                return (
                  <tr key={item.id} className="hover:bg-metallic-gold/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 border border-gray-200 bg-white overflow-hidden shrink-0">
                          {primaryImage ? (
                            <img alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" src={primaryImage}/>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                              <span className="material-symbols-outlined">image</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-regal-navy">{item.name}</p>
                          <p className="text-[11px] text-gray-500">SKU: {item.sku || item.id?.substring(0,8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-gray-600">{item.category?.name || 'Uncategorized'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></span>
                        <span className={`text-sm font-bold px-2 py-0.5 rounded-full uppercase text-[10px] ${
                          isOutOfStock ? 'bg-red-100 text-red-800' : isLowStock ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {isOutOfStock ? 'OUT OF STOCK' : isLowStock ? 'LOW STOCK' : 'IN STOCK'}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">{stock} units</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-price-lg text-[18px] font-bold text-regal-navy">
                      ₦{(item.price || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => navigate({ to: `/admin/inventory/edit/${item.id}` })}
                          className="p-2 text-gray-400 hover:text-metallic-gold hover:bg-regal-navy rounded transition-all"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filteredProducts.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No products found matching your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">Showing <span className="font-bold text-regal-navy">{Math.min((page - 1) * limit + 1, meta.total)}</span> to <span className="font-bold text-regal-navy">{Math.min(page * limit, meta.total)}</span> of <span className="font-bold text-regal-navy">{meta.total}</span> products</p>
          <div className="flex gap-1">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center rounded"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span className="p-2 border border-regal-navy bg-regal-navy text-white text-[12px] font-bold w-9 flex items-center justify-center rounded">
              {page}
            </span>
            <button 
              onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages || meta.totalPages === 0}
              className="p-2 border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center rounded"
            >
              <span className="material-symbols-outlined text-[18px] text-gray-600">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
