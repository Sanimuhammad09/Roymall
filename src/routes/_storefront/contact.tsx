import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { api } from '../../lib/api'

export const Route = createFileRoute('/_storefront/contact')({
  component: Contact,
})

function Contact() {
  const revealRefs = useRef<Array<HTMLElement | null>>([])
  const [buttonState, setButtonState] = useState<'IDLE' | 'SENDING' | 'RECEIVED' | 'ERROR'>('IDLE')

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [type, setType] = useState('GENERAL INQUIRY')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-subtle-slide')
          observer.unobserve(entry.target)
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setButtonState('SENDING')
    setErrorMessage('')
    
    try {
      await api.submitInquiry({ fullName, email, phone, type, message })
      setButtonState('RECEIVED')
      setTimeout(() => {
        setButtonState('IDLE')
        setFullName('')
        setEmail('')
        setPhone('')
        setType('GENERAL INQUIRY')
        setMessage('')
      }, 3000)
    } catch (err: any) {
      setButtonState('ERROR')
      setErrorMessage(err.message || 'Failed to send inquiry')
      setTimeout(() => setButtonState('IDLE'), 3000)
    }
  }

  return (
    <main className="bg-background text-on-background font-body-md selection:bg-metallic-gold selection:text-white min-h-screen">
      <style>{`
        .luxury-input {
            border: none;
            border-bottom: 1px solid #c5c6d0;
            background: transparent;
            border-radius: 0;
            transition: border-color 0.3s ease;
        }
        .luxury-input:focus {
            outline: none;
            box-shadow: none;
            border-color: #D4AF37;
        }
        .animate-subtle-slide {
            animation: slideUp 0.8s ease-out forwards;
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-regal-navy py-32 md:py-48 overflow-hidden mt-[-80px]">
        <div className="absolute inset-0 opacity-20 pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-[64px] relative z-10 text-center animate-subtle-slide pt-16">
          <h1 className="font-display-lg text-display-lg text-metallic-gold mb-6">Concierge Services</h1>
          <p className="font-body-lg text-body-lg text-soft-cream/80 max-w-2xl mx-auto">
            Experience the art of olfactory luxury. Our scent specialists are at your disposal to guide you through our collection or assist with bespoke inquiries.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section ref={addToRefs} className="max-w-[1440px] mx-auto px-6 md:px-[64px] py-[120px] grid grid-cols-1 lg:grid-cols-12 gap-[32px] opacity-0">
        {/* Left: Contact Details (4 columns) */}
        <div className="lg:col-span-4 space-y-12">
          <div className="space-y-4">
            <h2 className="font-headline-md text-headline-md text-regal-navy">The Lagos Atelier</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Our flagship boutique and private consultation suite situated in the heart of Victoria Island.
            </p>
          </div>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-metallic-gold mt-1">location_on</span>
              <div>
                <p className="font-label-md text-label-md text-regal-navy uppercase tracking-widest mb-1">Visit Us</p>
                <p className="font-body-md text-body-md text-on-surface-variant">15 Luxury Plaza, Adetokunbo Ademola St,<br/>Victoria Island, Lagos, Nigeria</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-metallic-gold mt-1">call</span>
              <div>
                <p className="font-label-md text-label-md text-regal-navy uppercase tracking-widest mb-1">Lagos Atelier</p>
                <a className="font-body-md text-body-md text-on-surface-variant hover:text-metallic-gold transition-colors" href="tel:+234800ROYMALL">+234 (0) 800 ROYMALL</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-metallic-gold mt-1">mail</span>
              <div>
                <p className="font-label-md text-label-md text-regal-navy uppercase tracking-widest mb-1">Email Inquiries</p>
                <a className="font-body-md text-body-md text-on-surface-variant hover:text-metallic-gold transition-colors" href="mailto:concierge@roymallscents.com">concierge@roymallscents.com</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-metallic-gold mt-1">schedule</span>
              <div>
                <p className="font-label-md text-label-md text-regal-navy uppercase tracking-widest mb-1">Hours of Operation</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Monday – Friday: 10:00 – 19:00<br/>Saturday: 11:00 – 18:00<br/>Sunday: By Appointment</p>
              </div>
            </div>
          </div>
          {/* Subtle Image/Card */}
          <div className="pt-8">
            <div className="aspect-[4/5] bg-soft-cream relative overflow-hidden group">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Lagos Atelier"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4xzca6QLJmLArTtYLfTxqP5YP4PRZ2nbCSoAXklJdauX_9XimCF7T0eyc3aPeXt4hOoquKm6OaYgxBWDwyNN1I-k_u3tAr9zD4MeNJN9BuCj5JK_jXhubyVJNyOPYtHUGhNsLCclzSTAcaxtQW-WpRbmG2i0-MEBfpJ6b9VCYmEfYsdL7rDS97VvPTH7DRVKHWMehRjDRynWQb5CDQe8zOBWMuxCXn5G7Uro_tt7nVuREsF3bJyQt"
              />
              <div className="absolute inset-0 bg-regal-navy/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>
        </div>
        
        {/* Right: Professional Contact Form (8 columns) */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-8 md:p-16 border border-outline-variant shadow-sm">
          <div className="max-w-2xl">
            <h3 className="font-headline-lg text-headline-lg text-regal-navy mb-4">Send an Inquiry</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-12">Please provide your details below. A fragrance concierge will respond to your request within 24 business hours.</p>
            
            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-regal-navy uppercase tracking-tighter">Full Name</label>
                  <input className="luxury-input py-3" placeholder="ALEXANDER STERLING" type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-regal-navy uppercase tracking-tighter">Email Address</label>
                  <input className="luxury-input py-3" placeholder="ALEXANDER@EXAMPLE.COM" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-regal-navy uppercase tracking-tighter">Telephone</label>
                  <input className="luxury-input py-3" placeholder="+234 ..." type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-regal-navy uppercase tracking-tighter">Inquiry Type</label>
                  <select className="luxury-input py-3 appearance-none bg-transparent cursor-pointer focus:outline-none" value={type} onChange={e => setType(e.target.value)}>
                    <option>GENERAL INQUIRY</option>
                    <option>BESPOKE CONSULTATION</option>
                    <option>CORPORATE GIFTING</option>
                    <option>ORDER ASSISTANCE</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-regal-navy uppercase tracking-tighter">Message</label>
                <textarea className="luxury-input py-3 resize-none" placeholder="HOW MAY WE ASSIST YOU?" rows={5} value={message} onChange={e => setMessage(e.target.value)} required></textarea>
              </div>
              
              {errorMessage && (
                <div className="bg-red-50 text-red-600 p-4 font-body-md text-sm border border-red-100">
                  {errorMessage}
                </div>
              )}
              <div className="pt-4">
                <button 
                  className={`font-label-md text-label-md px-12 py-5 uppercase tracking-widest transition-all duration-300 active:scale-[0.98] ${
                    buttonState === 'SENDING' ? 'bg-regal-navy text-metallic-gold opacity-50 cursor-not-allowed' :
                    buttonState === 'RECEIVED' ? 'bg-metallic-gold text-regal-navy' :
                    buttonState === 'ERROR' ? 'bg-red-600 text-white' :
                    'bg-regal-navy text-metallic-gold hover:bg-primary-container'
                  }`} 
                  type="submit"
                  disabled={buttonState === 'SENDING' || buttonState === 'RECEIVED'}
                >
                  {buttonState === 'IDLE' && 'Send Inquiry'}
                  {buttonState === 'SENDING' && 'Sending...'}
                  {buttonState === 'RECEIVED' && 'Received'}
                  {buttonState === 'ERROR' && 'Error - Try Again'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Location/Map Section */}
      <section ref={addToRefs} className="max-w-[1440px] mx-auto px-6 md:px-[64px] pb-[120px] opacity-0">
        <div className="border border-outline-variant relative h-[500px] overflow-hidden group">
          {/* Map Placeholder */}
          <div className="absolute inset-0 bg-soft-cream grayscale group-hover:grayscale-0 transition-all duration-700">
            <img 
              className="w-full h-full object-cover" 
              alt="Victoria Island, Lagos"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVOQVd1_oF0RjSejvVQ5RmMwcshBx1qG-_klWA_vqWJWVUSZi7yvtTBZ9k4OVrT1jF6EpgHx5XC3QI7FVpf7sfBzn7llVoq0lgLisx93dgHAQPD3RIHgJ0E3TV0V2-gQHy2BxvCW7Xqu-Pv-pZuZEd0SyAvbJTFWvOt_1gsAYYcVYI_oGqhiiTbeGGqzSpJ3tZSVcYZqsP1-DWIHaMGdLd0G2RTtIDIwlixuuT1eDg1B5OcyD5Il3d"
            />
          </div>
          {/* Overlay Card */}
          <div className="absolute bottom-8 left-8 bg-regal-navy p-8 text-soft-cream max-w-sm hidden md:block">
            <h4 className="font-headline-md text-headline-md text-metallic-gold mb-2">Find Us</h4>
            <p className="font-body-md text-body-md mb-6">Our atelier is located in the prestigious Luxury Plaza, offering secure parking and a private entrance for scent consultations.</p>
            <a className="inline-flex items-center gap-2 font-label-md text-label-md text-metallic-gold hover:underline" href="https://maps.google.com" target="_blank" rel="noreferrer">
              GET DIRECTIONS <span className="material-symbols-outlined text-sm">north_east</span>
            </a>
          </div>
        </div>
      </section>

      {/* Promotional Banner Pair */}
      <section ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 opacity-0">
        <div className="bg-regal-navy flex flex-col justify-center items-center text-center p-20 order-2 md:order-1">
          <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-[0.3em] mb-6">The Royal Club</span>
          <h2 className="font-headline-lg text-headline-lg text-soft-cream mb-8 leading-tight">Private Scent Consultations</h2>
          <p className="font-body-lg text-body-lg text-soft-cream/70 mb-10 max-w-md">Reserve a private hour at our Lagos Atelier to discover your signature fragrance with our lead perfumer.</p>
          <Link to="/book-appointment" className="border border-metallic-gold px-10 py-4 text-metallic-gold font-label-md text-label-md uppercase tracking-widest hover:bg-metallic-gold hover:text-regal-navy transition-all duration-300">
            Book Appointment
          </Link>
        </div>
        <div className="h-[600px] order-1 md:order-2">
          <img 
            className="w-full h-full object-cover" 
            alt="Private Consultation"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBThfPsNqayt9ljxKSXte1_x7AHJOPxlLsr-qq3HEa2ZIt0xgw9JQtRnHS8jMCn7DpHph-J-_whiF1yHY7H_O5lbPF7ZUD6DTC7gkbJmR64lprudVsWjp-wHKQqUH0V6CxbVL0CmET8iwSUJNEy_61Af2DdUBBc70vBwhQDMHKchE6DXgHb74SGzvXhRbihqpTHMA8lMN4JayvHwIecrTKGqwlyLTf-zJ-IXyiKXnwOvrf5wv1VXwmc"
          />
        </div>
      </section>
    </main>
  )
}
