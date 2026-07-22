import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/customers')({
  component: Customers,
})

function Customers() {
  const customers = [
    {
      name: 'Amina Ibrahim',
      email: 'amina.i@domain.com',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQxUrltmW5QWg7oQONfSvC0WbrMBlRmYN2Ab3GhX2Uo28qaHYKw12Jok64YjCcIGfjCY0IoCeBBw9tLpNOoJb599GqR3FL6yOYzjAEgLwTaM0bYkPuZfKZg8I-7biBlXddePKPPEcw0zy0MnVrjbkl75QbjBK80vmUwCjI3m_yaWKoo9ZWs66vWwgEEsCtMri9492ny5nSAFvkzQPQRQ2rG1LioMdFHFmDJR-DrU85ozdH5mVlaY1L',
      initials: '',
      segment: 'VIP',
      segmentColor: 'bg-metallic-gold/10 text-metallic-gold',
      orders: '42 Orders',
      spend: '₦1,240,500',
      lastActive: '2 hours ago',
    },
    {
      name: 'Chidi Okafor',
      email: 'c.okafor@company.ng',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG5cr_x-ukPcY7qU0MRAkvw8BF-3m4HrfHZFFvE_PU7CxLCrN6ZeFXUAkFu5Tb-6Yaovw2j81T9594WEM3mfNT9H5RXBI5_F3GImxB0-7ufHSqAWzqSVJ7unj6AGpAWaeJKcvzNmPnSVTXhq_DgAX_-rlEmMjlcBDJc4H7loVio0gEXN_3wDBppRpJM873Xnpbdr0Wc60imX5qXiSI9X6uHyHdyE4tzhJy33Ztc7JgWVXpsc2WJWTh',
      initials: '',
      segment: 'Active',
      segmentColor: 'bg-yellow-100 text-yellow-800',
      orders: '12 Orders',
      spend: '₦455,200',
      lastActive: 'Yesterday',
    },
    {
      name: 'Bolanle Nike',
      email: 'bolanle.nike@web.com',
      image: '',
      initials: 'BN',
      segment: 'New',
      segmentColor: 'bg-gray-100 text-gray-800',
      orders: '1 Order',
      spend: '₦85,000',
      lastActive: '3 days ago',
    },
    {
      name: 'Folake Adeyemi',
      email: 'f.adeyemi@legal.com',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8N7uceHkfieT4-7VeRSs90Eh6UGyXRlOhYzj-XOxlt-or0ZqE4saqgp7z51WWnh4uD5HcCqqNAyom8oSP-YPplgCTMI4hoPgXbubNQhunBw9v3ikzJYNl4tj_uvJrF2tGsBbUViYtOLrzjJNoKni4ve4fTkzQ73sT2pTH6wH3JbDZ2xuo_DnHwwdse_loy-1YhAXVXZwNB3vQdhtOk-9X2OMKomN7P8LCzBDnCQtrg3ESSIgj3rNK',
      initials: '',
      segment: 'VIP',
      segmentColor: 'bg-metallic-gold/10 text-metallic-gold',
      orders: '89 Orders',
      spend: '₦4,210,000',
      lastActive: 'Today, 10:15 AM',
    },
    {
      name: 'Ifeanyi Obi',
      email: 'i.obi@design.co',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACuHcjeseFN4QwMQj4mqcAXMVdRHAeV3tETPehln99_CiNQRW9bpLme8RihsYyXmSpreKDtQjRHFopdgwn2YtW6kdkeQ72v8dMANpnwGzx9p1565UgX-BSIZxq9gYzsrAEASkdybx3KLt0U_4XPeD_IGG1ijs7Z6Mx247aX6GgyDWSJPhXuLV56X211Lifj0jAg9mnsh8E3aeVqVhQiXad7Mwlz7nEnu27TyF_lVBidC9dbQFfdhhd',
      initials: '',
      segment: 'Inactive',
      segmentColor: 'bg-red-100 text-red-800',
      orders: '5 Orders',
      spend: '₦210,000',
      lastActive: '4 months ago',
    },
  ]

  return (
    <div>

      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-regal-navy text-3xl font-bold">Customer Directory</h2>
          <p className="font-body-md text-gray-500 mt-1">Manage your luxury clientele and fragrance enthusiasts.</p>
        </div>
        <Link to="/admin/customers/new" className="bg-regal-navy text-metallic-gold font-label-md px-6 py-3 flex items-center gap-2 hover:bg-regal-navy/90 transition-all active:opacity-80">
          <span className="material-symbols-outlined">person_add</span>
          ADD NEW CUSTOMER
        </Link>
      </div>

      {/* Stats & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Total Customers</p>
            <h3 className="font-headline-md text-headline-md text-regal-navy text-2xl font-bold">12,842</h3>
          </div>
          <span className="material-symbols-outlined text-metallic-gold text-4xl opacity-40">group</span>
        </div>
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">VIP Members</p>
            <h3 className="font-headline-md text-headline-md text-regal-navy text-2xl font-bold">438</h3>
          </div>
          <span className="material-symbols-outlined text-metallic-gold text-4xl opacity-40">workspace_premium</span>
        </div>
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">New This Month</p>
            <h3 className="font-headline-md text-headline-md text-regal-navy text-2xl font-bold">+214</h3>
          </div>
          <span className="material-symbols-outlined text-metallic-gold text-4xl opacity-40">trending_up</span>
        </div>
        <div className="bg-white p-6 border border-gray-200 hover:border-metallic-gold transition-colors flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Retention Rate</p>
            <h3 className="font-headline-md text-headline-md text-regal-navy text-2xl font-bold">78%</h3>
          </div>
          <span className="material-symbols-outlined text-metallic-gold text-4xl opacity-40">pie_chart</span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border border-gray-200 p-4 flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-label-md font-label-md text-gray-500 px-2">Segment:</span>
          <button className="bg-yellow-100 text-yellow-800 px-4 py-1.5 font-label-md text-label-md">All</button>
          <button className="hover:bg-gray-50 px-4 py-1.5 font-label-md text-label-md text-gray-500">VIP</button>
          <button className="hover:bg-gray-50 px-4 py-1.5 font-label-md text-label-md text-gray-500">New</button>
          <button className="hover:bg-gray-50 px-4 py-1.5 font-label-md text-label-md text-gray-500">Inactive</button>
          <button className="hover:bg-gray-50 px-4 py-1.5 font-label-md text-label-md text-gray-500">Wholesale</button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors text-gray-600">
            <span className="material-symbols-outlined text-body-md">calendar_month</span>
            <span className="font-label-md text-label-md">Date Range</span>
          </div>
          <div className="flex items-center gap-2 border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors text-gray-600">
            <span className="material-symbols-outlined text-body-md">filter_list</span>
            <span className="font-label-md text-label-md">Advanced Filters</span>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 font-label-md text-label-md text-regal-navy">CUSTOMER</th>
              <th className="px-6 py-4 font-label-md text-label-md text-regal-navy">SEGMENT</th>
              <th className="px-6 py-4 font-label-md text-label-md text-regal-navy">TOTAL ORDERS</th>
              <th className="px-6 py-4 font-label-md text-label-md text-regal-navy">TOTAL SPEND (₦)</th>
              <th className="px-6 py-4 font-label-md text-label-md text-regal-navy">LAST ACTIVE</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((customer, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden bg-gray-100 flex items-center justify-center rounded-full">
                      {customer.image ? (
                        <img className="w-full h-full object-cover" alt={customer.name} src={customer.image}/>
                      ) : (
                        <span className="text-metallic-gold font-bold">{customer.initials}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-label-md text-regal-navy font-bold leading-none mb-1">{customer.name}</p>
                      <p className="text-xs text-gray-500 font-body-md">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${customer.segmentColor}`}>
                    {customer.segment}
                  </span>
                </td>
                <td className="px-6 py-4 font-body-md text-gray-700">{customer.orders}</td>
                <td className="px-6 py-4 font-price-lg text-price-lg text-regal-navy font-bold">{customer.spend}</td>
                <td className="px-6 py-4 font-body-md text-gray-500">{customer.lastActive}</td>
                <td className="px-6 py-4 text-right">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-metallic-gold text-gray-400">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-t border-gray-200">
          <p className="text-label-md font-label-md text-gray-500">Showing 1 to {customers.length} of 12,842 results</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-metallic-gold transition-colors text-gray-600 bg-white">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-metallic-gold bg-metallic-gold text-regal-navy font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-metallic-gold transition-colors bg-white">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-metallic-gold transition-colors bg-white">3</button>
            <span className="px-1 text-gray-500">...</span>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-metallic-gold transition-colors bg-white">1284</button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-metallic-gold transition-colors text-gray-600 bg-white">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
