import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'

export const Route = createFileRoute('/admin/settings')({
  component: Settings,
})

function Settings() {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState('general')
  const [showToast, setShowToast] = useState(false)

  const [formData, setFormData] = useState({
    storeName: '',
    supportEmail: '',
    contactPhone: '',
    storeAddress: '',
    taxRate: 0,
    currency: 'NGN',
    enablePromotions: false,
    promoBannerText: ''
  })

  const { data, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => api.adminGetSettings()
  })

  useEffect(() => {
    if (data) {
      setFormData({
        storeName: data.storeName || '',
        supportEmail: data.supportEmail || '',
        contactPhone: data.contactPhone || '',
        storeAddress: data.storeAddress || '',
        taxRate: data.taxRate || 0,
        currency: data.currency || 'NGN',
        enablePromotions: data.enablePromotions || false,
        promoBannerText: data.promoBannerText || ''
      })
    }
  }, [data])

  const updateMutation = useMutation({
    mutationFn: (newSettings: any) => api.adminUpdateSettings(newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] })
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  })

  const handleSave = () => {
    updateMutation.mutate(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    }))
  }

  return (
    <div className="max-w-7xl mx-auto relative">

      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-2 text-3xl font-bold">Portal Settings</h2>
        <p className="text-gray-500 font-body-md max-w-2xl">Configure your Roymall Scents experience. Manage global store attributes, financial integrations, and team access from a centralized dashboard.</p>
      </div>

      {/* Settings Tabs */}
      <div className="flex gap-10 border-b border-gray-200 mb-10 overflow-x-auto no-scrollbar">
        <button 
          className={`relative pb-4 font-label-md text-label-md transition-all ${activeTab === 'general' ? 'text-metallic-gold' : 'text-gray-500 hover:text-regal-navy'}`}
          onClick={() => setActiveTab('general')}
        >
          GENERAL STORE SETTINGS
          {activeTab === 'general' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-metallic-gold"></div>}
        </button>
        <button 
          className={`relative pb-4 font-label-md text-label-md transition-all ${activeTab === 'payments' ? 'text-metallic-gold' : 'text-gray-500 hover:text-regal-navy'}`}
          onClick={() => setActiveTab('payments')}
        >
          PAYMENT GATEWAYS
          {activeTab === 'payments' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-metallic-gold"></div>}
        </button>
        <button 
          className={`relative pb-4 font-label-md text-label-md transition-all ${activeTab === 'shipping' ? 'text-metallic-gold' : 'text-gray-500 hover:text-regal-navy'}`}
          onClick={() => setActiveTab('shipping')}
        >
          SHIPPING RULES
          {activeTab === 'shipping' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-metallic-gold"></div>}
        </button>
        <button 
          className={`relative pb-4 font-label-md text-label-md transition-all ${activeTab === 'users' ? 'text-metallic-gold' : 'text-gray-500 hover:text-regal-navy'}`}
          onClick={() => setActiveTab('users')}
        >
          ADMIN USERS
          {activeTab === 'users' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-metallic-gold"></div>}
        </button>
      </div>

      {/* General Settings Panel */}
      {activeTab === 'general' && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {isLoading && <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 font-bold text-regal-navy">Loading...</div>}
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
                    <select name="currency" value={formData.currency} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold focus:ring-0 px-4 py-3 font-body-md appearance-none outline-none">
                      <option value="EUR">Euro (€)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="NGN">Nigerian Naira (₦)</option>
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
                onClick={handleSave}
                disabled={updateMutation.isPending}
                className="bg-regal-navy text-metallic-gold px-10 py-4 font-label-md uppercase tracking-widest hover:bg-regal-navy/90 transition-all active:scale-95 shadow-lg disabled:opacity-70 flex items-center gap-2"
              >
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
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
            <div className="border border-metallic-gold/20 p-8 bg-white">
              <h4 className="font-label-md text-regal-navy uppercase tracking-widest mb-4 font-bold">Maintenance Mode</h4>
              <p className="text-gray-500 text-sm mb-6">Take the entire storefront offline for critical updates or private events.</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input className="sr-only peer" type="checkbox"/>
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-regal-navy"></div>
                <span className="ml-3 text-sm font-medium text-gray-500 uppercase tracking-widest">Offline</span>
              </label>
            </div>
          </div>
        </section>
      )}

      {/* Payments Panel */}
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
                    <span className="text-green-600 text-xs font-bold uppercase tracking-widest">Connected</span>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-red-500 transition-colors">
                  <span className="material-symbols-outlined">settings</span>
                </button>
              </div>
              <p className="text-gray-500 mb-6 text-sm">Handle all credit card transactions and subscription billing with bank-level security.</p>
              <div className="bg-gray-50 p-4 border border-metallic-gold/10">
                <div className="flex justify-between text-xs font-label-md text-gray-500 uppercase mb-2">
                  <span>Key Type</span>
                  <span>Last Sync</span>
                </div>
                <div className="flex justify-between font-mono text-sm text-regal-navy">
                  <span>sk_live_****_9821</span>
                  <span>2 mins ago</span>
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
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Available</span>
                  </div>
                </div>
                <button className="text-metallic-gold border border-metallic-gold px-4 py-1 font-label-md text-xs uppercase hover:bg-metallic-gold hover:text-white transition-all">Enable</button>
              </div>
              <p className="text-gray-500 mb-6 text-sm">Offer customers a secondary secure checkout method using their global PayPal account.</p>
              <div className="opacity-50 grayscale select-none bg-gray-50 p-4 border border-gray-200">
                <div className="h-4 w-1/2 bg-gray-200 mb-2"></div>
                <div className="h-4 w-full bg-gray-100"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-8 hover:border-metallic-gold/50 transition-colors">
            <h3 className="font-headline-md text-regal-navy mb-6 font-bold text-xl">Payment Thresholds & Fees</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Min Transaction (₦)</label>
                <input className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold focus:ring-0 px-4 py-3 font-body-md outline-none" type="number" defaultValue="2500.00"/>
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Max Transaction (₦)</label>
                <input className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold focus:ring-0 px-4 py-3 font-body-md outline-none" type="number" defaultValue="5000000.00"/>
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs uppercase tracking-widest text-gray-500">Service Fee (%)</label>
                <input className="w-full bg-gray-50 border border-gray-200 focus:border-metallic-gold focus:ring-0 px-4 py-3 font-body-md outline-none" type="number" defaultValue="0.00"/>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Shipping Rules Panel */}
      {activeTab === 'shipping' && (
        <section className="space-y-8">
          <div className="bg-white p-8 border border-gray-200 hover:border-metallic-gold/50 transition-colors">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-headline-md text-regal-navy font-bold text-xl">Global Shipping Zones</h3>
              <button className="bg-regal-navy text-white px-6 py-2 font-label-md uppercase text-xs tracking-widest hover:bg-regal-navy/90 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">add</span> Add Zone
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-200 font-label-md text-xs text-gray-500 uppercase tracking-widest">
                  <tr>
                    <th className="pb-4 px-4">Zone Name</th>
                    <th className="pb-4 px-4">Regions</th>
                    <th className="pb-4 px-4">Base Rate</th>
                    <th className="pb-4 px-4">Status</th>
                    <th className="pb-4 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-body-md">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-4 font-bold text-regal-navy">Lagos State</td>
                    <td className="py-6 px-4 text-gray-600">Lagos Only</td>
                    <td className="py-6 px-4 text-gray-600">₦2,500.00</td>
                    <td className="py-6 px-4"><span className="bg-green-100 text-green-800 px-3 py-1 text-xs font-bold uppercase tracking-tighter">Active</span></td>
                    <td className="py-6 px-4">
                      <button className="text-metallic-gold hover:underline font-label-md text-xs uppercase">Edit</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-4 font-bold text-regal-navy">South West</td>
                    <td className="py-6 px-4 text-gray-600">Ogun, Oyo, Osun, Ondo, Ekiti</td>
                    <td className="py-6 px-4 text-gray-600">₦4,500.00</td>
                    <td className="py-6 px-4"><span className="bg-green-100 text-green-800 px-3 py-1 text-xs font-bold uppercase tracking-tighter">Active</span></td>
                    <td className="py-6 px-4">
                      <button className="text-metallic-gold hover:underline font-label-md text-xs uppercase">Edit</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-4 font-bold text-regal-navy">Rest of Nigeria</td>
                    <td className="py-6 px-4 text-gray-600">All other states</td>
                    <td className="py-6 px-4 text-gray-600">₦7,000.00</td>
                    <td className="py-6 px-4"><span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs font-bold uppercase tracking-tighter">Inactive</span></td>
                    <td className="py-6 px-4">
                      <button className="text-metallic-gold hover:underline font-label-md text-xs uppercase">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Admin Users Panel */}
      {activeTab === 'users' && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 p-6 flex items-start gap-4 hover:border-metallic-gold/50 transition-colors">
            <div className="w-16 h-16 border border-metallic-gold/30">
              <img className="w-full h-full object-cover" alt="Elena Moretti" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-sjbe90xXyKGn4LbHyrT1imOw_myMunm1SmmLr4AdHCueI9Xkv1aKFNlJKDwWD6-922g4Myi8FvcMxt2lyVz0qSoVmZinTEQfVJxgZbHDVUynHNwfifG30letIObquToV3oIGL-gQVX5lCH-3ZRTRo6f9KFpuvLJztP8Z1RBf_bSu3eI9DZJtypvYDPk9bbGrD2ZeTpgUf_0hkD9pXG_YNfp3m7xZo7Fzsfa6m8gGS7PNOnrBlTK2"/>
            </div>
            <div className="flex-grow">
              <h4 className="font-headline-md text-regal-navy font-bold leading-none mb-1 text-lg">Elena Moretti</h4>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Operations Lead</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-[10px] text-gray-500 uppercase font-bold">Online Now</span>
              </div>
              <button className="text-metallic-gold border border-metallic-gold/30 w-full py-2 font-label-md text-xs uppercase hover:bg-metallic-gold hover:text-white transition-all">Manage Permissions</button>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 flex items-start gap-4 hover:border-metallic-gold/50 transition-colors">
            <div className="w-16 h-16 border border-metallic-gold/30">
              <img className="w-full h-full object-cover" alt="Julian Thorne" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBadiABQ9Jri5cikGsp0llL_ZpJyA0NU8Sk9CSfEs3MQGzC6s6cmi8pWpUzRRHnh4SPu0_4sPM9eIDnrwv6qisVSxhR_z7sq-320u6oVckK3WNW8i2LDr4kITXfgQXnPg2xqHmOnbbEPXPDmJzDPZNlFoGKkuLQjxA-rDIzYkBIMNHKfKTnlFRwwO3hRyetosJHRTFJl4JjacnwEZdPiwLKNy25MjzWwad4A-nHLouhx4kmu1b4XEH2"/>
            </div>
            <div className="flex-grow">
              <h4 className="font-headline-md text-regal-navy font-bold leading-none mb-1 text-lg">Julian Thorne</h4>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Inventory Manager</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span className="text-[10px] text-gray-500 uppercase font-bold">Offline (2h ago)</span>
              </div>
              <button className="text-metallic-gold border border-metallic-gold/30 w-full py-2 font-label-md text-xs uppercase hover:bg-metallic-gold hover:text-white transition-all">Manage Permissions</button>
            </div>
          </div>
          
          <button className="bg-gray-50 border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center gap-4 text-gray-500 hover:border-metallic-gold hover:text-metallic-gold transition-all group">
            <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-metallic-gold transition-colors">person_add</span>
            <span className="font-label-md text-xs uppercase tracking-widest font-bold">Invite Administrator</span>
          </button>
        </section>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-10 right-10 bg-regal-navy text-metallic-gold px-8 py-4 flex items-center gap-4 transition-all duration-500 z-50 border border-metallic-gold shadow-2xl animate-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-md text-sm uppercase tracking-widest">Settings updated successfully</span>
        </div>
      )}
    </div>
  )
}
