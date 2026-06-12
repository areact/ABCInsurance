import React from 'react'

export function IconBtn({ icon, title, onClick, variant = 'default', disabled = false, size = 26 }) {
  const colors = {
    default: { color: '#6B7280', borderColor: '#E5E7EB' },
    danger:  { color: disabled ? '#6B7280' : '#A32D2D', borderColor: disabled ? '#E5E7EB' : '#FECACA' },
    primary: { color: '#185FA5', borderColor: '#BFDBFE' },
  }
  return (
    <button
      title={title}
      onClick={disabled ? undefined : onClick}
      style={{
        width: size, height: size,
        border: `0.5px solid ${colors[variant]?.borderColor || '#E5E7EB'}`,
        borderRadius: 5,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.35 : 1,
        transition: 'background 0.12s',
        color: colors[variant]?.color || '#6B7280',
      }}
    >
      <i className={`ti ${icon}`} style={{ fontSize: size * 0.5 }} />
    </button>
  )
}
