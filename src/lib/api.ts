const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : 'https://roymall-backend-production.up.railway.app/api'

// Helper to get or create a session ID for guest carts
export const getSessionId = () => {
  if (typeof window === 'undefined') return ''
  let sessionId = localStorage.getItem('sessionId')
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem('sessionId', sessionId)
  }
  return sessionId
}

// Helper to get the auth token
export const getToken = () => {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('token') || ''
}

// Base fetch wrapper
const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  // Optionally handle 401 Unauthorized globally here if needed

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || errorData.error || 'API Request Failed')
  }

  return response.json()
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
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, String(value))
        }
      })
    }
    const queryString = searchParams.toString()
    const endpoint = queryString ? `/products?${queryString}` : '/products'
    return fetchApi(endpoint)
  },
  
  getProduct: async (id: string) => {
    return fetchApi(`/products/${id}`)
  },
  
  createProduct: async (productData: any) => {
    return fetchApi('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    })
  },
  
  uploadProductImages: async (productId: string, formData: FormData) => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/products/${productId}/images`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData // Don't set Content-Type, browser will set it with boundary
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'API Request Failed')
    }
    
    return response.json()
  },

  // --- Categories ---
  getCategories: async () => {
    return fetchApi('/categories')
  },
  
  createCategory: async (categoryData: any) => {
    return fetchApi('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    })
  },
  // --- Metrics ---
  getMetrics: async () => {
    return fetchApi('/metrics')
  },

  // --- Auth ---
  login: async (credentials: any) => {
    return fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },
  
  register: async (userData: any) => {
    return fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },
  
  getMe: async () => {
    return fetchApi('/users/me')
  },
  updateMe: async (data: any) => {
    return fetchApi('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  addAddress: async (data: any) => {
    return fetchApi('/users/me/addresses', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  updateAddress: async ({ id, data }: { id: string; data: any }) => {
    return fetchApi(`/users/me/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  deleteAddress: async (id: string) => {
    return fetchApi(`/users/me/addresses/${id}`, {
      method: 'DELETE',
    })
  },
  addToWishlist: async (productId: string) => {
    return fetchApi(`/users/me/wishlist/${productId}`, {
      method: 'POST',
    })
  },
  removeFromWishlist: async (productId: string) => {
    return fetchApi(`/users/me/wishlist/${productId}`, {
      method: 'DELETE',
    })
  },

  // --- Cart ---
  getCart: async () => {
    const sessionId = getSessionId()
    return fetchApi(`/cart?sessionId=${sessionId}`)
  },
  
  addToCart: async (productId: string, quantity: number) => {
    const sessionId = getSessionId()
    return fetchApi('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, sessionId }),
    })
  },
  
  updateCartItem: async (itemId: string, quantity: number) => {
    return fetchApi(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    })
  },
  
  removeFromCart: async (itemId: string) => {
    return fetchApi(`/cart/${itemId}`, {
      method: 'DELETE',
    })
  },

  // --- Orders & Checkout ---
  getMyOrders: async () => {
    return fetchApi('/orders/me')
  },
  createOrder: async (orderData: any) => {
    return fetchApi('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  },
  getOrderById: async (id: string) => {
    return fetchApi(`/orders/${id}`)
  },

  clearCart: async () => {
    const sessionId = getSessionId()
    const qs = sessionId ? `?sessionId=${sessionId}` : ''
    return fetchApi(`/cart/clear/all${qs}`, {
      method: 'DELETE',
    })
  },

  // --- Services & Forms ---
  bookAppointment: async (appointmentData: any) => {
    return fetchApi('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    })
  },
  
  submitInquiry: async (inquiryData: any) => {
    return fetchApi('/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    })
  },

  // --- Admin ---
  adminGetOverview: async (params?: { startDate?: string; endDate?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.startDate) searchParams.append('startDate', params.startDate)
    if (params?.endDate) searchParams.append('endDate', params.endDate)
    const qs = searchParams.toString()
    return fetchApi(`/admin/analytics/overview${qs ? `?${qs}` : ''}`)
  },

  // Admin Products
  adminCreateProduct: async (productData: any) => {
    return fetchApi('/products', { method: 'POST', body: JSON.stringify(productData) })
  },
  adminUpdateProduct: async (id: string, productData: any) => {
    return fetchApi(`/products/${id}`, { method: 'PUT', body: JSON.stringify(productData) })
  },
  adminDeleteProduct: async (id: string) => {
    return fetchApi(`/products/${id}`, { method: 'DELETE' })
  },
  adminUploadImages: async (id: string, formData: FormData) => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/products/${id}/images`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'API Request Failed')
    }
    return response.json()
  },
  adminDeleteImage: async (productId: string, imageId: string) => {
    return fetchApi(`/products/${productId}/images/${imageId}`, { method: 'DELETE' })
  },

  // Admin Orders
  adminGetOrders: async (params?: Record<string, any>) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, String(value))
      })
    }
    const qs = searchParams.toString()
    return fetchApi(`/orders/admin/all${qs ? `?${qs}` : ''}`)
  },
  adminGetOrder: async (id: string) => {
    return fetchApi(`/orders/admin/${id}`)
  },
  adminUpdateOrderStatus: async (id: string, status: string) => {
    return fetchApi(`/orders/admin/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  },

  // Admin Customers
  adminGetUsers: async (params?: Record<string, any>) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, String(value))
      })
    }
    const qs = searchParams.toString()
    return fetchApi(`/users${qs ? `?${qs}` : ''}`)
  },
  adminGetUser: async (id: string) => {
    return fetchApi(`/users/admin/${id}`)
  },
  adminToggleUserStatus: async (id: string, isActive: boolean) => {
    return fetchApi(`/users/admin/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ isActive }),
    })
  },

  // Admin Appointments
  adminGetAppointments: async (params?: Record<string, any>) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, String(value))
      })
    }
    const qs = searchParams.toString()
    return fetchApi(`/appointments/admin/all${qs ? `?${qs}` : ''}`)
  },
  adminUpdateAppointmentStatus: async (id: string, status: string) => {
    return fetchApi(`/appointments/admin/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  },

  // Admin Inquiries
  adminGetInquiries: async (params?: Record<string, any>) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, String(value))
      })
    }
    const qs = searchParams.toString()
    return fetchApi(`/inquiries/admin/all${qs ? `?${qs}` : ''}`)
  },
  adminUpdateInquiryStatus: async (id: string, status: string) => {
    return fetchApi(`/inquiries/admin/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  },
  adminDeleteInquiry: async (id: string) => {
    return fetchApi(`/inquiries/admin/${id}`, { method: 'DELETE' })
  },

  // Admin Settings
  adminGetSettings: async () => {
    return fetchApi('/admin/settings')
  },
  adminUpdateSettings: async (settingsData: any) => {
    return fetchApi('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    })
  },

  // --- Shipping Zones ---
  getShippingZones: async () => {
    return fetchApi('/admin/shipping-zones')
  },
  createShippingZone: async (data: any) => {
    return fetchApi('/admin/shipping-zones', { method: 'POST', body: JSON.stringify(data) })
  },
  updateShippingZone: async (id: string, data: any) => {
    return fetchApi(`/admin/shipping-zones/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  },
  deleteShippingZone: async (id: string) => {
    return fetchApi(`/admin/shipping-zones/${id}`, { method: 'DELETE' })
  },

  // --- Admin Users ---
  getAdminUsers: async () => {
    return fetchApi('/admin/users')
  },
  inviteAdminUser: async (data: any) => {
    return fetchApi('/admin/users', { method: 'POST', body: JSON.stringify(data) })
  },
  removeAdminAccess: async (id: string) => {
    return fetchApi(`/admin/users/${id}`, { method: 'DELETE' })
  },

  // Public Store Settings
  getPublicSettings: async () => {
    return fetchApi('/settings')
  },

  submitReview: async (productId: string, data: { rating: number; comment?: string }) => {
    return fetchApi('/reviews', {
      method: 'POST',
      body: JSON.stringify({ ...data, productId }),
    })
  },

  getProductReviews: async (productId: string) => {
    return fetchApi(`/reviews/product/${productId}`)
  },
}
