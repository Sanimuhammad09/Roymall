import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_storefront/order-success')({
  component: OrderSuccess,
})

function OrderSuccess() {
  const search = Route.useSearch() as { orderNumber?: string }
  const orderNumber = search.orderNumber || 'PENDING'

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="pt-32 pb-[120px] px-6 max-w-[1440px] mx-auto min-h-[70vh] flex items-center justify-center">
      <div className="bg-soft-cream border border-muted-gold/20 p-12 md:p-16 max-w-2xl w-full text-center relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-metallic-gold/30"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-metallic-gold/30"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-metallic-gold/30"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-metallic-gold/30"></div>

        <div className="w-20 h-20 bg-metallic-gold text-regal-navy rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
          <span className="material-symbols-outlined text-4xl">check</span>
        </div>
        
        <span className="font-label-md text-label-md text-muted-gold uppercase tracking-[0.2em] mb-4 block">Order Confirmed</span>
        <h1 className="font-display-sm text-display-sm text-regal-navy mb-6 text-4xl">Thank you for your purchase</h1>
        
        <p className="font-body-md text-body-lg text-on-surface-variant mb-8 max-w-lg mx-auto">
          Your order has been received and is currently being processed. You will receive an email confirmation shortly with your order details.
        </p>

        <div className="bg-white p-6 border border-gray-100 mb-10 inline-block">
          <span className="block font-label-md text-xs text-gray-400 uppercase tracking-widest mb-1">Order Number</span>
          <span className="font-headline-md text-2xl text-regal-navy font-bold">{orderNumber}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/shop" 
            className="w-full sm:w-auto border border-regal-navy text-regal-navy hover:bg-regal-navy hover:text-white px-8 py-4 font-label-md uppercase tracking-widest transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}
