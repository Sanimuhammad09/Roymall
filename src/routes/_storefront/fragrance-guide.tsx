import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/_storefront/fragrance-guide')({
  component: FragranceGuide,
})

function FragranceGuide() {
  // Reveal on scroll logic
  const revealRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-[30px]')
        }
      })
    }, observerOptions)

    revealRefs.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      <style>{`
        .scent-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 5s linear infinite;
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        .reveal-transition {
          transition: all 0.8s ease-out;
        }
      `}</style>

      {/* Hero Section */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-regal-navy mt-[-80px]">
        {/* mt-[-80px] to tuck under transparent nav if applicable, though storefront header is sticky */}
        <div className="absolute inset-0 opacity-40">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbgkINpFzWn1A3nGTkHl6wHQRMtkGgpLOA8b0bI1X6YS3B7nOqpW0mJ8GtD1a88pLsnKvzPlns_nhuCEN_vabsK4sGSNFQ691J2frgsUuV9f8zceqx1azuP2C7BkDCZvEBNUcUf6HWKPWx7FLLAt0fATX3HFxIThcNXEyRD_0gQJQ_qUWZdJw52CAvzoP9rDZ8iXEhbmDg9OWlgeDvkgd7Vp24BcBfHbc8kBSKWj-Fzt8aElM3WKhi')" }}
          />
        </div>
        <div className="relative z-10 text-center px-6 md:px-[64px] max-w-4xl pt-20">
          <span className="font-label-md text-label-md text-metallic-gold mb-4 block tracking-widest uppercase">The Art of Olfaction</span>
          <h1 className="font-display-lg text-display-lg text-soft-cream mb-8 leading-tight">Mastering Your <br/><span className="italic font-normal">Scent Signature</span></h1>
          <p className="font-body-lg text-body-lg text-soft-cream/80 mb-12 max-w-2xl mx-auto">Discover the intricate world of fine perfumery. From understanding olfactory families to mastering application, embark on a journey to find your unique sensory identity.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-metallic-gold text-regal-navy px-12 py-4 font-label-md text-label-md hover:bg-soft-cream transition-all duration-300 uppercase tracking-widest">Explore Families</button>
            <button className="border border-metallic-gold text-metallic-gold px-12 py-4 font-label-md text-label-md hover:bg-metallic-gold hover:text-regal-navy transition-all duration-300 uppercase tracking-widest">Application Tips</button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="material-symbols-outlined text-metallic-gold">expand_more</span>
        </div>
      </header>

      {/* Olfactory Families Bento Grid */}
      <section ref={addToRefs} className="py-[120px] px-6 md:px-[64px] max-w-[1440px] mx-auto reveal-transition opacity-0 translate-y-[30px]">
        <div className="mb-20 text-center">
          <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-4">The Olfactory Families</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">Fragrances are classified into families based on their dominant notes. Understanding these groups is the first step in identifying your preference.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px] h-auto md:h-[900px]">
          {/* Oud - Large Anchor */}
          <div className="md:col-span-8 group relative overflow-hidden bg-soft-cream min-h-[400px] md:min-h-0">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmveIsy8Z9ZXE_wFGODX0bbCARDqK-NZKYH6WJEMUdTzPbrwspS6l3X98eGlrVxmGpBiiBCpkQ5q3tXpof_cgW9TbikBrNriQrkGPFO0MV1S4bbPxFJti_WzPjIgS4Kg81onx-vp_hKmQfxY9zeDflCFYdlGbUyDs2WGYydRWVLoyGIPoee1MiUqMnsFo9bppZ9RfzV1Bwo3XqSjhTGuye4Io3gBuPwHGk1bN6dC8cDadlFjgvtvlz')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-regal-navy/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-10 text-soft-cream">
              <span className="font-label-md text-label-md text-metallic-gold mb-2 block">Oriental & Rare</span>
              <h3 className="font-headline-lg text-headline-lg mb-4">Oud & Woods</h3>
              <p className="font-body-md text-body-md max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">Rich, resinous, and deeply evocative. Oud represents the pinnacle of luxury, derived from the rare heartwood of the Aquilaria tree.</p>
            </div>
          </div>
          {/* Floral - Vertical */}
          <div className="md:col-span-4 group relative overflow-hidden border border-outline-variant min-h-[300px] md:min-h-0">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuARz6eNb5TxtzP0O7r2xbjxjW6tqpegnduqShwZuCLbPSMGCwN2qybbK1NQ2FB4NExJA1ZvoHA5snlMgrexRAPvVmFtM8lImWbIJbHQAJvLh_08QI4oQoN4mf8RHtp_5aTexF8S8fwMsXQ_r13MNLO6QOw2qbFOzFcx12jAT2IWy2Pr3OYHdEknQ4NdiyVGf0Lx8B3q43XbUQPzYrVcQy0GOnazZSJM4VYRiUXqeIA3BUxGbLCECXAX')" }}
            />
            <div className="absolute inset-0 bg-white/10 group-hover:bg-regal-navy/20 transition-colors duration-500"></div>
            <div className="absolute bottom-0 left-0 p-10">
              <h3 className="font-headline-md text-headline-md text-regal-navy mb-2">Floral</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">The most popular family, ranging from delicate rose to opulent jasmine.</p>
            </div>
          </div>
          {/* Citrus - Horizontal */}
          <div className="md:col-span-4 group relative overflow-hidden border border-outline-variant min-h-[300px] md:min-h-0">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAduRKghDt2sPVAcDC8NU40vyhS32CJO-N4aoAjMSPwWmgIuec2GN590j04xAlBH5tBnudgECZmdAnWDAs7JO71iuZYA9hg1s1VeVCYnVaJxUadosEjUXRMQ-hjnKUyl39rxfEBS6AQauGzQam21v7DGxj-ztGBksjg4bSmhjXNHDpfY7t8wNK-KcioPb43zSGd1-e6PNGjJ2liFkVw-wk4RRo-TzwYrEyTpa9U9MoQ1Duu-uM31PZl')" }}
            />
            <div className="absolute inset-0 bg-white/20 group-hover:bg-metallic-gold/10 transition-colors duration-500"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="font-headline-md text-headline-md text-regal-navy mb-2">Citrus</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Zesty bergamot, lemon, and mandarin for an invigorating, clean opening.</p>
            </div>
          </div>
          {/* Fresh/Aquatic - Medium */}
          <div className="md:col-span-8 group relative overflow-hidden bg-regal-navy min-h-[300px] md:min-h-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-110" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqn8C2nzADxWIFDpqBNYe1G1Eqz8cP5EvQs_dpH_2inhCV6pNidWc5oS8MIculJYLR4hzdeh_jr_cQqY9AB7v8P0aSgkjjCV5nwYfuEuG4mF1t1JzzjMeDbTD8FlqRMoWLHUiFHRLJKz5KbLdys_wFwr8MSybZEfGXCcMnPOu7VE-5gmSDB_DseEEgs83sjyd2wgWhqKRpV_WtchfDhKJFGuZ4mh2q1Fyh--IHM2o8FBWmCMIppYjB')" }}
            />
            <div className="absolute bottom-0 right-0 p-10 text-right">
              <h3 className="font-headline-lg text-headline-lg text-metallic-gold mb-2">Fresh & Aquatic</h3>
              <p className="font-body-md text-body-md text-soft-cream/80 max-w-sm ml-auto">Clean, breezy notes of sea salt and morning dew for a modern, minimalist profile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Choosing Scent Interactive Section */}
      <section className="bg-regal-navy py-[120px] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <path className="scent-path" d="M50,350 C100,200 300,400 350,50" fill="none" stroke="#D4AF37" strokeWidth="1"></path>
            <path className="scent-path" d="M100,350 C150,150 250,350 300,50" fill="none" stroke="#D4AF37" strokeWidth="0.5"></path>
          </svg>
        </div>
        <div className="px-6 md:px-[64px] max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div ref={addToRefs} className="reveal-transition opacity-0 translate-y-[30px]">
            <span className="font-label-md text-label-md text-metallic-gold mb-4 block uppercase">Personal Selection</span>
            <h2 className="font-display-lg text-display-lg text-soft-cream mb-8 leading-tight">Finding Your <br/>Signature</h2>
            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 border border-metallic-gold flex items-center justify-center text-metallic-gold font-bold">01</div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-soft-cream mb-2">Identify Your Mood</h4>
                  <p className="font-body-md text-body-md text-soft-cream/60">Scent is deeply tied to emotion. Do you seek the confidence of leather or the serenity of lavender? Choose based on the persona you wish to project.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 border border-metallic-gold flex items-center justify-center text-metallic-gold font-bold">02</div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-soft-cream mb-2">Understand the Pyramid</h4>
                  <p className="font-body-md text-body-md text-soft-cream/60">Fragrances evolve. The 'Top Notes' last minutes, while 'Base Notes' like Musk and Sandalwood linger for hours. Test the dry-down.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 border border-metallic-gold flex items-center justify-center text-metallic-gold font-bold">03</div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-soft-cream mb-2">The Skin Chemistry</h4>
                  <p className="font-body-md text-body-md text-soft-cream/60">PH levels and skin temperature alter the scent profile. Never buy based on a paper strip alone; wear it for a day.</p>
                </div>
              </div>
            </div>
          </div>
          <div ref={addToRefs} className="relative reveal-transition delay-200 opacity-0 translate-y-[30px]">
            <div 
              className="aspect-[4/5] bg-cover bg-center border-[20px] border-metallic-gold/10" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAy75xl4sJsZKCCfPRr49LX-O7Ffc0VHqvvBIaY5aeT01gJ9xDddvgXBJEZ3Jc7Kst_MqsQcP3MiEww1bjs7OBuL-OMJqhpoijVdrmbwUXSdFM6OgYxQIxGHRoD5xoEzijPNjSNSULuvO-r8tw4qRcxQByVOWPEOnvcy1D_F06i7J5EYWAZaLxdzO7p1cnpKz744tZ2GU0U3dJCmkoLJz7kfBB4Urnjz9CvGL4-FN8eYqGfm9r5Ct7d')" }}
            />
            <div className="absolute -bottom-10 -left-10 bg-metallic-gold p-8 max-w-xs shadow-xl hidden md:block">
              <p className="font-headline-md text-headline-md text-regal-navy italic mb-2">"A fragrance is more than a smell, it's a silent introduction."</p>
              <span className="font-label-md text-label-md text-regal-navy/70">— Roymall Master Perfumer</span>
            </div>
          </div>
        </div>
      </section>

      {/* Longevity & Application Guide */}
      <section ref={addToRefs} className="py-[120px] px-6 md:px-[64px] max-w-[1440px] mx-auto reveal-transition opacity-0 translate-y-[30px]">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-4">Mastering Application</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">The difference between a scent that fades in an hour and one that lasts all night lies in the technique. Follow our expert guide to longevity.</p>
          </div>
          <Link to="/shop" className="font-label-md text-label-md text-regal-navy border-b-2 border-metallic-gold pb-1 hover:text-metallic-gold transition-colors">Shop All Accessories</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
          <div className="p-10 border border-outline-variant hover:border-metallic-gold transition-colors duration-500">
            <span className="material-symbols-outlined text-4xl text-metallic-gold mb-6">air</span>
            <h3 className="font-headline-md text-headline-md text-regal-navy mb-4">Pulse Points</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">Apply to areas where the heartbeat is closest to the skin: wrists, neck, and behind the knees. The natural warmth radiates the scent throughout the day.</p>
            <div className="h-1 w-12 bg-metallic-gold"></div>
          </div>
          <div className="p-10 border border-outline-variant hover:border-metallic-gold transition-colors duration-500">
            <span className="material-symbols-outlined text-4xl text-metallic-gold mb-6">water_drop</span>
            <h3 className="font-headline-md text-headline-md text-regal-navy mb-4">Hydrate First</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">Perfume molecules bind better to hydrated skin. Apply an unscented lotion or a matching body cream before spraying to lock in the fragrance.</p>
            <div className="h-1 w-12 bg-metallic-gold"></div>
          </div>
          <div className="p-10 border border-outline-variant hover:border-metallic-gold transition-colors duration-500">
            <span className="material-symbols-outlined text-4xl text-metallic-gold mb-6">do_not_disturb</span>
            <h3 className="font-headline-md text-headline-md text-regal-navy mb-4">Don't Rub</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">Rubbing your wrists together creates friction heat that breaks down the delicate top notes prematurely. Let the scent dry naturally on the skin.</p>
            <div className="h-1 w-12 bg-metallic-gold"></div>
          </div>
        </div>
      </section>

      {/* Promotional Call to Action */}
      <section ref={addToRefs} className="px-6 md:px-[64px] mb-[120px] max-w-[1440px] mx-auto reveal-transition opacity-0 translate-y-[30px]">
        <div className="flex flex-col md:flex-row min-h-[500px]">
          <div className="w-full md:w-1/2 bg-regal-navy flex flex-col justify-center p-12 lg:p-20 order-2 md:order-1">
            <h2 className="font-display-lg text-display-lg text-metallic-gold mb-6">The Discovery Set</h2>
            <p className="font-body-lg text-body-lg text-soft-cream/80 mb-10">Can't decide? Experience our five most iconic scents in 5ml vials. Find your signature before committing to a full bottle.</p>
            <button className="w-fit bg-soft-cream text-regal-navy px-12 py-4 font-label-md text-label-md hover:bg-metallic-gold hover:text-soft-cream transition-all duration-300 uppercase tracking-widest">Order Now</button>
          </div>
          <div 
            className="w-full md:w-1/2 min-h-[300px] bg-cover bg-center order-1 md:order-2" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHMvHhkoHMS51j0PUyzYZcgq37FCQ2DgzJveue4F60Y_0fS9_vCqJDSktXpQF-H9w_joV0IYkKNJNVql_XNjyH7YVp44qSVHlYf4eOFONWBCczu6jixvWcUGytwGs0VHCqcgYUwMMytri7ln246tdCDbLQG6bSFPc7PoZaAmowgfXW178wsTsF5XPvJ2wHKqteBSkigmqzGUUbCO2tjvMM2gLf1ALIRXqYEfTtR8dcQUo9F0AOTwp9')" }}
          />
        </div>
      </section>
    </div>
  )
}
