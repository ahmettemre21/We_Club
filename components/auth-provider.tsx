'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'member'
  votingPower: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Local storage'dan kullanıcı bilgilerini yükle
    const savedUser = localStorage.getItem('weclub_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Demo kullanıcılar
    const demoUsers = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@weclub.com',
        role: 'admin' as const,
        votingPower: 10
      },
      {
        id: '2', 
        name: 'Test Member',
        email: 'member@weclub.com',
        role: 'member' as const,
        votingPower: 1
      }
    ]

    // Basit doğrulama
    const foundUser = demoUsers.find(u => u.email === email && password === 'demo123')
    
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem('weclub_user', JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('weclub_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
