import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/_storefront/best-sellers')({
  component: BestSellers,
})

function BestSellers() {
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

        {/* Product Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[32px]">
          {/* Item 1: Featured Top Choice */}
          <div ref={addToRefs} className="group lg:col-span-2 lg:row-span-2 bg-soft-cream border border-metallic-gold/10 overflow-hidden flex flex-col transition-all duration-1000 opacity-0 translate-y-10">
            <div className="relative overflow-hidden flex-grow aspect-square md:aspect-auto min-h-[400px]">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVCUf9qV9zhKDj6pNtbwfkDDBh0cEIJMvyU6dmDJ7uCWZGywJhugLHdjE0ApD6lqBIsYQ_3rABAN8PMCe1IzXjcEQC6dT5hlBuC5dEI4nT5hiTBC2wSIbabpSNiuALKdLQ5vRj7aKqTr2ThYHYWq4UzW-VdQx36TJdq1KlTy2j8ylLlYVbmRPLhRT9emHE3QmeGPw2d2-c-we0pNeeD2T_zG7EaPakKqjKO5idBbROMRveWj4U0lQ-')" }}
              />
              <div className="absolute top-6 left-6">
                <span className="bg-regal-navy text-metallic-gold font-label-md text-label-md px-4 py-2 uppercase tracking-widest shadow-lg">Customer Top Choice</span>
              </div>
              <button className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-regal-navy shadow-xl opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <div className="p-8 bg-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-lg text-headline-lg text-regal-navy">Royal Oud Supreme</h3>
                <p className="font-price-lg text-price-lg text-metallic-gold">₦145,000</p>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">An opulent blend of rare Cambodian oud, Damascus rose, and warm amber. Our signature scent for those who command the room.</p>
              <button className="w-full py-4 bg-regal-navy text-white font-label-md text-label-md uppercase tracking-[0.2em] hover:bg-muted-gold transition-colors duration-300">Add to Shopping Bag</button>
            </div>
          </div>

          {/* Item 2: Standard Best Seller */}
          <div ref={addToRefs} className="group bg-white flex flex-col border border-transparent hover:border-outline-variant transition-all duration-1000 opacity-0 translate-y-10">
            <div className="relative aspect-[3/4] overflow-hidden bg-soft-cream">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAFD-0Q4vyGmwnw9G4UZU_3i3fpgT_dUDOSTjRaH4kVB01u5_jrg_Y4-ggeHFyvmttrzrQKHNz3kQGGnk8K6S6OSws_xQai7pFWNBvXUyTKC85i1xg3a6mANCBMyKsHoSaWcbKeHbIStH3Vx_22tWAlE1nJIvfbgpc8Gd54UBDbN00AMtE2yzt_QzJG9XnJE6t8dFPSdelnJZGK0NX4_Qj9K02dvZNTUCNAQUKweeXmdbeV0PRWR0O0')" }}
              />
              <button className="absolute top-4 right-4 text-on-surface-variant hover:text-regal-navy transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <div className="pt-6 pb-2 text-center">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-tighter mb-1 block">Lumière d'Été</span>
              <h4 className="font-headline-md text-headline-md text-regal-navy mb-2">Summer Radiance</h4>
              <p className="font-price-lg text-price-lg text-metallic-gold">₦85,000</p>
            </div>
            <div className="mt-auto p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="w-full py-3 border border-metallic-gold text-metallic-gold font-label-md text-label-md uppercase hover:bg-metallic-gold hover:text-white transition-all">Quick View</button>
            </div>
          </div>

          {/* Item 3: Staff Favorite */}
          <div ref={addToRefs} className="group bg-white flex flex-col border border-transparent hover:border-outline-variant transition-all duration-1000 opacity-0 translate-y-10">
            <div className="relative aspect-[3/4] overflow-hidden bg-soft-cream">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfYPCLrfTpamfLTrtAL23FZ7qJlcZr9g5Qa8G5J8Ueb2UAO8SdUdNHLLo7KokbI10YcPyTx12bYAOGxN9_xzeVaHl1uXs5DWx3Dei1z2Kdo6wpVHdrRQU9ijX5DhK7Gr3xfjqaKGn0ITnFEWhUx0remF-HkAPafBOB781jGaATYRyHwf60jL8AxSq7GSTjvfEe26Eo0-wfO1Ihj0zfRIxYfVTcU5BxOV_m3Ur5xJ_DUIPWAhIe50P4')" }}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-metallic-gold text-regal-navy font-label-md text-label-md px-3 py-1 uppercase text-[10px] tracking-widest">Staff Favorite</span>
              </div>
              <button className="absolute top-4 right-4 text-on-surface-variant hover:text-regal-navy transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <div className="pt-6 pb-2 text-center">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-tighter mb-1 block">Nocturnal Noir</span>
              <h4 className="font-headline-md text-headline-md text-regal-navy mb-2">Midnight Oak</h4>
              <p className="font-price-lg text-price-lg text-metallic-gold">₦110,000</p>
            </div>
            <div className="mt-auto p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="w-full py-3 border border-metallic-gold text-metallic-gold font-label-md text-label-md uppercase hover:bg-metallic-gold hover:text-white transition-all">Quick View</button>
            </div>
          </div>

          {/* Item 4 */}
          <div ref={addToRefs} className="group bg-white flex flex-col border border-transparent hover:border-outline-variant transition-all duration-1000 opacity-0 translate-y-10">
            <div className="relative aspect-[3/4] overflow-hidden bg-soft-cream">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbkr6OwlBl0jG5WlAKVkztQBdOiCdntLY7Ti5L4UUcipvZz_OyJUX6uRnJeG2lHtlRkSyHXJcob6DxoF0kggO1talK56GCYvpzHdt0YOuI2mu-Yst5DoXDhjfMwZ_4y2Y3ITLAFWJiDE-dWJGPueM5L9OIzuamU6HmFMOxnHhj-tBshKd4KA9UL6RIuuuBAj_hURq2xnUIwiMUP7KdoUczcZp3CTydwqj-Mo4NFIhEmY2Bxy5pJzJt')" }}
              />
            </div>
            <div className="pt-6 pb-2 text-center">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-tighter mb-1 block">Fleur de Soie</span>
              <h4 className="font-headline-md text-headline-md text-regal-navy mb-2">Silk Flower</h4>
              <p className="font-price-lg text-price-lg text-metallic-gold">₦92,000</p>
            </div>
            <div className="mt-auto p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="w-full py-3 border border-metallic-gold text-metallic-gold font-label-md text-label-md uppercase hover:bg-metallic-gold hover:text-white transition-all">Quick View</button>
            </div>
          </div>

          {/* Item 5 */}
          <div ref={addToRefs} className="group bg-white flex flex-col border border-transparent hover:border-outline-variant transition-all duration-1000 opacity-0 translate-y-10">
            <div className="relative aspect-[3/4] overflow-hidden bg-soft-cream">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAskofYJr9TmAPhhJIT57hM0AOkwBMfLlv6EyOvK1Q8sIpmNJA9-3R9jGkw4jRRW2i3C3EbUqyPPjl3RPb0IikW_tSGwxaIysIjB4SlWJ3Nnt9gJYNSZexOKoGxVhcH5mrGe6OYGfBRUDC814dRZamGr1q2wvpEa75XuZV0KDMPLzaITTvGv_0YOkqxBp0Bi1pKNER6wjWWR60wizxR74_GIxnjwLGnpANfxagrSwTljgxYjYTgNmI8')" }}
              />
            </div>
            <div className="pt-6 pb-2 text-center">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-tighter mb-1 block">Brise Marine</span>
              <h4 className="font-headline-md text-headline-md text-regal-navy mb-2">Ocean Mist</h4>
              <p className="font-price-lg text-price-lg text-metallic-gold">₦78,000</p>
            </div>
            <div className="mt-auto p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="w-full py-3 border border-metallic-gold text-metallic-gold font-label-md text-label-md uppercase hover:bg-metallic-gold hover:text-white transition-all">Quick View</button>
            </div>
          </div>
        </div>

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
