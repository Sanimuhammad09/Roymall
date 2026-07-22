import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin/inventory')({
  component: Inventory,
})

function Inventory() {
  const [filter, setFilter] = useState('ALL')

  const inventoryItems = [
    {
      id: 'LE-MOD-001',
      name: 'Midnight Oud',
      category: 'Eau de Parfum',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH2qIwZ1ZEZuODI0wnnHdkbCMVeaq5R6OwcYh9fPIgGJsT3uuB9fMbCAAsf5o3E6GfLdl4iTxBaMARP3trGh_156_49b4zZt0QFQF_lOfl7nqhEE8WzIqJyAD2o1FUYSrJ3cQUhIp5VeDb9XQUdz0YL-Iai7kpZi4KFLra30sPSbn6PhFe2fvMVERaCWuevAjgxQf47dUslSBgs39MXZjaYRAUSeKTsiTqS-E74xRCxFda5waP_ZE2',
      stock: 124,
      status: 'In Stock',
      price: '₦185,000',
      color: 'bg-yellow-700',
      bgClass: 'bg-yellow-100',
      textClass: 'text-yellow-800'
    },
    {
      id: 'LE-RHF-042',
      name: 'Rasasi Hawas Fire',
      category: 'Extrait de Parfum',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg7lpyFICxEEL6nOXJiq3AVqW8qnv-0dyFZoiSSE4ZydUBnevwNriAPp5WiTei9R8dNnWyHTeACUVTX8A3hQICr_fgAQVlFwKvhYdILid5Xc-w-7ZIrSAzLrlfI0T9ev36yk2s1lz6JmMrXcSCJUfkvPNWKfY1uv5f9MnXmhq3Ymy04rRMUu-eCqQK5bnHVB0jpbnfXmvQypX3aijfAEnKjnDmU2ZX1_5h12NmK3e-GYW0TPM4x7Nl',
      stock: 8,
      status: 'Low Stock',
      price: '₦142,500',
      color: 'bg-red-500',
      bgClass: 'bg-red-100',
      textClass: 'text-red-800'
    },
    {
      id: 'LE-AMK-009',
      name: 'Ahmed Al Maghribi Kaaf',
      category: 'Eau de Parfum',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBATov0ZtcmfWMaWhRG-N-6MSQOObRsU1HVXXOI9ewYTKKrN36KBeTwBMBiO708ga5Lj-JLAXuyfDZ5ycMcp_-M5MenAC_aazczssU2LD9RT8OCrX9_n--JHfTbhDQJ4EqAr7FypZYuxl3_-KwCcjdm6SvFH77HDPseatWmnCJMzM8KBwHj_-wyjrKg5k47KlUVhFOdVLiD_teMPa-J2spaxCGezKr_uyvhkx_JKrsJF3palftU47k_',
      stock: 64,
      status: 'In Stock',
      price: '₦98,000',
      color: 'bg-yellow-700',
      bgClass: 'bg-yellow-100',
      textClass: 'text-yellow-800'
    },
    {
      id: 'LE-ISK-112',
      name: 'Imperial Silk',
      category: 'Special Edition',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrVt-4-ceNcSEfis-qEzfqi40DS55BWPi74m6-CxUkX0F5HBJ5RCRqutMK0_oermJI3t5OdhvUgoUsFiVeCAFl0TJxhJ3Qjt7UaCXga3TDspERI8_FR76AObCu4XTWIK_Q4NxiW_Ve_p2RmTDjus4lgT6dCVJqNLN3FRzfJ7wVIJOXLUY9S1tlvl3UMbnWRRh6ULgUn5lPynOeFNpV2mBmUrmpExyHN3qmSLuXsGmBYKJ0aBcf09G_',
      stock: 32,
      status: 'In Stock',
      price: '₦210,000',
      color: 'bg-yellow-700',
      bgClass: 'bg-yellow-100',
      textClass: 'text-yellow-800'
    }
  ]

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
        {/* Total Inventory Value */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Inventory Value</p>
            <span className="material-symbols-outlined text-metallic-gold">payments</span>
          </div>
          <h3 className="font-price-lg text-price-lg text-regal-navy font-bold text-2xl">₦84,290,000</h3>
          <p className="text-[12px] text-green-600 mt-2 flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +2.4% from last month
          </p>
        </div>

        {/* Total SKU */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Total SKU</p>
            <span className="material-symbols-outlined text-metallic-gold">inventory_2</span>
          </div>
          <h3 className="font-price-lg text-price-lg text-regal-navy font-bold text-2xl">1,240</h3>
          <p className="text-[12px] text-gray-500 mt-2">across 12 categories</p>
        </div>

        {/* Out of Stock */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Out of Stock</p>
            <span className="material-symbols-outlined text-red-600">warning</span>
          </div>
          <h3 className="font-price-lg text-price-lg text-red-600 font-bold text-2xl">14</h3>
          <p className="text-[12px] text-red-600 mt-2 font-medium">Urgent restock needed</p>
        </div>

        {/* Pending Arrivals */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">In Transit</p>
            <span className="material-symbols-outlined text-metallic-gold">local_shipping</span>
          </div>
          <h3 className="font-price-lg text-price-lg text-regal-navy font-bold text-2xl">42</h3>
          <p className="text-[12px] text-yellow-600 mt-2 font-medium">Expected by Friday</p>
        </div>
      </div>

      {/* Product Management View */}
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
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
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500 rounded">
              <span className="material-symbols-outlined text-gray-600">filter_list</span>
            </button>
            <button className="p-2 border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500 rounded">
              <span className="material-symbols-outlined text-gray-600">download</span>
            </button>
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
              {inventoryItems.map((item) => (
                <tr key={item.id} className="hover:bg-metallic-gold/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 border border-gray-200 bg-white overflow-hidden shrink-0">
                        <img alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" src={item.image}/>
                      </div>
                      <div>
                        <p className="font-bold text-regal-navy">{item.name}</p>
                        <p className="text-[11px] text-gray-500">SKU: {item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-body-md text-gray-600">{item.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                      <span className={`text-sm font-bold px-2 py-0.5 rounded-full uppercase text-[10px] ${item.bgClass} ${item.textClass}`}>
                        {item.status}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">{item.stock} units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-price-lg text-[18px] font-bold text-regal-navy">{item.price}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-metallic-gold hover:bg-regal-navy rounded transition-all">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">Showing <span className="font-bold text-regal-navy">1-4</span> of <span className="font-bold text-regal-navy">124</span> products</p>
          <div className="flex gap-1">
            <button className="p-2 border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center rounded" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="p-2 border border-regal-navy bg-regal-navy text-white text-[12px] font-bold w-9 flex items-center justify-center rounded">1</button>
            <button className="p-2 border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 text-[12px] font-bold w-9 flex items-center justify-center rounded">2</button>
            <button className="p-2 border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 text-[12px] font-bold w-9 flex items-center justify-center rounded">3</button>
            <button className="p-2 border border-gray-200 bg-white hover:bg-gray-100 flex items-center justify-center rounded">
              <span className="material-symbols-outlined text-[18px] text-gray-600">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Info & Quick Actions */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Low Stock Alerts */}
        <div className="lg:col-span-2 bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="font-headline-md text-headline-md text-regal-navy mb-4 font-bold text-2xl">Stock Distribution</h3>
          <div className="h-4 w-full bg-gray-100 flex mb-8 rounded overflow-hidden">
            <div className="h-full bg-regal-navy" style={{ width: '65%' }} title="EDP"></div>
            <div className="h-full bg-metallic-gold" style={{ width: '20%' }} title="Extrait"></div>
            <div className="h-full bg-yellow-400" style={{ width: '10%' }} title="Oud Oils"></div>
            <div className="h-full bg-gray-400" style={{ width: '5%' }} title="Samples"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-regal-navy rounded-sm"></span>
              <span className="text-xs font-label-md text-gray-500 font-bold">EDP (65%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-metallic-gold rounded-sm"></span>
              <span className="text-xs font-label-md text-gray-500 font-bold">EXTRAIT (20%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-400 rounded-sm"></span>
              <span className="text-xs font-label-md text-gray-500 font-bold">OILS (10%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-400 rounded-sm"></span>
              <span className="text-xs font-label-md text-gray-500 font-bold">SAMPLES (5%)</span>
            </div>
          </div>
        </div>

        {/* Quick Sync/Action */}
        <div className="bg-regal-navy p-6 border border-metallic-gold/30 text-white shadow-sm">
          <h3 className="font-headline-md text-headline-md text-metallic-gold mb-4 font-bold text-2xl">Warehouse Sync</h3>
          <p className="text-sm text-white/70 mb-6">Last global inventory sync was 4 hours ago. 12 items pending verification from Lagos Hub.</p>
          <div className="space-y-3">
            <button className="w-full py-3 bg-metallic-gold text-regal-navy font-bold uppercase tracking-widest text-[12px] hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 rounded">
              <span className="material-symbols-outlined text-[18px]">sync</span>
              RUN FULL SYNC
            </button>
            <button className="w-full py-3 border border-metallic-gold/50 text-metallic-gold font-bold uppercase tracking-widest text-[12px] hover:bg-white/5 transition-colors rounded">
              GENERATE STOCK REPORT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
