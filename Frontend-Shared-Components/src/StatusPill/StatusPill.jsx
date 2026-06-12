import React from 'react'

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
      padding: '2px 10px', borderRadius: 20,
      fontSize: 11, fontWeight: 500,
      ...style,
    }}>
      {status}
    </span>
  )
}
