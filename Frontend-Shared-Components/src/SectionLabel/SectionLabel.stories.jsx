import React from 'react'
import { SectionLabel } from './SectionLabel'

export default {
  title:     'Shared/SectionLabel',
  component: SectionLabel,
}

export const Default = () => <SectionLabel>Attached documents</SectionLabel>
export const InContext = () => (
  <div style={{ width: 300 }}>
    <SectionLabel>Claim details</SectionLabel>
    <div style={{ background: '#F9FAFB', padding: 12, borderRadius: 6, fontSize: 12 }}>Content here</div>
    <SectionLabel>Documents</SectionLabel>
    <div style={{ background: '#F9FAFB', padding: 12, borderRadius: 6, fontSize: 12 }}>Content here</div>
  </div>
)
