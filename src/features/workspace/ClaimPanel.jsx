import React, { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { Button, SectionLabel } from '../../components/UI'
import DocViewer from './DocViewer'
import toast from 'react-hot-toast'

export default function ClaimPanel() {
  const { selectedClaim, clearSelectedClaim } = useUIStore()
  const { permissions } = useAuthStore()
  const [tab, setTab]       = useState('details')
  const [activeDoc, setActiveDoc] = useState(null)

  if (!selectedClaim) return null

  const docs = selectedClaim.docs || []

  const handleTabChange = (t) => {
    setTab(t)
    setActiveDoc(null)
  }

  return (
    <div style={{
      width: 420,
      background: '#fff',
      borderLeft: '0.5px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 0,
      animation: 'slideIn 0.2s ease',
    }}>
      <style>{`@keyframes slideIn { from { transform: translateX(20px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }`}</style>

      {/* Panel header */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '0.5px solid #E5E7EB',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontWeight: 500, fontSize: 13 }}>{selectedClaim.id}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF' }}>{selectedClaim.customer}</div>
        </div>
        <button
          onClick={clearSelectedClaim}
          style={{ width: 26, height: 26, border: '0.5px solid #E5E7EB', borderRadius: 5, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}
        >
          <i className="ti ti-x" style={{ fontSize: 13 }} />
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid #E5E7EB', flexShrink: 0 }}>
        {['details', 'documents'].map((t) => (
          <div
            key={t}
            onClick={() => handleTabChange(t)}
            style={{
              padding: '7px 14px', fontSize: 12, cursor: 'pointer',
              color: tab === t ? '#185FA5' : '#6B7280',
              borderBottom: tab === t ? '2px solid #185FA5' : '2px solid transparent',
              fontWeight: tab === t ? 500 : 400,
              marginBottom: -0.5,
              display: 'flex', alignItems: 'center', gap: 5,
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {t === 'documents' && (
              <span style={{ background: '#E6F1FB', color: '#185FA5', padding: '0 5px', borderRadius: 10, fontSize: 10 }}>
                {docs.length}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Tab: Details */}
      {tab === 'details' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px' }}>
          {[
            ['Claim ID',   selectedClaim.id],
            ['Customer',   selectedClaim.customer],
            ['Status',     selectedClaim.status],
            ['Amount',     `$${selectedClaim.amount.toLocaleString()}`],
            ['Channel',    selectedClaim.channel],
            ['Adjuster',   selectedClaim.adjuster],
            ['Date Filed', selectedClaim.date],
            ['Priority',   selectedClaim.priority],
          ].map(([label, value]) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '5px 0', borderBottom: '0.5px solid #F3F4F6',
            }}>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>{label}</span>
              <span style={{ fontSize: 12, fontWeight: 500 }}>{value}</span>
            </div>
          ))}

          <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {permissions.canEdit && (
              <Button onClick={() => toast.success(`Editing ${selectedClaim.id}`)}>
                <i className="ti ti-edit" style={{ fontSize: 12 }} />Edit
              </Button>
            )}
            {permissions.canAssign && (
              <Button onClick={() => toast.success(`Reassigning ${selectedClaim.id}`)}>
                <i className="ti ti-user-plus" style={{ fontSize: 12 }} />Reassign
              </Button>
            )}
            {permissions.canDelete && (
              <Button variant="danger" onClick={() => toast.success(`Deleted ${selectedClaim.id}`)}>
                <i className="ti ti-trash" style={{ fontSize: 12 }} />Delete
              </Button>
            )}
          </div>

          {!permissions.canEdit && !permissions.canAssign && !permissions.canDelete && (
            <div style={{
              marginTop: 12, padding: '8px 10px',
              background: '#F9FAFB', borderRadius: 6,
              fontSize: 11, color: '#9CA3AF',
            }}>
              <i className="ti ti-eye" style={{ marginRight: 4 }} />
              Read-only access — your role cannot modify claims
            </div>
          )}
        </div>
      )}

      {/* Tab: Documents — list */}
      {tab === 'documents' && !activeDoc && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px' }}>
          <SectionLabel>Attached documents</SectionLabel>
          {docs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setActiveDoc(doc)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: '#F9FAFB', borderRadius: 8, padding: '9px 12px',
                marginBottom: 7, cursor: 'pointer',
                border: '0.5px solid #E5E7EB',
                transition: 'border-color 0.12s',
              }}
            >
              <div style={{ width: 32, height: 32, background: '#E6F1FB', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#185FA5', fontSize: 15, flexShrink: 0 }}>
                <i className="ti ti-file-type-pdf" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {doc.name}
                </div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>
                  {doc.sizeMB >= 1000 ? `${(doc.sizeMB / 1000).toFixed(1)} GB` : `${doc.sizeMB} MB`}
                  {' · '}{doc.pages} pages · {doc.uploadedAt}
                </div>
              </div>
              <i className="ti ti-chevron-right" style={{ color: '#CBD5E1', fontSize: 13 }} />
            </div>
          ))}

          {permissions.canUpload && (
            <div
              onClick={() => toast.success('Upload dialog — multipart streaming to Node')}
              style={{
                border: '1px dashed #CBD5E1', borderRadius: 8,
                padding: '14px', textAlign: 'center', cursor: 'pointer', marginTop: 4,
              }}
            >
              <i className="ti ti-cloud-upload" style={{ fontSize: 22, color: '#9CA3AF', display: 'block', marginBottom: 4 }} />
              <p style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>Upload document</p>
              <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>PDF up to 1 GB · Multipart streaming</p>
            </div>
          )}
        </div>
      )}

      {/* Tab: Documents — viewer */}
      {tab === 'documents' && activeDoc && (
        <>
          <div style={{ padding: '6px 14px', borderBottom: '0.5px solid #E5E7EB', flexShrink: 0 }}>
            <Button size="sm" onClick={() => setActiveDoc(null)}>
              <i className="ti ti-arrow-left" style={{ fontSize: 11 }} />Back to documents
            </Button>
          </div>
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <DocViewer doc={activeDoc} />
          </div>
        </>
      )}
    </div>
  )
}
