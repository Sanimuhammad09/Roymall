import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'

export const Route = createFileRoute('/admin/inquiries')({
  component: Inquiries,
})

function Inquiries() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const limit = 10

  const queryKey = ['admin-inquiries', page]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => api.adminGetInquiries({ page, limit })
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => api.adminUpdateInquiryStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.adminDeleteInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] })
    }
  })

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      deleteMutation.mutate(id)
    }
  }

  const inquiries = data?.data || []
  const meta = data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-regal-navy text-3xl font-bold">Customer Inquiries</h2>
          <p className="font-body-md text-gray-500 mt-1">Manage customer support tickets and contact form submissions.</p>
        </div>
      </div>

      {/* Inquiries Table Section */}
      <div className="bg-white border border-gray-200 overflow-hidden relative">
        {isLoading && <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 font-bold text-regal-navy">Loading...</div>}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-regal-navy text-white">
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Customer</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Inquiry Type</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Message</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Status</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest text-center text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inquiries.map((inq: any) => (
                <tr key={inq.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{inq.firstName} {inq.lastName}</span>
                      <span className="text-xs text-gray-500">{inq.email}</span>
                      <span className="text-[10px] text-gray-400 mt-1">{new Date(inq.createdAt).toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-body-md text-gray-700 font-bold">{inq.inquiryType}</td>
                  <td className="px-6 py-5 text-sm text-gray-600 max-w-xs">
                    <p className="truncate" title={inq.message}>{inq.message}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-bold uppercase tracking-tighter border ${
                        inq.status === 'RESPONDED' ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-red-100 text-red-800 border-red-200'
                    }`}>
                      {inq.status || 'UNREAD'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        disabled={updateStatusMutation.isPending}
                        onClick={() => updateStatusMutation.mutate({ id: inq.id, status: inq.status === 'RESPONDED' ? 'UNREAD' : 'RESPONDED' })}
                        className="p-2 text-gray-400 hover:text-regal-navy hover:bg-gray-100 rounded transition-all"
                        title={inq.status === 'RESPONDED' ? 'Mark as Unread' : 'Mark as Responded'}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {inq.status === 'RESPONDED' ? 'mark_email_unread' : 'mark_email_read'}
                        </span>
                      </button>
                      <button 
                        disabled={deleteMutation.isPending}
                        onClick={() => handleDelete(inq.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No inquiries found.
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

    </div>
  )
}
