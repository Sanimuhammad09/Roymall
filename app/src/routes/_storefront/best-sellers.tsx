import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import type { Product } from '../../lib/api'

export const Route = createFileRoute('/_storefront/best-sellers')({
  component: BestSellers,
})

function BestSellers() {
  const queryClient = useQueryClient()
  const revealRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-10')
        }
      })
    }, observerOptions)

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  const { data: bestSellersData, isLoading } = useQuery({
    queryKey: ['products', 'best-sellers'],
    queryFn: () => api.getProducts({ isBestSeller: true })
  })

  const products: Product[] = Array.isArray(bestSellersData) ? bestSellersData : (bestSellersData?.data || [])

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      api.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  return (
    <main className="bg-background text-on-background font-body-md min-h-screen">
      <style>{`
        .text-shadow-sm { text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .hero-gradient { background: linear-gradient(to bottom, rgba(0,27,68,0.8), rgba(0,27,68,1)); }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      {/* Hero Header Section */}
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-regal-navy mt-[-80px]">
        <div className="absolute inset-0 opacity-40">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzYp1V-WuvSG17ltcyv-kx56gZyhlypCzmcA0QicV0YLFEw9z3vLo5Q7GZs8xp7DLaeqm_8-n3tgkZ4gs_jypWYDcVbMpqmKExd-S0Vj0YMg0Uc78OCG2HnB56mkvaO0nNLoXgwAo2pG5mlafQotkM9iVl0VzYst-nWThIz5hi8aIUwIO82bLgZyS3gzJLA5oa7AFkbl1AiriTLSESV5oKRcoTP2LoOaMuum5FIiCv67JCcIVKetV6')" }}
          />
        </div>
        <div className="relative z-10 text-center px-6 md:px-[64px] pt-20">
          <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-[0.3em] mb-4 block">The Collection</span>
          <h1 className="font-display-lg text-display-lg text-white mb-6">Best Sellers</h1>
          <p className="font-body-lg text-body-lg text-white/80 max-w-2xl mx-auto">Discover the fragrances that have defined our legacy. Each scent in this collection represents the pinnacle of craftsmanship and the most sought-after olfactory journeys in the Roymall atelier.</p>
        </div>
      </header>

      {/* Main Content Canvas */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-[64px] py-[120px]">
        
        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-[32px] border-b border-outline-variant pb-6">
          <div className="flex flex-wrap justify-center gap-8 mb-4 md:mb-0">
            <button className="font-label-md text-label-md text-regal-navy border-b-2 border-metallic-gold pb-1">All Best Sellers</button>
            <button className="font-label-md text-label-md text-on-surface-variant hover:text-regal-navy transition-colors">Men's Favorites</button>
            <button className="font-label-md text-label-md text-on-surface-variant hover:text-regal-navy transition-colors">Women's Favorites</button>
            <button className="font-label-md text-label-md text-on-surface-variant hover:text-regal-navy transition-colors">Unisex Icons</button>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase">Sort By:</span>
            <select className="bg-transparent border-none font-label-md text-label-md text-regal-navy focus:ring-0 cursor-pointer focus:outline-none">
              <option>Popularity</option>
              <option>Newest</option>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20 text-regal-navy font-bold">Loading collection...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[32px]">
            {/* Featured item (first product, spans 2 cols) */}
            {products.length > 0 && (
              <div ref={addToRefs} className="group lg:col-span-2 lg:row-span-2 bg-soft-cream border border-metallic-gold/10 overflow-hidden flex flex-col transition-all duration-1000 opacity-0 translate-y-10">
                <Link to="/product/$id" params={{ id: products[0].id }} className="relative overflow-hidden flex-grow aspect-square md:aspect-auto min-h-[400px] block">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                    style={{ backgroundImage: `url('${products[0].images?.[0]?.url || 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=No+Image'}')` }}
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-regal-navy text-metallic-gold font-label-md text-label-md px-4 py-2 uppercase tracking-widest shadow-lg">Customer Top Choice</span>
                  </div>
                  <button className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-regal-navy shadow-xl opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </Link>
                <div className="p-8 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-lg text-headline-lg text-regal-navy">{products[0].name}</h3>
                    <p className="font-price-lg text-price-lg text-metallic-gold">₦{products[0].price.toLocaleString()}</p>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">
                    {products[0].notes ? `${products[0].notes.top} • ${products[0].notes.heart} • ${products[0].notes.base}` : 'An exquisite fragrance for the discerning individual.'}
                  </p>
                  <button 
                    onClick={() => addToCartMutation.mutate({ productId: products[0].id, quantity: 1 })}
                    disabled={addToCartMutation.isPending}
                    className="w-full py-4 bg-regal-navy text-white font-label-md text-label-md uppercase tracking-[0.2em] hover:bg-muted-gold transition-colors duration-300 disabled:opacity-70"
                  >
                    {addToCartMutation.isPending ? 'Adding...' : 'Add to Shopping Bag'}
                  </button>
                </div>
              </div>
            )}

            {/* Remaining products */}
            {products.slice(1).map((product) => (
              <div ref={addToRefs} key={product.id} className="group bg-white flex flex-col border border-transparent hover:border-outline-variant transition-all duration-1000 opacity-0 translate-y-10">
                <Link to="/product/$id" params={{ id: product.id }} className="relative aspect-[3/4] overflow-hidden bg-soft-cream block">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                    style={{ backgroundImage: `url('${product.images?.[0]?.url || 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=No+Image'}')` }}
                  />
                  <button className="absolute top-4 right-4 text-on-surface-variant hover:text-regal-navy transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </Link>
                <div className="pt-6 pb-2 text-center">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-tighter mb-1 block">{product.brand}</span>
                  <h4 className="font-headline-md text-headline-md text-regal-navy mb-2">{product.name}</h4>
                  <p className="font-price-lg text-price-lg text-metallic-gold">₦{product.price.toLocaleString()}</p>
                </div>
                <div className="mt-auto p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => addToCartMutation.mutate({ productId: product.id, quantity: 1 })}
                    className="w-full py-3 border border-metallic-gold text-metallic-gold font-label-md text-label-md uppercase hover:bg-metallic-gold hover:text-white transition-all"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Promotional Banner */}
        <section ref={addToRefs} className="mt-[120px] grid grid-cols-1 md:grid-cols-2 bg-regal-navy overflow-hidden transition-all duration-1000 opacity-0 translate-y-10">
          <div className="p-16 flex flex-col justify-center items-start">
            <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-[0.3em] mb-6">Discovery Set</span>
            <h2 className="font-headline-lg text-headline-lg text-white mb-6 leading-tight">Can't Decide? Try the Best of Roymall.</h2>
            <p className="font-body-lg text-body-lg text-white/70 mb-10">Our Best Sellers Discovery Set features 2ml samples of our top 5 fragrances. Experience the full journey before choosing your signature scent. Redeemable against your first full-size purchase.</p>
            <button className="px-10 py-5 bg-metallic-gold text-regal-navy font-label-md text-label-md uppercase tracking-widest font-bold hover:bg-white transition-all">Order Discovery Set — ₦25,000</button>
          </div>
          <div className="relative min-h-[400px]">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMJRzf5u3ou2rm5xOow5c-jyClnMS83e5iogim6wJidf1dOZ01UeiRlDBoKitzz9GCrCRn-oeXSW8XL_tKsww_X3hGj_cpTsxB-c695M3DZqCMLC82Jm__dNG9GtonkqTA5-UmGC2evBLWWZH8ZEfO5aY8GKGjTje7aeXerRS3OABigbb9msKom_qwqVxNVzWQ_SXPvHfKr4VFZ7TMlsrebQ3pDseiLe7PYSB6yI11OKdPxSWA1S9T')" }}
            />
          </div>
        </section>
      </div>
    </main>
  )
}
