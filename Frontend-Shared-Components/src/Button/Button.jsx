import React from 'react'

export function Button({
  children,
  variant  = 'default',
  size     = 'md',
  disabled = false,
  onClick,
  style    = {},
  ...rest
}) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    border: '0.5px solid', borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit', fontWeight: 400, whiteSpace: 'nowrap',
    opacity: disabled ? 0.45 : 1, transition: 'background 0.12s',
  }
  const sizes = {
    sm: { padding: '3px 8px',  fontSize: 11 },
    md: { padding: '5px 10px', fontSize: 12 },
    lg: { padding: '7px 14px', fontSize: 13 },
  }
  const variants = {
    default: { background: '#fff',         color: '#111827', borderColor: '#E5E7EB' },
    primary: { background: '#1B2A4A',      color: '#fff',    borderColor: '#1B2A4A' },
    danger:  { background: 'transparent',  color: '#A32D2D', borderColor: '#F7C1C1' },
    ghost:   { background: 'transparent',  color: '#6B7280', borderColor: 'transparent' },
  }
  return (
    <button
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}
