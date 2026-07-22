import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

ChartJS.defaults.font.family = 'Manrope'
ChartJS.defaults.color = '#75777f'

export const Route = createFileRoute('/admin/analytics')({
  component: Analytics,
})

function Analytics() {
  const { data } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: () => api.adminGetOverview()
  })

  const metrics = data || {}
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { borderDash: [5, 5] }, ticks: { callback: (value: any) => '$' + value / 1000 + 'k' } },
      x: { grid: { display: false } }
    }
  }

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 45000, 42000, 38000, 52000, 60000, 75000],
      borderColor: '#001B44',
      borderWidth: 3,
      pointBackgroundColor: '#D4AF37',
      pointBorderColor: '#fff',
      pointRadius: 4,
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(0, 27, 68, 0.1)' // Using a solid semi-transparent fallback for gradient
    }]
  }

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: { legend: { display: false } }
  }

  const donutData = {
    labels: ['Oud', 'Floral', 'Citrus', 'Musk'],
    datasets: [{
      data: [42, 28, 15, 15],
      backgroundColor: ['#001B44', '#D4AF37', '#7084b3', '#E0E0E0'],
      borderWidth: 0,
      hoverOffset: 10
    }]
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { display: false } },
      x: { grid: { display: false } }
    }
  }

  const barData = {
    labels: ['Search', 'Social', 'Email', 'Referral', 'Direct'],
    datasets: [{
      label: 'New Users',
      data: [2500, 4200, 1800, 1200, 900],
      backgroundColor: '#001B44',
      hoverBackgroundColor: '#D4AF37',
      borderRadius: 4
    }]
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header & Breadcrumbs */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="font-label-md text-label-md text-muted-gold uppercase tracking-[0.2em] mb-2 font-bold">Performance Overview</p>
          <h2 className="font-headline-lg text-headline-lg text-regal-navy text-3xl font-bold">Analytics Intelligence</h2>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 border border-metallic-gold text-metallic-gold font-label-md text-label-md hover:bg-metallic-gold hover:text-regal-navy transition-all duration-300 font-bold uppercase">
            DOWNLOAD REPORT
          </button>
          <button className="px-6 py-2 bg-regal-navy text-white font-label-md text-label-md hover:bg-regal-navy/90 transition-all duration-300 font-bold uppercase">
            LAST 30 DAYS
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 border border-gray-200 relative overflow-hidden group hover:border-metallic-gold/50 transition-all">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="font-label-md text-label-md text-gray-500 uppercase mb-1 font-bold tracking-widest">Revenue</p>
              <h3 className="font-price-lg text-price-lg text-regal-navy text-2xl font-bold">
                ${(metrics.totalRevenue || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
              </h3>
            </div>
            <span className="material-symbols-outlined text-metallic-gold">trending_up</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-metallic-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
        </div>

        <div className="bg-white p-8 border border-gray-200 relative overflow-hidden group hover:border-metallic-gold/50 transition-all">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="font-label-md text-label-md text-gray-500 uppercase mb-1 font-bold tracking-widest">Total Orders</p>
              <h3 className="font-price-lg text-price-lg text-regal-navy text-2xl font-bold">{metrics.totalOrders || 0}</h3>
            </div>
            <span className="material-symbols-outlined text-metallic-gold">payments</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-metallic-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
        </div>

        <div className="bg-white p-8 border border-gray-200 relative overflow-hidden group hover:border-metallic-gold/50 transition-all">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="font-label-md text-label-md text-gray-500 uppercase mb-1 font-bold tracking-widest">Total Customers</p>
              <h3 className="font-price-lg text-price-lg text-regal-navy text-2xl font-bold">{metrics.totalCustomers || 0}</h3>
            </div>
            <span className="material-symbols-outlined text-metallic-gold">group</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-metallic-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
        </div>
      </div>

      {/* Charts Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sales Performance (Line Chart) */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-headline-md text-headline-md text-regal-navy text-xl font-bold">Sales Performance</h4>
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-regal-navy rounded-full self-center"></span>
              <span className="font-label-md text-[12px] text-gray-500 uppercase tracking-widest font-bold">Revenue 2024</span>
            </div>
          </div>
          <div className="relative w-full h-[300px]">
            <Line data={lineData} options={lineOptions as any} />
          </div>
        </div>

        {/* Top Categories (Donut) */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-gray-200 p-8 flex flex-col">
          <h4 className="font-headline-md text-headline-md text-regal-navy mb-8 text-xl font-bold">Top Categories</h4>
          <div className="relative w-full h-[200px] flex-1">
            <Doughnut data={donutData} options={donutOptions} />
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
              <span className="font-body-md text-gray-500">Oud & Woods</span>
              <span className="font-bold text-regal-navy">42%</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
              <span className="font-body-md text-gray-500">Floral Collection</span>
              <span className="font-bold text-regal-navy">28%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-body-md text-gray-500">Citrus Blends</span>
              <span className="font-bold text-regal-navy">15%</span>
            </div>
          </div>
        </div>

        {/* Customer Acquisition (Bar) */}
        <div className="col-span-12 lg:col-span-6 bg-white border border-gray-200 p-8">
          <h4 className="font-headline-md text-headline-md text-regal-navy mb-8 text-xl font-bold">Customer Acquisition</h4>
          <div className="relative w-full h-[300px]">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="col-span-12 lg:col-span-6 flex flex-col md:flex-row overflow-hidden border border-gray-200">
          <div className="flex-1 bg-regal-navy p-10 flex flex-col justify-center text-white">
            <p className="font-label-md text-label-md text-metallic-gold uppercase tracking-[0.3em] mb-4 font-bold">Strategic Insight</p>
            <h5 className="font-headline-md text-headline-md mb-4 leading-tight italic text-2xl font-bold">Luxury is in each detail.</h5>
            <p className="font-body-md text-body-md text-gray-300 leading-relaxed mb-8">
              Your highest-performing segment is currently "Private Reserves". Consider a targeted campaign for loyalists.
            </p>
            <button className="w-fit border-b border-metallic-gold text-metallic-gold font-label-md text-label-md hover:text-white hover:border-white transition-all pb-1 font-bold tracking-widest">
              VIEW SEGMENT DATA
            </button>
          </div>
          <div className="flex-1 min-h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbQM-blfgPjlw9UqbwrxWG2muQKPLZl_lkUEpLoMq8253QUgRXXtTGLAiT4cB5Ts4qo36BstZmiWWyyUjXAmFOluqdIH2T3N1uODHuZLSo01oX01Ct09VUo_UW2uDWECbhD65r68RmsBqS98jsa_iq_KbSBFlKVQslympMkqPh09kO8V6jNYju3jsBVy04cszLRhyj7LpZHU4R7G1mVle3qZyuTGSO0STIb9iYfm-dKL8ql4I9Xptl')" }}>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="mt-12 bg-white border border-gray-200 p-8">
        <div className="flex justify-between items-center mb-10">
          <h4 className="font-headline-md text-headline-md text-regal-navy text-xl font-bold">Live Transactions</h4>
          <a className="text-metallic-gold font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all font-bold tracking-widest" href="#">
            VIEW ALL TRANSACTIONS <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 uppercase text-[10px] tracking-widest font-label-md font-bold">
                <th className="pb-4">Transaction ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-body-md">
              {(metrics.recentOrders || []).map((order: any, idx: number) => (
                <tr key={order.id || idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-6 font-bold text-regal-navy">#{order.orderNumber || order.id?.substring(0,8)}</td>
                  <td className="py-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[10px]">
                      {order.user?.firstName?.[0]}{order.user?.lastName?.[0]}
                    </div>
                    {order.user?.firstName} {order.user?.lastName}
                  </td>
                  <td className="py-6 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-6">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      order.status === 'DELIVERED' ? 'bg-green-50 text-green-700' :
                      order.status === 'PENDING' ? 'bg-gray-100 text-gray-700' :
                      order.status === 'CANCELLED' ? 'bg-red-50 text-red-700' :
                      'bg-yellow-50 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-6 text-right font-bold text-regal-navy">
                    ${(order.totalAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </td>
                </tr>
              ))}
              {(!metrics.recentOrders || metrics.recentOrders.length === 0) && (
                <tr><td colSpan={5} className="py-6 text-center text-gray-500">No transactions</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
