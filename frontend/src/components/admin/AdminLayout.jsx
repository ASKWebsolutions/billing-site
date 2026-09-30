import { useState, createContext, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

const AdminContext = createContext()
export const useAdmin = () => useContext(AdminContext)

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const path = location.pathname.replace('/admin', '').replace(/^\//, '') || 'dashboard'

  return (
    <AdminContext.Provider value={{ sidebarOpen, setSidebarOpen, activePage: path }}>
      <div className="flex h-screen bg-[#F0F4F8] font-sans overflow-hidden">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  )
}
