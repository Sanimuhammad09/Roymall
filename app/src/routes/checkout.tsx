import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/checkout')({
  component: Checkout,
})

function Checkout() {
  const [activeStep, setActiveStep] = useState(1)
  const [activeDelivery, setActiveDelivery] = useState('standard')

  return (
    <div className="bg-soft-cream font-body-md text-on-surface min-h-screen selection:bg-metallic-gold/30">
      {/* TopNavBar (Suppressed Navigation, showing only Brand and Secure Checkout) */}
      <header className="fixed top-0 left-0 w-full z-50 bg-regal-navy flex justify-between items-center px-6 md:px-16 py-4 max-w-none border-b border-muted-gold/10">
        <Link to="/" className="text-headline-md font-bold text-metallic-gold font-headline-md">Roymall Scents</Link>
        <div className="flex items-center gap-2 text-soft-cream/80 text-label-md">
          <span className="material-symbols-outlined text-[18px]">lock</span>
          <span className="hidden md:inline">SECURE CHECKOUT</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/cart" className="text-soft-cream hover:text-metallic-gold transition-colors">
            <span className="material-symbols-outlined">shopping_bag</span>
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-section-gap px-6 md:px-container-margin max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">
        {/* Checkout Steps Container */}
        <div className="lg:col-span-7 space-y-12">
          {/* Progress Indicator */}
          <nav className="flex justify-between items-center max-w-md mx-auto lg:mx-0 mb-12">
            <div className={`flex flex-col items-center gap-2 ${activeStep >= 1 ? 'text-metallic-gold' : 'text-regal-navy opacity-40'}`}>
              <span className="text-label-md font-bold tracking-widest uppercase">Shipping</span>
              <div className={`h-1 w-16 ${activeStep >= 1 ? 'bg-metallic-gold' : 'bg-regal-navy/20'}`}></div>
            </div>
            <div className={`flex flex-col items-center gap-2 ${activeStep >= 2 ? 'text-metallic-gold' : 'text-regal-navy opacity-40'}`}>
              <span className="text-label-md font-bold tracking-widest uppercase">Delivery</span>
              <div className={`h-1 w-16 ${activeStep >= 2 ? 'bg-metallic-gold' : 'bg-regal-navy/20'}`}></div>
            </div>
            <div className={`flex flex-col items-center gap-2 ${activeStep >= 3 ? 'text-metallic-gold' : 'text-regal-navy opacity-40'}`}>
              <span className="text-label-md font-bold tracking-widest uppercase">Payment</span>
              <div className={`h-1 w-16 ${activeStep >= 3 ? 'bg-metallic-gold' : 'bg-regal-navy/20'}`}></div>
            </div>
          </nav>

          {/* Step 1: Shipping Information */}
          {activeStep === 1 && (
            <section className="space-y-8 animate-in fade-in duration-500">
              <div className="border-b border-regal-navy/10 pb-4">
                <h2 className="font-headline-md text-headline-md text-regal-navy">Shipping Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-label-md uppercase text-regal-navy/60">First Name</label>
                  <input className="bg-transparent border-0 border-b border-regal-navy/20 py-2 font-body-md text-regal-navy focus:border-metallic-gold focus:ring-0 focus:outline-none transition-colors" placeholder="e.g. Ade" type="text"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-label-md uppercase text-regal-navy/60">Last Name</label>
                  <input className="bg-transparent border-0 border-b border-regal-navy/20 py-2 font-body-md text-regal-navy focus:border-metallic-gold focus:ring-0 focus:outline-none transition-colors" placeholder="e.g. Balogun" type="text"/>
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-label-md uppercase text-regal-navy/60">Street Address</label>
                  <input className="bg-transparent border-0 border-b border-regal-navy/20 py-2 font-body-md text-regal-navy focus:border-metallic-gold focus:ring-0 focus:outline-none transition-colors" placeholder="123 Luxury Avenue, Victoria Island" type="text"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-label-md uppercase text-regal-navy/60">City</label>
                  <input className="bg-transparent border-0 border-b border-regal-navy/20 py-2 font-body-md text-regal-navy focus:border-metallic-gold focus:ring-0 focus:outline-none transition-colors" placeholder="Lagos" type="text"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-label-md uppercase text-regal-navy/60">Phone Number</label>
                  <input className="bg-transparent border-0 border-b border-regal-navy/20 py-2 font-body-md text-regal-navy focus:border-metallic-gold focus:ring-0 focus:outline-none transition-colors" placeholder="+234 ..." type="tel"/>
                </div>
              </div>
              <div className="pt-8">
                <button 
                  className="w-full md:w-auto bg-regal-navy text-soft-cream px-12 py-4 text-label-md uppercase tracking-widest hover:bg-regal-navy/90 transition-all" 
                  onClick={() => {
                    setActiveStep(2)
                    if(window.innerWidth < 1024) window.scrollTo({ top: 150, behavior: 'smooth' })
                  }}
                >
                  Continue to Delivery
                </button>
              </div>
            </section>
          )}

          {/* Step 2: Delivery Method */}
          {activeStep === 2 && (
            <section className="space-y-8 animate-in fade-in duration-500">
              <div className="border-b border-regal-navy/10 pb-4">
                <h2 className="font-headline-md text-headline-md text-regal-navy">Delivery Method</h2>
              </div>
              <div className="space-y-4">
                <label 
                  className={`flex items-center justify-between p-6 border bg-white cursor-pointer transition-all ${activeDelivery === 'standard' ? 'border-metallic-gold' : 'border-regal-navy/10 hover:border-metallic-gold'}`}
                  onClick={() => setActiveDelivery('standard')}
                >
                  <div className="flex items-center gap-4">
                    <input 
                      checked={activeDelivery === 'standard'} 
                      readOnly
                      className="text-metallic-gold focus:ring-metallic-gold h-5 w-5" 
                      name="delivery" 
                      type="radio"
                    />
                    <div>
                      <p className="font-bold text-regal-navy">Standard Shipping</p>
                      <p className="text-sm text-regal-navy/60">3-5 Business Days</p>
                    </div>
                  </div>
                  <span className="font-headline-md text-regal-navy">₦2,500</span>
                </label>
                <label 
                  className={`flex items-center justify-between p-6 border bg-white cursor-pointer transition-all ${activeDelivery === 'express' ? 'border-metallic-gold' : 'border-regal-navy/10 hover:border-metallic-gold'}`}
                  onClick={() => setActiveDelivery('express')}
                >
                  <div className="flex items-center gap-4">
                    <input 
                      checked={activeDelivery === 'express'} 
                      readOnly
                      className="text-metallic-gold focus:ring-metallic-gold h-5 w-5" 
                      name="delivery" 
                      type="radio"
                    />
                    <div>
                      <p className="font-bold text-regal-navy">Express Delivery</p>
                      <p className="text-sm text-regal-navy/60">Next Day Delivery (Lagos Only)</p>
                    </div>
                  </div>
                  <span className="font-headline-md text-regal-navy">₦7,500</span>
                </label>
              </div>
              <div className="pt-8 flex flex-col md:flex-row gap-4">
                <button 
                  className="text-label-md uppercase tracking-widest text-regal-navy/60 hover:text-regal-navy transition-colors px-4 py-4" 
                  onClick={() => {
                    setActiveStep(1)
                    if(window.innerWidth < 1024) window.scrollTo({ top: 150, behavior: 'smooth' })
                  }}
                >
                  Back
                </button>
                <button 
                  className="bg-regal-navy text-soft-cream px-12 py-4 text-label-md uppercase tracking-widest hover:bg-regal-navy/90 transition-all" 
                  onClick={() => {
                    setActiveStep(3)
                    if(window.innerWidth < 1024) window.scrollTo({ top: 150, behavior: 'smooth' })
                  }}
                >
                  Continue to Payment
                </button>
              </div>
            </section>
          )}

          {/* Step 3: Payment */}
          {activeStep === 3 && (
            <section className="space-y-8 animate-in fade-in duration-500">
              <div className="border-b border-regal-navy/10 pb-4">
                <h2 className="font-headline-md text-headline-md text-regal-navy">Payment Details</h2>
              </div>
              <div className="bg-white border border-regal-navy/10 p-8 space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-label-md uppercase text-regal-navy/60">Cardholder Name</label>
                  <input className="bg-transparent border-0 border-b border-regal-navy/10 py-2 font-body-md text-regal-navy focus:border-metallic-gold focus:ring-0 focus:outline-none transition-colors" placeholder="NAME ON CARD" type="text"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-label-md uppercase text-regal-navy/60">Card Number</label>
                  <div className="flex items-center border-b border-regal-navy/10 focus-within:border-metallic-gold transition-colors">
                    <input className="flex-1 bg-transparent border-0 py-2 font-body-md text-regal-navy focus:ring-0 focus:outline-none" placeholder="0000 0000 0000 0000" type="text"/>
                    <span className="material-symbols-outlined text-regal-navy/40">credit_card</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-label-md uppercase text-regal-navy/60">Expiry Date</label>
                    <input className="bg-transparent border-0 border-b border-regal-navy/10 py-2 font-body-md text-regal-navy focus:border-metallic-gold focus:ring-0 focus:outline-none transition-colors" placeholder="MM/YY" type="text"/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-label-md uppercase text-regal-navy/60">CVV</label>
                    <input className="bg-transparent border-0 border-b border-regal-navy/10 py-2 font-body-md text-regal-navy focus:border-metallic-gold focus:ring-0 focus:outline-none transition-colors" placeholder="***" type="password"/>
                  </div>
                </div>
              </div>
              <div className="pt-8 flex flex-col md:flex-row gap-4 items-center">
                <button 
                  className="text-label-md uppercase tracking-widest text-regal-navy/60 hover:text-regal-navy transition-colors px-4 py-4 order-2 md:order-1" 
                  onClick={() => {
                    setActiveStep(2)
                    if(window.innerWidth < 1024) window.scrollTo({ top: 150, behavior: 'smooth' })
                  }}
                >
                  Back
                </button>
                <button className="w-full md:w-auto bg-metallic-gold text-regal-navy font-bold px-16 py-5 text-label-md uppercase tracking-widest hover:bg-muted-gold transition-all shadow-lg order-1 md:order-2">
                  Place Order • ₦{activeDelivery === 'standard' ? '210,000' : '215,000'}
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-5">
          <div className="sticky top-32 bg-white border border-regal-navy/5 p-8 space-y-8">
            <h3 className="font-headline-md text-headline-md text-regal-navy">Order Summary</h3>
            {/* Product List */}
            <div className="space-y-6 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-4">
                <div className="w-20 h-24 bg-soft-cream flex-shrink-0 relative overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2s6xGSlZUIdnl-1d5Xoi0AvUYQqqTz3Hc4pbUs88d7ZDEG7qXiSyFIIIR4fmYJae3oqFIxJDt-2Z9bCYyKraDPYCor3dHiU4gvDP10qXc7QNEinE8FqrxXBGk7AfezO-yYN3uqDlT_hH4-dR59nkRDWTUqgmXVe8t_7lU-r7xKMrfsJnOjegoiLV_5Q53K3O7Hiy1KbnjcTifRyJzrnnxYUwn4OPN5vTkaQtWNqtT99BmTfehtTrn" alt="Midnight Oud"/>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-bold text-regal-navy">Midnight Oud</p>
                  <p className="text-sm text-regal-navy/60">100ml Eau de Parfum</p>
                  <p className="font-headline-md text-regal-navy pt-1">₦125,000</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-20 h-24 bg-soft-cream flex-shrink-0 relative overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmh7bULkhdONz4aXFK0CaorPLkBiP5XtkkPmEfBq39-38PIjH2M-uuEpTbEOGHCXU5xpZ_3F1AYuNi0i8JGf6oIzeojSLaHulKVM_oz06J434RsoGCQ4pfBJVT5YT2GYpqTNlfk99D4A1lbbiwBVNMO3UWcB5MrtkTjR6hb7XeNgtvMPML0iaFFneDn_9jLJfoBwqFpkZhuydS2i6Pogkf2VIH0gRNTF1dF45M--FF0nsROfVX_bIb" alt="Royal Amber"/>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-bold text-regal-navy">Royal Amber</p>
                  <p className="text-sm text-regal-navy/60">50ml Travel Spray</p>
                  <p className="font-headline-md text-regal-navy pt-1">₦82,500</p>
                </div>
              </div>
            </div>
            {/* Totals */}
            <div className="space-y-4 pt-6 border-t border-regal-navy/5">
              <div className="flex justify-between text-body-md text-regal-navy/80">
                <span>Subtotal</span>
                <span>₦207,500</span>
              </div>
              <div className="flex justify-between text-body-md text-regal-navy/80">
                <span>Shipping</span>
                <span>₦{activeDelivery === 'standard' ? '2,500' : '7,500'}</span>
              </div>
              <div className="flex justify-between text-body-md text-regal-navy/80">
                <span>Tax (VAT)</span>
                <span>₦0</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-regal-navy/10">
                <span className="font-bold text-headline-md text-regal-navy">Total</span>
                <span className="font-bold text-headline-md text-regal-navy">₦{activeDelivery === 'standard' ? '210,000' : '215,000'}</span>
              </div>
            </div>
            <div className="bg-soft-cream p-4 flex gap-3 items-center">
              <span className="material-symbols-outlined text-metallic-gold">workspace_premium</span>
              <p className="text-xs text-regal-navy/80 italic">Complimentary luxury gift wrapping included with your purchase.</p>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer (Standard Branding) */}
      <footer className="w-full py-20 px-6 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-8 bg-regal-navy text-soft-cream border-t border-muted-gold/20">
        <div className="space-y-4">
          <h4 className="text-headline-md font-bold text-metallic-gold">Roymall Scents</h4>
          <p className="text-body-md text-soft-cream/60">Exquisite fragrances for the refined palette.</p>
        </div>
        <div className="flex flex-col gap-3">
          <h5 className="text-label-md font-bold text-metallic-gold uppercase">Customer Care</h5>
          <a className="text-soft-cream/80 hover:text-metallic-gold transition-colors underline decoration-transparent hover:decoration-metallic-gold" href="#">Shipping & Returns</a>
          <a className="text-soft-cream/80 hover:text-metallic-gold transition-colors underline decoration-transparent hover:decoration-metallic-gold" href="#">Privacy Policy</a>
          <a className="text-soft-cream/80 hover:text-metallic-gold transition-colors underline decoration-transparent hover:decoration-metallic-gold" href="#">Fragrance Guide</a>
        </div>
        <div className="flex flex-col gap-3">
          <h5 className="text-label-md font-bold text-metallic-gold uppercase">Contact</h5>
          <p className="text-soft-cream/80">Lagos, Nigeria</p>
          <p className="text-soft-cream/80">contact@roymallscents.com</p>
        </div>
        <div className="flex flex-col gap-3">
          <h5 className="text-label-md font-bold text-metallic-gold uppercase">© {new Date().getFullYear()} Roymall Scents</h5>
          <p className="text-xs text-soft-cream/40">All Rights Reserved. Handcrafted in the heart of West Africa.</p>
        </div>
      </footer>
    </div>
  )
}
