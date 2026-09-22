import { supabase } from './supabase'

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
      const res = await supabase.from('users').select('*').eq('id', data.user.id).single()
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
      const { data } = await supabase.from('users').select('*').eq('id', user.id).single()
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
    return { data }
  },
  
  getOrderById: async (id: string) => {
    const { data, error } = await supabase.from('orders').select('*').eq('id', id).single()
    if (error) throw error
    return { data }
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
  adminGetOrders: async (params?: Record<string, any>) => {
    const { data, error } = await supabase.from('orders').select('*')
    if (error) throw error
    return { data }
  },
  adminUpdateOrderStatus: async (id: string, status: string) => {
    const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single()
    if (error) throw error
    return { data }
  },
  adminGetUsers: async (params?: Record<string, any>) => {
    const { data, error } = await supabase.from('users').select('*')
    if (error) throw error
    return { data }
  },
  adminGetAppointments: async () => {
    const { data, error } = await supabase.from('appointments').select('*')
    if (error) throw error
    return { data }
  },
  adminGetInquiries: async () => {
    const { data, error } = await supabase.from('inquiries').select('*')
    if (error) throw error
    return { data }
  },
  adminGetNotifications: async () => {
    return { data: [] }
  },
  adminGetOverview: async (params?: { startDate?: string; endDate?: string }) => {
    return { 
      data: {
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        recentOrders: [],
        topProducts: []
      }
    }
  },
  adminGetSettings: async () => { return { data: {} } },
  getShippingZones: async () => { return { data: [] } },
  getAdminUsers: async () => { return { data: [] } },
  getPublicSettings: async () => { return { data: {} } },
}
