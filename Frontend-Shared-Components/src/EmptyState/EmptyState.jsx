import React from 'react'

export function EmptyState({ icon = 'ti-inbox', message = 'Nothing here yet' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 40, color: '#9CA3AF', textAlign: 'center',
    }}>
      <i className={`ti ${icon}`} style={{ fontSize: 32, marginBottom: 8, opacity: 0.4 }} />
      <p style={{ fontSize: 13 }}>{message}</p>
    </div>
  )
}
