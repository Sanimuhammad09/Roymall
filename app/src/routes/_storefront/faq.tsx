import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'

export const Route = createFileRoute('/_storefront/faq')({
  component: FAQ,
})

function FAQ() {
  const [openAccordion, setOpenAccordion] = useState<string | null>('auth-1')
  const [activeCategory, setActiveCategory] = useState<string>('authenticity')

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const section = sectionRefs.current[id]
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      let current = activeCategory
      Object.entries(sectionRefs.current).forEach(([id, section]) => {
        if (section) {
          const sectionTop = section.offsetTop
          if (window.scrollY >= sectionTop - 200) {
            current = id
          }
        }
      })
      if (current !== activeCategory) {
        setActiveCategory(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeCategory])

  return (
    <main className="bg-soft-cream text-on-background font-body-md selection:bg-metallic-gold/30 min-h-screen">
      <style>{`
        .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
            opacity: 0;
        }
        .accordion-item.active .accordion-content {
            max-height: 500px;
            opacity: 1;
            padding-bottom: 24px;
        }
        .accordion-item.active .arrow-icon {
            transform: rotate(180deg);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #F9F8F3;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #D4AF37;
        }
      `}</style>

      {/* Hero Section */}
      <header className="bg-regal-navy py-24 px-6 md:px-[64px] relative overflow-hidden mt-[-80px]">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA55NHJdIgxiji78J_432XlFJj-4F-2zd3kd9EQXbsvGeoJ_jbr8vck0I1ba-keRiWykFsAhjOlPvGB5iE4yocnfV1qMhx3IXdAA43HbxX4gs9quLM475a3HY_PONSJBLrz4PyDCeAAggdQHHmi7o9eLYEP8qFV_gZiBSZDHtGJG31epFL8tir5knjckfD_tOnxiObUNkTLK7uFMWXvs7VC1Xn5-que9PEhWttWQGEICwwU8xSGJGOM')" }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-16">
          <span className="font-label-md text-label-md text-metallic-gold mb-4 block tracking-[0.2em] uppercase">Customer Care</span>
          <h1 className="font-display-lg text-display-lg text-soft-cream mb-6">Concierge & FAQs</h1>
          <p className="font-body-lg text-body-lg text-soft-cream/80 max-w-2xl mx-auto">Discover everything you need to know about our artisanal fragrance house, from our sourcing standards to our exclusive bespoke journey.</p>
        </div>
      </header>

      {/* FAQ Section */}
      <section className="py-[120px] px-6 md:px-[64px]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[32px]">
          
          {/* Navigation / Categories */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="border-l-2 border-metallic-gold pl-6">
                <h3 className="font-headline-md text-headline-md text-regal-navy mb-4">Categories</h3>
                <nav className="flex flex-col gap-4 items-start">
                  <button 
                    onClick={() => scrollToSection('authenticity')}
                    className={`text-left font-label-md text-label-md transition-colors ${activeCategory === 'authenticity' ? 'text-regal-navy font-bold' : 'text-on-surface-variant hover:text-metallic-gold'}`}
                  >
                    Product Authenticity
                  </button>
                  <button 
                    onClick={() => scrollToSection('longevity')}
                    className={`text-left font-label-md text-label-md transition-colors ${activeCategory === 'longevity' ? 'text-regal-navy font-bold' : 'text-on-surface-variant hover:text-metallic-gold'}`}
                  >
                    Scent Longevity & Wear
                  </button>
                  <button 
                    onClick={() => scrollToSection('shipping')}
                    className={`text-left font-label-md text-label-md transition-colors ${activeCategory === 'shipping' ? 'text-regal-navy font-bold' : 'text-on-surface-variant hover:text-metallic-gold'}`}
                  >
                    Shipping & Delivery
                  </button>
                  <button 
                    onClick={() => scrollToSection('bespoke')}
                    className={`text-left font-label-md text-label-md transition-colors ${activeCategory === 'bespoke' ? 'text-regal-navy font-bold' : 'text-on-surface-variant hover:text-metallic-gold'}`}
                  >
                    Bespoke Services
                  </button>
                </nav>
              </div>
              
              {/* Visual Anchor */}
              <div className="hidden lg:block aspect-[3/4] w-full bg-surface-container-high relative overflow-hidden">
                <div 
                  className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700 bg-cover bg-center" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBgV3HUPBqUOs-K7cYDB8If9uV1s9r_V3p1a2KK1cFmxFL1YdQuZ9F5N7tIB9qLcUarEj2oWomFhPZThrv8evtqDfr-ssQMMHtwAZSSMqTHv-iwuGc0LTJb0de25sq28tdOaNzcd8meboJnq82lKmWnZmIIaKH0TT1dQST-wXHSz6ul9VFW0c4JRWkO_P2gDhpbu4_OApSljHbtKbwIxLQzrqh0gPfdtuy_UwkGUKAbzxKbt_aDKvo5')" }}
                />
                <div className="absolute inset-0 bg-regal-navy/10"></div>
              </div>
            </div>
          </aside>

          {/* Accordion Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Section: Authenticity */}
            <div ref={el => { sectionRefs.current['authenticity'] = el }} style={{ scrollMarginTop: '100px' }}>
              <h2 className="font-headline-md text-headline-md text-regal-navy mb-8 border-b border-outline-variant pb-4">Product Authenticity</h2>
              <div className="space-y-4">
                <div className={`accordion-item group border-b border-outline-variant/50 ${openAccordion === 'auth-1' ? 'active' : ''}`}>
                  <button className="w-full flex justify-between items-center py-6 text-left hover:text-metallic-gold transition-colors focus:outline-none" onClick={() => toggleAccordion('auth-1')}>
                    <span className="font-headline-md text-[20px] text-regal-navy group-hover:text-metallic-gold">How can I verify the authenticity of my Roymall Scents fragrance?</span>
                    <span className="material-symbols-outlined arrow-icon transition-transform duration-300">expand_more</span>
                  </button>
                  <div className="accordion-content">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Every Roymall Scents creation comes with a unique Certificate of Authenticity featuring a holographic serial number. You can verify your specific bottle by entering the 12-digit code on our digital verification portal. We only guarantee authenticity for products purchased through our official website or authorized high-end boutiques worldwide.
                    </p>
                  </div>
                </div>
                <div className={`accordion-item group border-b border-outline-variant/50 ${openAccordion === 'auth-2' ? 'active' : ''}`}>
                  <button className="w-full flex justify-between items-center py-6 text-left hover:text-metallic-gold transition-colors focus:outline-none" onClick={() => toggleAccordion('auth-2')}>
                    <span className="font-headline-md text-[20px] text-regal-navy group-hover:text-metallic-gold">What defines a "Bespoke Grade" ingredient?</span>
                    <span className="material-symbols-outlined arrow-icon transition-transform duration-300">expand_more</span>
                  </button>
                  <div className="accordion-content">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Our "Bespoke Grade" label is reserved for ingredients sourced from the first extraction of rare botanicals. This includes Grasse Jasmine harvested at dawn and sustainably sourced Mysore Sandalwood. These extracts possess a complexity and purity that standard commercial-grade oils cannot replicate.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Scent Longevity */}
            <div ref={el => { sectionRefs.current['longevity'] = el }} style={{ scrollMarginTop: '100px' }}>
              <h2 className="font-headline-md text-headline-md text-regal-navy mb-8 border-b border-outline-variant pb-4">Scent Longevity & Wear</h2>
              <div className="space-y-4">
                <div className={`accordion-item group border-b border-outline-variant/50 ${openAccordion === 'long-1' ? 'active' : ''}`}>
                  <button className="w-full flex justify-between items-center py-6 text-left hover:text-metallic-gold transition-colors focus:outline-none" onClick={() => toggleAccordion('long-1')}>
                    <span className="font-headline-md text-[20px] text-regal-navy group-hover:text-metallic-gold">Why do some scents last longer than others on the skin?</span>
                    <span className="material-symbols-outlined arrow-icon transition-transform duration-300">expand_more</span>
                  </button>
                  <div className="accordion-content">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Fragrance longevity is dictated by the concentration of base notes (like Amber, Musk, and Oud) versus volatile top notes (like Citrus). Our 'Extrait de Parfum' concentrations contain up to 30% fragrance oils, typically providing 8-12 hours of sillage, whereas lighter formulations are designed for a more intimate, 4-6 hour experience.
                    </p>
                  </div>
                </div>
                <div className={`accordion-item group border-b border-outline-variant/50 ${openAccordion === 'long-2' ? 'active' : ''}`}>
                  <button className="w-full flex justify-between items-center py-6 text-left hover:text-metallic-gold transition-colors focus:outline-none" onClick={() => toggleAccordion('long-2')}>
                    <span className="font-headline-md text-[20px] text-regal-navy group-hover:text-metallic-gold">How should I store my fragrance to maintain its integrity?</span>
                    <span className="material-symbols-outlined arrow-icon transition-transform duration-300">expand_more</span>
                  </button>
                  <div className="accordion-content">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      To preserve the molecular structure of your fragrance, store it in its original velvet-lined box in a cool, dark place away from humidity. Avoid bathrooms or windowsills, as heat and UV light are the primary causes of fragrance oxidation and "turning."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Shipping & Bespoke */}
            <div ref={el => { sectionRefs.current['shipping'] = el }} style={{ scrollMarginTop: '100px' }}>
              <h2 className="font-headline-md text-headline-md text-regal-navy mb-8 border-b border-outline-variant pb-4">Shipping & Delivery</h2>
              <div className="space-y-4">
                <div className={`accordion-item group border-b border-outline-variant/50 ${openAccordion === 'ship-1' ? 'active' : ''}`}>
                  <button className="w-full flex justify-between items-center py-6 text-left hover:text-metallic-gold transition-colors focus:outline-none" onClick={() => toggleAccordion('ship-1')}>
                    <span className="font-headline-md text-[20px] text-regal-navy group-hover:text-metallic-gold">Do you offer international white-glove delivery?</span>
                    <span className="material-symbols-outlined arrow-icon transition-transform duration-300">expand_more</span>
                  </button>
                  <div className="accordion-content">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Yes. We provide temperature-controlled international shipping to over 45 countries. For our 'Signature Collection' and Bespoke orders, we utilize a white-glove courier service to ensure your fragrance is handled with the utmost care from our atelier to your doorstep.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div ref={el => { sectionRefs.current['bespoke'] = el }} style={{ scrollMarginTop: '100px' }}>
              <h2 className="font-headline-md text-headline-md text-regal-navy mb-8 border-b border-outline-variant pb-4">Bespoke Services</h2>
              <div className="space-y-4">
                <div className={`accordion-item group border-b border-outline-variant/50 ${openAccordion === 'bespoke-1' ? 'active' : ''}`}>
                  <button className="w-full flex justify-between items-center py-6 text-left hover:text-metallic-gold transition-colors focus:outline-none" onClick={() => toggleAccordion('bespoke-1')}>
                    <span className="font-headline-md text-[20px] text-regal-navy group-hover:text-metallic-gold">How does the Bespoke Consultation process work?</span>
                    <span className="material-symbols-outlined arrow-icon transition-transform duration-300">expand_more</span>
                  </button>
                  <div className="accordion-content">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      The Bespoke Journey begins with a private 90-minute olfactory profiling session with our lead perfumer. Following this, three unique trials are developed and sent to you over a 3-month period. Once finalized, your unique formula is archived in our vault for exclusive re-ordering forever.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-regal-navy p-12 flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
              <div className="text-center md:text-left">
                <h3 className="font-headline-md text-headline-md text-metallic-gold mb-2">Still have questions?</h3>
                <p className="font-body-md text-body-md text-soft-cream/70">Our fragrance specialists are available for personalized assistance.</p>
              </div>
              <Link to="/contact" className="px-8 py-4 bg-metallic-gold text-regal-navy font-label-md text-label-md font-bold uppercase hover:bg-white transition-colors duration-300 tracking-wider">
                Contact Us
              </Link>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  )
}
