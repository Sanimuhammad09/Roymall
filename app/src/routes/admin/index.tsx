import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/admin/')({
  component: Dashboard,
})

function Dashboard() {
  const [totalSales, setTotalSales] = useState(142890.00)
  const [highlightSales, setHighlightSales] = useState(false)

  // Simulation of dynamic data update
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setTotalSales(prev => prev + (Math.random() * 10))
        setHighlightSales(true)
        setTimeout(() => setHighlightSales(false), 1000)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-7xl mx-auto">

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Sales */}
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="font-label-md text-label-md text-gray-500 uppercase tracking-wider font-bold">Total Sales</p>
            <span className="text-yellow-700 font-bold text-[12px] flex items-center">+12.5%</span>
          </div>
          <h2 className={`font-price-lg text-price-lg text-regal-navy mb-4 font-bold text-3xl transition-colors duration-500 ${highlightSales ? 'text-yellow-700' : ''}`}>
            ${totalSales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </h2>
          <div className="h-12 w-full">
            <svg className="w-full h-full" viewBox="0 0 100 30">
              <path className="stroke-metallic-gold stroke-2 fill-none" d="M0,25 Q15,5 30,15 T60,5 T100,20"></path>
            </svg>
          </div>
        </div>
        
        {/* Active Orders */}
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="font-label-md text-label-md text-gray-500 uppercase tracking-wider font-bold">Active Orders</p>
            <span className="material-symbols-outlined text-metallic-gold">shopping_bag</span>
          </div>
          <h2 className="font-price-lg text-price-lg text-regal-navy mb-4 font-bold text-3xl">482</h2>
          <div className="h-12 w-full">
            <svg className="w-full h-full" viewBox="0 0 100 30">
              <path className="stroke-metallic-gold stroke-2 fill-none" d="M0,20 Q20,10 40,25 T80,10 T100,5"></path>
            </svg>
          </div>
        </div>
        
        {/* Stock Levels */}
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="font-label-md text-label-md text-gray-500 uppercase tracking-wider font-bold">Stock Levels</p>
            <span className="text-red-500 font-bold text-[12px]">8 Low SKU</span>
          </div>
          <h2 className="font-price-lg text-price-lg text-regal-navy mb-4 font-bold text-3xl">94.2%</h2>
          <div className="w-full bg-gray-100 h-1 mt-2">
            <div className="bg-metallic-gold h-full w-[94%]"></div>
          </div>
        </div>
        
        {/* New Customers */}
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="font-label-md text-label-md text-gray-500 uppercase tracking-wider font-bold">New Customers</p>
            <span className="text-yellow-700 font-bold text-[12px]">+84 this week</span>
          </div>
          <h2 className="font-price-lg text-price-lg text-regal-navy mb-4 font-bold text-3xl">1,205</h2>
          <div className="h-12 w-full">
            <svg className="w-full h-full" viewBox="0 0 100 30">
              <path className="stroke-metallic-gold stroke-2 fill-none" d="M0,28 Q25,20 50,22 T75,10 T100,12"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Dashboard Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Recent Orders Table */}
        <div className="flex-[2] bg-white border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline-md text-headline-md text-regal-navy font-bold text-2xl">Recent Orders</h3>
            <button className="font-label-md text-label-md text-metallic-gold uppercase tracking-widest border-b border-metallic-gold pb-0.5 hover:text-yellow-600 transition-colors font-bold text-xs">View All Orders</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="pb-4 font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Order ID</th>
                  <th className="pb-4 font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Customer</th>
                  <th className="pb-4 font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Date</th>
                  <th className="pb-4 font-label-md text-label-md text-gray-500 uppercase font-bold text-xs">Status</th>
                  <th className="pb-4 font-label-md text-label-md text-gray-500 uppercase font-bold text-xs text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-5 font-body-md text-regal-navy font-bold">#RE-92041</td>
                  <td className="py-5 font-body-md text-gray-800">Eleanor Thorne</td>
                  <td className="py-5 font-body-md text-gray-500">Oct 24, 2023</td>
                  <td className="py-5">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-[11px] font-bold uppercase tracking-wider rounded-full">Shipped</span>
                  </td>
                  <td className="py-5 font-price-lg text-[18px] text-right font-bold text-regal-navy">$340.00</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-5 font-body-md text-regal-navy font-bold">#RE-92040</td>
                  <td className="py-5 font-body-md text-gray-800">Julian Vane</td>
                  <td className="py-5 font-body-md text-gray-500">Oct 24, 2023</td>
                  <td className="py-5">
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-[11px] font-bold uppercase tracking-wider rounded-full">Pending</span>
                  </td>
                  <td className="py-5 font-price-lg text-[18px] text-right font-bold text-regal-navy">$1,250.00</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-5 font-body-md text-regal-navy font-bold">#RE-92039</td>
                  <td className="py-5 font-body-md text-gray-800">Sienna Sterling</td>
                  <td className="py-5 font-body-md text-gray-500">Oct 23, 2023</td>
                  <td className="py-5">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-[11px] font-bold uppercase tracking-wider rounded-full">Delivered</span>
                  </td>
                  <td className="py-5 font-price-lg text-[18px] text-right font-bold text-regal-navy">$590.00</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-5 font-body-md text-regal-navy font-bold">#RE-92038</td>
                  <td className="py-5 font-body-md text-gray-800">Marcus Aurelius</td>
                  <td className="py-5 font-body-md text-gray-500">Oct 23, 2023</td>
                  <td className="py-5">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-[11px] font-bold uppercase tracking-wider rounded-full">Delivered</span>
                  </td>
                  <td className="py-5 font-price-lg text-[18px] text-right font-bold text-regal-navy">$215.00</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-5 font-body-md text-regal-navy font-bold">#RE-92037</td>
                  <td className="py-5 font-body-md text-gray-800">Isabella Rossi</td>
                  <td className="py-5 font-body-md text-gray-500">Oct 22, 2023</td>
                  <td className="py-5">
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-[11px] font-bold uppercase tracking-wider rounded-full">Cancelled</span>
                  </td>
                  <td className="py-5 font-price-lg text-[18px] text-right font-bold text-regal-navy">$88.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Top Selling Scents */}
        <div className="flex-1 bg-regal-navy text-white p-8 border border-metallic-gold/30">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline-md text-headline-md text-metallic-gold font-bold text-2xl">Top Scents</h3>
            <span className="material-symbols-outlined text-metallic-gold">trending_up</span>
          </div>
          <div className="space-y-6">
            {/* Scent 1 */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-16 h-16 bg-white overflow-hidden relative border border-metallic-gold/20">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Midnight Oud" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH2qIwZ1ZEZuODI0wnnHdkbCMVeaq5R6OwcYh9fPIgGJsT3uuB9fMbCAAsf5o3E6GfLdl4iTxBaMARP3trGh_156_49b4zZt0QFQF_lOfl7nqhEE8WzIqJyAD2o1FUYSrJ3cQUhIp5VeDb9XQUdz0YL-Iai7kpZi4KFLra30sPSbn6PhFe2fvMVERaCWuevAjgxQf47dUslSBgs39MXZjaYRAUSeKTsiTqS-E74xRCxFda5waP_ZE2"/>
              </div>
              <div className="flex-1">
                <p className="font-headline-md text-[18px] text-metallic-gold font-bold">Midnight Oud</p>
                <p className="font-label-md text-[12px] text-white/60 uppercase tracking-widest font-bold">1,240 Sales</p>
              </div>
              <div className="text-right">
                <p className="font-price-lg text-[16px] font-bold">$245</p>
                <p className="text-[10px] text-yellow-500">Trending</p>
              </div>
            </div>
            
            {/* Scent 2 */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-16 h-16 bg-white overflow-hidden relative border border-metallic-gold/20">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Velvet Rose" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg7lpyFICxEEL6nOXJiq3AVqW8qnv-0dyFZoiSSE4ZydUBnevwNriAPp5WiTei9R8dNnWyHTeACUVTX8A3hQICr_fgAQVlFwKvhYdILid5Xc-w-7ZIrSAzLrlfI0T9ev36yk2s1lz6JmMrXcSCJUfkvPNWKfY1uv5f9MnXmhq3Ymy04rRMUu-eCqQK5bnHVB0jpbnfXmvQypX3aijfAEnKjnDmU2ZX1_5h12NmK3e-GYW0TPM4x7Nl"/>
              </div>
              <div className="flex-1">
                <p className="font-headline-md text-[18px] text-white font-bold">Velvet Rose</p>
                <p className="font-label-md text-[12px] text-white/60 uppercase tracking-widest font-bold">982 Sales</p>
              </div>
              <div className="text-right">
                <p className="font-price-lg text-[16px] font-bold">$185</p>
              </div>
            </div>
            
            {/* Scent 3 */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-16 h-16 bg-white overflow-hidden relative border border-metallic-gold/20">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Amber Gold" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBATov0ZtcmfWMaWhRG-N-6MSQOObRsU1HVXXOI9ewYTKKrN36KBeTwBMBiO708ga5Lj-JLAXuyfDZ5ycMcp_-M5MenAC_aazczssU2LD9RT8OCrX9_n--JHfTbhDQJ4EqAr7FypZYuxl3_-KwCcjdm6SvFH77HDPseatWmnCJMzM8KBwHj_-wyjrKg5k47KlUVhFOdVLiD_teMPa-J2spaxCGezKr_uyvhkx_JKrsJF3palftU47k_"/>
              </div>
              <div className="flex-1">
                <p className="font-headline-md text-[18px] text-white font-bold">Amber Gold</p>
                <p className="font-label-md text-[12px] text-white/60 uppercase tracking-widest font-bold">845 Sales</p>
              </div>
              <div className="text-right">
                <p className="font-price-lg text-[16px] font-bold">$210</p>
              </div>
            </div>
            
            {/* Scent 4 */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-16 h-16 bg-white overflow-hidden relative border border-metallic-gold/20">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Imperial Silk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrVt-4-ceNcSEfis-qEzfqi40DS55BWPi74m6-CxUkX0F5HBJ5RCRqutMK0_oermJI3t5OdhvUgoUsFiVeCAFl0TJxhJ3Qjt7UaCXga3TDspERI8_FR76AObCu4XTWIK_Q4NxiW_Ve_p2RmTDjus4lgT6dCVJqNLN3FRzfJ7wVIJOXLUY9S1tlvl3UMbnWRRh6ULgUn5lPynOeFNpV2mBmUrmpExyHN3qmSLuXsGmBYKJ0aBcf09G_"/>
              </div>
              <div className="flex-1">
                <p className="font-headline-md text-[18px] text-white font-bold">Imperial Silk</p>
                <p className="font-label-md text-[12px] text-white/60 uppercase tracking-widest font-bold">721 Sales</p>
              </div>
              <div className="text-right">
                <p className="font-price-lg text-[16px] font-bold">$195</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-12 py-3 bg-metallic-gold text-regal-navy font-bold uppercase tracking-widest text-[12px] hover:bg-yellow-500 transition-colors">Generate Report</button>
        </div>
      </div>

      {/* System Notifications & Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-6 flex items-center justify-between border border-transparent hover:border-metallic-gold/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-metallic-gold/20 flex items-center justify-center text-metallic-gold">
              <span className="material-symbols-outlined">inventory</span>
            </div>
            <div>
              <h4 className="font-bold text-regal-navy text-lg">Inventory Sync Required</h4>
              <p className="text-sm text-gray-500">Last synced 4 hours ago. 3 items differ from warehouse.</p>
            </div>
          </div>
          <button className="bg-regal-navy text-white px-4 py-2 text-sm font-bold uppercase tracking-tighter hover:bg-regal-navy/90 transition-all">Sync Now</button>
        </div>
        
        <div className="bg-gray-100 p-6 flex items-center justify-between border border-transparent hover:border-metallic-gold/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <h4 className="font-bold text-regal-navy text-lg">Customer Inquiries</h4>
              <p className="text-sm text-gray-500">You have 5 unread messages from premium members.</p>
            </div>
          </div>
          <button className="border border-regal-navy text-regal-navy px-4 py-2 text-sm font-bold uppercase tracking-tighter hover:bg-regal-navy hover:text-white transition-all">Go to Inbox</button>
        </div>
      </div>
    </div>
  )
}
