import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'

export const Route = createFileRoute('/admin/appointments')({
  component: Appointments,
})

function Appointments() {
  const queryClient = useQueryClient()
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [page, setPage] = useState(1)
  const limit = 10

  const queryKey = ['admin-appointments', page, statusFilter]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      const params: any = { page, limit }
      if (statusFilter !== 'All Statuses') params.status = statusFilter.toUpperCase()
      return api.adminGetAppointments(params)
    }
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => api.adminUpdateAppointmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-appointments'] })
      queryClient.invalidateQueries({ queryKey: ['admin-overview'] })
    }
  })

  const appointments = data?.data || []
  const meta = data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-regal-navy text-3xl font-bold">Appointments</h2>
          <p className="font-body-md text-gray-500 mt-1">Manage booking requests and consultations.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-6 mb-8 border border-gray-200 flex flex-wrap gap-4 items-center">
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
            <option>Confirmed</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments Table Section */}
      <div className="bg-white border border-gray-200 overflow-hidden relative">
        {isLoading && <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 font-bold text-regal-navy">Loading...</div>}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-regal-navy text-white">
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Customer</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Service Type</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Date & Time</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest border-r border-white/10 text-sm font-bold">Status</th>
                <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-widest text-center text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map((apt: any) => (
                <tr key={apt.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{apt.firstName} {apt.lastName}</span>
                      <span className="text-xs text-gray-500">{apt.email}</span>
                      {apt.phone && <span className="text-xs text-gray-500">{apt.phone}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-5 font-body-md text-gray-700 font-bold">{apt.serviceType}</td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    <span className="block font-bold text-regal-navy">{new Date(apt.date).toLocaleDateString()}</span>
                    <span>{apt.time}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-bold uppercase tracking-tighter border ${
                        apt.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        apt.status === 'COMPLETED' ? 'bg-green-100 text-green-800 border-green-200' :
                        apt.status === 'CANCELLED' ? 'bg-red-100 text-red-800 border-red-200' :
                        'bg-yellow-100 text-yellow-800 border-yellow-200'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex justify-center gap-2">
                      {apt.status === 'PENDING' && (
                        <button 
                          disabled={updateStatusMutation.isPending}
                          onClick={() => updateStatusMutation.mutate({ id: apt.id, status: 'CONFIRMED' })}
                          className="px-3 py-1 bg-regal-navy text-white text-[10px] font-bold uppercase hover:bg-regal-navy/90"
                        >
                          Confirm
                        </button>
                      )}
                      {apt.status === 'CONFIRMED' && (
                        <button 
                          disabled={updateStatusMutation.isPending}
                          onClick={() => updateStatusMutation.mutate({ id: apt.id, status: 'COMPLETED' })}
                          className="px-3 py-1 bg-metallic-gold text-regal-navy text-[10px] font-bold uppercase hover:bg-yellow-500"
                        >
                          Complete
                        </button>
                      )}
                      {(apt.status === 'PENDING' || apt.status === 'CONFIRMED') && (
                        <button 
                          disabled={updateStatusMutation.isPending}
                          onClick={() => updateStatusMutation.mutate({ id: apt.id, status: 'CANCELLED' })}
                          className="px-3 py-1 border border-red-200 text-red-600 text-[10px] font-bold uppercase hover:bg-red-50"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No appointments found matching your criteria.
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
