import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/_storefront/gifts')({
  component: Gifts,
})

function Gifts() {
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
        .text-glow {
          text-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-regal-navy mt-[-80px]">
        <div className="absolute inset-0 opacity-40">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDEYDFqSA9y4mmbulgBDVdjYYkk6SbDTHlhnQbf7Y-gOgAzXfHnqiThkiP87edrlB8n7Nl1xAdxBoTIYB3K_NgV7yvTVvB0dc7BoehFjIr8mMxj6larLLVbZJQTpIRwphJ7mCB9WFol61cfo21CK6XNBikZ1t1Z8S5d73GcY1sSbptf0VdpelU8ZXAE-jKNq9ey6Tmxjajcxl-I967UfMi44xcvGG6kkV7hI98YObSPMEl5cP1MZ4zY')" }}
          />
        </div>
        <div className="relative z-10 text-center px-6 md:px-[64px] max-w-4xl pt-20">
          <h1 className="font-display-lg text-display-lg text-metallic-gold mb-6 text-glow">The Art of Giving</h1>
          <p className="font-body-lg text-body-lg text-soft-cream/90 mb-10 max-w-2xl mx-auto">Discover our curated collection of luxury scent discovery sets and exclusive gift boxes, crafted for those who appreciate the finer things.</p>
          <div className="flex flex-wrap justify-center gap-[32px]">
            <button className="bg-metallic-gold text-regal-navy font-label-md text-label-md px-10 py-4 hover:bg-soft-cream transition-all duration-300 uppercase tracking-widest">Shop All Gifts</button>
            <button className="border border-metallic-gold text-metallic-gold font-label-md text-label-md px-10 py-4 hover:bg-metallic-gold hover:text-regal-navy transition-all duration-300 uppercase tracking-widest">Explore Discovery Sets</button>
          </div>
        </div>
      </section>

      {/* Discovery Sets Section (Bento Grid) */}
      <section 
        ref={addToRefs} 
        className="py-[120px] px-6 md:px-[64px] max-w-[1440px] mx-auto transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-[0.2em] block mb-2">Introduction</span>
            <h2 className="font-headline-lg text-headline-lg text-regal-navy">Discovery & Travel Sets</h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            The perfect way to explore our olfactory universe. Each set is designed to take you on a journey through our signature notes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] h-auto md:h-[600px]">
          {/* Item 1 */}
          <div className="md:col-span-2 group relative overflow-hidden bg-soft-cream flex items-center justify-between p-12 border border-outline-variant/30 min-h-[400px] md:min-h-0">
            <div className="max-w-xs z-10">
              <h3 className="font-headline-md text-headline-md text-regal-navy mb-4">The Complete Discovery Vault</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">Twelve 2ml vials of our most iconic scents across all collections.</p>
              <p className="font-price-lg text-price-lg text-regal-navy mb-8">₦45,000</p>
              <button className="font-label-md text-label-md text-regal-navy border-b border-regal-navy pb-1 group-hover:text-metallic-gold group-hover:border-metallic-gold transition-colors">Add to Bag</button>
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Discovery Vault"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYoFm-SciUdBYz4A9I221xj8jwYWSaS1nqf5N9IEaKPfgGDEq5bojrBacdExQFh4cVqJ6XmsEPj3KbI-ghLNeMrtDRjPV78BTr3uEat9dqgqE9z87ReAapQwwIX4ZYDUuB7UhMwFtVlBUec2z-aKhmZc1OtrPlP9rZJ0Cd_4Ifu4Nqn_y1YF6DsyNQVAEnEITsc1le9c7fhDCshOrAKwCv7j-y-A7EUbcWO9o93jVyrj6OX1R5BWcw"
              />
            </div>
          </div>
          {/* Item 2 */}
          <div className="group relative overflow-hidden bg-regal-navy p-10 flex flex-col justify-end min-h-[400px] md:min-h-0">
            <div className="absolute inset-0 opacity-30">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Travel Duo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXjDlNcNFI7XRHb1GHrcMAMbWKgoDomrAf-1TTiluALAsaNmITNLIRADWfiAhdG3EsOnIImYEONykujluxVbTNWuoNeDQZpZ9UXUliV7ZhTdFou0iTWL9TXjbytLipAps1skQal_08D432B-3kXeXsl4ZqN738fo-mFQjhrn9J5hNaxOCCR5yamPFtY69mGQmj6YX75xMa0z97KSxMbJ5CRTWk-r5zAM11jN2hGF5jAie5ciklkWYv"
              />
            </div>
            <div className="relative z-10">
              <h3 className="font-headline-md text-headline-md text-metallic-gold mb-2">Signature Travel Duo</h3>
              <p className="font-body-md text-body-md text-soft-cream/70 mb-4">Two 10ml travel sprays in a leather pouch.</p>
              <p className="font-price-lg text-price-lg text-metallic-gold">₦28,500</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gender Specific Curation (Split Layout) */}
      <section 
        ref={addToRefs} 
        className="py-[120px] grid grid-cols-1 md:grid-cols-2 transition-all duration-1000 opacity-0 translate-y-10"
      >
        {/* Gifts for Her */}
        <div className="relative min-h-[700px] flex items-center justify-center group overflow-hidden">
          <div className="absolute inset-0">
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAnadKy92cOzMJ7iRSB1K9WAlY5WaHMulLCD-NUrtHzxEB3YYM3ujPjlISdMHB7Zw5Y8eaUasve-AdwQQEPOp-0Xfg5DRln6dNAtCPG7Qjhz2XwfQJBgkZtbxJPu1BeFEQrm2M2-yZy3fidKoOAdZ_FaIuVNzgCDVa9gm1HQ66N3rin3wNcdcqzALKUb1FX_6qikG46vLJkQi3tuOjUminAjK6B7SsFELH9xjmXZfo7AFHWufUOqn7n')" }}
            />
            <div className="absolute inset-0 bg-regal-navy/20"></div>
          </div>
          <div className="relative z-10 text-center text-white px-6 md:px-[64px]">
            <h2 className="font-display-lg text-headline-lg md:text-display-lg mb-6">Gifts for Her</h2>
            <p className="font-body-lg text-body-lg mb-8 max-w-md mx-auto">Floral, oriental, and gourmand masterpieces curated for her unique elegance.</p>
            <button className="bg-white text-regal-navy font-label-md text-label-md px-12 py-4 hover:bg-metallic-gold hover:text-white transition-all uppercase tracking-widest">Shop Selection</button>
          </div>
        </div>
        {/* Gifts for Him */}
        <div className="relative min-h-[700px] flex items-center justify-center group overflow-hidden">
          <div className="absolute inset-0">
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyxBxiX3xG1u8U2cBwp6KPEHmiQaKP_DSSSulOOo-yiRNPl4LUOn7fsBumzqSwlfr3SCuNA90Ohcm50VsSXwOQt-sOnbJQwWzWwNu0sonawI8Wtk2mYAR3903BCEdkb7LghL3con_Zm5x5ZEpxFKpnR-Hbf_OPSH80BazF6cGBqjN9WWVw3LnFhfPun3JMZKJPd9U0lFuuokCz_LMTjyw3B5psUJaLnldr5W9BJmAS1O39n-4V_lrI')" }}
            />
            <div className="absolute inset-0 bg-regal-navy/40"></div>
          </div>
          <div className="relative z-10 text-center text-white px-6 md:px-[64px]">
            <h2 className="font-display-lg text-headline-lg md:text-display-lg mb-6">Gifts for Him</h2>
            <p className="font-body-lg text-body-lg mb-8 max-w-md mx-auto">Woody, spicy, and aquatic essentials for the modern gentleman's wardrobe.</p>
            <button className="bg-white text-regal-navy font-label-md text-label-md px-12 py-4 hover:bg-metallic-gold hover:text-white transition-all uppercase tracking-widest">Shop Selection</button>
          </div>
        </div>
      </section>

      {/* Curated Boxes Slider Section (Custom Grid) */}
      <section 
        ref={addToRefs} 
        className="py-[120px] px-6 md:px-[64px] max-w-[1440px] mx-auto overflow-hidden transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="mb-16">
          <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-[0.2em] block mb-2">Exclusives</span>
          <h2 className="font-headline-lg text-headline-lg text-regal-navy">The Premium Gift Boxes</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
          {/* Product Card 1 */}
          <div className="group">
            <div className="aspect-[4/5] bg-soft-cream mb-6 overflow-hidden border border-outline-variant/20">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt="The Royale Collection"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY2EaY4aMNKFcaf8OwN9wmzbldPZy0JFTjeLS6K2QjvZVkOTJ_sx1VuhUFI8o96awI3XLOyWO5Y7nZpxY3WD9AwL9M4V4_InHfctX-bPPyLHfvRCVVw_obh31uP7NILaa6DePiU-qgVYyjCespT9bOuq7vMjZTRXEWGSufJAG02S8KZ3gx0npfxFdpz0Ey4_VH_hzbPcD5XoK8KYTmLy-DobUhcnVgPZch0_HCpxigUz_u0lfeiEI4"
              />
            </div>
            <h3 className="font-headline-md text-[20px] text-regal-navy mb-1">The Royale Collection</h3>
            <p className="font-body-md text-sm text-on-surface-variant mb-3">Full Size + Travel + Body Care</p>
            <p className="font-price-lg text-price-lg text-regal-navy">₦125,000</p>
          </div>
          {/* Product Card 2 */}
          <div className="group">
            <div className="aspect-[4/5] bg-soft-cream mb-6 overflow-hidden border border-outline-variant/20">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt="Sensory Escape Set"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsbwtBhpF09njFuPtdeDC6yP2_8tyzcVxHiidT4VZCScTx0xNs_PJvqYOKxy8j0zk9i3LTGR3UCQRYnxbDU8HckaYqafHqgqMoUimcd2vRdyUnfNLTMCw5fqjc5IB7_xcnURLiFSjDrIA7V24_O9UwmUYnmH3dJE9SngCpKqvUUe8FevF8HImQBaO8jR9R4TYFinL5qGuMSgnibNBaf9tQcJZ89Ck7Gtx11mHTXs_aRfJTMrLkEaFh"
              />
            </div>
            <h3 className="font-headline-md text-[20px] text-regal-navy mb-1">Sensory Escape Set</h3>
            <p className="font-body-md text-sm text-on-surface-variant mb-3">5 x 15ml Signature Extraits</p>
            <p className="font-price-lg text-price-lg text-regal-navy">₦82,000</p>
          </div>
          {/* Product Card 3 */}
          <div className="group">
            <div className="aspect-[4/5] bg-soft-cream mb-6 overflow-hidden border border-outline-variant/20">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt="Gilded Oud Duo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3Uym_oIb0d-oAzFd0bgUbYMU3LvxuyOocrsj2OAvY9I8DmpfcM9RNjYU_yT72CRVe2K9-TD6n_ejQolDe7VIVwMHoP9_vZzMQ2ohhcef4Tn6KD6kCEal7EVCkZLymFU2FY89FZwRvUOhxerunUoGH5HC8f2HHwx8p3Y5GArFKdFPPVXyu6zQpp8T4o0XsiiTewPb3MssryD9t9LyTAs8ZDxxB2Q_xIqektoGLhnjUQB0N-do65bPe"
              />
            </div>
            <h3 className="font-headline-md text-[20px] text-regal-navy mb-1">Gilded Oud Duo</h3>
            <p className="font-body-md text-sm text-on-surface-variant mb-3">50ml Extrait + Scented Candle</p>
            <p className="font-price-lg text-price-lg text-regal-navy">₦95,000</p>
          </div>
          {/* Product Card 4 */}
          <div className="group">
            <div className="aspect-[4/5] bg-soft-cream mb-6 overflow-hidden border border-outline-variant/20">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt="Atmosphere Home Set"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA--AH2zNuwSw0r8R1vSDEDxwBwj-MTBJQ2KhZZjMNstY9T05oxDBSthjVS6OO2OyLRnQDsRHdw4KKpgW_3rimfCaXDklSjzShtrZ_vhzUo727Trx68FvzOZMPCPEUertsrlG-YGLcNiEW5_Ut8yGtu3niPspxUUR5ZwImjPh-u9eNTogSkjk9gpZ3yjts4EEPe9S-kS7IsU_jwAxUMfxj-_vi7v_0S7H6rZDpBaE6spFkXgFKLyWYv"
              />
            </div>
            <h3 className="font-headline-md text-[20px] text-regal-navy mb-1">Atmosphere Home Set</h3>
            <p className="font-body-md text-sm text-on-surface-variant mb-3">Diffuser + Room Mist Collection</p>
            <p className="font-price-lg text-price-lg text-regal-navy">₦55,000</p>
          </div>
        </div>
      </section>

      {/* Corporate Gifting (Thematic Pair) */}
      <section 
        ref={addToRefs} 
        className="bg-regal-navy py-[120px] flex flex-col md:flex-row items-stretch transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="w-full md:w-1/2 p-6 md:p-[64px] flex flex-col justify-center">
          <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-[0.2em] block mb-4">Bespoke Services</span>
          <h2 className="font-display-lg text-headline-lg md:text-display-lg text-white mb-8">Corporate Gifting</h2>
          <p className="font-body-lg text-body-lg text-soft-cream/80 mb-10 leading-relaxed">
            Make a lasting impression with Roymall Scents. We offer tailored fragrance solutions for luxury corporate events, executive gifts, and bespoke client appreciation. Our team handles everything from custom engraving to premium white-glove delivery.
          </p>
          <div className="space-y-4 mb-12">
            <div className="flex items-center gap-4 text-soft-cream">
              <span className="material-symbols-outlined text-metallic-gold">done</span>
              <span className="font-body-md">Custom Branding & Logo Embossing</span>
            </div>
            <div className="flex items-center gap-4 text-soft-cream">
              <span className="material-symbols-outlined text-metallic-gold">done</span>
              <span className="font-body-md">Tiered Bulk Pricing Options</span>
            </div>
            <div className="flex items-center gap-4 text-soft-cream">
              <span className="material-symbols-outlined text-metallic-gold">done</span>
              <span className="font-body-md">Dedicated Gift Concierge Service</span>
            </div>
          </div>
          <button className="w-fit border border-metallic-gold text-metallic-gold font-label-md text-label-md px-12 py-5 hover:bg-metallic-gold hover:text-regal-navy transition-all duration-500 uppercase tracking-widest">Inquire Now</button>
        </div>
        <div className="w-full md:w-1/2 min-h-[500px] relative">
          <img 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Corporate Gifting"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBn-xNVzOOYVAmLySx81b2BKqeNyHlBYYal2QcS6eCduibyQP4ovUP39xAgOXR76gD3ILU193MFqBReZtlAObnrW_vYGLDWTY2Q26dakMPUaS2waj-rZvD7t8Y-rCGWohWgNADtQ2lwQWfuqiOVlEF38pwuLpSgILav1RhDH8xuPFL-E9IO7FZYcr0cyZ97vxFdH2logysOY_J-Dw-58kbOU9zDbl_Y13c2FQAnwWJF538_qui3yOj"
          />
        </div>
      </section>

      {/* Gifting Promise (Values) */}
      <section 
        ref={addToRefs} 
        className="py-[120px] px-6 md:px-[64px] max-w-[1440px] mx-auto text-center transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
          <div className="p-8">
            <span className="material-symbols-outlined text-4xl text-metallic-gold mb-6">card_giftcard</span>
            <h4 className="font-headline-md text-headline-md text-regal-navy mb-3">Signature Wrapping</h4>
            <p className="font-body-md text-on-surface-variant">Every set arrives in our iconic navy and gold hand-finished packaging.</p>
          </div>
          <div className="p-8">
            <span className="material-symbols-outlined text-4xl text-metallic-gold mb-6">edit_note</span>
            <h4 className="font-headline-md text-headline-md text-regal-navy mb-3">Personal Message</h4>
            <p className="font-body-md text-on-surface-variant">Include a complimentary handwritten note on premium cardstock with every gift.</p>
          </div>
          <div className="p-8">
            <span className="material-symbols-outlined text-4xl text-metallic-gold mb-6">local_shipping</span>
            <h4 className="font-headline-md text-headline-md text-regal-navy mb-3">Priority Delivery</h4>
            <p className="font-body-md text-on-surface-variant">Fast, secure shipping nationwide to ensure your gift arrives in perfect time.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
