import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'

export const Route = createFileRoute('/admin/customers')({
  component: Customers,
})

function Customers() {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [page, setPage] = useState(1)
  const limit = 10
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const queryKey = ['admin-users', page, debouncedSearchTerm]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      const params: any = { page, limit }
      if (debouncedSearchTerm) params.search = debouncedSearchTerm
      return api.adminGetUsers(params)
    }
  })

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string, isActive: boolean }) => api.adminToggleUserStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    }
  })

  const customers = data?.data || []
  const meta = data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 }

  return (
    <div>

      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-regal-navy text-3xl font-bold">Customer Directory</h2>
          <p className="font-body-md text-gray-500 mt-1">Manage your luxury clientele and fragrance enthusiasts.</p>
        </div>
      </div>

      {/* Stats & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Total Customers</p>
            <h3 className="font-headline-md text-headline-md text-regal-navy text-2xl font-bold">{meta.total}</h3>
          </div>
          <span className="material-symbols-outlined text-metallic-gold text-4xl opacity-40">group</span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border border-gray-200 p-4 flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 flex-1 relative">
          <input 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setPage(1)
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            placeholder="Search customers..."
            className="border border-gray-200 px-4 py-2 w-full max-w-sm outline-none focus:border-metallic-gold"
            autoComplete="off"
          />
          
          {/* Autocomplete Dropdown */}
          {searchFocused && debouncedSearchTerm.length > 1 && (
            <div className="absolute top-full left-0 mt-2 w-full max-w-sm bg-white border border-gray-200 shadow-xl rounded z-[100] max-h-64 overflow-y-auto">
              {isLoading ? (
                <div className="p-3 text-center text-gray-500 text-xs">Searching...</div>
              ) : customers.length > 0 ? (
                <div className="py-1">
                  {customers.slice(0, 5).map((customer: any) => (
                    <div
                      key={customer.id}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 transition-colors pointer-events-none"
                    >
                      <span className="font-bold text-regal-navy text-sm truncate">{customer.firstName} {customer.lastName}</span>
                      <span className="text-xs text-gray-400 ml-auto truncate">{customer.email}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 text-center text-gray-500 text-xs">No customers found.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white border border-gray-200 overflow-hidden relative">
        {isLoading && <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 font-bold text-regal-navy">Loading...</div>}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 font-label-md text-label-md text-regal-navy">CUSTOMER</th>
              <th className="px-6 py-4 font-label-md text-label-md text-regal-navy">ROLE</th>
              <th className="px-6 py-4 font-label-md text-label-md text-regal-navy">STATUS</th>
              <th className="px-6 py-4 font-label-md text-label-md text-regal-navy">JOINED DATE</th>
              <th className="px-6 py-4 font-label-md text-label-md text-regal-navy text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((customer: any, i: number) => (
              <tr key={customer.id || i} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden bg-metallic-gold/10 flex items-center justify-center rounded-full">
                      <span className="text-metallic-gold font-bold">
                        {customer.firstName?.[0]}{customer.lastName?.[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-label-md text-regal-navy font-bold leading-none mb-1">{customer.firstName} {customer.lastName}</p>
                      <p className="text-xs text-gray-500 font-body-md">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${customer.role === 'ADMIN' ? 'bg-metallic-gold/10 text-metallic-gold' : 'bg-gray-100 text-gray-800'}`}>
                    {customer.role || 'USER'}
                  </span>
                </td>
                <td className="px-6 py-4 font-body-md">
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${customer.isActive === false ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {customer.isActive === false ? 'BLOCKED' : 'ACTIVE'}
                  </span>
                </td>
                <td className="px-6 py-4 font-body-md text-gray-500">{new Date(customer.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => toggleStatusMutation.mutate({ id: customer.id, isActive: customer.isActive === false ? true : false })}
                    disabled={toggleStatusMutation.isPending}
                    className="text-xs font-bold uppercase tracking-widest text-metallic-gold hover:text-regal-navy disabled:opacity-50"
                  >
                    {customer.isActive === false ? 'UNBLOCK' : 'BLOCK'}
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && !isLoading && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-t border-gray-200">
          <p className="text-label-md font-label-md text-gray-500">Showing {Math.min((page - 1) * limit + 1, meta.total)} to {Math.min(page * limit, meta.total)} of {meta.total} results</p>
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
  )
}
