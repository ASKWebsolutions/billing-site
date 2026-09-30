import { createContext, useContext, useState, useEffect } from 'react'
import { unlockAudio } from '../utils/liveChat'

const AuthContext = createContext()
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('mbx_admin_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      fetch(`${API}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.valid) setAdmin(data.admin)
          else logout()
          setLoading(false)
        })
        .catch(() => { logout(); setLoading(false) })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    // The submit click is a real user gesture — the one reliable moment to
    // latch the alert AudioContext open.
    unlockAudio()
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed')
    localStorage.setItem('mbx_admin_token', data.token)
    setToken(data.token)
    setAdmin(data)
    return data
  }

  const logout = () => {
    localStorage.removeItem('mbx_admin_token')
    setToken(null)
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
