import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import type { Product } from '../../lib/api'
import { AnimatedCounter } from '../../components/AnimatedCounter'
import { SEO } from '../../components/SEO'

export const Route = createFileRoute('/_storefront/')({
  component: Home,
})

function ProductCard({ product, largePad = false }: { product: Product, largePad?: boolean }) {
  const queryClient = useQueryClient();
  const [added, setAdded] = useState(false);
  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      api.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  });

  return (
    <Link to="/product/$id" params={{ id: product.id }} className="product-card-hover group cursor-pointer flex flex-col h-full">
      <div className={`aspect-[4/5] bg-white border border-regal-navy/5 relative overflow-hidden flex items-center justify-center ${largePad ? 'p-8' : 'p-4'} transition-shadow hover:shadow-lg`}>
        {product.discountPercentage && (
          <div className="absolute top-4 left-4 z-10 bg-[#8B0000] text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm">
            {product.discountPercentage}% OFF
          </div>
        )}
        <img alt={product.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" src={product.images?.[0]?.url || 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=No+Image'}/>
        <div className="quick-view absolute inset-0 bg-regal-navy/5 opacity-0 transition-all duration-300 flex flex-col justify-end p-4 translate-y-4">
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if(!added) {
                      addToCartMutation.mutate({ productId: product.id, quantity: 1 });
                    }
                }}
                disabled={addToCartMutation.isPending || added}
                className={`text-white px-6 py-3 font-label-md text-label-md uppercase tracking-wider font-bold text-sm w-full transition-colors ${added ? 'bg-green-600' : 'bg-regal-navy hover:bg-metallic-gold'}`}>
                {added ? 'Added to Bag' : (addToCartMutation.isPending ? 'Adding...' : 'Add to Cart')}
            </button>
        </div>
      </div>
      <div className="mt-6 flex flex-col flex-grow">
        <h3 className="text-body-md font-bold mb-1 truncate text-regal-navy">{product.name}</h3>
        <p className="text-[12px] text-regal-navy/50 mb-2 uppercase tracking-tighter truncate">{product.size ? `${product.olfactoryFamily || 'EDP'} ${product.size}` : (product.olfactoryFamily || 'Eau de Parfum')}</p>
        <div className="mt-auto flex items-center gap-2">
          <p className="text-price-lg text-regal-navy font-bold">₦{product.price.toLocaleString()}</p>
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-[13px] text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse flex flex-col">
          <div className="aspect-[4/5] bg-gray-200 mb-6 rounded"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mt-auto"></div>
        </div>
      ))}
    </div>
  )
}

function Home() {
  const { data: metricsData } = useQuery({
    queryKey: ['metrics'],
    queryFn: () => api.getMetrics().then(res => res.data),
    staleTime: 60 * 1000 // 1 min
  })

  const { data: bestSellersData, isLoading: isBestSellersLoading } = useQuery({
    queryKey: ['products', 'best-sellers'],
    queryFn: () => api.getProducts({ isBestSeller: true, limit: 8 })
  })
  
  const { data: newArrivalsData, isLoading: isNewArrivalsLoading } = useQuery({
    queryKey: ['products', 'new-arrivals'],
    queryFn: () => api.getProducts({ isNewArrival: true, limit: 8 })
  })

  const { data: floralData, isLoading: isFloralLoading } = useQuery({
    queryKey: ['products', 'floral'],
    queryFn: () => api.getProducts({ olfactoryFamily: 'Floral', limit: 8 })
  })

  const { data: citrusData, isLoading: isCitrusLoading } = useQuery({
    queryKey: ['products', 'citrus'],
    queryFn: () => api.getProducts({ olfactoryFamily: 'Citrus', limit: 8 })
  })

  const { data: oudData, isLoading: isOudLoading } = useQuery({
    queryKey: ['products', 'oud'],
    queryFn: () => api.getProducts({ olfactoryFamily: 'Woody', limit: 5 })
  })

  const bestSellers: Product[] = Array.isArray(bestSellersData) ? bestSellersData : (bestSellersData?.data || [])
  const newArrivals: Product[] = Array.isArray(newArrivalsData) ? newArrivalsData : (newArrivalsData?.data || [])
  const floral: Product[] = Array.isArray(floralData) ? floralData : (floralData?.data || [])
  const citrus: Product[] = Array.isArray(citrusData) ? citrusData : (citrusData?.data || [])
  const oud: Product[] = Array.isArray(oudData) ? oudData : (oudData?.data || [])

  return (
    <>
      <SEO />
      <style>{`
        .product-card-hover:hover .quick-view {
            opacity: 1;
            transform: translateY(0);
        }
        .hero-overlay {
            background: linear-gradient(to bottom, rgba(0, 27, 68, 0.4) 0%, rgba(0, 27, 68, 0.7) 100%);
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden pt-16 mt-[-80px]">
        <div className="absolute inset-0">
          <img alt="Nocturne Luxury Fragrance" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=2000&auto=format&fit=crop"/>
          <div className="absolute inset-0 hero-overlay"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 w-full text-white z-10 pt-16">
          <span className="text-metallic-gold font-label-md uppercase tracking-[0.4em] mb-6 block font-bold">The Art of Olfaction</span>
          <h1 className="text-headline-lg md:text-display-lg font-display-lg mb-8 leading-tight font-bold">Rare. Timeless. <br/>Masterpieces of Scent.</h1>
          <div className="flex justify-center gap-6">
            <a className="bg-metallic-gold text-regal-navy px-10 py-4 font-label-md uppercase tracking-widest hover:bg-white transition-all shadow-xl font-bold" href="#products">Explore Library</a>
          </div>
        </div>
      </section>
      
      {/* Value Proposition Section */}
      <section className="bg-white py-24 border-b border-regal-navy/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-soft-cream rounded-full flex items-center justify-center mb-6 border border-metallic-gold/20">
                <span className="material-symbols-outlined text-metallic-gold text-3xl">verified</span>
              </div>
              <h3 className="text-headline-md font-headline-lg mb-3 font-bold text-regal-navy">Authentic Fragrances</h3>
              <p className="text-regal-navy/60 text-body-md max-w-xs">Guaranteed 100% original and authentic from world-class perfume houses.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-soft-cream rounded-full flex items-center justify-center mb-6 border border-metallic-gold/20">
                <span className="material-symbols-outlined text-metallic-gold text-3xl">stylus_note</span>
              </div>
              <h3 className="text-headline-md font-headline-lg mb-3 font-bold text-regal-navy">Bespoke Curation</h3>
              <p className="text-regal-navy/60 text-body-md max-w-xs">Expertly selected for you, matching your personal style and mood.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-soft-cream rounded-full flex items-center justify-center mb-6 border border-metallic-gold/20">
                <span className="material-symbols-outlined text-metallic-gold text-3xl">local_shipping</span>
              </div>
              <h3 className="text-headline-md font-headline-lg mb-3 font-bold text-regal-navy">Express Delivery</h3>
              <p className="text-regal-navy/60 text-body-md max-w-xs">Secure nationwide shipping to your doorstep with premium packaging.</p>
            </div>
          </div>
          <div className="text-center pt-16 border-t border-regal-navy/5">
            <p className="text-metallic-gold font-label-md uppercase tracking-widest mb-4 font-bold">A Legacy of Excellence</p>
            <div className="text-[64px] md:text-[96px] font-display-lg text-regal-navy leading-none mb-4 font-bold">
              {metricsData?.scentsDelivered !== undefined ? (
                <><AnimatedCounter end={metricsData.scentsDelivered} />+</>
              ) : (
                '5,000+'
              )}
            </div>
            <h2 className="text-headline-md font-headline-lg uppercase tracking-tight text-regal-navy/40 font-bold">Successful Luxury Deliveries</h2>
          </div>
        </div>
      </section>

      {/* Product Collections Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-24 space-y-32" id="products">
        
        {/* Best Sellers */}
        <section>
          <div className="flex justify-between items-end mb-12 border-b border-regal-navy/10 pb-6">
            <h2 className="text-headline-lg font-headline-lg font-bold text-regal-navy text-4xl">Best Sellers</h2>
            <Link to="/shop" search={{ isBestSeller: true }} className="text-label-md uppercase tracking-widest text-metallic-gold hover:text-regal-navy transition-colors font-bold">See All</Link>
          </div>
          {isBestSellersLoading ? <ProductGridSkeleton count={8} /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestSellers.length > 0 ? (
                bestSellers.slice(0, 8).map(product => <ProductCard key={product.id} product={product} />)
              ) : (
                <p className="col-span-full text-center text-gray-500 py-12">No best sellers currently available.</p>
              )}
            </div>
          )}
        </section>

        {/* The Niche Edit */}
        <section>
          <div className="flex justify-between items-end mb-12 border-b border-regal-navy/10 pb-6">
            <h2 className="text-headline-lg font-headline-lg font-bold text-regal-navy text-4xl">The Niche Edit</h2>
            <Link to="/shop" search={{ isNewArrival: true }} className="text-label-md uppercase tracking-widest text-metallic-gold hover:text-regal-navy transition-colors font-bold">Explore Niche</Link>
          </div>
          {isNewArrivalsLoading ? <ProductGridSkeleton count={8} /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {newArrivals.length > 0 ? (
                newArrivals.slice(0, 8).map(product => <ProductCard key={product.id} product={product} />)
              ) : (
                <p className="col-span-full text-center text-gray-500 py-12">No new arrivals currently available.</p>
              )}
            </div>
          )}
        </section>

        {/* Floral Collection */}
        <section>
          <div className="flex justify-between items-end mb-12 border-b border-regal-navy/10 pb-6">
            <h2 className="text-headline-lg font-headline-lg font-bold text-regal-navy text-4xl">Floral Collection</h2>
            <Link to="/shop" search={{ category: 'Floral' }} className="text-label-md uppercase tracking-widest text-metallic-gold hover:text-regal-navy transition-colors font-bold">Shop Florals</Link>
          </div>
          {isFloralLoading ? <ProductGridSkeleton count={8} /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {floral.length > 0 ? (
                floral.slice(0, 8).map(product => <ProductCard key={product.id} product={product} />)
              ) : (
                <p className="col-span-full text-center text-gray-500 py-12">No floral scents currently available.</p>
              )}
            </div>
          )}
        </section>

        {/* Citrus & Fresh */}
        <section>
          <div className="flex justify-between items-end mb-12 border-b border-regal-navy/10 pb-6">
            <h2 className="text-headline-lg font-headline-lg font-bold text-regal-navy text-4xl">Citrus & Fresh</h2>
            <Link to="/shop" search={{ category: 'Citrus' }} className="text-label-md uppercase tracking-widest text-metallic-gold hover:text-regal-navy transition-colors font-bold">Explore Fresh</Link>
          </div>
          {isCitrusLoading ? <ProductGridSkeleton count={8} /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {citrus.length > 0 ? (
                citrus.slice(0, 8).map(product => <ProductCard key={product.id} product={product} />)
              ) : (
                <p className="col-span-full text-center text-gray-500 py-12">No citrus scents currently available.</p>
              )}
            </div>
          )}
        </section>

        {/* Signature Ouds */}
        <section>
          <div className="flex justify-between items-end mb-12 border-b border-regal-navy/10 pb-6">
            <h2 className="text-headline-lg font-headline-lg font-bold text-regal-navy text-4xl">Signature Ouds</h2>
            <Link to="/shop" search={{ category: 'Oud' }} className="text-label-md uppercase tracking-widest text-metallic-gold hover:text-regal-navy transition-colors font-bold">The Oud Vault</Link>
          </div>
          {isOudLoading ? <ProductGridSkeleton count={5} /> : (
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {oud.length > 0 ? (
                oud.slice(0, 5).map(product => <ProductCard key={product.id} product={product} largePad={true} />)
              ) : (
                <p className="col-span-full text-center text-gray-500 py-12">No oud scents currently available.</p>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Newsletter */}
      <section className="bg-regal-navy py-32 border-t border-metallic-gold/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-metallic-gold font-label-md uppercase tracking-[0.4em] mb-6 block font-bold">The Inner Circle</span>
          <h2 className="text-white text-headline-lg font-headline-lg mb-6 font-bold text-4xl">Join the Royal Circle</h2>
          <p className="text-body-lg text-soft-cream/60 mb-12 max-w-xl mx-auto">Access private allocations of rare vintages and niche arrivals before they reach the library.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!') }}>
            <input required className="flex-grow bg-white/5 border border-white/10 text-white px-6 py-5 font-label-md focus:border-metallic-gold focus:ring-0 outline-none transition-all placeholder:text-white/30" placeholder="Email address" type="email"/>
            <button type="submit" className="bg-metallic-gold text-regal-navy px-12 py-5 font-label-md uppercase tracking-widest hover:bg-white transition-colors whitespace-nowrap shadow-lg font-bold">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  )
}
