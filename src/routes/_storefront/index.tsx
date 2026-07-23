import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import type { Product } from '../../lib/api'

export const Route = createFileRoute('/_storefront/')({
  component: Home,
})

function Home() {
  const queryClient = useQueryClient()
  const [addedToast, setAddedToast] = useState(false)
  
  const { data: bestSellersData } = useQuery({
    queryKey: ['products', 'best-sellers'],
    queryFn: () => api.getProducts({ isBestSeller: true })
  })
  
  const { data: newArrivalsData } = useQuery({
    queryKey: ['products', 'new-arrivals'],
    queryFn: () => api.getProducts({ isNewArrival: true })
  })

  const { data: metricsData } = useQuery({
    queryKey: ['metrics'],
    queryFn: api.getMetrics
  })

  const bestSellers: Product[] = Array.isArray(bestSellersData) ? bestSellersData : (bestSellersData?.data || [])
  const newArrivals: Product[] = Array.isArray(newArrivalsData) ? newArrivalsData : (newArrivalsData?.data || [])

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      api.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      setAddedToast(true)
      setTimeout(() => setAddedToast(false), 2500)
    }
  })

  // Fade-in observer
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-10')
        }
      })
    }, { threshold: 0.1 })

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  // Simple parallax for hero
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const heroImage = document.querySelector('[data-parallax="hero"]') as HTMLElement
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.4}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        .text-stroke-gold {
          -webkit-text-stroke: 1px #D4AF37;
          color: transparent;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 175, 55, 0.1);
        }
      `}</style>

      {/* Hero Section */}
      <header className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-regal-navy pt-32 pb-20 md:pt-0 md:pb-0">
        <div className="absolute inset-0 z-0 opacity-60">
          <div 
            data-parallax="hero"
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBlVYdYLlLjEVw7NGB9mLDMtqFJK4CJ_BYIf4AbtQ4EGYzRsxPn3X_hfdrziq2wsYL5mLYb_e4iVC8MN0qN7Pc22c9yxbOx3Pbrnw3eamrLFtPfLOmTYWJxXEKxwK8ETTQtNis1WhHo6jm_ic1ggIk_uPxF7GWtiUMLa3CfU1iWNC8F2r1fIgpN_fWn5Bt77g9jcH9AXFVJIRawd3WmiM9rdesCcfooIyPoon2Lp5MQDGd9fn1hbNsK')" }}
          ></div>
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-8 lg:col-span-7 flex flex-col gap-6 animate-fade-in mt-10 md:mt-0">
            <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-[0.2em]">Exclusively Crafted</span>
            <h1 className="font-display-lg text-display-lg text-white leading-tight font-bold text-4xl sm:text-5xl md:text-7xl">Define Your <br/><span className="text-stroke-gold">Signature Aura</span></h1>
            <p className="font-body-lg text-body-lg text-soft-cream/80 max-w-xl text-sm md:text-base">A curated collection of artisanal fragrances designed for the sophisticated individual. Experience olfactory excellence crafted with the world's finest essences.</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link to="/shop" className="bg-metallic-gold text-regal-navy font-label-md text-label-md px-10 py-4 uppercase tracking-wider font-bold transition-transform hover:scale-105 text-center">Explore Collection</Link>
              <a href="/contact" className="border border-metallic-gold text-metallic-gold font-label-md text-label-md px-10 py-4 uppercase tracking-wider font-bold transition-all hover:bg-metallic-gold hover:text-regal-navy text-center">Book Consultation</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-8 md:right-16 z-10 hidden md:block animate-fade-in">
          <div className="flex flex-col items-end gap-2 border-r-2 border-metallic-gold pr-6 py-2">
            <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-widest font-bold">Est. 2018</span>
            <span className="font-body-md text-body-md text-soft-cream">Lagos • London • Dubai</span>
          </div>
        </div>
      </header>

      {/* Impact Metric / Order Counter */}
      <section ref={addToRefs} className="bg-soft-cream py-20 transition-all duration-1000 opacity-0 translate-y-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-left">
            <div className="flex flex-col gap-2">
              <h2 className="font-headline-lg text-headline-lg text-regal-navy text-4xl font-bold">Beyond the Fragrance</h2>
              <p className="font-body-lg text-body-lg text-gray-600 max-w-md mx-auto lg:mx-0">Our commitment to quality has touched lives across continents, creating sensory memories that last a lifetime.</p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-10 md:gap-16">
              <div className="flex flex-col items-center">
                <span className="font-display-lg text-metallic-gold font-bold text-5xl md:text-6xl">
                  {metricsData?.scentsDelivered ? `${Math.floor(metricsData.scentsDelivered / 1000)}k+` : '10k+'}
                </span>
                <span className="font-label-md text-label-md text-regal-navy uppercase tracking-widest font-bold mt-2">Scents Delivered</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display-lg text-metallic-gold font-bold text-5xl md:text-6xl">
                  {metricsData?.globalStockists ? `${metricsData.globalStockists}+` : '250+'}
                </span>
                <span className="font-label-md text-label-md text-regal-navy uppercase tracking-widest font-bold mt-2">Global Stockists</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display-lg text-metallic-gold font-bold text-5xl md:text-6xl">
                  {metricsData?.customerRating || '4.9'}
                </span>
                <span className="font-label-md text-label-md text-regal-navy uppercase tracking-widest font-bold mt-2">Customer Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now - Product Grid */}
      <section ref={addToRefs} className="py-24 transition-all duration-1000 opacity-0 translate-y-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-widest font-bold">Most Wanted</span>
              <h2 className="font-headline-lg text-headline-lg text-regal-navy font-bold text-4xl">Trending Now</h2>
            </div>
            <Link to="/shop" className="font-label-md text-label-md text-regal-navy flex items-center gap-2 hover:text-metallic-gold transition-colors font-bold">
              View All Collection <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {bestSellers.slice(0, 4).map((product, index) => (
              <Link to="/product/$id" params={{ id: product.id }} key={product.id} className="group cursor-pointer block">
                <div className="relative aspect-[4/5] bg-soft-cream overflow-hidden mb-6">
                  <div className="absolute inset-0 scale-100 group-hover:scale-110 transition-transform duration-700 bg-cover bg-center" style={{backgroundImage: `url('${product.images?.[0]?.url || 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=No+Image'}')`}}></div>
                  {index === 0 && (
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 font-label-md text-label-md text-regal-navy uppercase font-bold text-xs">Bestseller</div>
                  )}
                  <div className="absolute inset-0 bg-regal-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-regal-navy px-6 py-3 font-label-md text-label-md uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform font-bold text-sm">Quick View</button>
                  </div>
                </div>
                <h3 className="font-headline-md text-headline-md text-regal-navy mb-1 font-bold text-xl">{product.name}</h3>
                <p className="font-body-md text-body-md text-gray-500 mb-3 text-sm">{product.notes?.top} • {product.notes?.heart} • {product.notes?.base}</p>
                <span className="font-price-lg text-price-lg text-metallic-gold font-bold">₦{product.price.toLocaleString()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Thematic Pair Banner */}
      <section ref={addToRefs} className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 transition-all duration-1000 opacity-0 translate-y-10 mb-24">
        <div className="h-[400px] lg:h-[600px] bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDw9s3R_uJCIEpunOTaoVJgxAZKV3_eFr9PzeRhPnFXECKlEEroqQLMf_jKX2jldYjrCoxfoDdged2kn_VSCmsoSYz4TeOhnXDToaO2jmJWKuHPsnWDq9_0Wu6M6kLDkoOu4f2uSEA1P5WdnOYBFxMvpGoSmomkb18uPGyuL1wqAnyD4ZhWIEgrd_3TRxh-vYpuN6yaVoJVa_lc6H0fWRFMIOhr3DRVy2qR3pmOjPM_GTPbGEYUSZSs')"}}></div>
        <div className="h-auto lg:h-[600px] bg-regal-navy flex flex-col justify-center items-start p-12 lg:p-24 gap-8">
          <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-[0.2em] font-bold">The Scent Story</span>
          <h2 className="font-display-lg text-headline-lg text-white font-bold text-4xl leading-snug">Artisanal Perfumery for the Modern Soul</h2>
          <p className="font-body-lg text-body-lg text-soft-cream/70 leading-relaxed">Each bottle in our collection is a labor of love, blending rare botanicals with modern chemical precision to create scents that evolve with your skin throughout the day.</p>
          <Link to="/our-story" className="border-b border-metallic-gold text-metallic-gold font-label-md text-label-md uppercase py-2 tracking-widest hover:text-white transition-colors font-bold">Our Craftsmanship Process</Link>
        </div>
      </section>

      {/* Curated for You - Bento Grid / Large Grid */}
      <section ref={addToRefs} className="py-24 bg-gray-50 transition-all duration-1000 opacity-0 translate-y-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-widest font-bold">Personalized Selection</span>
            <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-4 font-bold text-4xl">Curated for You</h2>
            <div className="w-16 h-0.5 bg-metallic-gold"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.slice(0, 8).map((product) => (
              <Link to="/product/$id" params={{ id: product.id }} key={product.id} className="bg-white p-6 group transition-all duration-300 hover:shadow-xl block">
                <div className="aspect-square bg-soft-cream mb-6 overflow-hidden">
                  <div className="w-full h-full scale-100 group-hover:scale-105 transition-transform duration-500 bg-cover bg-center" style={{backgroundImage: `url('${product.images?.[0]?.url || 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=No+Image'}')`}}></div>
                </div>
                <h4 className="font-headline-md text-body-lg font-bold text-regal-navy text-xl">{product.name}</h4>
                <p className="font-label-md text-label-md text-gray-500 mb-4 uppercase text-[10px] font-bold">{product.notes?.top} • {product.notes?.heart}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="font-price-lg text-body-lg font-bold text-metallic-gold text-lg">₦{product.price.toLocaleString()}</span>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      addToCartMutation.mutate({ productId: product.id, quantity: 1 })
                    }}
                    className="material-symbols-outlined text-regal-navy group-hover:text-metallic-gold transition-colors"
                  >
                    add_shopping_cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Added to Cart Toast */}
      {addedToast && (
        <div className="fixed bottom-10 right-10 bg-regal-navy text-metallic-gold px-8 py-4 flex items-center gap-4 z-50 border border-metallic-gold shadow-2xl">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-md text-sm uppercase tracking-widest">Added to your bag</span>
        </div>
      )}
    </>
  )
}
