import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import type { Product } from '../../lib/api'

export const Route = createFileRoute('/_storefront/new-arrivals')({
  component: NewArrivals,
})

function NewArrivals() {
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

  const { data: newArrivalsData, isLoading } = useQuery({
    queryKey: ['products', 'new-arrivals'],
    queryFn: () => api.getProducts({ isNewArrival: true })
  })

  const products: Product[] = Array.isArray(newArrivalsData) ? newArrivalsData : (newArrivalsData?.data || [])

  return (
    <main className="bg-background text-on-background font-body-md min-h-screen">
      <style>{`
        .text-glow {
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-regal-navy mt-[-80px]">
        <div className="absolute inset-0 opacity-40">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcwko2WplBG0C3KvUzaQ7ktIFznWHQ7yDSCRAPAGAYKhG5eV-a2A7mc_fsVV48wQhCqzEzhNdohtbkUANHS9L_NNK70l8AAu26_HTFq5f8_X9yyFHL2yoc06Sss7AygLGNuhqANq9-Gcf9QHcl1y3ceP_azFysO2EVy754Z9af6tXqM6ZjTI22y3SnCGqAWru3ar5qqGbJA3VG35whPI-OaXIttBOsqxFUtt61nEi93hgMnOjSfDrm')" }}
          />
        </div>
        <div className="relative z-10 text-center px-[20px] max-w-4xl mx-auto pt-20">
          <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-[0.3em] mb-4 block">Summer 2024 Collection</span>
          <h1 className="font-display-lg text-display-lg text-white mb-6 text-glow">The Essence of Eternity</h1>
          <p className="font-body-lg text-body-lg text-soft-cream/80 mb-10 max-w-2xl mx-auto">Discover our latest olfactory masterpieces. Crafted by master perfumers in the heart of Grasse, our New Arrivals blend ancient wisdom with contemporary allure.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-metallic-gold text-regal-navy px-10 py-4 font-label-md text-label-md font-bold hover:bg-white transition-all duration-300">EXPLORE THE STORY</button>
            <button className="border border-metallic-gold text-metallic-gold px-10 py-4 font-label-md text-label-md font-bold hover:bg-metallic-gold hover:text-regal-navy transition-all duration-300">SHOP ALL NEW</button>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section 
        ref={addToRefs} 
        className="py-[120px] px-6 md:px-[64px] max-w-[1440px] mx-auto transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-4">Latest Curations</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">Each scent in this collection is a deliberate journey, captured in a bottle. Experience the evolution of luxury fragrance.</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 font-label-md text-label-md text-regal-navy border-b border-regal-navy/20 pb-1 hover:border-metallic-gold transition-all">
              Filter By <span className="material-symbols-outlined text-sm">filter_list</span>
            </button>
            <button className="flex items-center gap-2 font-label-md text-label-md text-regal-navy border-b border-regal-navy/20 pb-1 hover:border-metallic-gold transition-all">
              Sort <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20 text-regal-navy font-bold">Loading collection...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
            {products.map(product => (
              <Link to="/product/$id" params={{ id: product.id }} key={product.id} className="group flex flex-col cursor-pointer">
                <div className="relative overflow-hidden bg-soft-cream aspect-[4/5] mb-6">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={product.name} 
                    src={product.images?.[0]?.url || 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=No+Image'}
                  />
                  <div className="absolute inset-0 bg-regal-navy/0 group-hover:bg-regal-navy/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white text-regal-navy px-6 py-3 font-label-md text-label-md shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Quick View</button>
                  </div>
                  <div className="absolute top-4 left-4 bg-metallic-gold text-regal-navy px-3 py-1 font-label-md text-[10px] tracking-wider uppercase">New</div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-label-md text-[12px] text-metallic-gold uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="font-headline-md text-headline-md text-regal-navy mb-2">{product.name}</h3>
                  </div>
                  <span className="font-price-lg text-price-lg text-regal-navy">₦{product.price.toLocaleString()}</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">
                  {product.notes ? `${product.notes.top} • ${product.notes.heart} • ${product.notes.base}` : 'Discover the new essence.'}
                </p>
                <button className="mt-auto border border-metallic-gold text-metallic-gold py-3 font-label-md text-label-md hover:bg-metallic-gold hover:text-white transition-all duration-300 uppercase">Discover More</button>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Story/About the Collection Section */}
      <section 
        ref={addToRefs} 
        className="bg-regal-navy text-white overflow-hidden transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-stretch">
          <div className="flex-1 px-6 md:px-[64px] py-[120px] flex flex-col justify-center">
            <span className="font-label-md text-label-md text-metallic-gold mb-6 uppercase tracking-widest">Mastering the Craft</span>
            <h2 className="font-display-lg text-display-lg mb-8">A Dialogue Between Tradition and Innovation</h2>
            <div className="space-y-6 max-w-xl">
              <p className="font-body-lg text-body-lg text-soft-cream/70">Our Summer 2024 collection represents a significant shift in our creative direction. We've spent eighteen months collaborating with artisans in Nigeria and France to source the rarest botanicals.</p>
              <p className="font-body-lg text-body-lg text-soft-cream/70">By combining the heritage of Lagos's vibrant spirit with the refinement of Parisian alchemy, we've created a series of scents that don't just linger—they tell a story of where you've been and where you're going.</p>
            </div>
            <div className="mt-12">
              <Link to="/our-story" className="inline-flex items-center gap-4 text-metallic-gold font-label-md text-label-md uppercase hover:gap-6 transition-all">
                Learn about our process 
                <span className="material-symbols-outlined">trending_flat</span>
              </Link>
            </div>
          </div>
          <div className="flex-1 min-h-[500px] relative">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfHeDQrIUl_aU8hflTK0zWQm0qZ3TSdABExnKnN67m4DIQ0z-wSZNbGEsY1iuCUM914wZH69vHGC4iCvzCm5er024x1SOhgDTu_U3miKePHybYWVy2_FXVhdMGcrn5Rueih4f9gDGWZ8DzcPD9nX9u-vzfffRTSxmJuwtIcECrebqhcic9NttOVVQV70DahlnybVnooOR-efisd1aWOkZ2WnTKkLewtLBwUvHtoPWGWXg6Wi9XpJ62')" }}
            />
          </div>
        </div>
      </section>

      {/* Newsletter / Join the Circle */}
      <section 
        ref={addToRefs} 
        className="py-[120px] px-6 md:px-[64px] text-center bg-soft-cream transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="max-w-2xl mx-auto">
          <span className="material-symbols-outlined text-metallic-gold text-5xl mb-6">loyalty</span>
          <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-4">Join The Royal Circle</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-10">Receive early access to limited edition drops, masterclass invitations, and a curated fragrance discovery guide.</p>
          <form className="flex flex-col sm:flex-row gap-0 border-b border-regal-navy/20 focus-within:border-metallic-gold transition-colors">
            <input 
              className="flex-grow bg-transparent border-none focus:ring-0 px-4 py-4 font-body-md text-regal-navy placeholder:text-on-surface-variant/50 focus:outline-none" 
              placeholder="Your Email Address" 
              type="email"
            />
            <button 
              className="font-label-md text-label-md text-regal-navy uppercase tracking-widest px-8 py-4 hover:text-metallic-gold transition-colors" 
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
