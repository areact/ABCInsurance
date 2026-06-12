import React from 'react'

const COLOR_MAP = {
  blue:  { bg: '#EFF6FF', icon: '#185FA5', text: '#185FA5' },
  green: { bg: '#EAF3DE', icon: '#27500A', text: '#27500A' },
  amber: { bg: '#FAEEDA', icon: '#854F0B', text: '#854F0B' },
  red:   { bg: '#FCEBEB', icon: '#A32D2D', text: '#A32D2D' },
  gray:  { bg: '#F3F4F6', icon: '#6B7280', text: '#6B7280' },
}

export function StatCard({ icon, label, value, color = 'blue', loading = false }) {
  const c = COLOR_MAP[color] || COLOR_MAP.blue
  return (
    <div style={{ flex: 1, minWidth: 120, background: c.bg, borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 9, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <i className={`ti ${icon}`} style={{ fontSize: 18, color: c.icon }} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: c.text, opacity: 0.75, fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 600, color: c.text, lineHeight: 1.2, marginTop: 1 }}>
          {loading ? <span style={{ fontSize: 14, opacity: 0.4 }}>…</span> : value}
        </div>
      </div>
    </div>
  )
}
