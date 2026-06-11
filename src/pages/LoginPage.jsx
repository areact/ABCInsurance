import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, ROLE_USERS } from '../store/authStore'
import toast from 'react-hot-toast'

const ROLES = ['adjuster', 'supervisor', 'admin', 'auditor']
const ROLE_DESC = {
  adjuster:   'View & edit own claims only',
  supervisor: 'Full access, can delete & assign',
  admin:      'Full system access',
  auditor:    'Read-only access',
}

export default function LoginPage() {
  const [selected, setSelected] = useState('supervisor')
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleLogin = () => {
    login(selected)
    toast.success(`Signed in as ${ROLE_USERS[selected].name} (${selected})`)
    navigate('/claims')
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#F8FAFC',
    }}>
      <div style={{
        background: '#fff',
        border: '0.5px solid #E5E7EB',
        borderRadius: 12,
        padding: 32,
        width: 360,
      }}>
        {/* Logo */}
        <div style={{
          width: 44, height: 44, background: '#1B2A4A', borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 16, fontWeight: 700,
          margin: '0 auto 16px',
        }}>
          ABC
        </div>

        <h1 style={{ textAlign: 'center', fontSize: 16, fontWeight: 500, marginBottom: 4 }}>
          ABC Insurance
        </h1>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#6B7280', marginBottom: 24 }}>
          Claims Management Platform
        </p>

        {/* Email */}
        <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6B7280', marginBottom: 4 }}>
          Email
        </label>
        <input
          style={{
            width: '100%', padding: '7px 10px',
            border: '0.5px solid #E5E7EB', borderRadius: 6,
            fontSize: 13, marginBottom: 12, background: '#F9FAFB',
          }}
          defaultValue="user@abcinsurance.com"
          readOnly
        />

        {/* Password */}
        <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6B7280', marginBottom: 4 }}>
          Password
        </label>
        <input
          type="password"
          style={{
            width: '100%', padding: '7px 10px',
            border: '0.5px solid #E5E7EB', borderRadius: 6,
            fontSize: 13, marginBottom: 16, background: '#F9FAFB',
          }}
          defaultValue="password"
          readOnly
        />

        {/* Role selector */}
        <p style={{ fontSize: 11, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
          Sign in as (demo)
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 20 }}>
          {ROLES.map((r) => (
            <div
              key={r}
              onClick={() => setSelected(r)}
              style={{
                padding: '8px 10px',
                border: selected === r ? '1.5px solid #185FA5' : '0.5px solid #E5E7EB',
                borderRadius: 6,
                cursor: 'pointer',
                background: selected === r ? '#E6F1FB' : '#fff',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: selected === r ? 500 : 400, color: selected === r ? '#185FA5' : '#111827' }}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </div>
              <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 1 }}>
                {ROLE_DESC[r]}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: '100%', padding: 9,
            background: '#1B2A4A', color: '#fff',
            border: 'none', borderRadius: 6,
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}
        >
          Sign in
        </button>

        <p style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginTop: 12 }}>
          Select a role to demo different RBAC permissions
        </p>
      </div>
    </div>
  )
}
