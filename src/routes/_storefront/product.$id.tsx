import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { useState } from 'react'

export const Route = createFileRoute('/_storefront/product/$id')({
  component: Product,
})

function Product() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id)
  })

  const [qty, setQty] = useState(1)
  const [activeAccordion, setActiveAccordion] = useState<string | null>('shipping')
  const [addedToast, setAddedToast] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.getMe(),
    retry: false
  })

  const { data: reviewsData } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => api.getProductReviews(id)
  })

  const reviews = reviewsData?.data || reviewsData || []
  const isInWishlist = profile?.data?.wishlist?.items?.some((i: any) => i.productId === id) || false

  const addToWishlistMutation = useMutation({
    mutationFn: () => api.addToWishlist(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] })
  })

  const removeFromWishlistMutation = useMutation({
    mutationFn: () => {
      const item = profile?.data?.wishlist?.items?.find((i: any) => i.productId === id)
      if (item) return api.removeFromWishlist(item.id)
      return Promise.resolve()
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] })
  })

  const submitReviewMutation = useMutation({
    mutationFn: () => api.submitReview(id, { rating: reviewRating, comment: reviewComment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', id] })
      setReviewComment('')
      setReviewRating(5)
    }
  })

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      api.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      setAddedToast(true)
      setTimeout(() => setAddedToast(false), 2500)
    }
  })

  const buyNowMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      api.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      navigate({ to: '/checkout' })
    }
  })

  if (isLoading) {
    return <div className="pt-32 pb-section-gap px-container-margin max-w-7xl mx-auto text-center font-label-md">Loading product...</div>
  }

  const prod = product?.data || product

  if (!prod || !prod.id) {
    return <div className="pt-32 pb-section-gap px-container-margin max-w-7xl mx-auto text-center font-label-md">Product not found. <Link to="/shop" className="text-metallic-gold underline">Return to Shop</Link></div>
  }

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  const primaryImage = prod.images?.find((img: any) => img.isPrimary)?.url || prod.images?.[0]?.url || prod.image

  return (
    <>
    <main className="pt-32 pb-[120px] px-[64px] max-w-7xl mx-auto">
      {/* Product Detail Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px]">
        {/* Product Gallery */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="aspect-square bg-white flex items-center justify-center overflow-hidden border border-muted-gold/10">
            {primaryImage ? (
              <img alt={prod.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" src={primaryImage}/>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-6xl">
                <span className="material-symbols-outlined text-6xl">image</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="aspect-square bg-white border border-metallic-gold p-2">
              {primaryImage ? (
                <img alt="Main view" className="w-full h-full object-contain opacity-100" src={primaryImage}/>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  <span className="material-symbols-outlined">image</span>
                </div>
              )}
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
            <span className="hover:text-regal-navy capitalize">{prod.category?.name || 'Fragrance'}</span>
          </nav>
          <h1 className="font-headline-lg text-headline-lg text-regal-navy mb-2">{prod.name}</h1>
          <p className="font-price-lg text-price-lg text-metallic-gold mb-8">₦{(prod.price || 0).toLocaleString()}</p>
          
          <div className="space-y-6 mb-10">
            <div className="p-6 bg-white border-l-4 border-metallic-gold">
              <h3 className="font-label-md text-label-md uppercase tracking-widest text-regal-navy mb-4">The Olfactory Journey</h3>
              <div className="space-y-4">
                {prod.topNotes?.length || prod.heartNotes?.length || prod.baseNotes?.length ? (
                  <>
                    <div>
                      <span className="font-label-md text-label-md text-muted-gold block">TOP NOTES</span>
                      <p className="font-body-md text-body-md text-regal-navy/80">{prod.topNotes?.join(', ') || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-muted-gold block">MIDDLE NOTES</span>
                      <p className="font-body-md text-body-md text-regal-navy/80">{prod.heartNotes?.join(', ') || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-muted-gold block">BASE NOTES</span>
                      <p className="font-body-md text-body-md text-regal-navy/80">{prod.baseNotes?.join(', ') || 'N/A'}</p>
                    </div>
                  </>
                ) : (
                  <p className="font-body-md text-body-md text-regal-navy/80">Experience the luxurious blend of {prod.category?.name?.toLowerCase() || 'fragrance'} notes perfectly crafted for elegance.</p>
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
              <button 
                onClick={() => addToCartMutation.mutate({ productId: prod.id, quantity: qty })}
                disabled={addToCartMutation.isPending}
                className="flex-1 bg-regal-navy text-metallic-gold h-14 font-label-md uppercase tracking-widest hover:bg-regal-navy/90 transition-all active:scale-95 disabled:opacity-70"
              >
                {addToCartMutation.isPending ? 'Adding...' : 'Add to Bag'}
              </button>
              <button
                onClick={() => isInWishlist ? removeFromWishlistMutation.mutate() : addToWishlistMutation.mutate()}
                disabled={addToWishlistMutation.isPending || removeFromWishlistMutation.isPending}
                className={`h-14 w-14 border border-metallic-gold text-metallic-gold flex items-center justify-center hover:bg-metallic-gold hover:text-white transition-colors disabled:opacity-50 ${isInWishlist ? 'bg-metallic-gold text-white' : 'bg-transparent'}`}
                title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <span className={`material-symbols-outlined ${isInWishlist ? 'fill-current' : ''}`}>favorite</span>
              </button>
            </div>
            <button 
              onClick={() => buyNowMutation.mutate({ productId: prod.id, quantity: qty })}
              disabled={buyNowMutation.isPending}
              className="w-full border border-metallic-gold text-metallic-gold h-14 font-label-md uppercase tracking-widest hover:bg-metallic-gold hover:text-white transition-all flex items-center justify-center disabled:opacity-70"
            >
              {buyNowMutation.isPending ? 'Processing...' : 'Buy Now'}
            </button>
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
                  100ml Eau De Parfum. {prod.name} is a sophisticated fragrance that balances fresh notes with deep, warm spices. Perfect for both daytime freshness and evening allure.
                  <br/><br/>
                  {prod.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-[120px]">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-md text-headline-md text-regal-navy mb-2">Customer Reviews</h2>
            <div className="h-1 w-20 bg-metallic-gold"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[64px]">
          <div>
            <h3 className="font-headline-sm text-regal-navy mb-6">Write a Review</h3>
            {profile?.data ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-label-md uppercase text-sm text-on-surface-variant">Rating:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setReviewRating(star)} className={`material-symbols-outlined text-2xl ${star <= reviewRating ? 'text-metallic-gold fill-current' : 'text-gray-300'}`}>
                        star
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your thoughts about this fragrance..."
                  className="w-full h-32 p-4 border border-muted-gold/30 font-body-md focus:border-regal-navy focus:outline-none bg-transparent"
                ></textarea>
                <button 
                  onClick={() => submitReviewMutation.mutate()}
                  disabled={submitReviewMutation.isPending || !reviewComment.trim()}
                  className="bg-regal-navy text-metallic-gold py-4 font-label-md uppercase tracking-widest hover:bg-regal-navy/90 transition-all disabled:opacity-50"
                >
                  {submitReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            ) : (
              <p className="font-body-md text-regal-navy/70 border border-muted-gold/20 p-6">Please <Link to="/signin" className="text-metallic-gold underline">log in</Link> to leave a review.</p>
            )}
          </div>

          <div>
            <h3 className="font-headline-sm text-regal-navy mb-6">Recent Reviews</h3>
            <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-4">
              {reviews.length > 0 ? reviews.map((review: any) => (
                <div key={review.id} className="border-b border-muted-gold/20 pb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-label-md uppercase tracking-widest text-regal-navy text-sm">
                      {review.user?.firstName} {review.user?.lastName?.charAt(0)}.
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`material-symbols-outlined text-sm ${i < review.rating ? 'text-metallic-gold fill-current' : 'text-gray-300'}`}>star</span>
                      ))}
                    </div>
                  </div>
                  <p className="font-body-md text-regal-navy/80">{review.comment}</p>
                </div>
              )) : (
                <p className="font-body-md text-regal-navy/50 italic">No reviews yet. Be the first to review this fragrance!</p>
              )}
            </div>
          </div>
        </div>
      </section>

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
