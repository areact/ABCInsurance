import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { icon: 'ti-layout-dashboard', label: 'Dashboard', path: '/claims' },
  { icon: 'ti-file-description', label: 'Claims',    path: '/claims' },
  { icon: 'ti-users',            label: 'Customers', path: '/claims' },
  { icon: 'ti-report-analytics', label: 'Reports',   path: '/claims' },
  { icon: 'ti-settings',         label: 'Settings',  path: '/claims' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside style={{
      width: 52,
      background: '#fff',
      borderRight: '0.5px solid #E5E7EB',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      padding: '12px 0',
      gap: 4,
      flexShrink: 0,
    }}>
      {NAV_ITEMS.map(({ icon, label, path }) => {
        const active = location.pathname === path && label === 'Claims'
        return (
          <div
            key={label}
            title={label}
            style={{
              width: 36, height: 36,
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: active ? '#185FA5' : '#9CA3AF',
              background: active ? '#E6F1FB' : 'transparent',
              transition: 'all 0.15s',
            }}
          >
            <i className={`ti ${icon}`} style={{ fontSize: 18 }} />
          </div>
        )
      })}
    </aside>
  )
}
