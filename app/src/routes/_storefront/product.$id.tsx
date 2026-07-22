import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { useState } from 'react'

export const Route = createFileRoute('/_storefront/product/$id')({
  component: Product,
})

function Product() {
  const { id } = Route.useParams()
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id)
  })

  const [qty, setQty] = useState(1)
  const [activeAccordion, setActiveAccordion] = useState<string | null>('shipping')

  if (isLoading) {
    return <div className="pt-32 pb-section-gap px-container-margin max-w-7xl mx-auto text-center font-label-md">Loading product...</div>
  }

  if (!product) {
    return <div className="pt-32 pb-section-gap px-container-margin max-w-7xl mx-auto text-center font-label-md">Product not found. <Link to="/shop" className="text-metallic-gold underline">Return to Shop</Link></div>
  }

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  return (
    <main className="pt-32 pb-[120px] px-[64px] max-w-7xl mx-auto">
      {/* Product Detail Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px]">
        {/* Product Gallery */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="aspect-square bg-white flex items-center justify-center overflow-hidden border border-muted-gold/10">
            <img alt={product.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" src={product.image}/>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="aspect-square bg-white border border-metallic-gold p-2">
              <img alt="Main view" className="w-full h-full object-contain opacity-100" src={product.image}/>
            </div>
            <div className="aspect-square bg-white border border-muted-gold/10 p-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              <div className="w-full h-full bg-soft-cream flex items-center justify-center">
                <span className="material-symbols-outlined text-muted-gold">photo_camera</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="md:col-span-5 flex flex-col">
          <nav aria-label="Breadcrumb" className="flex text-label-md font-label-md text-muted-gold mb-4">
            <Link className="hover:text-regal-navy" to="/shop">Shop</Link>
            <span className="mx-2">/</span>
            <span className="hover:text-regal-navy capitalize">{product.category} Fragrance</span>
          </nav>
          <h1 className="font-headline-lg text-headline-lg text-regal-navy mb-2">{product.name}</h1>
          <p className="font-price-lg text-price-lg text-metallic-gold mb-8">₦{product.price.toLocaleString()}</p>
          
          <div className="space-y-6 mb-10">
            <div className="p-6 bg-white border-l-4 border-metallic-gold">
              <h3 className="font-label-md text-label-md uppercase tracking-widest text-regal-navy mb-4">The Olfactory Journey</h3>
              <div className="space-y-4">
                {product.notes ? (
                  <>
                    <div>
                      <span className="font-label-md text-label-md text-muted-gold block">TOP NOTES</span>
                      <p className="font-body-md text-body-md text-regal-navy/80">{product.notes.top}</p>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-muted-gold block">MIDDLE NOTES</span>
                      <p className="font-body-md text-body-md text-regal-navy/80">{product.notes.heart}</p>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-muted-gold block">BASE NOTES</span>
                      <p className="font-body-md text-body-md text-regal-navy/80">{product.notes.base}</p>
                    </div>
                  </>
                ) : (
                  <p className="font-body-md text-body-md text-regal-navy/80">Experience the luxurious blend of {product.category.toLowerCase()} notes perfectly crafted for elegance.</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-regal-navy/20 h-14 px-4 bg-white">
                <button className="p-2 hover:text-metallic-gold transition-colors" onClick={() => qty > 1 && setQty(qty - 1)}>
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="w-12 text-center font-label-md" id="quantity">{qty}</span>
                <button className="p-2 hover:text-metallic-gold transition-colors" onClick={() => setQty(qty + 1)}>
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              <button className="flex-1 bg-regal-navy text-metallic-gold h-14 font-label-md uppercase tracking-widest hover:bg-regal-navy/90 transition-all active:scale-95">
                Add to Bag
              </button>
            </div>
            <Link to="/checkout" className="w-full border border-metallic-gold text-metallic-gold h-14 font-label-md uppercase tracking-widest hover:bg-metallic-gold hover:text-white transition-all flex items-center justify-center">
              Buy Now
            </Link>
          </div>

          {/* Info Accordions */}
          <div className="border-t border-muted-gold/20">
            <div className={`border-b border-muted-gold/20 overflow-hidden transition-all duration-300`}>
              <button className="w-full flex justify-between items-center py-5 text-left group" onClick={() => toggleAccordion('shipping')}>
                <span className="font-label-md text-label-md uppercase tracking-widest">Shipping &amp; Returns</span>
                <span className={`material-symbols-outlined transition-transform text-muted-gold ${activeAccordion === 'shipping' ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`transition-all duration-300 ease-out overflow-hidden ${activeAccordion === 'shipping' ? 'max-h-40' : 'max-h-0'}`}>
                <p className="font-body-md text-body-md text-regal-navy/70 pb-6">
                  Complimentary standard shipping on all orders over ₦150,000. Returns are accepted within 7 days of delivery if the item is in its original, sealed packaging.
                </p>
              </div>
            </div>
            <div className={`border-b border-muted-gold/20 overflow-hidden transition-all duration-300`}>
              <button className="w-full flex justify-between items-center py-5 text-left group" onClick={() => toggleAccordion('details')}>
                <span className="font-label-md text-label-md uppercase tracking-widest">Product Details</span>
                <span className={`material-symbols-outlined transition-transform text-muted-gold ${activeAccordion === 'details' ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`transition-all duration-300 ease-out overflow-hidden ${activeAccordion === 'details' ? 'max-h-40' : 'max-h-0'}`}>
                <p className="font-body-md text-body-md text-regal-navy/70 pb-6">
                  100ml Eau De Parfum. {product.name} is a sophisticated fragrance that balances fresh notes with deep, warm spices. Perfect for both daytime freshness and evening allure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-sell Section */}
      <section className="mt-[120px]">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-md text-headline-md text-regal-navy mb-2">You May Also Like</h2>
            <div className="h-1 w-20 bg-metallic-gold"></div>
          </div>
          <Link to="/shop" className="font-label-md text-label-md text-muted-gold hover:text-regal-navy transition-colors border-b border-muted-gold">View Collection</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[32px]">
          {/* Static cross-sells for layout consistency with design */}
          <Link to="/shop" className="group cursor-pointer block">
            <div className="bg-white aspect-[4/5] overflow-hidden mb-4 relative">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Amouage Reflection Man" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHkB2HRBXUWiIKdMTDIdq0udHunLB-F6rGkrDd-1pVeBvwMq00Qc3OKssN_Euxcn1MFkx1_-OWtc8j9ez0hfh8PoWacQ7_9eGXwBamiVHUsWWOhKEd9-frRcurKxmdv7oJQem_PAK6hPbbgwG1NX8-ERtYqZ47Ix7_o0iS10SIXcOvZ-GdLLkb-5jpRLN-8djAudOGCt_bgvKSd9tILldOn_jXoNswimXncLj_CpvBMzUVp84s9oX_"/>
              <div className="absolute bottom-4 left-4 right-4 bg-regal-navy/90 py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                <span className="text-white font-label-md text-label-md uppercase">Quick Add</span>
              </div>
            </div>
            <h3 className="font-headline-md text-body-lg font-semibold text-regal-navy">Amouage Reflection Man</h3>
            <p className="font-price-lg text-body-md text-metallic-gold">₦145,000.00</p>
          </Link>

          <Link to="/shop" className="group cursor-pointer block">
            <div className="bg-white aspect-[4/5] overflow-hidden mb-4 relative">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Parfums de Marly Layton" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNnotBD2BlLLg4xnnprcbE6qxzLSqYmz5zbTWbcXe7gaZCXZLSvR5n4L4A8PyCfI3Zjw2jujpsCNjM_X758cPiyMegVd41NXxMVLmwATHSjWECtQZhEwX8RoHUdc4Qt5ULSJwJjilymIhprNKZXwkdElJhUn9JApv3ABXsz3qdoBhTYtIoOATU2jm_CGI8H34exnGlCbgt0yGE27Qk5ZKdbRmHQgySlQz-Lqgen_UPD2ITvj7v_Mh_"/>
              <div className="absolute bottom-4 left-4 right-4 bg-regal-navy/90 py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                <span className="text-white font-label-md text-label-md uppercase">Quick Add</span>
              </div>
            </div>
            <h3 className="font-headline-md text-body-lg font-semibold text-regal-navy">Parfums de Marly Layton</h3>
            <p className="font-price-lg text-body-md text-metallic-gold">₦120,000.00</p>
          </Link>

          <Link to="/shop" className="group cursor-pointer block">
            <div className="bg-white aspect-[4/5] overflow-hidden mb-4 relative">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Xerjoff Naxos" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpgBGGX6W63V1HFMg5haOi461Zw3I_-Lu1KB6qUeWmuZc_Jbq7fa_4_yF2ECBR8OIMO6AtHkGr_Eg-a7hni53PsEAYM4LULT_swJmL8KGEt6P4-R91LZgzAj-wIqSl2N5y3N_xc_2KnSon-2Vn-RBcRW-_qkK9EY37Xm7skqAd7hUhaDush4rfqaMOfvjt0toPQMOlXsLBQzXG8ms-HqVkUaFqTUyAjZjQNxFKCAHVMa-FgVINlgTX"/>
              <div className="absolute bottom-4 left-4 right-4 bg-regal-navy/90 py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                <span className="text-white font-label-md text-label-md uppercase">Quick Add</span>
              </div>
            </div>
            <h3 className="font-headline-md text-body-lg font-semibold text-regal-navy">Xerjoff Naxos</h3>
            <p className="font-price-lg text-body-md text-metallic-gold">₦185,000.00</p>
          </Link>

          <Link to="/shop" className="group cursor-pointer block">
            <div className="bg-white aspect-[4/5] overflow-hidden mb-4 relative">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Creed Aventus" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp2iRcdvfBDaM530duhfFGm6_vpPHXkk1oPQLVI7RhpRE2rYlH4z17EhFJbc58h57ObP4WJFliq38e-485vrZMsTQsrbOSpcQMpCHghUvBathKMtUdXpsRPbuGsImBZN4yLUW5llICqZ5WBG091cx350isDeojHVUGUKD129tXhseRY4F8lr-TVXsnNDJJARd5aGk9LmZIlB7gjYNWKj11iaESLj5laYwE9chSMojO0024S6atye_G"/>
              <div className="absolute bottom-4 left-4 right-4 bg-regal-navy/90 py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                <span className="text-white font-label-md text-label-md uppercase">Quick Add</span>
              </div>
            </div>
            <h3 className="font-headline-md text-body-lg font-semibold text-regal-navy">Creed Aventus</h3>
            <p className="font-price-lg text-body-md text-metallic-gold">₦220,000.00</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
