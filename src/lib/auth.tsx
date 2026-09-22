import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (token: string, userData: User) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Try to fetch profile, fallback to metadata
        supabase.from('users').select('*').eq('id', session.user.id).maybeSingle()
          .then(({ data }) => {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              firstName: data?.firstName || session.user.user_metadata?.firstName || '',
              lastName: data?.lastName || session.user.user_metadata?.lastName || '',
              role: data?.role || session.user.user_metadata?.role || 'user'
            })
            setIsLoading(false)
          })
          .catch(() => {
            // Error fetching from users table (e.g. table doesn't exist yet)
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              firstName: session.user.user_metadata?.firstName || '',
              lastName: session.user.user_metadata?.lastName || '',
              role: session.user.user_metadata?.role || 'user'
            })
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        supabase.from('users').select('*').eq('id', session.user.id).maybeSingle()
          .then(({ data }) => {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              firstName: data?.firstName || session.user.user_metadata?.firstName || '',
              lastName: data?.lastName || session.user.user_metadata?.lastName || '',
              role: data?.role || session.user.user_metadata?.role || 'user'
            })
          })
          .catch(() => {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              firstName: session.user.user_metadata?.firstName || '',
              lastName: session.user.user_metadata?.lastName || '',
              role: session.user.user_metadata?.role || 'user'
            })
          })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = (token: string, userData: User) => {
    // The actual token is managed by supabase client
    setUser(userData)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.href = '/signin'
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
