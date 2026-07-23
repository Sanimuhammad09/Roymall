import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/_storefront/shipping-returns')({
  component: ShippingReturns,
})

function ShippingReturns() {
  const [activeSection, setActiveSection] = useState('')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      let current = ''
      sectionRefs.current.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop
          if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id') || ''
          }
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    // Run once on mount to set initial state
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null)
    } else {
      setOpenFaqIndex(index)
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const faqs = [
    {
      question: 'Can I track my shipment?',
      answer: "Yes. Once your order has been dispatched, you will receive an email and SMS with your unique tracking number and a link to our logistics partner's tracking portal."
    },
    {
      question: "What happens if I'm not home?",
      answer: "Our couriers will attempt delivery three times. If unsuccessful, the package will be returned to our warehouse. A re-delivery fee will apply for the fourth attempt."
    },
    {
      question: 'Do you ship internationally?',
      answer: "Currently, we only ship within Nigeria. However, we are working on international shipping routes. Please join our newsletter to stay updated on our global expansion."
    }
  ]

  return (
    <main className="bg-background text-on-background font-body-md selection:bg-metallic-gold/30 min-h-screen">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .policy-section {
          scroll-margin-top: 100px;
        }
      `}</style>

      {/* Hero Header */}
      <header className="bg-regal-navy text-metallic-gold pt-24 pb-16 px-6 md:px-[64px] mt-[-80px]">
        <div className="max-w-[1440px] mx-auto text-center pt-16">
          <h1 className="font-display-lg text-display-lg mb-4">Shipping & Returns</h1>
          <p className="font-body-lg text-body-lg max-w-2xl mx-auto opacity-80">
            Transparent delivery services and hassle-free returns for your premium olfactory experiences.
          </p>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-6 md:px-[64px] py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px]">
          
          {/* Side Navigation Links (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 flex flex-col gap-4 border-l border-outline-variant pl-6">
              {[
                { id: 'delivery-timelines', label: 'Delivery Timelines' },
                { id: 'lagos-express', label: 'Lagos Express' },
                { id: 'nationwide-shipping', label: 'Nationwide Shipping' },
                { id: 'return-policy', label: 'Return Policy' },
                { id: 'faq', label: 'Common Questions' }
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`font-label-md text-label-md transition-colors ${
                    activeSection === item.id 
                      ? 'text-regal-navy font-bold border-l-2 border-regal-navy -ml-[26px] pl-6' 
                      : 'text-on-surface-variant hover:text-regal-navy'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Content Area */}
          <div className="col-span-1 lg:col-span-9 flex flex-col gap-24">
            
            {/* Delivery Timelines */}
            <section ref={addToRefs} className="policy-section" id="delivery-timelines">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-metallic-gold">schedule</span>
                <h2 className="font-headline-lg text-headline-lg text-regal-navy">Delivery Timelines</h2>
              </div>
              <div className="prose prose-lg max-w-none text-on-surface-variant space-y-6">
                <p className="font-body-lg text-body-lg">At Roymall Scents, we understand that fragrance is a sensory journey that begins the moment you place your order. Our logistics team works diligently to ensure your artisanal scents are handled with care and delivered within the promised windows.</p>
                
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div className="bg-soft-cream p-8 border-l-4 border-metallic-gold">
                    <h3 className="font-headline-md text-headline-md text-regal-navy mb-2">Order Processing</h3>
                    <p className="font-body-md text-body-md">All orders are processed within 24 hours. Orders placed after 2 PM GMT+1 or on weekends will be processed on the next business day.</p>
                  </div>
                  <div className="bg-soft-cream p-8 border-l-4 border-regal-navy">
                    <h3 className="font-headline-md text-headline-md text-regal-navy mb-2">Peak Periods</h3>
                    <p className="font-body-md text-body-md">During holiday seasons or fragrance launch events, please allow an additional 48 hours for dispatch due to high volume.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Lagos Express */}
            <section ref={addToRefs} className="policy-section" id="lagos-express">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-metallic-gold">local_shipping</span>
                <h2 className="font-headline-lg text-headline-lg text-regal-navy">Lagos Express</h2>
              </div>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                  <p className="font-body-lg text-body-lg text-on-surface-variant">Our local delivery network within Lagos is optimized for speed. For our clientele in the commercial capital, we offer premium door-to-door delivery services.</p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-metallic-gold">check_circle</span>
                      <span className="font-body-md text-body-md font-bold">Same Day Delivery:</span>
                      <span className="font-body-md text-body-md">Available for orders placed before 10 AM (Island and Mainland).</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-metallic-gold">check_circle</span>
                      <span className="font-body-md text-body-md font-bold">Next Day Delivery:</span>
                      <span className="font-body-md text-body-md">Standard for all orders within Lagos state boundaries.</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/3 aspect-square bg-surface-container-low flex items-center justify-center p-8 border border-outline-variant">
                  <div className="text-center">
                    <span className="font-label-md text-label-md uppercase text-metallic-gold block mb-2">Flat Rate</span>
                    <span className="font-price-lg text-price-lg text-regal-navy block">₦3,500</span>
                    <span className="font-body-md text-body-md opacity-60">Across Lagos State</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Nationwide Shipping */}
            <section ref={addToRefs} className="policy-section" id="nationwide-shipping">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-metallic-gold">map</span>
                <h2 className="font-headline-lg text-headline-lg text-regal-navy">Nationwide Shipping</h2>
              </div>
              <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-12 h-64 w-full bg-surface-container overflow-hidden">
                  <div 
                    className="bg-cover bg-center w-full h-full opacity-40" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHR5K4f-20Ktfp7oYIRSOhKBllatudbSqXWavuORi0djJ_3QmW3O3MvIe2ZHH9URfGfQwGzeEtO76TIAo75tIhLLvQsmnXCzSIyuixuwsBR7ML1GxNL4icCcbjeBqMuxSL5icRMpmqwkOSHbAr6dVA7VKoAlvKbEpaQ2q8QhrW_t_hxRakRht0EP732cS1hYu237FO2t1LsXTKGpBwswx9ebQ3PdKZuGUF4BHb6m2CdFeVCMqetHYr')" }}
                  />
                </div>
                <div className="md:col-span-8 space-y-6">
                  <p className="font-body-lg text-body-lg text-on-surface-variant">Roymall Scents partners with Nigeria's most reliable logistics couriers to ensure our fragrances reach you in pristine condition, regardless of your location across the 36 states.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[400px]">
                      <thead>
                        <tr className="border-b border-regal-navy text-left">
                          <th className="py-4 font-label-md text-label-md text-regal-navy">Region</th>
                          <th className="py-4 font-label-md text-label-md text-regal-navy text-right">Timeline</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-outline-variant">
                          <td className="py-4 font-body-md text-body-md">South West (Outside Lagos)</td>
                          <td className="py-4 font-body-md text-body-md text-right">2 - 3 Business Days</td>
                        </tr>
                        <tr className="border-b border-outline-variant">
                          <td className="py-4 font-body-md text-body-md">South East & South South</td>
                          <td className="py-4 font-body-md text-body-md text-right">3 - 5 Business Days</td>
                        </tr>
                        <tr className="border-b border-outline-variant">
                          <td className="py-4 font-body-md text-body-md">North Central (Abuja Included)</td>
                          <td className="py-4 font-body-md text-body-md text-right">3 - 4 Business Days</td>
                        </tr>
                        <tr className="border-b border-outline-variant">
                          <td className="py-4 font-body-md text-body-md">North West & North East</td>
                          <td className="py-4 font-body-md text-body-md text-right">5 - 7 Business Days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Return Policy */}
            <section ref={addToRefs} className="bg-regal-navy text-soft-cream p-12 lg:p-20 policy-section" id="return-policy">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-metallic-gold">assignment_return</span>
                <h2 className="font-headline-lg text-headline-lg text-metallic-gold">Return Policy</h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-6">
                  <p className="font-body-lg text-body-lg">Due to the delicate and intimate nature of fragrance products, we maintain a strict health and safety standard for returns.</p>
                  <div className="space-y-4">
                    <div className="border-l-2 border-metallic-gold pl-6">
                      <h4 className="font-label-md text-label-md text-metallic-gold uppercase tracking-widest mb-1">Eligibility</h4>
                      <p className="font-body-md text-body-md opacity-80">Products must be returned in their original, unopened packaging with the cellophane seal intact within 7 days of delivery.</p>
                    </div>
                    <div className="border-l-2 border-metallic-gold pl-6">
                      <h4 className="font-label-md text-label-md text-metallic-gold uppercase tracking-widest mb-1">Damaged Goods</h4>
                      <p className="font-body-md text-body-md opacity-80">If your bottle arrives damaged or leaking, please photograph the package immediately and contact our concierge within 24 hours.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <button className="bg-metallic-gold text-regal-navy font-label-md text-label-md py-5 px-10 uppercase font-bold hover:bg-soft-cream transition-all duration-300 w-fit">
                    Initiate a Return
                  </button>
                  <p className="mt-4 text-xs opacity-50 italic">Returns are subject to a 10% restocking fee unless the item is defective.</p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section ref={addToRefs} className="policy-section" id="faq">
              <div className="flex items-center gap-4 mb-12">
                <span className="material-symbols-outlined text-metallic-gold">help_outline</span>
                <h2 className="font-headline-lg text-headline-lg text-regal-navy">Common Questions</h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="border-b border-outline-variant py-6 group cursor-pointer" 
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-headline-md text-headline-md text-regal-navy">{faq.question}</h3>
                      <span className="material-symbols-outlined text-regal-navy group-hover:text-metallic-gold transition-colors">
                        {openFaqIndex === index ? 'remove' : 'add'}
                      </span>
                    </div>
                    <div className={`mt-6 ${openFaqIndex === index ? 'block' : 'hidden'}`}>
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Support Banner */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-[64px] pb-[120px]">
        <div className="bg-soft-cream p-12 flex flex-col md:flex-row items-center justify-between border border-metallic-gold/20">
          <div>
            <h3 className="font-headline-md text-headline-md text-regal-navy mb-2">Need direct assistance?</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Our concierge team is available Mon-Fri, 9am - 6pm.</p>
          </div>
          <div className="mt-8 md:mt-0 flex gap-6">
            <a className="font-label-md text-label-md text-regal-navy underline hover:text-metallic-gold transition-colors" href="mailto:roymallscents@gmail.com">Email Support</a>
            <a className="font-label-md text-label-md text-regal-navy underline hover:text-metallic-gold transition-colors" href="tel:+234000000000">Call Concierge</a>
          </div>
        </div>
      </section>

    </main>
  )
}
