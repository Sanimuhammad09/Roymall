import { supabase } from './supabase'
import emailjs from '@emailjs/browser'

export const getSessionId = () => {
  if (typeof window === 'undefined') return ''
  let sessionId = localStorage.getItem('sessionId')
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem('sessionId', sessionId)
  }
  return sessionId
}

export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  image?: string
  images?: { id: string; url: string; isPrimary: boolean; order: number }[]
  category: string | { name: string; slug: string; [key: string]: any }
  notes?: { top: string; heart: string; base: string }
  olfactoryFamily?: string
  stock: number
  isNewArrival?: boolean
  isBestSeller?: boolean
  size?: string
}

export const api = {
  // --- Products ---
  getProducts: async (params?: Record<string, string | boolean | number>) => {
    let query = supabase.from('products').select(`*, category:categories(*)`)
    if (params) {
      if (params.isBestSeller) query = query.eq('isBestSeller', true)
      if (params.isNewArrival) query = query.eq('isNewArrival', true)
      if (params.category) query = query.eq('categoryId', params.category)
    }
    const { data, error } = await query
    if (error) throw error
    return { data }
  },
  
  getProduct: async (id: string) => {
    const { data, error } = await supabase.from('products').select('*, category:categories(*)').eq('id', id).single()
    if (error) throw error
    return { data }
  },
  
  createProduct: async (productData: any) => {
    const { data, error } = await supabase.from('products').insert([productData]).select().single()
    if (error) throw error
    return { data }
  },
  
  uploadProductImages: async (productId: string, formData: FormData) => {
    // Requires Supabase Storage setup
    const file = formData.get('file') as File
    if (!file) throw new Error('No file provided')
    
    const { data, error } = await supabase.storage.from('product-images').upload(`${productId}/${Date.now()}_${file.name}`, file)
    if (error) throw error
    
    const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(data.path)
    return { data: { url: publicUrlData.publicUrl } }
  },

  // --- Categories ---
  getCategories: async () => {
    const { data, error } = await supabase.from('categories').select('*')
    if (error) throw error
    return { data }
  },
  
  createCategory: async (categoryData: any) => {
    const { data, error } = await supabase.from('categories').insert([categoryData]).select().single()
    if (error) throw error
    return { data }
  },

  // --- Metrics ---
  getMetrics: async () => {
    // In a real scenario, this would be an RPC call or edge function.
    return { data: { totalSales: 0, totalOrders: 0, totalCustomers: 0 } }
  },

  // --- Auth ---
  login: async (credentials: any) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    })
    if (error) throw error
    
    // Try to fetch role from users table, fallback to user_metadata gracefully
    let userProfile = null;
    try {
      const res = await supabase.from('users').select('*').eq('id', data.user.id).maybeSingle()
      userProfile = res.data;
    } catch (err) {}
    
    const role = userProfile?.role || data.user.user_metadata?.role || 'user';
    
    return {
      accessToken: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        firstName: userProfile?.firstName || data.user.user_metadata?.firstName || '',
        lastName: userProfile?.lastName || data.user.user_metadata?.lastName || '',
        role
      }
    }
  },
  
  register: async (userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password
    })
    if (error) throw error
    
    // Create user profile
    if (data.user) {
      await supabase.from('users').insert([{
        id: data.user.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user'
      }])
    }
    
    return { data }
  },
  
  getMe: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not logged in")
    let userProfile = null;
    try {
      const { data } = await supabase.from('users').select('*').eq('id', user.id).maybeSingle()
      userProfile = data;
    } catch (err) {}
    
    return { 
      data: { 
        ...user, 
        ...userProfile,
        role: userProfile?.role || user.user_metadata?.role || 'user',
        firstName: userProfile?.firstName || user.user_metadata?.firstName || '',
        lastName: userProfile?.lastName || user.user_metadata?.lastName || ''
      } 
    }
  },
  
  updateMe: async (userData: any) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not logged in")
    const { data, error } = await supabase.from('users').update(userData).eq('id', user.id).select().single()
    if (error) throw error
    return { data }
  },

  // --- Cart ---
  getCart: async () => {
    const sessionId = getSessionId()
    const { data: { user } } = await supabase.auth.getUser()
    
    let query = supabase.from('cart_items').select('*, product:products(*)')
    if (user) {
      query = query.eq('user_id', user.id)
    } else {
      query = query.eq('session_id', sessionId)
    }
    
    const { data, error } = await query
    if (error) throw error
    
    return { 
      data: { 
        items: data.map(item => ({
          id: item.id,
          productId: item.product_id,
          quantity: item.quantity,
          product: item.product
        })) 
      } 
    }
  },
  
  addToCart: async (productId: string, quantity: number) => {
    const sessionId = getSessionId()
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase.from('cart_items').insert([{
      product_id: productId,
      quantity,
      session_id: user ? null : sessionId,
      user_id: user ? user.id : null
    }]).select()
    
    if (error) throw error
    return { data }
  },
  
  updateCartItem: async (itemId: string, quantity: number) => {
    const { data, error } = await supabase.from('cart_items').update({ quantity }).eq('id', itemId).select()
    if (error) throw error
    return { data }
  },
  
  removeFromCart: async (itemId: string) => {
    const { error } = await supabase.from('cart_items').delete().eq('id', itemId)
    if (error) throw error
    return { success: true }
  },

  clearCart: async () => {
    const sessionId = getSessionId()
    const { data: { user } } = await supabase.auth.getUser()
    let query = supabase.from('cart_items').delete()
    if (user) {
      query = query.eq('user_id', user.id)
    } else {
      query = query.eq('session_id', sessionId)
    }
    const { error } = await query
    if (error) throw error
    return { success: true }
  },

  // --- Orders & Checkout ---
  getMyOrders: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not logged in")
    const { data, error } = await supabase.from('orders').select('*').eq('user_id', user.id)
    if (error) throw error
    return { data }
  },
  
  createOrder: async (orderData: any) => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase.from('orders').insert([{
      ...orderData,
      user_id: user ? user.id : null
    }]).select().single()
    if (error) throw error

    // Decrement stock for each item in the order
    if (orderData.items && Array.isArray(orderData.items)) {
      for (const item of orderData.items) {
        if (item.productId && item.quantity) {
          // Note: In production you would do this via a Postgres function (RPC) or trigger to prevent race conditions.
          const { data: prodData } = await supabase.from('products').select('stock').eq('id', item.productId).single();
          if (prodData && prodData.stock !== undefined) {
             const newStock = Math.max(0, prodData.stock - item.quantity);
             await supabase.from('products').update({ stock: newStock }).eq('id', item.productId);
          }
        }
      }
    }

    return { data }
  },
  
  getOrderById: async (id: string) => {
    const { data, error } = await supabase.from('orders').select('*').eq('id', id).single()
    if (error) throw error
    return { data }
  },

  // --- Email Notifications ---
  sendOrderEmail: async (orderData: any, status: string) => {
    try {
      const templateParams = {
        customer_name: orderData.shippingAddress?.firstName || orderData.user?.firstName || 'Valued Customer',
        customer_email: orderData.shippingAddress?.email || orderData.user?.email || '',
        order_number: orderData.id || orderData.orderNumber || 'PENDING',
        order_status: status,
        total_amount: `₦${Number(orderData.total || 0).toLocaleString()}`,
        tracking_info: orderData.trackingUrl || 'N/A'
      };

      await emailjs.send(
        'service_0yij3t1',
        'template_elq647e',
        templateParams,
        '76EmMvbInLszRQepN'
      );
      console.log('Order confirmation email sent successfully!');
    } catch (err) {
      console.error('Failed to send email:', err);
    }
  },

  // --- Services & Forms ---
  bookAppointment: async (appointmentData: any) => {
    const { data, error } = await supabase.from('appointments').insert([appointmentData]).select()
    if (error) throw error
    return { data }
  },
  
  submitInquiry: async (inquiryData: any) => {
    const { data, error } = await supabase.from('inquiries').insert([inquiryData]).select()
    if (error) throw error
    return { data }
  },

  // --- Admin ---
  createProduct: async (productData: any) => {
    const { data, error } = await supabase.from('products').insert([productData]).select().single()
    if (error) throw error
    return { data }
  },
  updateProduct: async (id: string, productData: any) => {
    const { data, error } = await supabase.from('products').update(productData).eq('id', id).select().single()
    if (error) throw error
    return { data }
  },
  adminDeleteProduct: async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },
  uploadProductImages: async (productId: string, formData: FormData) => {
    const file = formData.get('images') as File
    if (!file) throw new Error('No image file provided')
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${productId}/${fileName}`

    const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, file)
    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(filePath)
    
    const { data, error } = await supabase.from('products').update({ image: publicUrl }).eq('id', productId).select().single()
    if (error) throw error
    
    return { data }
  },
  adminDeleteImage: async (productId: string, imageId: string) => {
    // Since we only store one image string in our schema currently, we just nullify it.
    const { data, error } = await supabase.from('products').update({ image: null }).eq('id', productId).select().single()
    if (error) throw error
    return { data }
  },
  adminGetOrders: async (params?: Record<string, any>) => {
    let query = supabase.from('orders').select('*', { count: 'exact' })
    if (params?.status && params.status !== 'ALL') {
      query = query.eq('status', params.status)
    }
    if (params?.search) {
      query = query.ilike('orderNumber', `%${params.search}%`)
    }
    
    const page = params?.page || 1
    const limit = params?.limit || 10
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    const { data, count, error } = await query.range(from, to).order('created_at', { ascending: false })
    if (error) throw error
    
    return {
      data,
      meta: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit)
      }
    }
  },
  adminUpdateOrderStatus: async (id: string, status: string) => {
    const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single()
    if (error) throw error
    return { data }
  },
  adminDeleteOrder: async (id: string) => {
    const { error } = await supabase.from('orders').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },
  adminGetUsers: async (params?: Record<string, any>) => {
    let query = supabase.from('users').select('*', { count: 'exact' })
    
    if (params?.search) {
      query = query.or(`firstName.ilike.%${params.search}%,lastName.ilike.%${params.search}%,email.ilike.%${params.search}%`)
    }
    
    const page = params?.page || 1
    const limit = params?.limit || 10
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    const { data, count, error } = await query.range(from, to).order('created_at', { ascending: false })
    if (error) throw error
    
    return {
      data,
      meta: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit)
      }
    }
  },
  adminToggleUserStatus: async (id: string, isActive: boolean) => {
    const { data, error } = await supabase.from('users').update({ isActive }).eq('id', id).select().single()
    if (error) throw error
    return { data }
  },
  adminUpdateUserRole: async (id: string, role: string) => {
    const { data, error } = await supabase.from('users').update({ role }).eq('id', id).select().single()
    if (error) throw error
    return { data }
  },
  adminGetAppointments: async () => {
    const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return { data }
  },
  adminGetInquiries: async () => {
    const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return { data }
  },
  adminGetNotifications: async () => {
    return { data: [] }
  },
  adminGetOverview: async (params?: { startDate?: string; endDate?: string }) => {
    const [ordersRes, usersRes, apptRes, prodRes] = await Promise.all([
      supabase.from('orders').select('*'),
      supabase.from('users').select('id', { count: 'exact' }),
      supabase.from('appointments').select('*').in('status', ['pending', 'confirmed']),
      supabase.from('products').select('*').lte('stock', 10).order('stock', { ascending: true }).limit(5)
    ])
    
    const orders = ordersRes.data || []
    const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0)
    const recentOrders = [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5)
    
    return { 
      data: {
        totalRevenue,
        totalOrders: orders.length,
        totalCustomers: usersRes.count || 0,
        activeAppointments: apptRes.data?.length || 0,
        recentOrders,
        lowStockProducts: prodRes.data || [],
        topProducts: []
      }
    }
  },
  adminGetSettings: async () => { 
    try {
      const stored = localStorage.getItem('roymall_admin_settings')
      return { data: stored ? JSON.parse(stored) : {} } 
    } catch(e) {
      return { data: {} }
    }
  },
  adminUpdateSettings: async (settings: any) => {
    localStorage.setItem('roymall_admin_settings', JSON.stringify(settings))
    return { data: settings }
  },
  getShippingZones: async () => { return { data: [] } },
  getAdminUsers: async () => { return { data: [] } },
  getPublicSettings: async () => { return { data: {} } },
}
