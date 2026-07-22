import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_storefront/our-story')({
  component: OurStory,
})

function OurStory() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-regal-navy overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img className="w-full h-full object-cover" alt="Hero background" src="https://lh3.googleusercontent.com/aida/AP1WRLspyt2tsg-xUZ-sbwKQws7nQxO0NMmrUgUEIOBxaPSxL0RlJchnDzgENI4u5X56I0KpUtg6WJ6ZyUvMCEMghbtYhC2NylPV8ldN-MjRIrpFuOF_8eonAs1x_kVTUs5X-Ek8pW3H8CEZbhTQbrbr6lDdGhwXhuYmV1Fm-y6pAgQQVnDYWNR3iwOLXGZIbq_F4Rdwpez6bKVUwCH1dE4dXcMTbJdJ3RjaiYtb0bsZTPikNnxgmo8FmYb7raw"/>
        </div>
        <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="text-metallic-gold font-label-md uppercase tracking-[0.3em] mb-4">The Legacy of Elegance</p>
          <h1 className="text-soft-cream font-display-lg text-display-lg mb-6 max-w-4xl mx-auto leading-tight">
            Your Confidence, <br/> Our Concern.
          </h1>
          <div className="w-24 h-px bg-metallic-gold mx-auto"></div>
        </div>
      </section>

      {/* Our Philosophy (Bento-style asymmetric layout) */}
      <section className="py-[120px] px-[64px] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px] items-center">
          <div className="md:col-span-5">
            <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-8">Our Philosophy</h2>
            <p className="font-body-lg text-body-lg text-regal-navy/80 mb-6 leading-relaxed">
              At Roymall Scents, we believe that a fragrance is more than just a scent—it is an invisible signature, a silent communicator of identity and aspiration.
            </p>
            <p className="font-body-md text-body-md text-regal-navy/70 mb-8">
              Our journey began with a single mission: to curate a collection of world-class fragrances that empower individuals to step into every room with unwavering confidence. We source only from master perfumers who share our dedication to olfactory art.
            </p>
            <Link to="/shop" className="inline-block bg-regal-navy text-on-primary font-label-md py-4 px-10 hover:bg-metallic-gold transition-colors duration-300">
              DISCOVER THE COLLECTION
            </Link>
          </div>
          <div className="md:col-span-7 relative mt-12 md:mt-0">
            <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden group">
              <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" alt="Our philosophy" src="https://lh3.googleusercontent.com/aida/AP1WRLuBHzYMVEoCLq9RC_so7j2Z9g9JMa9gICftTto5mDd8tAbvNIAylfBkGvuFpZ6-igfRdW04jMfJu3C9ffINSPi2F4SYaABu8HHSgTY21XzCwu5OIK0sA3fA3bs9P-AuDcujrrkPnV1wIHasaKBgkOu9ILuUFGNU5rnryGALYBFl_hmFsca5DfLQkr-yn0WL6QXBj1JMerA1T0RWw6fciIvXr7nLPadyt7SmU6znBvG09VPG-4Gsqho8PpU"/>
              <div className="absolute inset-0 border-[20px] border-soft-cream/10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Authenticity Guarantee (Floating Card Layout) */}
      <section className="bg-regal-navy py-[120px] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-[64px] relative z-10">
          <div className="flex flex-col md:flex-row gap-[32px] items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-8 border border-muted-gold/20 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-metallic-gold text-4xl mb-4">verified</span>
                  <h4 className="text-metallic-gold font-headline-md text-headline-md mb-2">100% Authentic</h4>
                  <p className="text-soft-cream/70 text-label-md">Directly sourced from original luxury fragrance houses.</p>
                </div>
                <div className="bg-white/5 p-8 border border-muted-gold/20 backdrop-blur-sm mt-8">
                  <span className="material-symbols-outlined text-metallic-gold text-4xl mb-4">workspace_premium</span>
                  <h4 className="text-metallic-gold font-headline-md text-headline-md mb-2">Premium Quality</h4>
                  <p className="text-soft-cream/70 text-label-md">Rigorous quality checks for every bottle.</p>
                </div>
                <div className="bg-white/5 p-8 border border-muted-gold/20 backdrop-blur-sm -mt-4">
                  <span className="material-symbols-outlined text-metallic-gold text-4xl mb-4">lock</span>
                  <h4 className="text-metallic-gold font-headline-md text-headline-md mb-2">Secure Origin</h4>
                  <p className="text-soft-cream/70 text-label-md">Transparent batch tracking and verified provenance.</p>
                </div>
                <div className="bg-white/5 p-8 border border-muted-gold/20 backdrop-blur-sm mt-4">
                  <span className="material-symbols-outlined text-metallic-gold text-4xl mb-4">eco</span>
                  <h4 className="text-metallic-gold font-headline-md text-headline-md mb-2">Pure Essences</h4>
                  <p className="text-soft-cream/70 text-label-md">Only the finest natural and synthetic raw materials.</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 mb-12 md:mb-0">
              <h2 className="font-headline-lg text-headline-lg text-soft-cream mb-6">The Roymall Guarantee</h2>
              <p className="font-body-lg text-body-lg text-soft-cream/80 mb-8 leading-relaxed">
                Excellence is not a luxury, but a standard. We stand by the integrity of every spray, ensuring that what reaches your doorstep is a masterpiece of craftsmanship.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-metallic-gold"></div>
                <span className="text-metallic-gold font-label-md uppercase tracking-widest">Seal of Authenticity</span>
              </div>
            </div>
          </div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 border border-metallic-gold/10 rounded-full"></div>
        <div className="absolute -right-10 -bottom-10 w-96 h-96 border border-metallic-gold/10 rounded-full"></div>
      </section>

      {/* Nationwide Delivery */}
      <section className="py-[120px] px-[64px] max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-4">Nationwide Delivery</h2>
          <div className="w-16 h-1 bg-metallic-gold mx-auto mb-6"></div>
          <p className="font-body-lg text-body-lg text-regal-navy/70 max-w-2xl mx-auto">
            Bringing the world's most exquisite scents to your doorstep, anywhere in the nation.
          </p>
        </div>

        <div className="relative bg-soft-cream border border-muted-gold/10 p-1 md:p-4 group">
          <div className="relative overflow-hidden aspect-[21/9]">
            {/* Inspiration image mapping to delivery theme */}
            <img className="w-full h-full object-cover" alt="Delivery" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAozzYTXwaiEggY1NFuc0KdzqV4TwCpxMv7il9-9B_YhGO-O4-dAl83WIMD3i-ErglZGV_zxtEqWJYX6_5fE228AEr1GMcYX-Ei4R9i-KBxTByonZAPw9Q7FeK0bjS2HaP9tUyIvNAYJY2MSpRkSLW7ifcHfOyVPHgjRfWRgkctQCml6KLZvqyUAnJuZQ7TvaTnHx9qrYdHVdX30t9iwISVvf58nafYp95dlHBIxiUnM6nhq2kwI_k-"/>
            <div className="absolute inset-0 bg-regal-navy/40 group-hover:bg-regal-navy/20 transition-all duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-soft-cream/90 backdrop-blur-md p-10 max-w-md text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="material-symbols-outlined text-regal-navy text-5xl mb-4">local_shipping</span>
                <h3 className="font-headline-md text-headline-md text-regal-navy mb-4">Swift &amp; Secure</h3>
                <p className="text-body-md text-regal-navy/70 mb-6">Every package is meticulously handled to preserve the fragile nature of luxury perfumery during its journey to you.</p>
                <Link to="/account" className="text-regal-navy font-label-md border-b border-regal-navy pb-1 hover:text-metallic-gold hover:border-metallic-gold transition-colors">TRACK YOUR ORDER</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] mt-16">
          <div className="text-center p-8 border-r border-muted-gold/10 last:border-0">
            <h5 className="font-headline-md text-regal-navy mb-2">Safe Transit</h5>
            <p className="text-label-md text-regal-navy/60">Reinforced luxury packaging to prevent leakage or breakage.</p>
          </div>
          <div className="text-center p-8 border-r border-muted-gold/10 last:border-0">
            <h5 className="font-headline-md text-regal-navy mb-2">Priority Shipping</h5>
            <p className="text-label-md text-regal-navy/60">Standard delivery within 2-4 business days nationwide.</p>
          </div>
          <div className="text-center p-8 border-r border-muted-gold/10 last:border-0">
            <h5 className="font-headline-md text-regal-navy mb-2">Gift Wrapping</h5>
            <p className="text-label-md text-regal-navy/60">Signature Roymall packaging available for all orders.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
