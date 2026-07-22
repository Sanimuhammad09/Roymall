import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPassword,
})

function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    }
  }

  return (
    <div className="bg-regal-navy min-h-screen flex flex-col items-center justify-center p-6 md:p-[64px] overflow-hidden relative">
      <style>{`
        .step-transition {
            transition: opacity 0.5s ease-in-out, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      
      {/* Ambient Texture Layer */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 70%)" }}
      ></div>
      
      <main className="w-full max-w-[480px] z-10">
        {/* Logo Branding */}
        <div className="text-center mb-12 animate-fade-in">
          <Link to="/" className="font-headline-lg text-headline-lg text-metallic-gold tracking-tighter uppercase mb-2 block hover:text-white transition-colors">Roymall Scents</Link>
          <p className="font-label-md text-label-md text-soft-cream/60 tracking-[0.2em] uppercase">Private Collection</p>
        </div>

        {/* Step 1: Email Entry */}
        <div className={`step-transition ${step === 1 ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-4 absolute inset-x-0 pointer-events-none invisible'}`}>
          <div className="bg-white/5 backdrop-blur-md border border-metallic-gold/20 p-8 md:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-metallic-gold text-4xl mb-4">lock_reset</span>
              <h2 className="font-headline-md text-headline-md text-white mb-2">Reset Credentials</h2>
              <p className="font-body-md text-body-md text-soft-cream/70">Enter your email address associated with your account to receive a recovery link.</p>
            </div>
            
            <form onSubmit={handleNext}>
              <div className="mb-8 relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 text-white font-body-md px-0 py-3 focus:ring-0 focus:border-metallic-gold transition-colors peer" 
                  placeholder=" " 
                  required 
                />
                <label className="absolute left-0 top-3 font-label-md text-label-md text-soft-cream/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-metallic-gold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-soft-cream/50">
                  Email Address
                </label>
              </div>
              
              <button type="submit" className="w-full bg-metallic-gold text-regal-navy font-label-md text-label-md uppercase tracking-widest py-4 hover:bg-white hover:text-regal-navy transition-all duration-300 transform hover:-translate-y-1">
                Send Recovery Link
              </button>
            </form>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/signin" className="font-label-md text-label-md text-soft-cream/50 hover:text-metallic-gold transition-colors inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Return to Login
            </Link>
          </div>
        </div>

        {/* Step 2: Verification Code */}
        <div className={`step-transition ${step === 2 ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-4 absolute inset-x-0 pointer-events-none invisible'}`}>
          <div className="bg-white/5 backdrop-blur-md border border-metallic-gold/20 p-8 md:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-metallic-gold text-4xl mb-4">mark_email_read</span>
              <h2 className="font-headline-md text-headline-md text-white mb-2">Verify Identity</h2>
              <p className="font-body-md text-body-md text-soft-cream/70">We've sent a 6-digit code to <br/><span className="text-white font-bold">{email || 'your email'}</span></p>
            </div>
            
            <form onSubmit={handleNext}>
              <div className="flex justify-between gap-2 mb-8">
                <input type="text" maxLength={1} className="w-12 h-14 bg-transparent border border-white/20 text-white text-center text-xl font-bold focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold transition-all" />
                <input type="text" maxLength={1} className="w-12 h-14 bg-transparent border border-white/20 text-white text-center text-xl font-bold focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold transition-all" />
                <input type="text" maxLength={1} className="w-12 h-14 bg-transparent border border-white/20 text-white text-center text-xl font-bold focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold transition-all" />
                <input type="text" maxLength={1} className="w-12 h-14 bg-transparent border border-white/20 text-white text-center text-xl font-bold focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold transition-all" />
                <input type="text" maxLength={1} className="w-12 h-14 bg-transparent border border-white/20 text-white text-center text-xl font-bold focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold transition-all" />
                <input type="text" maxLength={1} className="w-12 h-14 bg-transparent border border-white/20 text-white text-center text-xl font-bold focus:border-metallic-gold focus:ring-1 focus:ring-metallic-gold transition-all" />
              </div>
              
              <button type="submit" className="w-full bg-metallic-gold text-regal-navy font-label-md text-label-md uppercase tracking-widest py-4 hover:bg-white hover:text-regal-navy transition-all duration-300 transform hover:-translate-y-1">
                Verify Code
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-soft-cream/50 font-body-md text-[14px]">Didn't receive it? <button className="text-metallic-gold hover:text-white transition-colors underline">Resend Code</button></p>
            </div>
          </div>
        </div>

        {/* Step 3: New Password */}
        <div className={`step-transition ${step === 3 ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-4 absolute inset-x-0 pointer-events-none invisible'}`}>
          <div className="bg-white/5 backdrop-blur-md border border-metallic-gold/20 p-8 md:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-metallic-gold text-4xl mb-4">key</span>
              <h2 className="font-headline-md text-headline-md text-white mb-2">Secure Account</h2>
              <p className="font-body-md text-body-md text-soft-cream/70">Create a new, strong password for your Roymall Scents profile.</p>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Password reset successful!'); window.location.href='/signin'; }}>
              <div className="mb-6 relative group">
                <input 
                  type="password" 
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 text-white font-body-md px-0 py-3 focus:ring-0 focus:border-metallic-gold transition-colors peer" 
                  placeholder=" " 
                  required 
                />
                <label className="absolute left-0 top-3 font-label-md text-label-md text-soft-cream/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-metallic-gold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-soft-cream/50">
                  New Password
                </label>
                <span className="material-symbols-outlined absolute right-0 top-3 text-soft-cream/30 cursor-pointer hover:text-metallic-gold transition-colors text-[20px]">visibility_off</span>
              </div>
              
              <div className="mb-8 relative group">
                <input 
                  type="password" 
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 text-white font-body-md px-0 py-3 focus:ring-0 focus:border-metallic-gold transition-colors peer" 
                  placeholder=" " 
                  required 
                />
                <label className="absolute left-0 top-3 font-label-md text-label-md text-soft-cream/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-metallic-gold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-soft-cream/50">
                  Confirm Password
                </label>
              </div>
              
              <button type="submit" className="w-full bg-metallic-gold text-regal-navy font-label-md text-label-md uppercase tracking-widest py-4 hover:bg-white hover:text-regal-navy transition-all duration-300 transform hover:-translate-y-1">
                Update Password
              </button>
            </form>
          </div>
        </div>

      </main>
      
      {/* Footer minimal */}
      <div className="absolute bottom-6 left-0 w-full text-center z-10">
        <p className="text-soft-cream/30 text-[12px] uppercase tracking-widest font-label-md">© {new Date().getFullYear()} Roymall Scents</p>
      </div>
    </div>
  )
}
