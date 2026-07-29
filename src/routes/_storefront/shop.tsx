import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import type { Product } from '../../lib/api'
import { useState } from 'react'
import { SEO } from '../../components/SEO'

export const Route = createFileRoute('/_storefront/shop')({
  component: Shop,
})

function Shop() {
  const queryClient = useQueryClient()
  const searchObj: any = Route.useSearch()
  const navigate = useNavigate()
  
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedFamily, setSelectedFamily] = useState<string>('')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>(searchObj?.search || '')
  const [page, setPage] = useState<number>(1)
  const [addedToast, setAddedToast] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      api.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      setAddedToast(true)
      setTimeout(() => setAddedToast(false), 2500)
    }
  })

  const { data, isLoading } = useQuery({
    queryKey: ['products', { category: selectedCategory, olfactoryFamily: selectedFamily, brand: selectedBrand, search: searchQuery, page }],
    queryFn: () => api.getProducts({ 
      ...(selectedCategory ? { category: selectedCategory } : {}),
      ...(selectedFamily ? { olfactoryFamily: selectedFamily } : {}),
      ...(selectedBrand ? { brand: selectedBrand } : {}),
      ...(searchQuery ? { search: searchQuery } : {}),
      page,
      limit: 12
    })
  })

  // The backend might return { data: Product[], meta: ... } or just Product[]
  // We'll safely extract the array.
  const products: Product[] = Array.isArray(data) ? data : (data?.data || [])
  const meta = data?.meta || { totalPages: 1, page: 1, total: products.length }

  return (
    <>
    <SEO 
      title="Fragrance Library" 
      description="Explore our complete collection of authentic luxury, designer, and niche perfumes. Filter by category, brand, and scent profile."
      url="https://www.roymallscents.com.ng/shop"
    />
    <main className="pt-24 md:pt-32 pb-16 md:pb-32 px-4 md:px-16 max-w-[1440px] mx-auto">
      <div className="mb-8 md:mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-[64px] font-display-lg text-regal-navy mb-4">Our Fragrance Library</h2>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">Discover an olfactory journey curated with the world's most prestigious essences. From the depths of oriental spices to the freshness of Mediterranean blooms.</p>
        
        {searchQuery && (
          <div className="mt-6 flex items-center gap-4 bg-white/50 p-4 border border-muted-gold/20 inline-flex">
            <span className="text-regal-navy font-body-md">Search results for: <span className="font-bold">"{searchQuery}"</span></span>
            <button 
              onClick={() => {
                setSearchQuery('');
                setPage(1);
                navigate({ to: '/shop', search: {} });
              }}
              className="text-muted-gold hover:text-error transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden flex items-center justify-between w-full bg-white border border-muted-gold/20 p-4 text-regal-navy font-label-md uppercase tracking-widest text-sm"
        >
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined">filter_list</span>
            Filters & Sorting
          </span>
          <span className="material-symbols-outlined">{showMobileFilters ? 'expand_less' : 'expand_more'}</span>
        </button>

        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          <div className="md:sticky md:top-32 space-y-10">
            {/* Categories */}
            <div>
              <h3 className="text-label-md font-label-md text-regal-navy uppercase tracking-widest mb-6 pb-2 border-b border-muted-gold/20">Categories</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <input 
                    className="w-4 h-4 border-muted-gold text-regal-navy focus:ring-regal-navy accent-regal-navy" 
                    id="cat-all" 
                    type="radio"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => { setSelectedCategory(''); setPage(1); }}
                  />
                  <label className="text-body-md font-body-md text-on-surface-variant cursor-pointer hover:text-regal-navy" htmlFor="cat-all">All Fragrances</label>
                </li>
                {['Eau de Parfum', 'Eau de Toilette', 'Extrait de Parfum'].map((cat) => (
                  <li key={cat} className="flex items-center gap-3">
                    <input 
                      className="w-4 h-4 border-muted-gold text-regal-navy focus:ring-regal-navy accent-regal-navy" 
                      id={`cat-${cat}`} 
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => { setSelectedCategory(cat); setPage(1); }}
                    />
                    <label className="text-body-md font-body-md text-on-surface-variant cursor-pointer hover:text-regal-navy" htmlFor={`cat-${cat}`}>{cat}</label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div>
              <h3 className="text-label-md font-label-md text-regal-navy uppercase tracking-widest mb-6 pb-2 border-b border-muted-gold/20">Premier Brands</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {['Rasasi', 'Armaf', 'Afnan', 'Dior', 'Gucci'].map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      className="w-4 h-4 border-muted-gold text-regal-navy focus:ring-regal-navy accent-regal-navy" 
                      type="radio"
                      name="brand"
                      checked={selectedBrand === brand}
                      onChange={() => { setSelectedBrand(selectedBrand === brand ? '' : brand); setPage(1); }}
                      onClick={() => { if(selectedBrand === brand) { setSelectedBrand(''); setPage(1); } }}
                    />
                    <span className="text-body-md font-body-md text-on-surface-variant group-hover:text-regal-navy transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-label-md font-label-md text-regal-navy uppercase tracking-widest mb-6 pb-2 border-b border-muted-gold/20">Price Range</h3>
              <div className="space-y-4">
                <input className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-metallic-gold" max="1000000" min="0" type="range"/>
                <div className="flex justify-between text-label-md font-label-md text-on-surface-variant">
                  <span>₦0</span>
                  <span>₦1,000,000+</span>
                </div>
              </div>
            </div>

            {/* Scent Profile */}
            <div>
              <h3 className="text-label-md font-label-md text-regal-navy uppercase tracking-widest mb-6 pb-2 border-b border-muted-gold/20">Scent Profile</h3>
              <div className="flex flex-wrap gap-2">
                {['Woody', 'Oud', 'Floral', 'Citrus', 'Spicy', 'Aquatic'].map(scent => (
                  <button 
                    key={scent} 
                    onClick={() => { setSelectedFamily(selectedFamily === scent ? '' : scent); setPage(1); }}
                    className={`px-3 py-1 border border-muted-gold/30 text-xs font-label-md uppercase tracking-wider transition-all ${
                      selectedFamily === scent ? 'bg-regal-navy text-soft-cream' : 'text-regal-navy hover:bg-regal-navy hover:text-soft-cream'
                    }`}
                  >
                    {scent}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Sorting & View Options */}
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-muted-gold/10">
            <p className="text-body-md font-body-md text-on-surface-variant">Showing <span className="font-bold text-regal-navy">{products.length}</span> exclusive fragrances</p>
            <div className="flex items-center gap-4">
              <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Sort By:</span>
              <select className="bg-transparent border-none text-regal-navy font-bold focus:ring-0 cursor-pointer outline-none">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Popularity</option>
              </select>
            </div>
          </div>

          {isLoading ? (
             <div className="py-20 text-center font-label-md text-regal-navy">Loading collections...</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {products.map((product) => (
                <Link to="/product/$id" params={{ id: product.id }} key={product.id} className="group cursor-pointer block">
                  <div className="relative bg-white aspect-[4/5] md:aspect-square overflow-hidden mb-4 md:mb-6 flex items-center justify-center p-4 md:p-8 border border-muted-gold/10">
                    {product.discountPercentage && (
                      <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 bg-[#8B0000] text-white px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        {product.discountPercentage}% OFF
                      </div>
                    )}
                    <img className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" alt={product.name} src={product.images?.[0]?.url || 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=No+Image'}/>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-regal-navy/10 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 p-4">
                      <button className="w-full md:w-auto bg-regal-navy text-on-primary px-4 py-2 md:px-6 md:py-3 text-[10px] md:text-[12px] font-label-md uppercase tracking-widest hover:bg-metallic-gold transition-colors duration-300">Quick View</button>
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addToCartMutation.mutate({ productId: product.id, quantity: 1 })
                        }}
                        className="w-full md:w-auto bg-metallic-gold text-on-primary p-2 md:p-3 hover:bg-regal-navy transition-colors duration-300 flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[18px] md:text-[24px]">shopping_bag</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] md:text-[12px] font-label-md text-on-surface-variant uppercase tracking-widest mb-1 truncate">{product.brand}</p>
                    <h4 className="text-sm md:text-lg font-headline-md text-regal-navy mb-1 md:mb-2 truncate">{product.name}</h4>
                    <div className="flex justify-center items-center gap-1 md:gap-2">
                      <p className="text-sm md:text-lg font-price-lg font-bold text-metallic-gold">₦{product.price.toLocaleString()}</p>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <p className="text-[11px] md:text-[14px] text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {meta.totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-4">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center border border-muted-gold/20 text-regal-navy hover:bg-regal-navy hover:text-soft-cream transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              
              {Array.from({ length: meta.totalPages }).map((_, i) => {
                const pageNum = i + 1;
                if (pageNum === 1 || pageNum === meta.totalPages || (pageNum >= page - 1 && pageNum <= page + 1)) {
                  return (
                    <button 
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 flex items-center justify-center border transition-all font-label-md ${page === pageNum ? 'bg-regal-navy text-on-primary border-regal-navy' : 'border-muted-gold/20 text-regal-navy hover:bg-regal-navy hover:text-soft-cream'}`}>
                      {pageNum}
                    </button>
                  )
                } else if (pageNum === page - 2 || pageNum === page + 2) {
                  return <span key={pageNum} className="text-muted-gold">...</span>
                }
                return null;
              })}

              <button 
                onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
                className="w-10 h-10 flex items-center justify-center border border-muted-gold/20 text-regal-navy hover:bg-regal-navy hover:text-soft-cream transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>

    {/* Added to Cart Toast */}
    {addedToast && (
      <div className="fixed bottom-10 right-10 bg-regal-navy text-metallic-gold px-8 py-4 flex items-center gap-4 z-50 border border-metallic-gold shadow-2xl">
        <span className="material-symbols-outlined text-green-400">check_circle</span>
        <span className="font-label-md text-sm uppercase tracking-widest">Added to your bag</span>
      </div>
    )}
    </>
  )
}
