import React from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { RoleBadge } from './UI'
import toast from 'react-hot-toast'

export default function Topbar() {
  const { user, permissions, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Signed out')
    navigate('/login')
  }

  return (
    <header style={{
      background: '#fff',
      borderBottom: '0.5px solid #E5E7EB',
      height: 48,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px',
      flexShrink: 0,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 30, height: 30, background: '#1B2A4A', borderRadius: 7,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 10, fontWeight: 700,
        }}>
          ABC
        </div>
        <span style={{ fontWeight: 500, fontSize: 14 }}>Claims Platform</span>
        <span style={{ color: '#9CA3AF', fontSize: 11 }}>· UI Demo</span>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, color: '#9CA3AF' }}>
          <i className="ti ti-database" style={{ marginRight: 3 }} />
          20,000 records
        </span>

        {user && <RoleBadge role={user.role} />}

        {user && (
          <div
            title={`${user.name} — click to sign out`}
            onClick={handleLogout}
            style={{
              width: 30, height: 30, borderRadius: '50%',
              background: '#1B2A4A', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 600, cursor: 'pointer',
            }}
          >
            {user.initials}
          </div>
        )}
      </div>
    </header>
  )
}
