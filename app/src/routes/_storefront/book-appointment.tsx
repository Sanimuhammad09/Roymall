import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '../../lib/api'

export const Route = createFileRoute('/_storefront/book-appointment')({
  component: BookAppointment,
})

function BookAppointment() {
  const [selectedService, setSelectedService] = useState('Signature Scent Creation')
  const [selectedDate, setSelectedDate] = useState('12')
  const [selectedTime, setSelectedTime] = useState('12:00 PM')
  
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [preferences, setPreferences] = useState('')
  const [notes, setNotes] = useState('')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedService(e.target.value)
  }

  const handleSubmit = async () => {
    if (!fullName || !email || !phone) {
      setError('Please fill out all required fields.')
      return
    }
    
    setIsSubmitting(true)
    setError('')
    
    try {
      await api.bookAppointment({
        service: selectedService,
        date: `2024-10-${selectedDate.padStart(2, '0')}`,
        time: selectedTime,
        fullName,
        email,
        phone,
        preferences,
        notes
      })
      setIsSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Failed to book appointment')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getServicePrice = (service: string) => {
    if (service === 'Signature Scent Creation') return '₦120,000'
    if (service === 'Bridal Consultation') return '₦85,000'
    if (service === 'Corporate Gifting') return '₦150,000'
    return '₦0'
  }

  return (
    <main className="bg-background text-on-background font-body-md selection:bg-metallic-gold selection:text-regal-navy min-h-screen">
      <style>{`
        .scent-selection-card:hover .check-icon {
            opacity: 1;
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjihvfOIHxXz2Dp95ucSXD8g6Zw5rTWWvDPLKhNpZG2DIeH_M4TYP_BMV34t3IzOjH_MJPmt_mpLTs6j3cLETS50Sr1x0SMBu0Xl81z3Cemdv-eOvlbovjv8ru6fxMzN5GNFo1aVtCMS3S9cYvUiw-AGuuUYW_9_FtRSRUs9MNiXXP2CGIruVtw0evo9bYkH9xwLsparWRMlof5gy8CO7B0Q_bZUzbRYjZcIPIUfT-hOGR-nwL2XMU')" }}
          />
          <div className="absolute inset-0 bg-regal-navy/40"></div>
        </div>
        <div className="relative z-10 text-center px-6 pt-16">
          <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-[0.3em] mb-4 block">Exclusive Experience</span>
          <h1 className="font-display-lg text-display-lg md:text-display-lg text-white mb-6">Lagos Atelier Consultations</h1>
          <p className="font-body-lg text-body-lg text-soft-cream/90 max-w-2xl mx-auto">An intimate sensory journey led by our master nose. Discover your olfactive signature in the heart of Victoria Island.</p>
        </div>
      </section>

      {/* Booking Interface */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-[64px] py-[120px]" id="booking">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px]">
          
          {/* Left Column: Form & Selection */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* 1. Service Selection */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-8 flex items-center justify-center border border-metallic-gold text-metallic-gold font-bold">01</span>
                <h2 className="font-headline-md text-headline-md text-regal-navy">Select Your Consultation</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {/* Service Item 1 */}
                <label className="group relative cursor-pointer block">
                  <input 
                    type="radio" 
                    name="service" 
                    value="Signature Scent Creation" 
                    className="peer hidden" 
                    checked={selectedService === 'Signature Scent Creation'}
                    onChange={handleServiceChange}
                  />
                  <div className="p-6 border border-outline-variant peer-checked:border-metallic-gold bg-white transition-all hover:bg-soft-cream/50 flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-md text-[20px] text-regal-navy mb-2">Signature Scent Creation</h3>
                      <p className="font-body-md text-on-surface-variant max-w-md">A 90-minute immersive workshop to blend your personal bespoke fragrance. Includes a 50ml finished bottle.</p>
                      <span className="font-price-lg text-price-lg text-metallic-gold mt-4 block">₦120,000</span>
                    </div>
                    <div className="w-6 h-6 border border-outline-variant rounded-full flex items-center justify-center peer-checked:bg-metallic-gold peer-checked:border-metallic-gold transition-colors">
                      <span className="material-symbols-outlined text-white text-[16px] opacity-0 peer-checked:opacity-100">check</span>
                    </div>
                  </div>
                </label>
                
                {/* Service Item 2 */}
                <label className="group relative cursor-pointer block">
                  <input 
                    type="radio" 
                    name="service" 
                    value="Bridal Consultation" 
                    className="peer hidden" 
                    checked={selectedService === 'Bridal Consultation'}
                    onChange={handleServiceChange}
                  />
                  <div className="p-6 border border-outline-variant peer-checked:border-metallic-gold bg-white transition-all hover:bg-soft-cream/50 flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-md text-[20px] text-regal-navy mb-2">Bridal Consultation</h3>
                      <p className="font-body-md text-on-surface-variant max-w-md">Curate the olfactive atmosphere for your special day. Scent layering for the bride and bridesmaids.</p>
                      <span className="font-price-lg text-price-lg text-metallic-gold mt-4 block">₦85,000</span>
                    </div>
                    <div className="w-6 h-6 border border-outline-variant rounded-full flex items-center justify-center peer-checked:bg-metallic-gold peer-checked:border-metallic-gold transition-colors">
                      <span className="material-symbols-outlined text-white text-[16px] opacity-0 peer-checked:opacity-100">check</span>
                    </div>
                  </div>
                </label>

                {/* Service Item 3 */}
                <label className="group relative cursor-pointer block">
                  <input 
                    type="radio" 
                    name="service" 
                    value="Corporate Gifting" 
                    className="peer hidden" 
                    checked={selectedService === 'Corporate Gifting'}
                    onChange={handleServiceChange}
                  />
                  <div className="p-6 border border-outline-variant peer-checked:border-metallic-gold bg-white transition-all hover:bg-soft-cream/50 flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-md text-[20px] text-regal-navy mb-2">Corporate Gifting</h3>
                      <p className="font-body-md text-on-surface-variant max-w-md">Private session to design custom-labeled scents for executive gifting and corporate milestones.</p>
                      <span className="font-price-lg text-price-lg text-metallic-gold mt-4 block">₦150,000</span>
                    </div>
                    <div className="w-6 h-6 border border-outline-variant rounded-full flex items-center justify-center peer-checked:bg-metallic-gold peer-checked:border-metallic-gold transition-colors">
                      <span className="material-symbols-outlined text-white text-[16px] opacity-0 peer-checked:opacity-100">check</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* 2. Date & Time */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-8 flex items-center justify-center border border-metallic-gold text-metallic-gold font-bold">02</span>
                <h2 className="font-headline-md text-headline-md text-regal-navy">Available Appointments</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Calendar Placeholder */}
                <div className="p-6 bg-soft-cream">
                  <div className="flex justify-between items-center mb-6">
                    <button className="text-regal-navy hover:text-metallic-gold"><span className="material-symbols-outlined">chevron_left</span></button>
                    <span className="font-headline-md text-[18px] text-regal-navy">October 2024</span>
                    <button className="text-regal-navy hover:text-metallic-gold"><span className="material-symbols-outlined">chevron_right</span></button>
                  </div>
                  <div className="grid grid-cols-7 text-center text-[12px] font-label-md text-outline mb-4">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-y-4 text-center">
                    <span className="text-outline/40">28</span><span className="text-outline/40">29</span><span className="text-outline/40">30</span>
                    {Array.from({length: 12}).map((_, i) => {
                      const day = (i + 1).toString()
                      return (
                        <button 
                          key={day}
                          onClick={() => setSelectedDate(day)}
                          className={`py-2 transition-colors ${selectedDate === day ? 'font-bold text-metallic-gold underline' : 'hover:bg-metallic-gold/10'}`}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-4">
                  <h4 className="font-label-md text-label-md text-on-surface-variant uppercase">Available Times</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['10:30 AM', '12:00 PM', '02:30 PM', '04:00 PM'].map((time) => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 px-4 border transition-colors font-body-md ${
                          selectedTime === time 
                            ? 'border-metallic-gold bg-metallic-gold text-white' 
                            : 'border-outline-variant hover:border-metallic-gold text-on-surface'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                    <button disabled className="py-3 px-4 border border-outline-variant opacity-30 cursor-not-allowed font-body-md text-on-surface">05:30 PM</button>
                  </div>
                  <p className="text-[12px] text-outline italic">Times are shown in West Africa Time (WAT).</p>
                </div>
              </div>
            </div>

            {/* 3. Guest Details */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-8 flex items-center justify-center border border-metallic-gold text-metallic-gold font-bold">03</span>
                <h2 className="font-headline-md text-headline-md text-regal-navy">Personal Details</h2>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-[32px] gap-y-6" onSubmit={e => e.preventDefault()}>
                <div className="col-span-1">
                  <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Full Name *</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-metallic-gold py-3 transition-colors px-0 placeholder:text-outline/40 outline-none" placeholder="Adesola Balogun" type="text" value={fullName} onChange={e => setFullName(e.target.value)} required/>
                </div>
                <div className="col-span-1">
                  <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Email Address *</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-metallic-gold py-3 transition-colors px-0 placeholder:text-outline/40 outline-none" placeholder="a.balogun@example.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div className="col-span-1">
                  <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Phone Number *</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-metallic-gold py-3 transition-colors px-0 placeholder:text-outline/40 outline-none" placeholder="+234 --- --- ----" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required/>
                </div>
                <div className="col-span-1">
                  <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Olfactive Preferences (Optional)</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-metallic-gold py-3 transition-colors px-0 placeholder:text-outline/40 outline-none" placeholder="e.g. Oud, Citrus, Florals" type="text" value={preferences} onChange={e => setPreferences(e.target.value)}/>
                </div>
                <div className="col-span-2">
                  <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Special Notes or Occasion</label>
                  <textarea className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-metallic-gold py-3 transition-colors px-0 placeholder:text-outline/40 resize-none outline-none" placeholder="Is there anything we should know to make your visit more comfortable?" rows={3} value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Summary & CTA */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 p-8 bg-regal-navy text-white shadow-xl">
              <h3 className="font-headline-md text-headline-md text-metallic-gold mb-8">Consultation Summary</h3>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-label-md text-label-md text-soft-cream/60 uppercase">Service</p>
                    <p className="font-body-lg text-body-lg">{selectedService}</p>
                  </div>
                  <span className="material-symbols-outlined text-metallic-gold">ink_pen</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-label-md text-label-md text-soft-cream/60 uppercase">Date & Time</p>
                    <p className="font-body-lg text-body-lg">Friday, October {selectedDate}, 2024<br/>{selectedTime} (WAT)</p>
                  </div>
                  <span className="material-symbols-outlined text-metallic-gold">calendar_today</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-label-md text-label-md text-soft-cream/60 uppercase">Location</p>
                    <p className="font-body-lg text-body-lg">Lagos Atelier, Victoria Island</p>
                  </div>
                  <span className="material-symbols-outlined text-metallic-gold">location_on</span>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body-md text-soft-cream/80">Consultation Fee</span>
                  <span className="font-price-lg text-price-lg">{getServicePrice(selectedService)}</span>
                </div>
                <p className="text-[12px] text-soft-cream/40 italic">*The fee includes your personalized 50ml fragrance and private session.</p>
              </div>
              
              {error && (
                <div className="bg-red-500/10 text-red-200 p-4 mb-4 font-body-md text-sm border border-red-500/20">
                  {error}
                </div>
              )}
              {isSuccess ? (
                <div className="bg-green-500/10 text-green-200 p-6 mb-4 font-body-md text-sm border border-green-500/20 text-center">
                  Your request has been received. Our concierge will contact you shortly.
                </div>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full bg-metallic-gold text-regal-navy font-label-md text-label-md uppercase font-bold py-5 hover:bg-muted-gold transition-colors tracking-widest active:scale-[0.98] ${isSubmitting ? 'opacity-80' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Consultation'}
                </button>
              )}
              
              <p className="text-center mt-6 text-[12px] text-soft-cream/40">
                Our concierge will contact you within 24 hours to confirm your appointment and arrange a pre-consultation call.
              </p>
            </div>
          </div>
          
        </div>
      </section>

      {/* The Atelier Section */}
      <section className="bg-soft-cream py-[120px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[64px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] items-center">
            <div className="order-2 md:order-1">
              <span className="font-label-md text-label-md text-metallic-gold uppercase tracking-[0.2em] mb-4 block">The Destination</span>
              <h2 className="font-display-lg text-headline-lg text-regal-navy mb-8">A Sanctuary of Scent</h2>
              <div className="space-y-6 text-on-surface-variant font-body-lg max-w-lg">
                <p>Located in the serene heart of Lagos, our flagship atelier is designed as a modern gallery of fragrance. Every element—from the marble scent bar to the acoustic dampening—is curated to enhance your olfactory focus.</p>
                <p>During your private session, you will explore over 200 raw ingredients sourced globally, guided by our master blenders to translate your memories and aspirations into a unique liquid identity.</p>
              </div>
              <div className="mt-10 flex gap-12">
                <div>
                  <span className="block font-headline-md text-metallic-gold">200+</span>
                  <span className="font-label-md text-label-md uppercase">Olfactive Notes</span>
                </div>
                <div>
                  <span className="block font-headline-md text-metallic-gold">90m</span>
                  <span className="font-label-md text-label-md uppercase">Session Time</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-4 h-[600px]">
              <div 
                className="bg-cover bg-center h-full" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_gbkk7LWZ3CHUN-XXnMpxgF9KZgFh6ZQbEVLGL3Hd-TxPZrGpS5-PNt6Uf3K1q9DJiu2GYm4hjaOp13SqJSBVa4i-VTZANYXw88JXmjjbOLJwWQRlyW5V4C_d-JF7Gi6iHrvbO1guGtI0IMIykN9sC0s-PLjNSPfkUL7fly7fFaQUTzcy87UBR1n9jBC5gpp7H1nrhpNcXMIPDOi_U-71RxJZXsSPos7OzUe455VxzJZe941OZIDe')" }}
              />
              <div className="space-y-4 h-full">
                <div 
                  className="bg-cover bg-center h-[292px]" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBO2qXSEnNdDVg95ansrRzs5w2NrmgC2-4MCIjmDPwpptt_KxmjlVT6AoWQa1TC_fhRLDvAL8cX9dwlLhQgBruf6fP5ldwWFFF-c9vaxKkTK6aFX6sjnMEODY0t4Fvsd_-Vev6SMPhZHaes1ctjkFNMHyGcMqKH1zXfBiuMk1kPNZfh3Wwf3hkfWUP7wXfWMX1UC5xah_xze4Rp0QOS55RN04oKTKlSQyXjYMEt2ED6vkvjp3rd9vhG')" }}
                />
                <div 
                  className="bg-cover bg-center h-[292px]" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4TYRaSxdWxfQ8Fggy8awhRXwFZYL3jX5fSI2kEsTC2YERbq8UYS-H9nDZDf3oHTQIEWJ5mc9xGaV3D1znddtQWUEDbsRy2z_cTU5ncZuGItGwjsRUkzqyTlQJlzXnkCAW1S9el0iVy-paNCrw_PvlY-v7uczkYGHwQpw7awsqWCjFsMX_aUsOh0UuTHAlzvbv3t1hSvQCxd9ESwYxZOoSaE7rCRkOz9ZQuOUsF4T6s8-zDEzNpuEF')" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
