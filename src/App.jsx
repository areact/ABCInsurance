import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ClaimsPage from './pages/ClaimsPage'
import ProtectedRoute from './components/ProtectedRoute'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import { useAuthStore } from './store/authStore'

function Layout({ children }) {
  return (
    <div className="app">
      <Topbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const user = useAuthStore((s) => s.user)

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/claims" replace /> : <LoginPage />} />
      <Route
        path="/claims"
        element={
          <ProtectedRoute>
            <Layout>
              <ClaimsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={user ? '/claims' : '/login'} replace />} />
    </Routes>
  )
}
