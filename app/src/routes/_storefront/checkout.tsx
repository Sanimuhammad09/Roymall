import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState, FormEvent } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'

export const Route = createFileRoute('/_storefront/checkout')({
  component: Checkout,
})

function Checkout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: 'Nigeria',
    zipCode: '',
  })

  // Fetch cart to get items and subtotal
  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => api.getCart()
  })

  const cartItems = cartData?.data?.items || []
  const subtotal = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0)
  const shippingCost = cartItems.length > 0 ? 5000 : 0
  const tax = 0
  const total = subtotal + shippingCost + tax

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      // Create the order
      const order = await api.createOrder(orderData)
      // Clear the cart
      await api.clearCart()
      return order
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      
      const orderNumber = data?.data?.orderNumber || data?.orderNumber || 'PENDING'
      // Navigate to success
      navigate({ to: '/order-success', search: { orderNumber } })
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      alert("Your cart is empty.")
      return
    }

    const orderData = {
      items: cartItems.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: formData,
      subtotal,
      tax,
      shippingCost,
      total
    }

    createOrderMutation.mutate(orderData)
  }

  if (isCartLoading) {
    return <div className="pt-32 pb-20 text-center font-label-md text-regal-navy">Loading secure checkout...</div>
  }

  if (cartItems.length === 0 && !createOrderMutation.isSuccess) {
    return (
      <main className="pt-32 pb-[120px] px-6 max-w-[1440px] mx-auto min-h-[60vh] flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-muted-gold mb-6">shopping_bag</span>
        <h2 className="font-headline-lg text-headline-lg text-regal-navy mb-4">Your bag is empty</h2>
        <Link to="/shop" className="bg-regal-navy text-metallic-gold px-8 py-4 font-label-md uppercase tracking-widest hover:bg-metallic-gold hover:text-regal-navy transition-colors">
          Continue Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-[120px] px-[64px] max-w-[1440px] mx-auto">
      <div className="mb-12">
        <h2 className="text-display-sm font-display-sm text-regal-navy mb-2">Secure Checkout</h2>
        <p className="text-body-lg font-body-lg text-on-surface-variant">Please enter your details to complete your order.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[64px]">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-10">
            
            {/* Contact Information */}
            <section>
              <h3 className="font-headline-md text-headline-md text-regal-navy mb-6 pb-2 border-b border-muted-gold/20">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors" placeholder="your@email.com"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors" placeholder="+234 ..."/>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h3 className="font-headline-md text-headline-md text-regal-navy mb-6 pb-2 border-b border-muted-gold/20">Shipping Address</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">First Name *</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">Last Name *</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors"/>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">Street Address *</label>
                <input required type="text" name="street" value={formData.street} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors" placeholder="House number and street name"/>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">City *</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">ZIP / Postal Code</label>
                  <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors"/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">State / Province *</label>
                  <input required type="text" name="state" value={formData.state} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">Country</label>
                  <select name="country" value={formData.country} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors">
                    <option value="Nigeria">Nigeria</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </section>
            
            {/* Payment Method */}
            <section>
              <h3 className="font-headline-md text-headline-md text-regal-navy mb-6 pb-2 border-b border-muted-gold/20">Payment</h3>
              <div className="border border-regal-navy p-6 bg-regal-navy/5 flex items-center gap-4">
                <input type="radio" checked readOnly className="w-5 h-5 accent-regal-navy"/>
                <div>
                  <h4 className="font-label-md font-bold text-regal-navy">Standard Checkout</h4>
                  <p className="text-sm text-gray-600 mt-1">Your order will be processed and you will be contacted for payment.</p>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-soft-cream p-8 sticky top-32 border border-muted-gold/20">
            <h3 className="font-headline-md text-headline-md text-regal-navy mb-6 pb-2 border-b border-muted-gold/20">Order Summary</h3>
            
            <div className="max-h-[40vh] overflow-y-auto mb-6 pr-2 space-y-4">
              {cartItems.map((item: any) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-20 h-20 bg-white border border-muted-gold/10 flex items-center justify-center shrink-0">
                    <img 
                      src={item.product?.images?.[0]?.url || item.image || 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=No+Image'} 
                      alt={item.product?.name || 'Product'} 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-label-md text-sm font-bold text-regal-navy line-clamp-1">{item.product?.name || item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-price-md font-bold text-regal-navy">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8 pt-6 border-t border-muted-gold/20">
              <div className="flex justify-between font-body-md text-gray-600">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-body-md text-gray-600">
                <span>Shipping</span>
                <span>₦{shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-body-md text-gray-600">
                <span>Taxes</span>
                <span>₦{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-headline-md text-xl text-regal-navy font-bold pt-4 border-t border-muted-gold/20">
                <span>Total</span>
                <span className="text-metallic-gold">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={createOrderMutation.isPending}
              className="w-full bg-regal-navy text-metallic-gold py-4 font-label-md uppercase tracking-widest hover:bg-metallic-gold hover:text-regal-navy transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {createOrderMutation.isPending ? 'Processing...' : 'Place Order'}
              {!createOrderMutation.isPending && <span className="material-symbols-outlined text-[18px]">lock</span>}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              Secure Encrypted Checkout
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}
