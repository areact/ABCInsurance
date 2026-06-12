import React from 'react'

const ROLE_STYLES = {
  adjuster:   { background: '#E6F1FB', color: '#0C447C' },
  supervisor: { background: '#EAF3DE', color: '#27500A' },
  admin:      { background: '#EEEDFE', color: '#3C3489' },
  auditor:    { background: '#F1EFE8', color: '#5F5E5A' },
}

export function RoleBadge({ role }) {
  return (
    <span style={{
      padding: '2px 8px', borderRadius: 20,
      fontSize: 11, fontWeight: 500,
      ...(ROLE_STYLES[role] || { background: '#F3F4F6', color: '#6B7280' }),
    }}>
      {role}
    </span>
  )
}
