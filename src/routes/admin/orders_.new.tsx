import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/orders_/new')({
  component: NewOrder,
})

function NewOrder() {
  return (
    <div className="pt-12 px-4 md:px-8 pb-12 max-w-[1200px] mx-auto min-h-screen">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-2 font-bold text-3xl">Create New Order</h2>
          <p className="text-gray-500 font-body-md">Register a new bespoke fragrance purchase.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/admin/orders" className="px-6 py-3 border border-metallic-gold text-metallic-gold font-label-md hover:bg-gray-50 transition-all font-bold text-sm uppercase tracking-widest flex items-center justify-center">
            DISCARD
          </Link>
          <button className="px-6 py-3 bg-regal-navy text-metallic-gold font-label-md hover:opacity-90 transition-all font-bold text-sm uppercase tracking-widest">
            SAVE ORDER
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Order Forms */}
        <div className="col-span-1 lg:col-span-2 space-y-8">
          
          {/* Customer Selection */}
          <section className="bg-white p-8 border border-gray-200 shadow-sm">
            <h3 className="font-label-md text-label-md text-metallic-gold mb-6 uppercase tracking-widest font-bold text-xs">Customer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <label className="font-label-md text-xs text-gray-500 block mb-1 font-bold group-focus-within:text-metallic-gold transition-colors">SEARCH CUSTOMER</label>
                <div className="flex items-center border-b border-gray-300 focus-within:border-metallic-gold transition-colors py-2">
                  <span className="material-symbols-outlined text-gray-400 text-sm mr-2 group-focus-within:text-metallic-gold transition-colors">person_search</span>
                  <input className="bg-transparent border-none focus:ring-0 p-0 text-sm w-full outline-none text-regal-navy" placeholder="Name or Email" type="text" />
                </div>
              </div>
              <div className="group">
                <label className="font-label-md text-xs text-gray-500 block mb-1 font-bold group-focus-within:text-metallic-gold transition-colors">ORDER TYPE</label>
                <select className="w-full text-sm border-none border-b border-gray-300 bg-transparent rounded-none px-0 py-2 focus:ring-0 focus:border-metallic-gold outline-none text-regal-navy appearance-none cursor-pointer">
                  <option>Standard Collection</option>
                  <option>Private Label Bespoke</option>
                  <option>Wholesale</option>
                </select>
              </div>
            </div>
          </section>

          {/* Product Selection Table */}
          <section className="bg-white p-8 border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-label-md text-label-md text-metallic-gold uppercase tracking-widest font-bold text-xs">Line Items</h3>
              <button className="flex items-center gap-2 text-regal-navy font-label-md text-xs hover:text-metallic-gold transition-colors font-bold">
                <span className="material-symbols-outlined text-sm">add_circle</span>
                ADD PRODUCT
              </button>
            </div>
            
            <div className="overflow-x-auto -mx-8 px-8">
              <table className="w-full text-left min-w-[600px]">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="pb-4 font-label-md text-xs text-gray-400 uppercase font-bold">Product</th>
                    <th className="pb-4 font-label-md text-xs text-gray-400 uppercase text-center font-bold">Quantity</th>
                    <th className="pb-4 font-label-md text-xs text-gray-400 uppercase text-right font-bold">Price</th>
                    <th className="pb-4 font-label-md text-xs text-gray-400 uppercase text-right font-bold">Total</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  
                  <tr className="group">
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 flex-shrink-0 border border-gray-100">
                          <img className="w-full h-full object-cover" alt="Noir Oud Intense" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8_6If13HnXDraX7qPhtUpzO0N7qTqX9J9BF6dNemwHCtXe_fivKhwcXpTYrav38JUZZaxpQGLBEoO0_GPiR8kXgRT_0MGy8WxVmNZu3AgYfBeHE9_AfCCZyQ2WsTmKfHcuAemMw8eE9rN95c08YNnZpiaVMd_zUvBQT2EhY-zgKT7Z0JtYw7vAnrb0LP_pyDZTW977XSaVQfj_ErTtijrHA_zrZa6qows69TtfM69zu7rbIfxIaDJ" />
                        </div>
                        <div>
                          <p className="font-headline-md text-sm text-regal-navy font-bold">Noir Oud Intense</p>
                          <p className="text-xs text-gray-500">100ml / Eau de Parfum</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 text-center">
                      <div className="inline-flex items-center border border-gray-300 rounded px-2">
                        <button className="p-1 hover:text-metallic-gold transition-colors">-</button>
                        <input className="w-8 text-center border-none focus:ring-0 text-sm outline-none text-regal-navy" type="text" defaultValue="1" />
                        <button className="p-1 hover:text-metallic-gold transition-colors">+</button>
                      </div>
                    </td>
                    <td className="py-6 text-right font-price-lg text-sm text-regal-navy font-bold">₦85,000</td>
                    <td className="py-6 text-right font-price-lg text-sm text-regal-navy font-bold">₦85,000</td>
                    <td className="py-6 text-right">
                      <button className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                  
                  <tr className="group">
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 flex-shrink-0 border border-gray-100">
                          <img className="w-full h-full object-cover" alt="Saffron Royale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX-aTvhnhykr9-x16Uko2pyKHrW_oozAiQ3b7BtTg7_X4uPRNCsRxiLrrqZHxniW-feitGWj21_DEF4q_hei_uSMk_f0V92K1ufxdmmZQGXvwCvG6cP2EGrogZIcjf2a8LONQpRc7DhwLiqM19_uc_Io83XoVoahv3UvtaW48dHTqdYsjdk-5IhkxVALdkKL2bJ1WRgF7UVk7O6ycQSuJNCnfXt1Z05Wen_l5emeBmwu2oHL_Rn2a4" />
                        </div>
                        <div>
                          <p className="font-headline-md text-sm text-regal-navy font-bold">Saffron Royale</p>
                          <p className="text-xs text-gray-500">50ml / Eau de Parfum</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 text-center">
                      <div className="inline-flex items-center border border-gray-300 rounded px-2">
                        <button className="p-1 hover:text-metallic-gold transition-colors">-</button>
                        <input className="w-8 text-center border-none focus:ring-0 text-sm outline-none text-regal-navy" type="text" defaultValue="2" />
                        <button className="p-1 hover:text-metallic-gold transition-colors">+</button>
                      </div>
                    </td>
                    <td className="py-6 text-right font-price-lg text-sm text-regal-navy font-bold">₦42,500</td>
                    <td className="py-6 text-right font-price-lg text-sm text-regal-navy font-bold">₦85,000</td>
                    <td className="py-6 text-right">
                      <button className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </section>

          {/* Status Selection */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border border-gray-200 shadow-sm">
              <h3 className="font-label-md text-label-md text-metallic-gold mb-6 uppercase tracking-widest font-bold text-xs">Payment Status</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input defaultChecked className="w-4 h-4 text-metallic-gold focus:ring-metallic-gold border-gray-300" name="payment" type="radio" />
                  <span className="font-body-md text-sm group-hover:text-regal-navy text-gray-700 transition-colors">Pending Payment</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="w-4 h-4 text-metallic-gold focus:ring-metallic-gold border-gray-300" name="payment" type="radio" />
                  <span className="font-body-md text-sm group-hover:text-regal-navy text-gray-700 transition-colors">Paid in Full</span>
                </label>
              </div>
            </div>
            
            <div className="bg-white p-8 border border-gray-200 shadow-sm group">
              <h3 className="font-label-md text-label-md text-metallic-gold mb-6 uppercase tracking-widest font-bold text-xs">Fulfillment</h3>
              <select className="w-full text-sm border-none border-b border-gray-300 bg-transparent rounded-none px-0 py-2 focus:ring-0 focus:border-metallic-gold outline-none text-regal-navy appearance-none cursor-pointer mt-1 group-focus-within:border-metallic-gold transition-colors">
                <option>Unfulfilled</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <aside className="col-span-1 space-y-8">
          
          <section className="bg-regal-navy text-white p-8 shadow-xl relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-metallic-gold/20 blur-[60px] rounded-full pointer-events-none"></div>
            
            <h3 className="font-label-md text-label-md text-metallic-gold mb-8 uppercase tracking-widest relative z-10 font-bold text-xs">Order Summary</h3>
            
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center text-gray-300">
                <span className="font-body-md text-sm">Subtotal</span>
                <span className="font-price-lg text-sm font-bold">₦170,000</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span className="font-body-md text-sm">Shipping</span>
                <span className="font-price-lg text-sm font-bold">₦5,500</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span className="font-body-md text-sm">Tax (VAT 7.5%)</span>
                <span className="font-price-lg text-sm font-bold">₦12,750</span>
              </div>
              <div className="pt-6 mt-6 border-t border-metallic-gold/30">
                <div className="flex justify-between items-center">
                  <span className="font-label-md text-metallic-gold uppercase tracking-widest font-bold text-xs">Grand Total</span>
                  <span className="font-price-lg text-2xl text-metallic-gold font-bold">₦188,250</span>
                </div>
              </div>
            </div>
            
            <div className="mt-10 relative z-10">
              <p className="text-xs text-gray-400 mb-4 italic">Pricing automatically calculated based on Nigerian standard tax regulations.</p>
              <button className="w-full py-4 bg-metallic-gold text-regal-navy font-bold font-label-md text-sm hover:bg-yellow-500 transition-colors active:scale-[0.98]">
                FINALIZE & SEND INVOICE
              </button>
            </div>
          </section>

          <section className="bg-white p-8 border border-gray-200 shadow-sm group">
            <h3 className="font-label-md text-label-md text-metallic-gold mb-4 uppercase tracking-widest font-bold text-xs">Internal Notes</h3>
            <textarea className="w-full text-sm resize-none border-none border-b border-gray-300 bg-transparent rounded-none px-0 py-2 focus:ring-0 focus:border-metallic-gold outline-none text-regal-navy transition-colors placeholder:text-gray-400" placeholder="Add private notes regarding this order..." rows={4}></textarea>
          </section>

        </aside>
      </div>
    </div>
  )
}
