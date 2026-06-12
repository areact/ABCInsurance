import React from 'react'

export function SectionLabel({ children, style = {} }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 500,
      color: '#6B7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      margin: '10px 0 6px',
      ...style,
    }}>
      {children}
    </div>
  )
}
