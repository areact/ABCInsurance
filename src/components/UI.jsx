import React from 'react'

// ─── Button ────────────────────────────────────────────────────────
export function Button({ children, variant = 'default', size = 'md', disabled, onClick, className = '', ...rest }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    border: '0.5px solid', borderRadius: 6, cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit', fontWeight: 400, whiteSpace: 'nowrap',
    opacity: disabled ? 0.45 : 1, transition: 'background 0.12s',
  }

  const sizes = {
    sm: { padding: '3px 8px', fontSize: 11 },
    md: { padding: '5px 10px', fontSize: 12 },
    lg: { padding: '7px 14px', fontSize: 13 },
  }

  const variants = {
    default: { background: '#fff', color: '#111827', borderColor: '#E5E7EB' },
    primary: { background: '#1B2A4A', color: '#fff', borderColor: '#1B2A4A' },
    danger:  { background: 'transparent', color: '#A32D2D', borderColor: '#F7C1C1' },
    ghost:   { background: 'transparent', color: '#6B7280', borderColor: 'transparent' },
  }

  return (
    <button
      style={{ ...base, ...sizes[size], ...variants[variant] }}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

// ─── Icon Button ───────────────────────────────────────────────────
export function IconBtn({ icon, title, onClick, variant = 'default', disabled }) {
  const colors = {
    default: { color: '#6B7280' },
    danger:  { color: disabled ? '#6B7280' : '#A32D2D' },
  }
  return (
    <button
      title={title}
      onClick={disabled ? undefined : onClick}
      style={{
        width: 26, height: 26,
        border: '0.5px solid #E5E7EB',
        borderRadius: 5,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.35 : 1,
        transition: 'background 0.12s',
        ...colors[variant],
      }}
    >
      <i className={`ti ${icon}`} style={{ fontSize: 13 }} />
    </button>
  )
}

// ─── Status Pill ───────────────────────────────────────────────────
const STATUS_STYLES = {
  'Open':         { background: '#EAF3DE', color: '#27500A' },
  'Pending':      { background: '#FAEEDA', color: '#633806' },
  'Under Review': { background: '#EEEDFE', color: '#3C3489' },
  'Closed':       { background: '#F1EFE8', color: '#444441' },
  'Rejected':     { background: '#FCEBEB', color: '#791F1F' },
}

export function StatusPill({ status }) {
  const style = STATUS_STYLES[status] || { background: '#F1EFE8', color: '#444441' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 20,
      fontSize: 11, fontWeight: 500,
      ...style,
    }}>
      {status}
    </span>
  )
}

// ─── Role Badge ────────────────────────────────────────────────────
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
      ...(ROLE_STYLES[role] || {}),
    }}>
      {role}
    </span>
  )
}

// ─── Section Label ─────────────────────────────────────────────────
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

// ─── Stat Card ─────────────────────────────────────────────────────
export function StatCard({ label, value, color }) {
  const colorMap = {
    blue: '#185FA5', green: '#3B6D11',
    amber: '#854F0B', red: '#A32D2D', default: '#111827',
  }
  return (
    <div style={{
      background: '#F8FAFC', borderRadius: 8,
      padding: '8px 14px', minWidth: 90,
    }}>
      <div style={{ fontSize: 11, color: '#6B7280' }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 500, marginTop: 1, color: colorMap[color] || colorMap.default }}>
        {value}
      </div>
    </div>
  )
}

// ─── Empty State ───────────────────────────────────────────────────
export function EmptyState({ icon = 'ti-inbox', message }) {
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
