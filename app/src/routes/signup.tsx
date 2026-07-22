import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/signup')({
  component: SignUp,
})

function SignUp() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsSuccess(true)
      setIsLoading(false)

      setTimeout(() => {
        navigate({ to: '/account' })
      }, 1000)
    }, 1500)
  }

  return (
    <div className="bg-[#faf8fd] text-[#1b1b1f] antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden">
      {/* Top Navigation Bar */}
      <header className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-6 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <Link to="/" className="text-headline-md font-headline-md font-bold text-regal-navy">
            Roymall Scents
        </Link>
        <Link className="text-label-md font-label-md text-regal-navy hover:text-metallic-gold transition-colors duration-300" to="/">
            BACK TO SHOP
        </Link>
      </header>

      <main className="flex-grow flex items-stretch min-h-screen pt-20">
        {/* Sidebar Illustration Section */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-regal-navy items-center justify-center">
          <div className="absolute inset-0 z-0 opacity-60">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApqPZfswjgeMdMxfYEEvnQ3VKJKfVQ325MuFSE-caDrZ_rA3Ss566gNTK9vv4bs9PB6clAbsnUeCkPIq7e8FGog6xzLJbv3upokbpEuYPp3ERKcT3J-OxjTPfIhlEKBf3L41HZ1ofCO4_Fj0PcjHnApuphgYtt1raV9eFGgdxihFf9vL3_XR4d9h-mCl_rHi6V5lK25qrQbr6USwcfJB4DZTdBdSNp7IHSLbkeNz9Q1Tgw0SC4-uRY')" }}
            ></div>
          </div>
          {/* Atmospheric Layer */}
          <div 
            className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-regal-navy via-transparent to-transparent opacity-80"></div>
          
          {/* Floating Content */}
          <div className="relative z-10 text-center px-12">
            <h1 className="font-display-lg text-display-lg text-metallic-gold mb-6 leading-tight">Begin Your <br/>Olfactory Journey</h1>
            <p className="font-body-md text-body-lg text-soft-cream/80 max-w-md mx-auto">
                Join our inner circle for exclusive access to limited edition fragrances and bespoke scent consultations.
            </p>
            <div className="mt-12 w-24 h-px bg-metallic-gold/40 mx-auto"></div>
          </div>
        </div>

        {/* Registration Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white relative">
          <div className="max-w-md w-full space-y-10 mb-8 lg:mb-0">
            <div className="space-y-4">
              <h2 className="font-headline-lg text-headline-lg text-regal-navy">Create Account</h2>
              <p className="font-body-md text-[#1b1b1f]/60">Please enter your details to register for an exclusive membership.</p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="relative group border-b border-[#1b1b1f]/20 focus-within:border-metallic-gold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <label className="block text-label-md font-label-md text-[#1b1b1f]/40 group-focus-within:text-metallic-gold uppercase transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" htmlFor="full_name">Full Name</label>
                <input className="block w-full bg-transparent border-none px-0 py-3 text-body-md focus:outline-none focus:ring-0 placeholder-[#1b1b1f]/20" id="full_name" name="full_name" placeholder="ALEXANDER ROYCE" required type="text"/>
              </div>

              {/* Email Field */}
              <div className="relative group border-b border-[#1b1b1f]/20 focus-within:border-metallic-gold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <label className="block text-label-md font-label-md text-[#1b1b1f]/40 group-focus-within:text-metallic-gold uppercase transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" htmlFor="email">Email Address</label>
                <input className="block w-full bg-transparent border-none px-0 py-3 text-body-md focus:outline-none focus:ring-0 placeholder-[#1b1b1f]/20" id="email" name="email" placeholder="ALEX@ROYMALL.COM" required type="email"/>
              </div>

              {/* Password Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Password Field */}
                <div className="relative group border-b border-[#1b1b1f]/20 focus-within:border-metallic-gold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <label className="block text-label-md font-label-md text-[#1b1b1f]/40 group-focus-within:text-metallic-gold uppercase transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" htmlFor="password">Password</label>
                  <input className="block w-full bg-transparent border-none px-0 py-3 text-body-md focus:outline-none focus:ring-0 placeholder-[#1b1b1f]/20" id="password" name="password" placeholder="••••••••" required type="password"/>
                </div>

                {/* Confirm Password Field */}
                <div className="relative group border-b border-[#1b1b1f]/20 focus-within:border-metallic-gold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <label className="block text-label-md font-label-md text-[#1b1b1f]/40 group-focus-within:text-metallic-gold uppercase transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" htmlFor="confirm_password">Confirm Password</label>
                  <input className="block w-full bg-transparent border-none px-0 py-3 text-body-md focus:outline-none focus:ring-0 placeholder-[#1b1b1f]/20" id="confirm_password" name="confirm_password" placeholder="••••••••" required type="password"/>
                </div>
              </div>

              {/* Exclusive Checkbox */}
              <div className="flex items-start space-x-3 pt-2">
                <div className="flex items-center h-5">
                  <input className="h-4 w-4 text-metallic-gold border-[#1b1b1f]/20 rounded-none focus:ring-metallic-gold focus:outline-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer" id="mailing_list" name="mailing_list" type="checkbox"/>
                </div>
                <div className="text-label-md">
                  <label className="font-label-md text-[#1b1b1f]/70 cursor-pointer select-none" htmlFor="mailing_list">Join our exclusive mailing list</label>
                  <p className="text-[12px] text-[#1b1b1f]/40 font-body-md mt-1 italic">Receive early access to seasonal launches and private events.</p>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                className={`w-full py-5 px-8 font-label-md uppercase tracking-widest text-label-md transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-lg shadow-regal-navy/10 flex items-center justify-center space-x-2 active:scale-[0.98] ${
                  isSuccess 
                    ? 'bg-metallic-gold text-regal-navy' 
                    : 'bg-regal-navy text-metallic-gold hover:bg-[#001b44]/90'
                } ${isLoading ? 'opacity-80' : ''}`}
                type="submit"
                disabled={isLoading || isSuccess}
              >
                <span>{isLoading ? 'Creating Account...' : isSuccess ? 'Welcome' : 'Create Account'}</span>
                {!isLoading && !isSuccess && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
              </button>
            </form>

            {/* Footer Links */}
            <div className="pt-8 border-t border-[#1b1b1f]/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-label-md text-[#1b1b1f]/60 font-body-md">
                  Already a member? 
                  <Link className="text-regal-navy font-bold hover:text-metallic-gold transition-colors duration-200 ml-1" to="/signin">Sign In</Link>
              </p>
              <Link className="text-[12px] uppercase tracking-tighter text-[#1b1b1f]/40 hover:text-regal-navy transition-colors" to="/">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-16 text-center lg:text-left bg-white lg:absolute lg:bottom-0 lg:right-0 lg:w-1/2 border-t border-gray-100">
        <p className="text-[11px] font-label-md text-[#1b1b1f]/30 uppercase tracking-[0.2em]">© {new Date().getFullYear()} Roymall Scents. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
