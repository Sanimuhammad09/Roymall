import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

type AccountSearch = {
  tab?: string
}

export const Route = createFileRoute('/_storefront/account')({
  validateSearch: (search: Record<string, unknown>): AccountSearch => {
    return {
      tab: (search.tab as string) || 'orders',
    }
  },
  component: Account,
})

function Account() {
  const { tab } = Route.useSearch()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTabChange = (newTab: string) => {
    navigate({ to: '/account', search: { tab: newTab } })
  }

  return (
    <main className="pt-32 pb-[120px] max-w-[1440px] mx-auto px-6 md:px-16">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 sticky top-[100px] h-fit">
          <div className="mb-12">
            <h2 className="text-headline-md font-headline-md mb-2 text-regal-navy">Welcome, Alexander</h2>
            <p className="text-label-md text-on-surface-variant opacity-70">Exclusive Member</p>
          </div>
          <nav className="flex flex-col space-y-2">
            <button 
              onClick={() => handleTabChange('orders')}
              className={`flex items-center space-x-4 py-3 px-4 rounded-sm transition-all text-left ${tab === 'orders' ? 'border-r-[3px] border-metallic-gold bg-gradient-to-r from-transparent to-metallic-gold/5 text-regal-navy font-bold' : 'text-on-surface-variant hover:bg-soft-cream hover:translate-x-1 group'}`}
            >
              <span className={`material-symbols-outlined ${tab === 'orders' ? 'text-metallic-gold' : 'text-outline group-hover:text-regal-navy'}`}>package_2</span>
              <span className="text-body-md font-body-md">Orders &amp; Dashboard</span>
            </button>
            <button 
              onClick={() => handleTabChange('addresses')}
              className={`flex items-center space-x-4 py-3 px-4 rounded-sm transition-all text-left ${tab === 'addresses' ? 'bg-regal-navy text-metallic-gold font-bold translate-x-1' : 'text-on-surface-variant hover:bg-soft-cream hover:translate-x-1 group'}`}
            >
              <span className={`material-symbols-outlined ${tab === 'addresses' ? '' : 'text-outline group-hover:text-regal-navy'}`} style={tab === 'addresses' ? { fontVariationSettings: "'FILL' 1" } : {}}>location_on</span>
              <span className="text-body-md font-body-md">Addresses</span>
            </button>
            <button 
              onClick={() => handleTabChange('wishlist')}
              className={`flex items-center space-x-4 py-3 px-4 rounded-sm transition-all text-left ${tab === 'wishlist' ? 'bg-regal-navy text-metallic-gold font-bold translate-x-1' : 'text-on-surface-variant hover:bg-soft-cream hover:translate-x-1 group'}`}
            >
              <span className={`material-symbols-outlined ${tab === 'wishlist' ? '' : 'text-outline group-hover:text-regal-navy'}`} style={tab === 'wishlist' ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
              <span className="text-body-md font-body-md">Wishlist</span>
            </button>
            <button 
              onClick={() => handleTabChange('details')}
              className={`flex items-center space-x-4 py-3 px-4 rounded-sm transition-all text-left ${tab === 'details' ? 'bg-regal-navy text-metallic-gold font-bold translate-x-1' : 'text-on-surface-variant hover:bg-soft-cream hover:translate-x-1 group'}`}
            >
              <span className={`material-symbols-outlined ${tab === 'details' ? '' : 'text-outline group-hover:text-regal-navy'}`} style={tab === 'details' ? { fontVariationSettings: "'FILL' 1" } : {}}>person</span>
              <span className="text-body-md font-body-md">Details</span>
            </button>
            <div className="pt-8 border-t border-muted-gold/10 mt-4">
              <Link className="flex items-center space-x-4 py-3 px-4 rounded-sm hover:bg-soft-cream transition-all text-left group" to="/">
                <span className="material-symbols-outlined text-error">logout</span>
                <span className="text-body-md font-body-md text-error">Sign Out</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <section className="flex-grow">
          {tab === 'orders' && (
            <>
              <div className="flex justify-between items-end mb-10">
                <h3 className="text-headline-lg font-headline-lg text-regal-navy">Recent Orders</h3>
                <button onClick={() => handleTabChange('history')} className="text-label-md font-label-md border-b border-metallic-gold pb-1 hover:text-metallic-gold transition-all">View All History</button>
              </div>

              {/* Order List */}
              <div className="space-y-8">
                <div className="bg-white border border-muted-gold/10 p-8 group transition-all duration-500 hover:shadow-xl hover:shadow-regal-navy/5">
                  <div className="flex flex-col md:flex-row justify-between mb-8 gap-6">
                    <div className="flex gap-6">
                      <div className="w-32 h-32 bg-soft-cream flex-shrink-0">
                        <img className="w-full h-full object-cover" alt="Oud Royale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd_AphXFJ6JPWCldDhn9DpoaPiHYLjmk_1iQZEEuTEhTqHdQVlje8ZsE5AxNucIcBsproMIeby25jUjy5xzTrUU5ZJWy2XBEghkyl1YzI5D355Vt8dNrdt68f_FTh5FS8CaR5-46-zXHLVsxf6La8NgBAuute4GYndMB1Z9g2hmObUcyeNSe_x4frjCeAWtf6k3o1ZPEr1rK119ngUYJoSTkS5SoYLwbFQ1_IJWGiwWCFs9lyXW4RQ"/>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-label-md text-metallic-gold mb-1">ORDER #RS-882941</span>
                        <h4 className="text-headline-md font-headline-md mb-2">Oud Royale Extrait de Parfum</h4>
                        <p className="text-body-md text-on-surface-variant italic">Ordered on Dec 12, 2024 • 100ml</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center">
                      <p className="text-price-lg font-price-lg text-regal-navy">₦320,000</p>
                      <span className="inline-flex items-center px-3 py-1 mt-2 text-xs font-bold uppercase tracking-widest bg-yellow-100 text-yellow-800">
                        In Transit
                      </span>
                    </div>
                  </div>
                  {/* Tracking */}
                  <div className="relative pt-8 px-4">
                    <div className="absolute top-[3.25rem] left-8 right-8 h-[2px] bg-gray-200">
                      <div className="h-full bg-metallic-gold w-[66%]"></div>
                    </div>
                    <div className="relative z-10 flex justify-between">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-metallic-gold text-white flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-[20px]">check</span>
                        </div>
                        <span className="text-label-md font-bold text-regal-navy">Confirmed</span>
                        <span className="text-[11px] text-on-surface-variant">Dec 12, 10:30 AM</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-metallic-gold text-white flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-[20px]">check</span>
                        </div>
                        <span className="text-label-md font-bold text-regal-navy">Shipped</span>
                        <span className="text-[11px] text-on-surface-variant">Dec 13, 04:15 PM</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-metallic-gold text-white flex items-center justify-center mb-3 outline outline-8 outline-soft-cream">
                          <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                        </div>
                        <span className="text-label-md font-bold text-regal-navy">In Transit</span>
                        <span className="text-[11px] text-on-surface-variant italic">ETA: Tomorrow</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                        </div>
                        <span className="text-label-md text-gray-400">Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === 'history' && (
            <>
              <div className="mb-8">
                <h1 className="font-headline-lg text-headline-lg text-regal-navy mb-2">Order History</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Manage your past olfactory investments. View details, tracking info, and reorder your favorite scents.</p>
              </div>

              {/* Orders Table Container */}
              <div className="bg-white border border-gray-300 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-regal-navy text-metallic-gold">
                      <th className="p-6 font-label-md text-label-md uppercase tracking-wider">Order ID</th>
                      <th className="p-6 font-label-md text-label-md uppercase tracking-wider">Date</th>
                      <th className="p-6 font-label-md text-label-md uppercase tracking-wider">Status</th>
                      <th className="p-6 font-label-md text-label-md uppercase tracking-wider">Total</th>
                      <th className="p-6 font-label-md text-label-md uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr className="hover:bg-soft-cream transition-colors group">
                      <td className="p-6 font-body-md text-body-md text-regal-navy font-bold">#RS-892401</td>
                      <td className="p-6 font-body-md text-body-md text-on-surface-variant">October 24, 2024</td>
                      <td className="p-6">
                        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-[12px] font-bold uppercase tracking-tighter">Delivered</span>
                      </td>
                      <td className="p-6 font-price-lg text-price-lg text-regal-navy">₦84,500</td>
                      <td className="p-6 text-right">
                        <button className="px-6 py-2 border border-regal-navy text-regal-navy font-label-md text-label-md uppercase hover:bg-regal-navy hover:text-metallic-gold transition-all duration-300">View Details</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-soft-cream transition-colors group">
                      <td className="p-6 font-body-md text-body-md text-regal-navy font-bold">#RS-883112</td>
                      <td className="p-6 font-body-md text-body-md text-on-surface-variant">September 12, 2024</td>
                      <td className="p-6">
                        <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-[12px] font-bold uppercase tracking-tighter">In Transit</span>
                      </td>
                      <td className="p-6 font-price-lg text-price-lg text-regal-navy">₦120,000</td>
                      <td className="p-6 text-right">
                        <button className="px-6 py-2 border border-regal-navy text-regal-navy font-label-md text-label-md uppercase hover:bg-regal-navy hover:text-metallic-gold transition-all duration-300">View Details</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-soft-cream transition-colors group">
                      <td className="p-6 font-body-md text-body-md text-regal-navy font-bold">#RS-879004</td>
                      <td className="p-6 font-body-md text-body-md text-on-surface-variant">August 05, 2024</td>
                      <td className="p-6">
                        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-[12px] font-bold uppercase tracking-tighter">Delivered</span>
                      </td>
                      <td className="p-6 font-price-lg text-price-lg text-regal-navy">₦45,200</td>
                      <td className="p-6 text-right">
                        <button className="px-6 py-2 border border-regal-navy text-regal-navy font-label-md text-label-md uppercase hover:bg-regal-navy hover:text-metallic-gold transition-all duration-300">View Details</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-soft-cream transition-colors group">
                      <td className="p-6 font-body-md text-body-md text-regal-navy font-bold">#RS-865221</td>
                      <td className="p-6 font-body-md text-body-md text-on-surface-variant">July 20, 2024</td>
                      <td className="p-6">
                        <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 text-[12px] font-bold uppercase tracking-tighter">Cancelled</span>
                      </td>
                      <td className="p-6 font-price-lg text-price-lg text-regal-navy">₦68,000</td>
                      <td className="p-6 text-right">
                        <button className="px-6 py-2 border border-regal-navy text-regal-navy font-label-md text-label-md uppercase hover:bg-regal-navy hover:text-metallic-gold transition-all duration-300">View Details</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Empty State / Promotions Area */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative overflow-hidden group cursor-pointer border border-metallic-gold/20 h-80">
                  <div className="absolute inset-0 bg-regal-navy/40 group-hover:bg-regal-navy/20 transition-all duration-500 z-10"></div>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAroG5gGojVh9jGlQvKqXR1zyoEHS6etZx_3z6_v_eLtYhDRYu93VGDrWXeV9hHZl7yP5FERAkt0MC3yeRK4-X-QFeXCfBI47IE6QGpZ3AeeWHo_t6gE8M4gvJOiLiWb2EyXw7FfMEAtUhoDajydrtyRfL2XzMPREX-4MjyxhwI_AkDJA6Hha-f4cSJ3cNy0E4L95vKiQmGfQSWsZpbUm95PE56S_nofMFAxu-O4z7KgpJL4IZ8aBU')" }}></div>
                  <div className="absolute bottom-0 left-0 p-8 z-20">
                    <h3 className="font-headline-md text-headline-md text-white mb-2">Restock Favorites</h3>
                    <p className="font-body-md text-body-md text-soft-cream/80 mb-4">Never run out of your signature scent.</p>
                    <button className="font-label-md text-label-md uppercase text-metallic-gold border-b border-metallic-gold pb-1 tracking-widest hover:text-white hover:border-white transition-colors">Shop Collection</button>
                  </div>
                </div>
                <div className="relative overflow-hidden group cursor-pointer border border-metallic-gold/20 h-80">
                  <div className="absolute inset-0 bg-regal-navy/40 group-hover:bg-regal-navy/20 transition-all duration-500 z-10"></div>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBCdg2UTrBFHxW_po8zQBOoOM-QDBeC6SPwyPRdG8G8T03sTLOIieLV1UiF_3HrsyWKNchqmhAxya0CwoL0J_EamIpQQiINabQSofGEFqNicZ7v_Qy4aPnSnMLY2mar7bGO5CklayZRml3kNcqR--4mZAdA4xoh_RomTt-Nu6_mraZlo-6GTMmSRLoqElWDyoqFy4LPBXofBieMHrD6-0C-tfDWT6gd24sZmy3NsVtzanGfI0VmFSKE')" }}></div>
                  <div className="absolute bottom-0 left-0 p-8 z-20">
                    <h3 className="font-headline-md text-headline-md text-white mb-2">Exclusive Discovery</h3>
                    <p className="font-body-md text-body-md text-soft-cream/80 mb-4">Sample the new winter collection.</p>
                    <button className="font-label-md text-label-md uppercase text-metallic-gold border-b border-metallic-gold pb-1 tracking-widest hover:text-white hover:border-white transition-colors">Explore Now</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === 'addresses' && (
            <>
              <header className="mb-12">
                <h1 className="font-headline-lg text-headline-lg text-regal-navy mb-2">My Addresses</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Manage your delivery and billing preferences for a seamless luxury shopping experience.</p>
              </header>
              
              {/* Address Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Default Shipping Address */}
                <div className="group relative bg-white p-8 border border-gray-300 hover:border-metallic-gold transition-colors duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-regal-navy text-metallic-gold px-3 py-1 font-label-md text-label-md uppercase tracking-wider">Default Shipping</span>
                    <div className="flex gap-4">
                      <button className="text-on-surface-variant hover:text-regal-navy transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="text-on-surface-variant hover:text-error transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-headline-md text-headline-md text-regal-navy mb-4">Julian Thorne</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">1224 Fragrance Way, Suite 400</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">Beverly Hills, CA 90210</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">United States</p>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-4">+1 (310) 555-0198</p>
                  </div>
                </div>

                {/* Default Billing Address */}
                <div className="group relative bg-white p-8 border border-gray-300 hover:border-metallic-gold transition-colors duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-gray-200 text-on-surface-variant px-3 py-1 font-label-md text-label-md uppercase tracking-wider">Default Billing</span>
                    <div className="flex gap-4">
                      <button className="text-on-surface-variant hover:text-regal-navy transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="text-on-surface-variant hover:text-error transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-headline-md text-headline-md text-regal-navy mb-4">Julian Thorne</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">1224 Fragrance Way, Suite 400</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">Beverly Hills, CA 90210</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">United States</p>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-4">+1 (310) 555-0198</p>
                  </div>
                </div>

                {/* Add New Address Trigger */}
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 hover:border-metallic-gold hover:bg-soft-cream group transition-all duration-300 lg:col-span-2 min-h-[200px]"
                >
                  <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-metallic-gold mb-4">add_location</span>
                  <span className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant group-hover:text-regal-navy">Add New Address</span>
                </button>
              </div>
            </>
          )}

          {tab === 'wishlist' && (
            <>
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h1 className="font-headline-lg text-headline-lg text-regal-navy mb-2">Saved Fragrances</h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">Curate your personal scent collection. Review your favorites and add them to your signature rotation.</p>
                </div>
                <div className="hidden lg:block">
                  <button className="bg-regal-navy text-white px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-[#001b44]/90 transition-colors">Add All To Bag</button>
                </div>
              </div>
              
              {/* Wishlist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {/* Product Card 1 */}
                <div className="group relative flex flex-col">
                  <div className="relative overflow-hidden bg-soft-cream aspect-[4/5] mb-6 border border-transparent hover:border-metallic-gold/30 transition-all">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Midnight Oud" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGgMyyUyYwanPVuvgcbIHjUHtKy24cwU1Xt6PlP6nWhoKzcW9S7NxPt3Ctud5lR6vYDSbeu-KrfmbrZXuUIECEJNScIMPavNXiv9L28K-T6Wt_MxgaTF9zYRcP9NvaibOK4-qcqVKXU9iAMwLwGTViN_iXpdlksWdsYu76ljgwAcvqbizuFTDuQg-qKPg02_7RkThQWdINjM2zHwLLXP_RZuU95wJuqdyuNiBnq2xZDEEkNFNdfHSs"/>
                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-regal-navy hover:text-error transition-colors">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                    <div className="absolute inset-0 bg-regal-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <button className="w-full bg-regal-navy text-metallic-gold py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-[#001b44]/90 transition-colors">Add to Bag</button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-label-md text-label-md text-metallic-gold uppercase mb-1">Eau De Parfum</p>
                    <h3 className="font-headline-md text-headline-md text-regal-navy mb-2">Midnight Oud</h3>
                    <p className="font-price-lg text-price-lg text-regal-navy">₦ 85,000</p>
                  </div>
                </div>
                
                {/* Product Card 2 */}
                <div className="group relative flex flex-col">
                  <div className="relative overflow-hidden bg-soft-cream aspect-[4/5] mb-6 border border-transparent hover:border-metallic-gold/30 transition-all">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Velvet Rose" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuS2oY1h1Inz5E2RC6MKfOno8lBmQhWf-SeLM9i4J6vHENJOebjP86_ZAm-M3e2LtCKB65Ot1uagleC1etjiEB4SRRnai-2n6mbKMZ1oBhsiUqCx_VZtszS3FLgUTF14mTdnEOhf0ddj06lmS0KsWs2LPiJghJ5WptO_3T6SlxdNq98ONpnVwqXdPCIvQ3BU6i-TZfIVPKQSVD4d45Cg1gzXOiCEJaBnCEQwHKN5enrgGpATpPQfVr"/>
                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-regal-navy hover:text-error transition-colors">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                    <div className="absolute inset-0 bg-regal-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <button className="w-full bg-regal-navy text-metallic-gold py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-[#001b44]/90 transition-colors">Add to Bag</button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-label-md text-label-md text-metallic-gold uppercase mb-1">Essence de Royale</p>
                    <h3 className="font-headline-md text-headline-md text-regal-navy mb-2">Velvet Rose</h3>
                    <p className="font-price-lg text-price-lg text-regal-navy">₦ 62,500</p>
                  </div>
                </div>

                {/* Product Card 3 */}
                <div className="group relative flex flex-col">
                  <div className="relative overflow-hidden bg-soft-cream aspect-[4/5] mb-6 border border-transparent hover:border-metallic-gold/30 transition-all">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Saffron Gold" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBDPK4EDu6_ycBGiBm-EA1Kdc-8B6C6CgwUGjIjhshEJ-ZVzYtpcu6fwMos6tg5G2r2zakCawFdfu_YdxB_4VazfKhzQc2A7qeeSYhLpMKOctJAHRuiq3PWuPCDsRSSQsBxuxBzoHInygl-Tloja5dHERZR19S8LTXd_1h9rupQu0jRCTyB2yHnqB-erqFaEQk1bNc8WMMlJo6Ka0yxDV7T9AfaCnNjdV_btbWjXVuTsfWDGo1TFUy"/>
                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-regal-navy hover:text-error transition-colors">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                    <div className="absolute inset-0 bg-regal-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <button className="w-full bg-regal-navy text-metallic-gold py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-[#001b44]/90 transition-colors">Add to Bag</button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-label-md text-label-md text-metallic-gold uppercase mb-1">Luxury Collection</p>
                    <h3 className="font-headline-md text-headline-md text-regal-navy mb-2">Saffron Gold</h3>
                    <p className="font-price-lg text-price-lg text-regal-navy">₦ 120,000</p>
                  </div>
                </div>

                {/* Product Card 4 */}
                <div className="group relative flex flex-col">
                  <div className="relative overflow-hidden bg-soft-cream aspect-[4/5] mb-6 border border-transparent hover:border-metallic-gold/30 transition-all">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Morning Jasmine" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsavjE5ezrm5-aJ1U1ctCohP5LYAwOGC7BDJ8SyUBmtd1whrfnNdmqPs_TBv86bXS74wBBewrAjznnp21XaV1iSRxdYaDrlDCWXHKhTcXuLFYmphyCOIJ-O5n4gRU-GlSWhx3sEKPcrpJJm6d_k7cEeJlyocRdltiH4nKEye7UZ2SI1CK63xJm2e8dGw7UQnUbBPYfp_uLFitUZJNP2YZeTXJg7kaAP_hfCTCF9fg0URl-VGWnH4Pg"/>
                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-regal-navy hover:text-error transition-colors">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                    <div className="absolute inset-0 bg-regal-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <button className="w-full bg-regal-navy text-metallic-gold py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-[#001b44]/90 transition-colors">Add to Bag</button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-label-md text-label-md text-metallic-gold uppercase mb-1">Daytime Fresh</p>
                    <h3 className="font-headline-md text-headline-md text-regal-navy mb-2">Morning Jasmine</h3>
                    <p className="font-price-lg text-price-lg text-regal-navy">₦ 45,000</p>
                  </div>
                </div>
              </div>

              {/* Recommendation Section (Bento Style) */}
              <div className="mt-32">
                <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-8">You May Also Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-8 h-[600px]">
                  <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-regal-navy">
                    <img className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110" alt="The Artisan Series" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKBk9Rpnuxc66T1Avcll9eCRuPfRu4wVUUB5UL2mNEL50q5Vu56bJ_usHeHHNP2lvLvHWDxs7_YhOHJGx7pWBzaoyVeOJmOlXZVmJilqB0BxBsL4xbGhI1NM79Sx4pWhUKiu4m3V_Oaxf-ivUGglNkh5to0UnCxE6Sgkj37VW9iJy8HRpMO0IVKuQooqUvi7vjUlmjX_ZyblMXWG0P0i9PySuDuG0_VWl5Y23T6b_2Ik5h_sKrAy0_"/>
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <h4 className="font-headline-lg text-headline-lg text-metallic-gold mb-4">The Artisan Series</h4>
                      <p className="text-white/80 font-body-lg text-body-lg mb-6 max-w-xs">Explore the craft behind our most exclusive extraits de parfum.</p>
                      <button className="w-fit border border-metallic-gold text-metallic-gold px-8 py-3 font-label-md text-label-md uppercase tracking-widest hover:bg-metallic-gold hover:text-regal-navy transition-all">Discover</button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden bg-soft-cream">
                    <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Fragrance Quiz" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ7dn_F4QzZAp_Q5fWcNt5lmLl-W5tlFR7BpJa3vk3Hl5uXgdG3zteYn9UaJR8m8Wipo-shId6hxk83uj3ZAL2u9Y7-tAx8o0qXEBZFIKbz3bNts8_uFJNXiZWtgeISbIGlB2bJOdEE9w7elwxBnDukJUdsLpRwx3nsyABfXIVltxj66jP_FcjDGssgWuBfBxTjWtp-KNOVwgWvN0zO5ad34DjCBBWub7cAMnxnvkV9C7kmeuyqfT5"/>
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <h4 className="font-headline-md text-headline-md text-white mb-2">Fragrance Quiz</h4>
                      <p className="text-white font-label-md text-label-md uppercase tracking-widest">Find Your Match</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden bg-gray-100">
                    <div className="p-6 h-full flex flex-col justify-between border border-gray-300">
                      <span className="material-symbols-outlined text-metallic-gold text-4xl">auto_awesome</span>
                      <div>
                        <h5 className="font-headline-md text-[18px] text-regal-navy mb-1">Refill Program</h5>
                        <p className="text-gray-500 font-label-md text-[12px] uppercase">Sustainable Luxury</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden bg-metallic-gold">
                    <div className="p-6 h-full flex flex-col justify-between text-regal-navy">
                      <span className="material-symbols-outlined text-4xl">card_membership</span>
                      <div>
                        <h5 className="font-headline-md text-[18px] mb-1">Privilege Club</h5>
                        <p className="font-label-md text-[12px] uppercase opacity-80">Join Now</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === 'details' && (
            <div className="max-w-2xl">
              <header className="mb-12">
                <h1 className="font-headline-lg text-headline-lg text-regal-navy mb-4">Account Details</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your personal information and security settings to customize your fragrance experience.</p>
              </header>

              {/* Personal Information Form */}
              <div className="mb-32">
                <div className="flex items-center gap-3 mb-8 border-b border-gray-300 pb-2">
                  <span className="material-symbols-outlined text-metallic-gold">badge</span>
                  <h3 className="font-headline-md text-headline-md text-regal-navy">Personal Information</h3>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest" htmlFor="first_name">First Name</label>
                    <input className="bg-transparent border-b border-gray-300 py-3 px-1 font-body-md text-body-md focus:outline-none focus:border-metallic-gold focus:shadow-[0_1px_0_0_#D4AF37] transition-all duration-300" id="first_name" name="first_name" type="text" defaultValue="Julian"/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest" htmlFor="last_name">Last Name</label>
                    <input className="bg-transparent border-b border-gray-300 py-3 px-1 font-body-md text-body-md focus:outline-none focus:border-metallic-gold focus:shadow-[0_1px_0_0_#D4AF37] transition-all duration-300" id="last_name" name="last_name" type="text" defaultValue="Sterling"/>
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest" htmlFor="email">Email Address</label>
                    <input className="bg-transparent border-b border-gray-300 py-3 px-1 font-body-md text-body-md focus:outline-none focus:border-metallic-gold focus:shadow-[0_1px_0_0_#D4AF37] transition-all duration-300" id="email" name="email" type="email" defaultValue="j.sterling@exclusive.com"/>
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest" htmlFor="phone">Phone Number</label>
                    <input className="bg-transparent border-b border-gray-300 py-3 px-1 font-body-md text-body-md focus:outline-none focus:border-metallic-gold focus:shadow-[0_1px_0_0_#D4AF37] transition-all duration-300" id="phone" name="phone" type="tel" defaultValue="+1 (555) 0123-4567"/>
                  </div>
                  <div className="mt-4">
                    <button className="bg-regal-navy text-white font-label-md text-label-md py-4 px-10 uppercase tracking-widest hover:bg-regal-navy/90 transition-all duration-300 active:scale-95" type="submit">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Password Change Form */}
              <div>
                <div className="flex items-center gap-3 mb-8 border-b border-gray-300 pb-2">
                  <span className="material-symbols-outlined text-metallic-gold">lock</span>
                  <h3 className="font-headline-md text-headline-md text-regal-navy">Security</h3>
                </div>
                <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest" htmlFor="current_password">Current Password</label>
                    <input className="bg-transparent border-b border-gray-300 py-3 px-1 font-body-md text-body-md focus:outline-none focus:border-metallic-gold focus:shadow-[0_1px_0_0_#D4AF37] transition-all duration-300" id="current_password" name="current_password" placeholder="••••••••••••" type="password"/>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest" htmlFor="new_password">New Password</label>
                      <input className="bg-transparent border-b border-gray-300 py-3 px-1 font-body-md text-body-md focus:outline-none focus:border-metallic-gold focus:shadow-[0_1px_0_0_#D4AF37] transition-all duration-300" id="new_password" name="new_password" type="password"/>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest" htmlFor="confirm_password">Confirm New Password</label>
                      <input className="bg-transparent border-b border-gray-300 py-3 px-1 font-body-md text-body-md focus:outline-none focus:border-metallic-gold focus:shadow-[0_1px_0_0_#D4AF37] transition-all duration-300" id="confirm_password" name="confirm_password" type="password"/>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="border border-metallic-gold text-metallic-gold font-label-md text-label-md py-4 px-10 uppercase tracking-widest hover:bg-metallic-gold hover:text-white transition-all duration-300 active:scale-95" type="submit">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              {/* Bento-style Membership Card */}
              <div className="mt-32 p-10 bg-regal-navy text-metallic-gold relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                <div className="relative z-10">
                  <span className="font-label-md text-label-md uppercase tracking-[0.3em] opacity-80">Roymall Scents Elite</span>
                  <h4 className="font-headline-lg text-headline-lg mt-2 text-white">Julian Sterling</h4>
                </div>
                <div className="relative z-10 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md uppercase opacity-60 text-white">Member Since</span>
                    <span className="font-body-lg text-body-lg text-white">Oct 2022</span>
                  </div>
                  <div className="text-right">
                    <span className="font-label-md text-label-md uppercase opacity-60 text-white">Current Points</span>
                    <span className="font-display-lg text-[48px] leading-none block text-metallic-gold">2,450</span>
                  </div>
                </div>
                {/* Decorative background accent */}
                <div className="absolute -right-10 -bottom-10 opacity-10">
                  <span className="material-symbols-outlined text-[300px]">loyalty</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* New Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-regal-navy/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-[#faf8fd] w-full max-w-2xl shadow-2xl p-10 transform transition-all">
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-headline-lg text-headline-lg text-regal-navy">New Address</h2>
              <button className="text-on-surface-variant hover:text-regal-navy" onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md uppercase text-on-surface-variant">First Name</label>
                  <input className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-metallic-gold font-body-md text-regal-navy" type="text"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md uppercase text-on-surface-variant">Last Name</label>
                  <input className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-metallic-gold font-body-md text-regal-navy" type="text"/>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md uppercase text-on-surface-variant">Street Address</label>
                <input className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-metallic-gold font-body-md text-regal-navy" type="text"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md uppercase text-on-surface-variant">City</label>
                  <input className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-metallic-gold font-body-md text-regal-navy" type="text"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md uppercase text-on-surface-variant">State / Province</label>
                  <input className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-metallic-gold font-body-md text-regal-navy" type="text"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md uppercase text-on-surface-variant">Postal Code</label>
                  <input className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-metallic-gold font-body-md text-regal-navy" type="text"/>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md uppercase text-on-surface-variant">Country</label>
                <select className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-metallic-gold font-body-md text-regal-navy appearance-none">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>France</option>
                  <option>Italy</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input className="w-4 h-4 text-regal-navy focus:ring-0 rounded-none border-gray-300" id="default-shipping" type="checkbox"/>
                <label className="font-body-md text-body-md text-on-surface-variant" htmlFor="default-shipping">Set as default shipping address</label>
              </div>
              <div className="pt-6">
                <button className="w-full bg-regal-navy text-metallic-gold py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-[#001b44]/90 transition-all" type="submit">Save Address</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
