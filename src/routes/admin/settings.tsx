import { createFileRoute as createRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal'

export const Route = createRoute('/admin/settings')({
  component: Settings,
})

function Settings() {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState('general')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Delete State
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, type: 'shipping' | 'user' | null, id: string | null, title: string, message: string }>({
    isOpen: false,
    type: null,
    id: null,
    title: '',
    message: ''
  })

  // General & Payments State
  const [formData, setFormData] = useState({
    storeName: '',
    supportEmail: '',
    contactPhone: '',
    storeAddress: '',
    taxRate: 0,
    currency: 'NGN',
    enablePromotions: false,
    promoBannerText: '',
    stripePublicKey: '',
    stripeSecretKey: '',
    paypalClientId: '',
    paymentMinTrans: 2500,
    paymentMaxTrans: 5000000,
    paymentServiceFee: 0,
  })

  // Queries
  const { data: settingsData, isLoading: isLoadingSettings } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => api.adminGetSettings()
  })

  const { data: shippingZonesData, isLoading: isLoadingShipping } = useQuery({
    queryKey: ['admin-shipping-zones'],
    queryFn: () => api.getShippingZones(),
    enabled: activeTab === 'shipping'
  })

  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => api.getAdminUsers(),
    enabled: activeTab === 'users'
  })

  useEffect(() => {
    if (settingsData?.data) {
      const d = settingsData.data
      setFormData({
        storeName: d.storeName || '',
        supportEmail: d.supportEmail || '',
        contactPhone: d.contactPhone || '',
        storeAddress: d.storeAddress || '',
        taxRate: d.taxRate || 0,
        currency: d.currency || 'NGN',
        enablePromotions: d.enablePromotions || false,
        promoBannerText: d.promoBannerText || '',
        stripePublicKey: d.stripePublicKey || '',
        stripeSecretKey: d.stripeSecretKey || '',
        paypalClientId: d.paypalClientId || '',
        paymentMinTrans: d.paymentMinTrans ?? 2500,
        paymentMaxTrans: d.paymentMaxTrans ?? 5000000,
        paymentServiceFee: d.paymentServiceFee ?? 0,
      })
    }
  }, [settingsData])

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Mutations
  const updateSettingsMutation = useMutation({
    mutationFn: (newSettings: any) => api.adminUpdateSettings(newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] })
      triggerToast('Settings updated successfully')
    }
  })

  const deleteShippingMutation = useMutation({
    mutationFn: (id: string) => api.deleteShippingZone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-shipping-zones'] })
      setDeleteModal({ ...deleteModal, isOpen: false })
      triggerToast('Shipping zone deleted')
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => api.removeAdminAccess(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      setDeleteModal({ ...deleteModal, isOpen: false })
      triggerToast('Admin access revoked')
    }
  })

  const createShippingMutation = useMutation({
    mutationFn: (data: any) => api.createShippingZone(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-shipping-zones'] })
      triggerToast('Shipping zone created')
    }
  })

  const inviteUserMutation = useMutation({
    mutationFn: (data: any) => api.inviteAdminUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      triggerToast('Administrator invited successfully')
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    }))
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.type === 'shipping' && deleteModal.id) {
      deleteShippingMutation.mutate(deleteModal.id)
    } else if (deleteModal.type === 'user' && deleteModal.id) {
      deleteUserMutation.mutate(deleteModal.id)
    }
  }

  const shippingZones = shippingZonesData?.data || []
  const adminUsers = usersData?.data || []

  return (
    <div className="max-w-7xl mx-auto relative">
      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-2 text-3xl font-bold">Portal Settings</h2>
        <p className="text-gray-500 font-body-md max-w-2xl">Configure your Roymall Scents experience. Manage global store attributes, financial integrations, and team access from a centralized dashboard.</p>
      </div>

      <div className="flex gap-10 border-b border-gray-200 mb-10 overflow-x-auto no-scrollbar">
        {['general', 'payments', 'shipping', 'users'].map(tab => (
          <button 
            key={tab}
            className={`relative pb-4 font-label-md text-label-md transition-all uppercase tracking-widest ${activeTab === tab ? 'text-metallic-gold font-bold' : 'text-gray-500 hover:text-regal-navy'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'general' ? 'General Store Settings' : tab === 'payments' ? 'Payment Gateways' : tab === 'shipping' ? 'Shipping Rules' : 'Admin Users'}
            {activeTab === tab && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-metallic-gold"></div>}
          </button>
        ))}
      </div>

      {activeTab === 'general' && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {isLoadingSettings && <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 font-bold text-regal-navy">Loading...</div>}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white border border-gray-200 p-8 hover:border-metallic-gold/50 transition-colors">
              <h3 className="font-headline-md text-regal-navy mb-6 text-xl font-bold">Store Identity</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Store Name</label>
                  <input name="storeName" value={formData.storeName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold focus:ring-0 px-4 py-3 font-body-md outline-none" type="text" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Support Email</label>
                    <input name="supportEmail" value={formData.supportEmail} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold focus:ring-0 px-4 py-3 font-body-md outline-none" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Contact Phone</label>
                    <input name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold focus:ring-0 px-4 py-3 font-body-md outline-none" type="text" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-8 hover:border-metallic-gold/50 transition-colors">
              <h3 className="font-headline-md text-regal-navy mb-6 text-xl font-bold">Physical Presence & Region</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Store Address</label>
                  <textarea name="storeAddress" value={formData.storeAddress} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold focus:ring-0 px-4 py-3 font-body-md outline-none" rows={3}></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Tax Rate (%)</label>
                    <input name="taxRate" value={formData.taxRate} onChange={handleChange} type="number" step="0.1" className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold focus:ring-0 px-4 py-3 font-body-md outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Base Currency</label>
                    <select name="currency" value={formData.currency} onChange={handleChange} className="w-full border border-gray-300 p-4 bg-white font-body-md text-regal-navy outline-none focus:border-metallic-gold">
                      <option value="NGN">Nigerian Naira (₦)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8 hover:border-metallic-gold/50 transition-colors">
              <h3 className="font-headline-md text-regal-navy mb-6 text-xl font-bold">Promotions</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input name="enablePromotions" checked={formData.enablePromotions} onChange={handleChange} className="sr-only peer" type="checkbox"/>
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-regal-navy"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Enable Promotional Banner</span>
                </div>
                {formData.enablePromotions && (
                  <div className="space-y-2">
                    <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Banner Text</label>
                    <input name="promoBannerText" value={formData.promoBannerText} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold focus:ring-0 px-4 py-3 font-body-md outline-none" type="text" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={() => updateSettingsMutation.mutate(formData)}
                disabled={updateSettingsMutation.isPending}
                className="bg-regal-navy text-metallic-gold px-10 py-4 font-label-md uppercase tracking-widest hover:bg-regal-navy/90 transition-all active:scale-95 shadow-lg disabled:opacity-70 flex items-center gap-2"
              >
                {updateSettingsMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-regal-navy p-8 text-metallic-gold">
              <h4 className="font-headline-md mb-4 text-white text-xl font-bold">Quick Stats</h4>
              <ul className="space-y-6">
                <li className="flex justify-between border-b border-metallic-gold/20 pb-2">
                  <span className="text-white/70 font-label-md text-xs uppercase tracking-widest">Active Products</span>
                  <span className="font-price-lg font-bold">142</span>
                </li>
                <li className="flex justify-between border-b border-metallic-gold/20 pb-2">
                  <span className="text-white/70 font-label-md text-xs uppercase tracking-widest">Live Markets</span>
                  <span className="font-price-lg font-bold">12</span>
                </li>
                <li className="flex justify-between border-b border-metallic-gold/20 pb-2">
                  <span className="text-white/70 font-label-md text-xs uppercase tracking-widest">System Health</span>
                  <span className="text-green-400 font-bold">OPTIMAL</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'payments' && (
        <section className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 p-8 border-l-4 border-l-metallic-gold hover:border-r-metallic-gold/50 hover:border-y-metallic-gold/50 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center">
                    <span className="material-symbols-outlined text-regal-navy text-3xl">credit_card</span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-regal-navy font-bold">Stripe Integration</h4>
                    <span className={`text-xs font-bold uppercase tracking-widest ${formData.stripePublicKey ? 'text-green-600' : 'text-gray-400'}`}>
                      {formData.stripePublicKey ? 'Connected' : 'Not Configured'}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 mb-6 text-sm">Handle all credit card transactions and subscription billing with bank-level security.</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Public Key</label>
                  <input name="stripePublicKey" value={formData.stripePublicKey} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold px-4 py-2 font-mono text-sm outline-none" type="text" placeholder="pk_test_..." />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Secret Key</label>
                  <input name="stripeSecretKey" value={formData.stripeSecretKey} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold px-4 py-2 font-mono text-sm outline-none" type="password" placeholder="sk_test_..." />
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-8 hover:border-metallic-gold/50 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center">
                    <span className="material-symbols-outlined text-regal-navy text-3xl">account_balance_wallet</span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-regal-navy font-bold">PayPal Express</h4>
                    <span className={`text-xs font-bold uppercase tracking-widest ${formData.paypalClientId ? 'text-green-600' : 'text-gray-400'}`}>
                      {formData.paypalClientId ? 'Connected' : 'Not Configured'}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 mb-6 text-sm">Offer customers a secondary secure checkout method using their global PayPal account.</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Client ID</label>
                  <input name="paypalClientId" value={formData.paypalClientId} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold px-4 py-2 font-mono text-sm outline-none" type="text" placeholder="AbC123xYz..." />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-8 hover:border-metallic-gold/50 transition-colors">
            <h3 className="font-headline-md text-regal-navy mb-6 font-bold text-xl">Payment Thresholds & Fees</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Min Transaction (₦)</label>
                <input name="paymentMinTrans" value={formData.paymentMinTrans} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold px-4 py-3 font-body-md outline-none" type="number"/>
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Max Transaction (₦)</label>
                <input name="paymentMaxTrans" value={formData.paymentMaxTrans} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold px-4 py-3 font-body-md outline-none" type="number"/>
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Service Fee (%)</label>
                <input name="paymentServiceFee" value={formData.paymentServiceFee} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold px-4 py-3 font-body-md outline-none" type="number"/>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              onClick={() => updateSettingsMutation.mutate(formData)}
              disabled={updateSettingsMutation.isPending}
              className="bg-regal-navy text-metallic-gold px-10 py-4 font-label-md uppercase tracking-widest hover:bg-regal-navy/90 transition-all active:scale-95 shadow-lg flex items-center gap-2"
            >
              {updateSettingsMutation.isPending ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </section>
      )}

      {activeTab === 'shipping' && (
        <section className="space-y-8">
          <div className="bg-white p-8 border border-gray-200 hover:border-metallic-gold/50 transition-colors">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-headline-md text-regal-navy font-bold text-xl">Global Shipping Zones</h3>
              <button 
                onClick={() => {
                  const name = prompt('Enter Zone Name:')
                  if (!name) return
                  const regions = prompt('Enter Regions:')
                  if (!regions) return
                  const rate = prompt('Enter Base Rate:')
                  if (!rate) return
                  createShippingMutation.mutate({ name, regions, baseRate: parseFloat(rate), isActive: true })
                }}
                className="bg-regal-navy text-white px-6 py-2 font-label-md uppercase text-xs tracking-widest hover:bg-regal-navy/90 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">add</span> Add Zone
              </button>
            </div>
            
            {isLoadingShipping ? (
              <div className="py-10 text-center text-metallic-gold"><span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span></div>
            ) : shippingZones.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No shipping zones configured yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-gray-200 font-label-md text-xs text-gray-500 uppercase tracking-widest">
                    <tr>
                      <th className="pb-4 px-4">Zone Name</th>
                      <th className="pb-4 px-4">Regions</th>
                      <th className="pb-4 px-4">Base Rate</th>
                      <th className="pb-4 px-4">Status</th>
                      <th className="pb-4 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-body-md">
                    {shippingZones.map((zone: any) => (
                      <tr key={zone.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-6 px-4 font-bold text-regal-navy">{zone.name}</td>
                        <td className="py-6 px-4 text-gray-600">{zone.regions}</td>
                        <td className="py-6 px-4 text-gray-600">₦{zone.baseRate.toLocaleString()}</td>
                        <td className="py-6 px-4">
                          {zone.isActive ? 
                            <span className="bg-green-100 text-green-800 px-3 py-1 text-xs font-bold uppercase tracking-tighter">Active</span> :
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs font-bold uppercase tracking-tighter">Inactive</span>
                          }
                        </td>
                        <td className="py-6 px-4 text-right">
                          <button 
                            onClick={() => setDeleteModal({ isOpen: true, type: 'shipping', id: zone.id, title: 'Delete Shipping Zone', message: `Are you sure you want to delete ${zone.name}? This cannot be undone.` })}
                            className="text-red-500 hover:text-red-700 font-label-md text-xs uppercase"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'users' && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoadingUsers ? (
            <div className="col-span-full py-10 text-center text-metallic-gold"><span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span></div>
          ) : (
            <>
              {adminUsers.map((user: any) => (
                <div key={user.id} className="bg-white border border-gray-200 p-6 flex items-start gap-4 hover:border-metallic-gold/50 transition-colors">
                  <div className="w-16 h-16 bg-gray-100 border border-metallic-gold/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-400 text-3xl">person</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-headline-md text-regal-navy font-bold leading-none mb-1 text-lg">{user.firstName} {user.lastName}</h4>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">{user.email}</p>
                    <button 
                      onClick={() => setDeleteModal({ isOpen: true, type: 'user', id: user.id, title: 'Revoke Admin Access', message: `Are you sure you want to revoke admin privileges for ${user.firstName}? They will be downgraded to a regular customer.` })}
                      className="text-red-500 border border-red-200 w-full py-2 font-label-md text-xs uppercase hover:bg-red-50 transition-all"
                    >
                      Revoke Access
                    </button>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => {
                  const email = prompt('Enter User Email:')
                  if (!email) return
                  const firstName = prompt('Enter First Name:')
                  if (!firstName) return
                  const lastName = prompt('Enter Last Name:')
                  if (!lastName) return
                  inviteUserMutation.mutate({ email, firstName, lastName })
                }}
                className="bg-gray-50 border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center gap-4 text-gray-500 hover:border-metallic-gold hover:text-metallic-gold transition-all group min-h-[160px]"
              >
                <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-metallic-gold transition-colors">person_add</span>
                <span className="font-label-md text-xs uppercase tracking-widest font-bold">Invite Administrator</span>
              </button>
            </>
          )}
        </section>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-10 right-10 bg-regal-navy text-metallic-gold px-8 py-4 flex items-center gap-4 transition-all duration-500 z-50 border border-metallic-gold shadow-2xl animate-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-md text-sm uppercase tracking-widest">{toastMessage}</span>
        </div>
      )}

      {/* Shared Delete Modal */}
      <ConfirmDeleteModal 
        isOpen={deleteModal.isOpen}
        title={deleteModal.title}
        message={deleteModal.message}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        isDeleting={deleteShippingMutation.isPending || deleteUserMutation.isPending}
      />
    </div>
  )
}
