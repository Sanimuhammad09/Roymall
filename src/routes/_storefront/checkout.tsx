import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usePaystackPayment } from 'react-paystack'
import { api } from '../../lib/api'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/_storefront/checkout')({
  component: Checkout,
})

function Checkout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user, login } = useAuth()
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    password: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: 'Nigeria',
    zipCode: '',
    saveAddress: true,
  })
  const [paymentMethod, setPaymentMethod] = useState<'PAYSTACK' | 'BANK_TRANSFER'>('PAYSTACK')
  const [shippingMethod, setShippingMethod] = useState<'STANDARD' | 'FASTEST'>('STANDARD')

  // Fetch cart to get items and subtotal
  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => api.getCart()
  })

  const cartItems = cartData?.data?.items || []
  const subtotal = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0)
  const shippingCost = cartItems.length > 0 ? (shippingMethod === 'FASTEST' ? 5000 : 0) : 0
  const tax = 0
  const total = subtotal + shippingCost + tax

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const order = await api.createOrder(orderData)
      try {
        await api.clearCart()
      } catch (err) {
        console.error('Order created but cart could not be cleared', err)
      }
      return order
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      
      const orderNumber = data?.data?.orderNumber || data?.orderNumber || 'PENDING'
      navigate({ to: '/order-success', search: { orderNumber } })
    },
    onError: (error: Error) => {
      alert(error.message || 'Could not place your order. Please try again.')
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
    
    const proceedWithOrder = () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token && formData.saveAddress) {
        api.addAddress({
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          isDefault: false
        }).catch(err => console.error("Could not save address", err))
      }

      // Only send address fields — never password / saveAddress (API rejects unknown top-level props; avoid storing secrets)
      const shippingAddress = {
        firstName: formData.firstName || user?.firstName || '',
        lastName: formData.lastName || user?.lastName || '',
        email: formData.email || user?.email || '',
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode,
      }

      const orderData = {
        items: cartItems.map((item: any) => ({
          productId: item.productId || item.product?.id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress,
        subtotal,
        tax,
        shippingMethod,
        shippingCost,
        total,
        paymentMethod,
        paymentReference: '',
      }

      if (paymentMethod === 'PAYSTACK') {
        if (!paystackConfig.publicKey) {
          alert("Paystack Public Key is missing. Please configure VITE_PAYSTACK_PUBLIC_KEY in your .env file or choose Bank Transfer.")
          return
        }
        initializePayment({
          onSuccess: (reference: any) => {
            orderData.paymentReference = reference.reference
            createOrderMutation.mutate(orderData)
          },
          onClose: () => {
            alert("Payment was not completed. Please try again.")
          }
        });
      } else {
        orderData.paymentReference = 'BANK_TRANSFER_' + Date.now()
        createOrderMutation.mutate(orderData)
      }
    }

    if (!user) {
      if (!formData.password) {
        alert("Please enter a password to create your account and proceed with your order.")
        return
      }
      // Register the guest user
      api.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      })
      .then(() => {
        // Automatically login — JWT attaches the order to the user (do not send userId in body; API rejects it)
        api.login({ email: formData.email, password: formData.password })
          .then(loginRes => {
             const token = loginRes.data?.access_token || loginRes.access_token
             const userData = loginRes.data?.user || loginRes.user
             login(token, userData)
             proceedWithOrder()
          })
          .catch(err => {
             console.error(err)
             alert("Account created but failed to log in automatically. Proceeding as guest.")
             proceedWithOrder()
          })
      })
      .catch(err => {
         console.error(err)
         alert("Could not register account. You might already have an account with this email.")
      })
    } else {
      proceedWithOrder()
    }
  }

  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: formData.email || 'customer@example.com',
    amount: total * 100, // Paystack uses Kobo (kobo = NGN * 100)
    publicKey: typeof window !== 'undefined' ? (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '') : '', 
  };
  const initializePayment = usePaystackPayment(paystackConfig);

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
            
            {/* Account / Contact Information */}
            <section>
              <h3 className="font-headline-md text-headline-md text-regal-navy mb-6 pb-2 border-b border-muted-gold/20">Account Information</h3>
              {!user && (
                <div className="mb-6 p-4 bg-muted-gold/10 border border-muted-gold/30 flex justify-between items-center">
                  <p className="text-sm font-body-md text-regal-navy">Creating an account is required to place an order.</p>
                  <Link to="/signin" className="text-sm font-label-md font-bold underline text-regal-navy">Already have an account? Log in</Link>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {!user && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">First Name *</label>
                      <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors" placeholder="First Name"/>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">Last Name *</label>
                      <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors" placeholder="Last Name"/>
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} disabled={!!user} className={`border border-muted-gold/30 p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors ${user ? 'bg-gray-100 cursor-not-allowed' : 'bg-transparent'}`} placeholder="your@email.com"/>
                </div>

                {!user && (
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">Create Password *</label>
                    <input required type="password" name="password" value={formData.password} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors" placeholder="••••••••"/>
                  </div>
                )}
                
                <div className={`flex flex-col gap-2 ${!user ? 'md:col-span-2' : ''}`}>
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors" placeholder="+234 ..."/>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h3 className="font-headline-md text-headline-md text-regal-navy mb-6 pb-2 border-b border-muted-gold/20">Shipping Address</h3>
              
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase text-xs">Street Address *</label>
                  <input required type="text" name="street" value={formData.street} onChange={handleChange} className="border border-muted-gold/30 bg-transparent p-4 font-body-md focus:border-regal-navy focus:outline-none transition-colors" placeholder="House number and street name"/>
                </div>
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

              <div className="flex items-center gap-3 mt-6">
                <input 
                  type="checkbox" 
                  name="saveAddress" 
                  checked={formData.saveAddress} 
                  onChange={(e) => setFormData(prev => ({ ...prev, saveAddress: e.target.checked }))} 
                  className="w-4 h-4 text-regal-navy focus:ring-0 rounded-none border-gray-300"
                  id="save-address"
                />
                <label className="font-body-md text-body-md text-on-surface-variant text-sm cursor-pointer" htmlFor="save-address">Save this address to my profile for future orders</label>
              </div>
            </section>
            
            {/* Delivery Method */}
            <section>
              <h3 className="font-headline-md text-headline-md text-regal-navy mb-6 pb-2 border-b border-muted-gold/20">Delivery Method</h3>
              
              <div className="flex flex-col gap-4">
                <div 
                  className={`border p-6 cursor-pointer transition-colors ${shippingMethod === 'STANDARD' ? 'border-regal-navy bg-regal-navy/5' : 'border-gray-200 hover:border-regal-navy/50'}`}
                  onClick={() => setShippingMethod('STANDARD')}
                >
                  <div className="flex items-center gap-4">
                    <input type="radio" checked={shippingMethod === 'STANDARD'} readOnly className="w-5 h-5 accent-regal-navy"/>
                    <div className="flex-1">
                      <div className="flex justify-between items-center w-full">
                        <h4 className="font-label-md font-bold text-regal-navy">Standard Delivery</h4>
                        <span className="font-label-md font-bold text-regal-navy">Free</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Delivered within 3-5 business days.</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`border p-6 cursor-pointer transition-colors ${shippingMethod === 'FASTEST' ? 'border-regal-navy bg-regal-navy/5' : 'border-gray-200 hover:border-regal-navy/50'}`}
                  onClick={() => setShippingMethod('FASTEST')}
                >
                  <div className="flex items-center gap-4">
                    <input type="radio" checked={shippingMethod === 'FASTEST'} readOnly className="w-5 h-5 accent-regal-navy mt-1"/>
                    <div className="flex-1">
                      <div className="flex justify-between items-center w-full">
                        <h4 className="font-label-md font-bold text-regal-navy">Fastest Delivery</h4>
                        <span className="font-label-md font-bold text-regal-navy">₦5,000</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Delivered within 1-2 business days.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h3 className="font-headline-md text-headline-md text-regal-navy mb-6 pb-2 border-b border-muted-gold/20">Payment</h3>
              
              <div className="flex flex-col gap-4">
                {/* Paystack Option */}
                <div 
                  className={`border p-6 cursor-pointer transition-colors ${paymentMethod === 'PAYSTACK' ? 'border-regal-navy bg-regal-navy/5' : 'border-gray-200 hover:border-regal-navy/50'}`}
                  onClick={() => setPaymentMethod('PAYSTACK')}
                >
                  <div className="flex items-center gap-4">
                    <input type="radio" checked={paymentMethod === 'PAYSTACK'} readOnly className="w-5 h-5 accent-regal-navy"/>
                    <div>
                      <h4 className="font-label-md font-bold text-regal-navy">Pay with Paystack</h4>
                      <p className="text-sm text-gray-600 mt-1">Pay securely via Paystack (Cards, USSD, Bank Transfer).</p>
                    </div>
                  </div>
                </div>

                {/* Bank Transfer Option */}
                <div 
                  className={`border p-6 cursor-pointer transition-colors ${paymentMethod === 'BANK_TRANSFER' ? 'border-regal-navy bg-regal-navy/5' : 'border-gray-200 hover:border-regal-navy/50'}`}
                  onClick={() => setPaymentMethod('BANK_TRANSFER')}
                >
                  <div className="flex items-start gap-4">
                    <input type="radio" checked={paymentMethod === 'BANK_TRANSFER'} readOnly className="w-5 h-5 accent-regal-navy mt-1"/>
                    <div>
                      <h4 className="font-label-md font-bold text-regal-navy">Direct Bank Transfer</h4>
                      <p className="text-sm text-gray-600 mt-1 mb-3">Make your payment directly into our bank account. Your order will not be shipped until the funds have cleared.</p>
                      
                      {paymentMethod === 'BANK_TRANSFER' && (
                        <div className="bg-white p-4 border border-muted-gold/20 text-sm space-y-2">
                          <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Bank Name</span><span className="font-bold text-regal-navy">Moniepoint MFB</span></div>
                          <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Account Name</span><span className="font-bold text-regal-navy">Roymall Enterprise</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Account Number</span><span className="font-bold text-regal-navy text-base tracking-wider">9133333824</span></div>
                        </div>
                      )}
                    </div>
                  </div>
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
