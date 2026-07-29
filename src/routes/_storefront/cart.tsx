import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'

export const Route = createFileRoute('/_storefront/cart')({
  component: Cart,
})

function Cart() {
  const queryClient = useQueryClient()
  const [isFastDelivery, setIsFastDelivery] = useState(false)
  
  const { data: cartResponse } = useQuery({
    queryKey: ['cart'],
    queryFn: api.getCart
  })

  // The backend might return { data: { items: [], subtotal, tax, shipping, total } } or similar.
  // Assuming array of items for now or an object with items array.
  const cartData = cartResponse?.data || cartResponse || { items: [] }
  const items = Array.isArray(cartData) ? cartData : (cartData.items || [])

  const subtotal = cartData.subtotal || items.reduce((acc: number, item: any) => acc + ((item.price || item.product?.price || 0) * item.quantity), 0)
  const shipping = items.length > 0 ? (isFastDelivery ? 5000 : 0) : 0
  const tax = cartData.tax || 0
  const total = subtotal + shipping + tax

  const updateMutation = useMutation({
    mutationFn: ({ id, qty }: { id: string, qty: number }) => api.updateCartItem(id, qty),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })

  const removeMutation = useMutation({
    mutationFn: (id: string) => api.removeFromCart(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })

  const addToCartMutation = useMutation({
    mutationFn: ({ id, qty }: { id: string, qty: number }) => api.addToCart(id, qty),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })

  const updateQty = (id: string, newQty: number) => {
    if (newQty < 1) return
    updateMutation.mutate({ id, qty: newQty })
  }

  const removeItem = (id: string) => {
    removeMutation.mutate(id)
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
          {items.map((item: any) => (
            <div key={item.id} className="group relative flex flex-col md:flex-row gap-4 md:gap-8 pb-8 border-b border-[#c5c6d0] hover:border-metallic-gold transition-colors duration-500">
              <div className="w-full md:w-48 h-48 md:h-64 bg-soft-cream flex items-center justify-center overflow-hidden">
                <img 
                  className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-700" 
                  alt={item.product?.name || item.name} 
                  src={item.product?.images?.[0]?.url || item.image || 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=No+Image'}
                />
              </div>
              <div className="flex-grow flex flex-col justify-between py-2">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-headline-md text-lg md:text-headline-md text-regal-navy">{item.product?.name || item.name}</h3>
                      <span className="font-price-lg text-base md:text-price-lg text-regal-navy">₦ {((item.product?.price || item.price || 0) * (item.quantity || item.qty)).toLocaleString()}</span>
                    </div>
                    <p className="font-label-md text-label-md text-muted-gold uppercase mt-1">{item.product?.brand || item.brand}</p>
                    <p className="font-body-md text-body-md text-[#44474f] mt-2">Volume: {item.product?.size || item.volume}</p>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-4 md:gap-0">
                    <div className="flex items-center border border-[#c5c6d0] w-fit">
                      <button onClick={() => updateQty(item.id, (item.quantity || item.qty) - 1)} className="px-4 py-2 hover:bg-soft-cream transition-colors text-regal-navy">
                        <span className="material-symbols-outlined">remove</span>
                      </button>
                      <span className="px-4 font-label-md text-label-md border-x border-[#c5c6d0] min-w-[2rem] text-center">{item.quantity || item.qty}</span>
                      <button onClick={() => updateQty(item.id, (item.quantity || item.qty) + 1)} className="px-4 py-2 hover:bg-soft-cream transition-colors text-regal-navy">
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
            
            <div className="space-y-4 pt-2">
              <div className="font-label-md text-label-md uppercase tracking-widest text-soft-cream/70 mb-3">Delivery Method</div>
              <div className="flex flex-col gap-3 pb-6 border-b border-muted-gold/30">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" checked={!isFastDelivery} onChange={() => setIsFastDelivery(false)} className="accent-metallic-gold" />
                    <span className="font-body-md text-body-md group-hover:text-metallic-gold transition-colors">Standard Delivery</span>
                  </div>
                  <span className="font-body-md text-body-md">Free</span>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" checked={isFastDelivery} onChange={() => setIsFastDelivery(true)} className="accent-metallic-gold" />
                    <span className="font-body-md text-body-md group-hover:text-metallic-gold transition-colors">Fast Delivery</span>
                  </div>
                  <span className="font-body-md text-body-md">₦ 5,000</span>
                </label>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between font-body-md text-body-md">
                <span className="text-soft-cream/70">Subtotal</span>
                <span>₦ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-body-md text-body-md">
                <span className="text-soft-cream/70">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₦ ${shipping.toLocaleString()}`}</span>
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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-[32px]">
          {crossSells.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] bg-soft-cream mb-4 md:mb-6 overflow-hidden">
                <img 
                  className="object-contain w-full h-full p-12 group-hover:scale-110 transition-transform duration-700" 
                  alt={product.name} 
                  src={product.image || 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=No+Image'}
                />
                <button 
                  className="absolute bottom-4 left-4 right-4 bg-regal-navy text-soft-cream py-4 opacity-0 group-hover:opacity-100 transition-all duration-300 font-label-md text-label-md uppercase tracking-widest translate-y-4 group-hover:translate-y-0 hover:bg-metallic-gold hover:text-regal-navy"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Basic add logic for demo
                    addToCartMutation.mutate({ id: product.id, qty: 1 })
                  }}
                >
                  Quick Add
                </button>
              </div>
              <h4 className="font-headline-md text-sm md:text-[20px] text-regal-navy truncate">{product.name}</h4>
              <p className="font-label-md text-[10px] md:text-[12px] text-[#44474f] uppercase tracking-widest mt-1 truncate">{product.brand}</p>
              <p className="font-price-lg text-sm md:text-[18px] text-muted-gold mt-1 md:mt-2">₦ {product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
