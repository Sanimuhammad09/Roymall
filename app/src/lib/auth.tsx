import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from './api'
import { useRouter } from '@tanstack/react-router'

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
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await api.getMe()
          const userData = response.data || response.user || response
          setUser(userData)
        } catch (error) {
          console.error("Failed to authenticate token", error)
          localStorage.removeItem('token')
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token)
    setUser(userData)
    // The redirect will be handled by the signin form component
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.navigate({ to: '/' })
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
