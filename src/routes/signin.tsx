import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { api } from '../lib/api'

export const Route = createFileRoute('/signin')({
  component: SignIn,
})

function SignIn() {
  const navigate = useNavigate()
  const { login } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await api.login({ email, password })
      // Assuming response has { accessToken, user: {...} } or { data: { accessToken, user } }
      const token = response?.accessToken || response?.data?.accessToken || response?.token || response?.data?.token
      const userData = response?.user || response?.data?.user
      
      if (token && userData) {
        login(token, userData)
        setIsSuccess(true)
        setTimeout(() => {
          if (userData.role === 'ADMIN') {
            navigate({ to: '/admin' })
          } else {
            navigate({ to: '/account' })
          }
        }, 1000)
      } else {
        console.error('Invalid login response:', response)
        setError(`Invalid response from server. Check console.`)
      }
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      if (!isSuccess) {
        setIsLoading(false)
      }
    }
  }

  return (
    <main 
      className="relative min-h-screen flex items-center justify-center px-6 py-[120px] bg-soft-cream"
      style={{
        background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.05) 0%, transparent 50%), radial-gradient(circle at bottom left, rgba(0, 27, 68, 0.05) 0%, transparent 50%), #F9F8F3'
      }}
    >
      {/* Background Atmospheric Element */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDz3do7cGxXFd-JyBD-6FcBhrJQCuLN7hcsqkhtq3dZER5jUo0DTcVmrMh3bQCFJqGpaNDrByPUjIt5_kT5QMq7dpkf8Ow5UcDGXsVmsjsU4gKDlrHwDSW1U0LTJBQZ0UrlyQ1tp_RQOVUjxveRjJyGdhmHf3DC42MMH_Yk0rAtsSmfe6jCkR-OzCG6X0-wxcHi1_Cg939LQaGzh1AF54tMe0R9mH_Bu1NC3o4QMscbA3P-VCkXVoXe')" }}
        ></div>
      </div>

      {/* Auth Card Container */}
      <div className="relative w-full max-w-md z-10">
        <div className="bg-white border border-metallic-gold/15 p-10 md:p-14 shadow-sm">
          
          {/* Branding */}
          <div className="text-center mb-10">
            <Link to="/">
              <h1 className="font-display-lg text-headline-md tracking-widest text-regal-navy uppercase mb-2 hover:text-metallic-gold transition-colors">
                  Roymall Scents
              </h1>
            </Link>
            <p className="font-headline-md text-regal-navy opacity-80 mt-4 italic">Welcome Back</p>
            <div className="w-12 h-px bg-metallic-gold mx-auto mt-6"></div>
          </div>

          {/* Sign In Form */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 font-body-md text-sm border border-red-100">
                {error}
              </div>
            )}
            {/* Email Field */}
            <div className="relative group">
              <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-2" htmlFor="email">
                  Email Address
              </label>
              <input 
                className="w-full bg-transparent py-3 px-0 border-b border-regal-navy/20 focus:outline-none focus:border-metallic-gold transition-colors duration-300 font-body-lg text-regal-navy placeholder:text-outline/40" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                required 
                type="email"
              />
              <span className="material-symbols-outlined absolute right-0 bottom-3 text-outline/50 group-focus-within:text-metallic-gold transition-colors">
                  mail
              </span>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className="flex justify-between items-center mb-2">
                <label className="block font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="password">
                    Password
                </label>
                <Link to="/forgot-password" className="font-label-md text-[11px] text-muted-gold hover:text-metallic-gold transition-colors uppercase tracking-wider">
                    Forgot Password?
                </Link>
              </div>
              <input 
                className="w-full bg-transparent py-3 px-0 border-b border-regal-navy/20 focus:outline-none focus:border-metallic-gold transition-colors duration-300 font-body-lg text-regal-navy placeholder:text-outline/40" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password" 
                required 
                type={showPassword ? 'text' : 'password'}
              />
              <button 
                className="absolute right-0 bottom-3 text-outline/50 hover:text-metallic-gold transition-colors" 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button 
                className={`w-full py-5 font-label-md text-label-md uppercase tracking-[0.2em] transition-all duration-300 transform active:scale-[0.98] focus:outline-none focus:ring-1 focus:ring-metallic-gold ${
                  isSuccess 
                    ? 'bg-metallic-gold text-regal-navy' 
                    : 'bg-regal-navy text-metallic-gold hover:bg-[#001b44]/90'
                } ${isLoading ? 'opacity-80' : ''}`}
                type="submit"
                disabled={isLoading || isSuccess}
              >
                {isLoading ? 'Verifying...' : isSuccess ? 'Welcome' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-12 text-center">
            <p className="font-body-md text-on-surface-variant opacity-80 text-sm">
                New to Roymall Scents? 
                <Link className="text-regal-navy font-bold hover:text-metallic-gold transition-colors border-b border-metallic-gold/30 ml-1" to="/signup">
                    Create an Account
                </Link>
            </p>
          </div>
        </div>

        {/* Global Footer Contextual Info (Small Print) */}
        <div className="mt-8 text-center opacity-40">
          <p className="font-label-md text-[10px] uppercase tracking-widest text-regal-navy">
              © 2024 Roymall Scents. Defined by Elegance.
          </p>
        </div>
      </div>
    </main>
  )
}
