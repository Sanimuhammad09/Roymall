import { createFileRoute, Outlet, Link, useLocation } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { WhatsAppWidget } from '../components/WhatsAppWidget'
import { useDebounce } from '../hooks/useDebounce'

export const Route = createFileRoute('/_storefront')({
  component: StorefrontLayout,
})

function StorefrontLayout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [globalSearch, setGlobalSearch] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const location = useLocation()
  
  const debouncedSearch = useDebounce(globalSearch, 300)

  const { data: searchResults, isLoading: isSearchLoading } = useQuery({
    queryKey: ['global-search', debouncedSearch],
    queryFn: () => api.getProducts({ search: debouncedSearch, limit: '5' }),
    enabled: debouncedSearch.length > 1
  })

  const { data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: api.getCart
  })

  const { data: settingsData } = useQuery({
    queryKey: ['public-settings'],
    queryFn: api.getPublicSettings
  })
  
  const settings = settingsData?.data;
  const showBanner = settings?.enablePromotions && settings?.promoBannerText;


  const cartItems = cartData?.data?.items || cartData?.items || []
  const cartItemsCount = cartItems.reduce((acc: number, item: any) => acc + (item.quantity || item.qty || 1), 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isHomePage = location.pathname === '/'
  const textColor = isHomePage && !isScrolled ? 'text-soft-cream' : 'text-regal-navy'

  const navClass = `fixed left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 transition-all duration-500 ${
    isScrolled ? 'bg-white/95 shadow-sm backdrop-blur-md py-4' : 'bg-transparent py-6'
  } ${showBanner ? 'top-8' : 'top-0'}`

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream font-body-md text-regal-navy">
      {/* Promotional Banner */}
      {showBanner && (
        <div className="bg-metallic-gold text-regal-navy text-center py-2 px-4 font-label-md text-xs font-bold tracking-widest fixed top-0 left-0 w-full z-[60] shadow-sm">
          {settings.promoBannerText}
        </div>
      )}

      {/* TopNavBar */}
      <nav className={navClass} id="navbar">
        <div className="flex items-center gap-8">
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={`material-symbols-outlined transition-colors duration-300 ${textColor} hover:text-metallic-gold`}
            >
              menu
            </button>
          </div>
          <Link to="/" className="flex items-center">
            <img src="/logo.jpg" alt="Roymall Scents" className="h-10 md:h-14 object-contain drop-shadow-md" />
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/shop" className={`nav-item relative text-label-md font-label-md transition-colors duration-300 ${location.pathname === '/shop' ? 'text-metallic-gold font-bold border-b-2 border-metallic-gold pb-1' : `${textColor} hover:text-metallic-gold`}`}>Shop</Link>
            <Link to="/new-arrivals" className={`nav-item relative text-label-md font-label-md transition-colors duration-300 ${location.pathname === '/new-arrivals' ? 'text-metallic-gold font-bold border-b-2 border-metallic-gold pb-1' : `${textColor} hover:text-metallic-gold`}`}>New Arrivals</Link>
            <Link to="/shop" className={`nav-item relative text-label-md font-label-md transition-colors duration-300 ${textColor} hover:text-metallic-gold`}>Men</Link>
            <Link to="/shop" className={`nav-item relative text-label-md font-label-md transition-colors duration-300 ${textColor} hover:text-metallic-gold`}>Women</Link>
            <Link to="/gifts" className={`nav-item relative text-label-md font-label-md transition-colors duration-300 ${location.pathname === '/gifts' ? 'text-metallic-gold font-bold border-b-2 border-metallic-gold pb-1' : `${textColor} hover:text-metallic-gold`}`}>Gift Sets</Link>
            <Link to="/fragrance-guide" className={`nav-item relative text-label-md font-label-md transition-colors duration-300 ${location.pathname === '/fragrance-guide' ? 'text-metallic-gold font-bold border-b-2 border-metallic-gold pb-1' : `${textColor} hover:text-metallic-gold`}`}>Fragrance Guide</Link>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (globalSearch) {
                window.location.href = `/shop?search=${encodeURIComponent(globalSearch)}`;
              }
            }}
            className="hidden lg:flex items-center border-b border-current pb-1 opacity-70 hover:opacity-100 transition-opacity focus-within:opacity-100 relative"
          >
            <input 
              name="search"
              type="text" 
              placeholder="Search..." 
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              className={`bg-transparent outline-none w-24 focus:w-40 transition-all duration-300 font-label-md text-[13px] ${textColor} placeholder:text-current`}
              autoComplete="off"
            />
            <button type="submit" className={`material-symbols-outlined text-[18px] ${textColor}`}>search</button>
            
            {/* Autocomplete Dropdown */}
            {searchFocused && debouncedSearch.length > 1 && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded z-[100] max-h-96 overflow-y-auto">
                {isSearchLoading ? (
                  <div className="p-4 text-center text-gray-500 font-body-md text-sm">Searching...</div>
                ) : searchResults?.data?.length > 0 || (Array.isArray(searchResults) && searchResults.length > 0) ? (
                  <div className="py-2">
                    {(Array.isArray(searchResults) ? searchResults : searchResults.data).slice(0,5).map((product: any) => (
                      <a 
                        key={product.id} 
                        href={`/product/${product.id}`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gray-100 flex-shrink-0">
                          <img 
                            src={product.images?.find((img:any)=>img.isPrimary)?.url || product.images?.[0]?.url || product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-regal-navy truncate">{product.name}</p>
                          <p className="text-xs text-metallic-gold">₦{(product.price || 0).toLocaleString()}</p>
                        </div>
                      </a>
                    ))}
                    <a href={`/shop?search=${encodeURIComponent(globalSearch)}`} className="block w-full text-center py-2 text-xs font-bold text-metallic-gold uppercase tracking-widest hover:bg-gray-50 border-t border-gray-100">
                      View All Results
                    </a>
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500 font-body-md text-sm">No products found.</div>
                )}
              </div>
            )}
          </form>
          
          <button 
            onClick={() => {
              const token = localStorage.getItem('token')
              const role = localStorage.getItem('role')
              if (token) {
                window.location.href = role === 'ADMIN' ? '/admin' : '/account'
              } else {
                window.location.href = '/signin'
              }
            }}
            className={`material-symbols-outlined transition-colors duration-300 ${textColor} hover:text-metallic-gold cursor-pointer`}
          >
            person
          </button>

          <Link to="/cart" className={`material-symbols-outlined transition-colors duration-300 relative ${textColor} hover:text-metallic-gold flex items-center justify-center`}>
            shopping_bag
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-metallic-gold text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full font-sans">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden bg-white overflow-y-auto">
          <div className="p-6 flex justify-between items-center border-b border-muted-gold/10">
            <img src="/logo.jpg" alt="Roymall Scents" className="h-10 object-contain" />
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="material-symbols-outlined text-regal-navy hover:text-metallic-gold transition-colors text-3xl"
            >
              close
            </button>
          </div>
          <div className="flex flex-col p-6 space-y-6">
            <Link to="/shop" className="text-2xl font-headline-md text-regal-navy hover:text-metallic-gold transition-colors">Shop All</Link>
            <Link to="/new-arrivals" className="text-2xl font-headline-md text-regal-navy hover:text-metallic-gold transition-colors">New Arrivals</Link>
            <Link to="/shop" className="text-2xl font-headline-md text-regal-navy hover:text-metallic-gold transition-colors">Men's Fragrances</Link>
            <Link to="/shop" className="text-2xl font-headline-md text-regal-navy hover:text-metallic-gold transition-colors">Women's Fragrances</Link>
            <Link to="/gifts" className="text-2xl font-headline-md text-regal-navy hover:text-metallic-gold transition-colors">Gift Sets</Link>
            <Link to="/fragrance-guide" className="text-2xl font-headline-md text-regal-navy hover:text-metallic-gold transition-colors">Fragrance Guide</Link>
            
            <div className="pt-8 mt-4 border-t border-muted-gold/10">
              <Link to="/account" className="flex items-center gap-3 text-lg font-label-md text-regal-navy hover:text-metallic-gold transition-colors">
                <span className="material-symbols-outlined">person</span>
                My Account
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full py-16 px-6 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 bg-regal-navy">
        <div>
          <div className="mb-8">
            <img src="/logo.jpg" alt="Roymall Scents" className="h-20 object-contain" />
          </div>
          <p className="text-soft-cream/80 text-body-md font-body-md mb-8">A perfect perfume for every mood</p>
          <div className="flex gap-4">
            <a className="w-10 h-10 border border-soft-cream/20 flex items-center justify-center hover:border-metallic-gold text-soft-cream transition-colors" href="#">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
            </a>
            <a className="w-10 h-10 border border-soft-cream/20 flex items-center justify-center hover:border-metallic-gold text-soft-cream transition-colors" href="#">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-metallic-gold font-label-md text-label-md mb-8 uppercase">Explore</h4>
          <ul className="space-y-4">
            <li><Link to="/fragrance-guide" className="text-soft-cream/80 hover:text-metallic-gold transition-colors font-body-md">Fragrance Guide</Link></li>
            <li><Link to="/new-arrivals" className="text-soft-cream/80 hover:text-metallic-gold transition-colors font-body-md">New Arrivals</Link></li>
            <li><Link to="/best-sellers" className="text-soft-cream/80 hover:text-metallic-gold transition-colors font-body-md">Best Sellers</Link></li>
            <li><Link to="/gifts" className="text-soft-cream/80 hover:text-metallic-gold transition-colors font-body-md">Gifts &amp; Sets</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-metallic-gold font-label-md text-label-md mb-8 uppercase">Support</h4>
          <ul className="space-y-4">
            <li><Link to="/shipping-returns" className="text-soft-cream/80 hover:text-metallic-gold transition-colors font-body-md">Shipping & Returns</Link></li>
            <li><Link to="/" className="text-soft-cream/80 hover:text-metallic-gold transition-colors font-body-md">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="text-soft-cream/80 hover:text-metallic-gold transition-colors font-body-md">Terms of Service</Link></li>
            <li><Link to="/contact" className="text-soft-cream/80 hover:text-metallic-gold transition-colors font-body-md">Contact Us</Link></li>
            <li><Link to="/faq" className="text-soft-cream/80 hover:text-metallic-gold transition-colors font-body-md">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-metallic-gold font-label-md text-label-md mb-8 uppercase">Visit Us</h4>
          <p className="text-soft-cream/80 font-body-md mb-4">Gwarimpa,<br/>Abuja</p>
          <p className="text-soft-cream/80 font-body-md">T: +2348136563976</p>
          <p className="text-soft-cream/80 font-body-md">E: roymallscents@gmail.com</p>
        </div>
        <div className="md:col-span-4 pt-12 mt-12 border-t border-soft-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-soft-cream/50 font-label-md text-label-md">© {new Date().getFullYear()} Roymall Scents. All Rights Reserved.</p>
          <div className="flex gap-8">
            <img className="h-6 opacity-30" alt="Payment Methods" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBznJ4INhf9x0TdvK7ahPhvkEeigK8qR7Zrje-bnpPdjx-PshILYCVVFLWAZgLHFehAhSRzdphXNs1tzlrscxwDratsnGt7znStwZ7hmb7MxQXC7cK7An2WqUru1KXRxIIwQT-TgKx_84mywe836YRvFSQZPmNF5dEa1nI4Dcd4uIS7i8lmurDKGYkYBsW9tCR3G9FPYTJcZGbjgDK2r1B_k_oSxaw4mc3Qx5tQ7w60VaWsYUh46IBA"/>
          </div>
        </div>
      </footer>
      <WhatsAppWidget />
    </div>
  )
}
