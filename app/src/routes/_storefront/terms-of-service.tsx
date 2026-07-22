import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_storefront/terms-of-service')({
  component: TermsOfService,
})

function TermsOfService() {
  return (
    <main className="bg-background text-on-surface font-body-md min-h-screen">
      <style>{`
        .legal-content h2 {
            margin-top: 48px;
            margin-bottom: 24px;
            border-bottom: 1px solid rgba(212, 175, 55, 0.2);
            padding-bottom: 8px;
        }
        .legal-content p {
            margin-bottom: 20px;
            color: #44474f;
        }
      `}</style>
      
      {/* Container spacing from the header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-[64px] py-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px]">
          
          {/* Side Navigation (Suppressed on mobile, fixed on desktop) */}
          <aside className="hidden md:block md:col-span-3">
            <div className="sticky top-32 space-y-8">
              <div className="space-y-2">
                <h3 className="font-headline-md text-headline-md text-regal-navy">Legal Center</h3>
                <p className="font-label-md text-label-md text-muted-gold tracking-widest uppercase">Effective Jan 2024</p>
              </div>
              
              <nav className="flex flex-col gap-4 border-l border-outline-variant pl-6">
                <Link to="/terms-of-service" className="font-label-md text-label-md text-regal-navy font-bold border-l-2 border-metallic-gold -ml-[25px] pl-[23px]">Terms of Service</Link>
                <Link to="/" className="font-label-md text-label-md text-on-surface-variant hover:text-metallic-gold transition-colors">Privacy Policy</Link>
                <Link to="/" className="font-label-md text-label-md text-on-surface-variant hover:text-metallic-gold transition-colors">Cookie Policy</Link>
                <Link to="/" className="font-label-md text-label-md text-on-surface-variant hover:text-metallic-gold transition-colors">Refund Policy</Link>
                <Link to="/shipping-returns" className="font-label-md text-label-md text-on-surface-variant hover:text-metallic-gold transition-colors">Shipping Info</Link>
              </nav>
              
              <div className="p-6 bg-regal-navy text-metallic-gold">
                <p className="font-label-md text-label-md mb-2">Need Help?</p>
                <p className="font-body-md text-body-md opacity-80 mb-4">Our legal team is here to clarify any points regarding our luxury service.</p>
                <Link to="/contact" className="inline-block border border-metallic-gold px-4 py-2 font-label-md text-label-md hover:bg-metallic-gold hover:text-regal-navy transition-all">CONTACT US</Link>
              </div>
            </div>
          </aside>

          {/* Main Legal Content */}
          <article className="md:col-span-9 max-w-3xl animate-fade-in" style={{ animation: 'fadeIn 1s ease-out forwards' }}>
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            `}</style>
            
            <header className="mb-16">
              <h1 className="font-display-lg text-display-lg text-regal-navy mb-6">Terms of Service</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant italic">Please read these terms carefully before engaging with the Roymall Scents experience. Your use of our website signifies your acceptance of these refined standards.</p>
            </header>
            
            <div className="legal-content font-body-md text-body-md leading-relaxed">
              <section id="usage-agreement">
                <h2 className="font-headline-md text-headline-md text-regal-navy uppercase tracking-tight">1. Usage Agreement</h2>
                <p>Welcome to Roymall Scents. By accessing or using our platform, you acknowledge that you are at least 18 years of age and possess the legal authority to enter into this agreement. These terms apply to all visitors, users, and others who wish to access or use the Service.</p>
                <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.</p>
              </section>
              
              <section id="intellectual-property">
                <h2 className="font-headline-md text-headline-md text-regal-navy uppercase tracking-tight">2. Intellectual Property</h2>
                <p>The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Roymall Scents and its licensors. Our trademarks, logos, and olfactory branding may not be used in connection with any product or service without the prior written consent of Roymall Scents.</p>
                <p>The visual identity, including photography, layout, and graphic design presented on this platform, is protected by copyright and international intellectual property laws.</p>
              </section>
              
              <section id="limitation-of-liability">
                <h2 className="font-headline-md text-headline-md text-regal-navy uppercase tracking-tight">3. Limitation of Liability</h2>
                <p>In no event shall Roymall Scents, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service.</p>
                <p>As fragrance is a subjective sensory experience, Roymall Scents is not liable for individual skin reactions or dissatisfaction with scent profiles once the product seal has been broken.</p>
              </section>
              
              <section id="governing-law">
                <h2 className="font-headline-md text-headline-md text-regal-navy uppercase tracking-tight">4. Governing Law</h2>
                <p>These Terms shall be governed and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions.</p>
                <p>Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in <strong>Lagos, Nigeria</strong>.</p>
              </section>
              
              <section id="modifications">
                <h2 className="font-headline-md text-headline-md text-regal-navy uppercase tracking-tight">5. Modifications to Terms</h2>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
              </section>
              
              <div className="mt-20 p-8 border border-metallic-gold/30 bg-soft-cream">
                <p className="font-label-md text-label-md text-regal-navy mb-4">ACKNOWLEDGMENT</p>
                <p className="font-body-md text-body-md italic text-on-surface-variant">By continuing to browse this site or purchasing our artisanal fragrances, you acknowledge that you have read and understood these Terms of Service in their entirety.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  )
}
