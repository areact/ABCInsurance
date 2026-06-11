import React from 'react'
import ClaimsGrid from '../features/claims/ClaimsGrid'
import ClaimPanel from '../features/workspace/ClaimPanel'

export default function ClaimsPage() {
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <ClaimsGrid />
      </div>
      <ClaimPanel />
    </div>
  )
}
