import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'

export const Route = createFileRoute('/_storefront/shop')({
  component: Shop,
})

function Shop() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts
  })

  return (
    <main className="pt-32 pb-[120px] px-[64px] max-w-[1440px] mx-auto">
      {/* Page Header */}
      <div className="mb-12">
        <h2 className="text-display-lg font-display-lg text-regal-navy mb-4">Our Fragrance Library</h2>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">Discover an olfactory journey curated with the world's most prestigious essences. From the depths of oriental spices to the freshness of Mediterranean blooms.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-[32px]">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-10">
            {/* Categories */}
            <div>
              <h3 className="text-label-md font-label-md text-regal-navy uppercase tracking-widest mb-6 pb-2 border-b border-muted-gold/20">Categories</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <input className="w-4 h-4 border-muted-gold text-regal-navy focus:ring-regal-navy accent-regal-navy" id="cat-edp" type="checkbox"/>
                  <label className="text-body-md font-body-md text-on-surface-variant cursor-pointer hover:text-regal-navy" htmlFor="cat-edp">Eau de Parfum</label>
                </li>
                <li className="flex items-center gap-3">
                  <input className="w-4 h-4 border-muted-gold text-regal-navy focus:ring-regal-navy accent-regal-navy" id="cat-edt" type="checkbox"/>
                  <label className="text-body-md font-body-md text-on-surface-variant cursor-pointer hover:text-regal-navy" htmlFor="cat-edt">Eau de Toilette</label>
                </li>
                <li className="flex items-center gap-3">
                  <input className="w-4 h-4 border-muted-gold text-regal-navy focus:ring-regal-navy accent-regal-navy" id="cat-ext" type="checkbox"/>
                  <label className="text-body-md font-body-md text-on-surface-variant cursor-pointer hover:text-regal-navy" htmlFor="cat-ext">Extrait de Parfum</label>
                </li>
              </ul>
            </div>

            {/* Brands */}
            <div>
              <h3 className="text-label-md font-label-md text-regal-navy uppercase tracking-widest mb-6 pb-2 border-b border-muted-gold/20">Premier Brands</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {['Rasasi', 'Armaf', 'Afnan', 'Dior', 'Gucci'].map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-4 h-4 border-muted-gold text-regal-navy focus:ring-regal-navy accent-regal-navy" type="checkbox"/>
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
                {['Woody', 'Oud', 'Floral', 'Citrus'].map(scent => (
                  <button key={scent} className="px-3 py-1 border border-muted-gold/30 text-xs font-label-md uppercase tracking-wider text-regal-navy hover:bg-regal-navy hover:text-soft-cream transition-all">{scent}</button>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px]">
              {products.map((product) => (
                <Link to="/product/$id" params={{ id: product.id }} key={product.id} className="group cursor-pointer block">
                  <div className="relative bg-white aspect-square overflow-hidden mb-6 flex items-center justify-center p-8 border border-muted-gold/10">
                    <img className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" alt={product.name} src={product.image}/>
                    {/* Hover Overlay */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-regal-navy/10 flex items-center justify-center gap-3">
                      <button className="bg-regal-navy text-on-primary px-6 py-3 text-label-md font-label-md uppercase tracking-widest hover:bg-metallic-gold transition-colors duration-300">Quick View</button>
                      <button className="bg-metallic-gold text-on-primary p-3 hover:bg-regal-navy transition-colors duration-300 flex items-center justify-center">
                        <span className="material-symbols-outlined">shopping_bag</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest mb-1">{product.brand}</p>
                    <h4 className="text-headline-md font-headline-md text-regal-navy mb-2">{product.name}</h4>
                    <p className="text-price-lg font-price-lg text-metallic-gold">₦{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 flex justify-center items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center border border-muted-gold/20 text-regal-navy hover:bg-regal-navy hover:text-soft-cream transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-regal-navy text-on-primary font-label-md">1</button>
            <button className="w-10 h-10 flex items-center justify-center border border-muted-gold/20 text-regal-navy hover:bg-regal-navy hover:text-soft-cream transition-all font-label-md">2</button>
            <button className="w-10 h-10 flex items-center justify-center border border-muted-gold/20 text-regal-navy hover:bg-regal-navy hover:text-soft-cream transition-all font-label-md">3</button>
            <span className="text-muted-gold">...</span>
            <button className="w-10 h-10 flex items-center justify-center border border-muted-gold/20 text-regal-navy hover:bg-regal-navy hover:text-soft-cream transition-all font-label-md">12</button>
            <button className="w-10 h-10 flex items-center justify-center border border-muted-gold/20 text-regal-navy hover:bg-regal-navy hover:text-soft-cream transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
