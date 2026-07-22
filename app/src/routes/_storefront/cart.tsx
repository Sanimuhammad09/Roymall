import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_storefront/cart')({
  component: Cart,
})

function Cart() {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Midnight Oud',
      brand: 'Eau de Parfum',
      volume: '100ml',
      price: 125000,
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxR6oppWcKwoUOqlcVEVkZHZRvlKqeLCdZczMR_uvCujrFIqFFf_dAb4KyScpt3WUbfXWEyRHKeQ3KnBuqXxTMDOXRCpXudXDQGiKBlE2o5cG4nXgiMhplk80v0c_bgMPHu4b0x8V3lKQfg4YK5QDngbKSooLhniRf3O5BMRDsBZC4EaV-iyvmjpGMX0PA0t_NAXC_TlSeqZlrzxfVMppi15Mfb4i4FvqJZ3w0l8kO3zHxak-jqFkE',
    },
    {
      id: '2',
      name: 'Saffron Gold',
      brand: 'Extrait de Parfum',
      volume: '100ml',
      price: 98500,
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_cLHPv7zAKeLExhSEa5iustIAvK06sL136sUC_M3Jw6sb_iKT8zk8ilW-Bwivrzig3CHXSQpV7N-mnR_FY4R6yRj_aSIC1NrLT24xyBy_oRJ8MS4_wn2vXQgDCcwEZAcoz94D8sfVY0bVTekxLHLRrqgwjRePvNKwr2tGrmOu1T_xXuloVoOlyiKvUsMc6F4dCc-PPwDZlmrrGcKBKS59VH09BCDw0zyFJbFk8k_ZOOpcHLalB4is',
    }
  ])

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0)
  const shipping = 5000
  const tax = 0
  const total = subtotal + shipping + tax

  const updateQty = (id: string, newQty: number) => {
    if (newQty < 1) return
    setItems(items.map(item => item.id === id ? { ...item, qty: newQty } : item))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const crossSells = [
    {
      id: 'cs1',
      name: 'Royal Velvet',
      brand: 'Eau de Parfum',
      price: 110000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBocJox5xUKu0cSv12Xm1OseEXDBgk0gOlZDhGdfVYUMbSMQJEwPsyjL796ghqJX60lBODRMv3cn5pRs0h3zvMzOnKC0qdiA7fDfbWWCfX2e6ldCZ9arWYVP_MafEAcYSDFFrue5tzORjh89g9zyTNN_8kEKzLnDnJAQzx_J7OPxilAgOexqgbFZ43AFFgt3VsEz4QMilcjzKzFsF1Hh45v26ck7WNkTlMwq0BmaB4niSQdXjv-0fC-'
    },
    {
      id: 'cs2',
      name: 'Azure Skies',
      brand: 'Cologne Intense',
      price: 85000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE7OHqhjur9I_gEewAivmPYkNhRM4dD0ttZ4FYanncnY0TQh1APKhJRwiuOt8vwI7Ei_scd9VVvTY5YtNNPGrPL1U3nKpsLNA-0cXQxW3wrS-_LyQ8YwtHzAd8zvp2VZWkxE9i1oOLX8nQKIUcfoHy92GQYH9Qxfphehj_UCyAw23leHZC6Tb3DXE-RVmWDHKI2b_HLLcEM7EODsxaJAtGazZlBSIgDayqB_olibW3hG7_onFIdWk5'
    },
    {
      id: 'cs3',
      name: 'Amber Rose',
      brand: 'Eau de Parfum',
      price: 115500,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_QvS_FkXnpWpRzCtj8TQxt6ohSNyqF6CkkUVWOnE5nlZpFUKj-_OKvZ-xLvb5eZ_QqWeSIxDqq2BUBtKQBQDfx-KozTneGl68mrN396r-EaFdWyo_OyO-8808IlXogTGTvLJt1oV2mYE4KeIP00sfR7rVZAB3Fdlpa8gRk2BGdo1a67-m47YeUbrw018z2aKS_qYtKcWa8Nn5T2BRIB040BB2tGqXQowjuyB8eCrNfT_FIzPWkvuY'
    },
    {
      id: 'cs4',
      name: 'Black Silk',
      brand: 'Extrait de Parfum',
      price: 140000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFZVANIUU6gRnFMZTupC6FJc6uYMoZPVzcuKlc1m9GTuhwzXc0LVbuF2o9y0zRAPGG-iPDaHYAkUP9zwIWmy5kbsv7z2Dr5ygifbuKN5NZhdbplRFbi_f0-1480P4l48U6BN6aaQeiLUotYVgboZSnGQWejo1aH22ncCCRxS_jbyoUCXf7JmE_Z9K-FrfmnmKIMDR_4pWFXR2IeuDS1lqdOn5pb4rz6dzszf3ce-ryaRA4FUo5irSE'
    }
  ]

  return (
    <main className="max-w-[1440px] mx-auto px-6 md:px-[64px] py-16 min-h-screen font-body-md text-[#1b1b1f]">
      {/* Breadcrumb */}
      <div className="mb-12">
        <nav className="flex items-center gap-2 font-label-md text-label-md text-[#44474f] uppercase tracking-wider">
          <Link to="/" className="hover:text-metallic-gold transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-regal-navy font-bold">Shopping Bag</span>
        </nav>
        <h1 className="font-display-lg text-display-lg text-regal-navy mt-4">Your Selection</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Bag Items List */}
        <div className="flex-grow w-full lg:w-2/3 space-y-8">
          {items.map((item) => (
            <div key={item.id} className="group relative flex flex-col md:flex-row gap-8 pb-8 border-b border-[#c5c6d0] hover:border-metallic-gold transition-colors duration-500">
              <div className="w-full md:w-48 h-64 bg-soft-cream flex items-center justify-center overflow-hidden">
                <img 
                  className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-700" 
                  alt={item.name} 
                  src={item.image}
                />
              </div>
              <div className="flex-grow flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-md text-headline-md text-regal-navy">{item.name}</h3>
                    <span className="font-price-lg text-price-lg text-regal-navy">₦ {item.price.toLocaleString()}</span>
                  </div>
                  <p className="font-label-md text-label-md text-muted-gold uppercase mt-1">{item.brand}</p>
                  <p className="font-body-md text-body-md text-[#44474f] mt-2">Volume: {item.volume}</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-4 md:gap-0">
                  <div className="flex items-center border border-[#c5c6d0] w-fit">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-4 py-2 hover:bg-soft-cream transition-colors text-regal-navy">
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <span className="px-4 font-label-md text-label-md border-x border-[#c5c6d0] min-w-[2rem] text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-4 py-2 hover:bg-soft-cream transition-colors text-regal-navy">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                  <div className="flex gap-6 font-label-md text-label-md uppercase tracking-widest text-[#44474f]">
                    <button className="hover:text-metallic-gold transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">favorite</span> 
                      <span className="hidden sm:inline">Move to Wishlist</span>
                    </button>
                    <button onClick={() => removeItem(item.id)} className="hover:text-error transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">delete</span> 
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-16 border-b border-[#c5c6d0]">
              <p className="font-body-lg text-[#44474f] mb-6">Your selection is currently empty.</p>
              <Link to="/shop" className="text-metallic-gold font-label-md uppercase tracking-widest hover:text-regal-navy transition-colors border-b border-metallic-gold hover:border-regal-navy pb-1">
                Discover Fragrances
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="w-full lg:w-1/3 sticky top-32">
          <div className="bg-regal-navy p-10 text-soft-cream space-y-8 shadow-xl">
            <h2 className="font-headline-md text-headline-md border-b border-muted-gold/30 pb-6 uppercase tracking-widest">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between font-body-md text-body-md">
                <span className="text-soft-cream/70">Subtotal</span>
                <span>₦ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-body-md text-body-md">
                <span className="text-soft-cream/70">Shipping (Lagos Delivery)</span>
                <span>₦ {shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-body-md text-body-md">
                <span className="text-soft-cream/70">Taxes</span>
                <span>₦ {tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-6 border-t border-muted-gold flex justify-between items-baseline">
              <span className="font-label-md text-label-md uppercase tracking-[0.2em]">Grand Total</span>
              <span className="font-price-lg text-[28px] text-metallic-gold">₦ {total.toLocaleString()}</span>
            </div>
            <div className="pt-4 space-y-4">
              <Link 
                to="/checkout" 
                className={`flex items-center justify-center w-full py-5 px-8 font-label-md text-label-md uppercase tracking-widest font-bold transition-all duration-300 transform active:scale-95 ${items.length === 0 ? 'bg-white/20 text-soft-cream/50 pointer-events-none' : 'bg-metallic-gold text-regal-navy hover:bg-white'}`}
              >
                Proceed to Checkout
              </Link>
              <p className="text-center text-soft-cream/50 font-label-md text-[11px] uppercase tracking-widest">
                Secured by Roymall Scents Payment Gateway
              </p>
            </div>
            
            {/* Promo Code */}
            <div className="pt-6">
              <label className="font-label-md text-label-md uppercase tracking-widest text-soft-cream/70 mb-3 block">Promo Code</label>
              <div className="flex">
                <input 
                  className="bg-white/10 border-b border-muted-gold/30 flex-grow px-4 py-3 text-soft-cream placeholder:text-soft-cream/30 focus:outline-none focus:border-metallic-gold transition-colors" 
                  placeholder="ENTER CODE" 
                  type="text"
                />
                <button className="bg-muted-gold/20 px-6 py-3 font-label-md text-label-md text-metallic-gold hover:bg-muted-gold hover:text-regal-navy transition-colors">Apply</button>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 border border-[#c5c6d0] bg-white flex items-start gap-4">
            <span className="material-symbols-outlined text-metallic-gold">verified_user</span>
            <div>
              <p className="font-label-md text-label-md text-regal-navy uppercase tracking-widest">Authenticity Guaranteed</p>
              <p className="font-body-md text-[13px] text-[#44474f] mt-1 leading-relaxed">Every bottle is hand-poured and inspected at our Atelier in Lagos to ensure the highest standard of luxury perfumery.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Cross-sell Section */}
      <section className="mt-[120px]">
        <div className="flex items-center justify-between mb-12 border-b border-[#c5c6d0] pb-6">
          <h2 className="font-headline-lg text-headline-lg text-regal-navy">You May Also Like</h2>
          <Link to="/shop" className="font-label-md text-label-md uppercase text-muted-gold hover:text-regal-navy transition-colors tracking-widest border-b border-transparent hover:border-regal-navy pb-1">
            View All Collections
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[32px]">
          {crossSells.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] bg-soft-cream mb-6 overflow-hidden">
                <img 
                  className="object-contain w-full h-full p-12 group-hover:scale-110 transition-transform duration-700" 
                  alt={product.name} 
                  src={product.image}
                />
                <button 
                  className="absolute bottom-4 left-4 right-4 bg-regal-navy text-soft-cream py-4 opacity-0 group-hover:opacity-100 transition-all duration-300 font-label-md text-label-md uppercase tracking-widest translate-y-4 group-hover:translate-y-0 hover:bg-metallic-gold hover:text-regal-navy"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Basic add logic for demo
                    setItems(current => {
                      if(current.find(i => i.id === product.id)) return current;
                      return [...current, { ...product, qty: 1, volume: '100ml' }]
                    });
                  }}
                >
                  Quick Add
                </button>
              </div>
              <h4 className="font-headline-md text-[20px] text-regal-navy">{product.name}</h4>
              <p className="font-label-md text-[12px] text-[#44474f] uppercase tracking-widest mt-1">{product.brand}</p>
              <p className="font-price-lg text-[18px] text-muted-gold mt-2">₦ {product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
