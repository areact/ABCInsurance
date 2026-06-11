import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import { Button, SectionLabel } from '../../components/UI'
import { MOCK_ANNOTATIONS } from '../../data/mockData'
import toast from 'react-hot-toast'

export default function DocViewer({ doc }) {
  const { permissions } = useAuthStore()
  const [tab, setTab]           = useState('view')
  const [loadPct, setLoadPct]   = useState(5)
  const [annotations, setAnnots] = useState(MOCK_ANNOTATIONS)
  const [newAnnot, setNewAnnot]  = useState('')
  const [zoom, setZoom]          = useState(100)

  // Simulate byte-range progressive loading
  useEffect(() => {
    setLoadPct(5)
    setTab('view')
    const interval = setInterval(() => {
      setLoadPct((p) => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return Math.min(100, p + Math.floor(Math.random() * 10) + 3)
      })
    }, 500)
    return () => clearInterval(interval)
  }, [doc.id])

  const pagesLoaded = Math.floor((loadPct / 100) * doc.pages)

  const tabs = [
    { key: 'view',     label: 'View',     blocked: false },
    { key: 'annotate', label: 'Annotate', blocked: !permissions.canAnnotate },
    { key: 'split',    label: 'Split',    blocked: !permissions.canSplit },
    { key: 'merge',    label: 'Merge',    blocked: !permissions.canMerge },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Loading progress */}
      <div style={{ padding: '8px 14px', borderBottom: '0.5px solid #E5E7EB', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
            <i className="ti ti-file-type-pdf" style={{ marginRight: 4, color: '#DC2626' }} />
            {doc.name}
          </span>
          <span style={{ color: '#185FA5', fontWeight: 500, flexShrink: 0, marginLeft: 8 }}>
            {loadPct < 100 ? `${pagesLoaded} / ${doc.pages} pages` : `${doc.pages} pages loaded`}
          </span>
        </div>
        <div style={{ height: 4, background: '#F3F4F6', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#185FA5', borderRadius: 2, width: `${loadPct}%`, transition: 'width 0.5s ease' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <Chip icon="ti-shield-check" label="Byte-range active" />
          <Chip icon="ti-cpu" label="Web Worker" color="green" />
          <Chip icon="ti-database" label={doc.sizeMB >= 1000 ? `${(doc.sizeMB/1000).toFixed(1)} GB` : `${doc.sizeMB} MB`} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid #E5E7EB', flexShrink: 0 }}>
        {tabs.map(({ key, label, blocked }) => (
          <div
            key={key}
            onClick={() => !blocked && setTab(key)}
            style={{
              padding: '7px 14px', fontSize: 12, cursor: blocked ? 'not-allowed' : 'pointer',
              color: tab === key ? '#185FA5' : blocked ? '#CBD5E1' : '#6B7280',
              borderBottom: tab === key ? '2px solid #185FA5' : '2px solid transparent',
              fontWeight: tab === key ? 500 : 400,
              display: 'flex', alignItems: 'center', gap: 4,
              marginBottom: -0.5,
            }}
          >
            {label}
            {blocked && <i className="ti ti-lock" style={{ fontSize: 10 }} />}
          </div>
        ))}
      </div>

      {/* Tab body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px' }}>

        {/* ── VIEW ── */}
        {tab === 'view' && (
          <div>
            {/* Mini toolbar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8,
              padding: '5px 8px', background: '#F9FAFB', borderRadius: 6,
              border: '0.5px solid #E5E7EB',
            }}>
              <button style={iconBtnStyle} onClick={() => setZoom(z => Math.max(50, z - 10))}>
                <i className="ti ti-zoom-out" />
              </button>
              <span style={{ fontSize: 11, minWidth: 36, textAlign: 'center' }}>{zoom}%</span>
              <button style={iconBtnStyle} onClick={() => setZoom(z => Math.min(200, z + 10))}>
                <i className="ti ti-zoom-in" />
              </button>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>Page 1 of {doc.pages}</span>
              {permissions.canExport && (
                <button style={iconBtnStyle} onClick={() => toast.success('Download started')} title="Download">
                  <i className="ti ti-download" />
                </button>
              )}
            </div>

            {/* Simulated PDF canvas */}
            <div style={{
              background: '#fff', border: '0.5px solid #E5E7EB',
              borderRadius: 6, padding: 16,
              transform: `scale(${zoom / 100})`, transformOrigin: 'top left',
              minHeight: 260,
            }}>
              <div style={{ height: 14, background: '#DBEAFE', borderRadius: 3, marginBottom: 12, width: '75%' }} />
              <div style={{ height: 7, background: '#F3F4F6', borderRadius: 3, marginBottom: 6 }} />
              <div style={{ height: 7, background: '#F3F4F6', borderRadius: 3, marginBottom: 6, width: '85%' }} />
              <div style={{ height: 7, background: '#F3F4F6', borderRadius: 3, marginBottom: 6, width: '60%' }} />
              <div style={{ margin: '12px 0', padding: 10, background: '#F8FAFC', borderLeft: '3px solid #3B82F6', borderRadius: '0 4px 4px 0' }}>
                <div style={{ height: 8, background: '#BFDBFE', borderRadius: 2, marginBottom: 6, width: '55%' }} />
                <div style={{ height: 6, background: '#E0E7FF', borderRadius: 2, marginBottom: 4 }} />
                <div style={{ height: 6, background: '#E0E7FF', borderRadius: 2, marginBottom: 4, width: '80%' }} />
                <div style={{ height: 6, background: '#E0E7FF', borderRadius: 2, width: '65%' }} />
              </div>
              <div style={{ height: 7, background: '#F3F4F6', borderRadius: 3, marginBottom: 6 }} />
              <div style={{ height: 7, background: '#F3F4F6', borderRadius: 3, marginBottom: 6, width: '90%' }} />
              <div style={{ height: 7, background: '#F3F4F6', borderRadius: 3, width: '45%' }} />
              {loadPct < 100 && (
                <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: '#9CA3AF' }}>
                  <i className="ti ti-loader" style={{ marginRight: 4 }} />
                  Loading page {pagesLoaded + 1}…
                </div>
              )}
            </div>

            <p style={{ fontSize: 10, color: '#CBD5E1', marginTop: 8, textAlign: 'center' }}>
              PDF.js renders pages via Web Worker — main thread never blocked
            </p>
          </div>
        )}

        {/* ── ANNOTATE ── */}
        {tab === 'annotate' && (
          <div>
            <SectionLabel>Annotations ({annotations.length})</SectionLabel>
            {annotations.map((a) => (
              <div key={a.id} style={{
                background: '#F9FAFB', borderRadius: 6, padding: '8px 10px',
                marginBottom: 6, borderLeft: `3px solid ${a.resolved ? '#86EFAC' : '#93C5FD'}`,
              }}>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <span><i className="ti ti-user" style={{ marginRight: 3 }} />{a.author} · p.{a.page} · {a.createdAt}</span>
                  {a.resolved && <span style={{ color: '#16A34A', fontSize: 10 }}><i className="ti ti-check" /> Resolved</span>}
                </div>
                <div style={{ fontSize: 12 }}>{a.text}</div>
              </div>
            ))}

            <SectionLabel style={{ marginTop: 14 }}>Add annotation</SectionLabel>
            <textarea
              style={{
                width: '100%', padding: '7px 8px',
                border: '0.5px solid #E5E7EB', borderRadius: 6,
                fontSize: 12, resize: 'none', fontFamily: 'inherit',
              }}
              rows={3}
              placeholder="Note on specific page or section..."
              value={newAnnot}
              onChange={(e) => setNewAnnot(e.target.value)}
            />
            <Button
              variant="primary"
              style={{ marginTop: 6 }}
              onClick={() => {
                if (!newAnnot.trim()) return
                setAnnots([{
                  id: `AN-${Date.now()}`, author: 'You',
                  text: newAnnot, page: 1, createdAt: 'just now', resolved: false,
                }, ...annotations])
                setNewAnnot('')
                toast.success('Annotation saved')
              }}
            >
              <i className="ti ti-check" style={{ fontSize: 13 }} />Save annotation
            </Button>
          </div>
        )}

        {/* ── SPLIT ── */}
        {tab === 'split' && (
          <div>
            <SectionLabel>Split document</SectionLabel>
            <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 12 }}>
              Define page ranges. Split intent is sent to Node API — server processes the PDF and returns new document IDs.
            </p>
            {[
              { label: 'Part 1', from: 1, to: Math.floor(doc.pages / 2) },
              { label: 'Part 2', from: Math.floor(doc.pages / 2) + 1, to: doc.pages },
            ].map((part) => (
              <div key={part.label} style={{ background: '#F9FAFB', borderRadius: 8, padding: 10, marginBottom: 8, border: '0.5px solid #E5E7EB' }}>
                <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 6 }}>{part.label}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: '#6B7280' }}>Pages</span>
                  <input style={miniInput} defaultValue={part.from} type="number" />
                  <span style={{ fontSize: 11 }}>to</span>
                  <input style={miniInput} defaultValue={part.to} type="number" />
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>({part.to - part.from + 1} pages)</span>
                </div>
              </div>
            ))}
            <Button variant="primary" onClick={() => toast.success('Split intent sent to Node API')}>
              <i className="ti ti-scissors" style={{ fontSize: 13 }} />Split document
            </Button>
            <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 8 }}>
              Original document is preserved. New document IDs returned on completion.
            </p>
          </div>
        )}

        {/* ── MERGE ── */}
        {tab === 'merge' && (
          <div>
            <SectionLabel>Merge documents</SectionLabel>
            <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>
              Select documents to merge. Merge intent sent to Node API — originals preserved.
            </p>
            {[
              { name: 'Policy_Document_Original.pdf', size: '487 MB', pages: 340 },
              { name: 'Medical_Records_2024.pdf',     size: '823 MB', pages: 612 },
            ].map((d, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: '#F9FAFB', borderRadius: 8, padding: '8px 10px',
                marginBottom: 6, border: '0.5px solid #E5E7EB',
              }}>
                <div style={{ width: 30, height: 30, background: '#E6F1FB', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#185FA5' }}>
                  <i className="ti ti-file-type-pdf" style={{ fontSize: 14 }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>{d.size} · {d.pages} pages</div>
                </div>
                <input type="checkbox" defaultChecked={i === 0} />
              </div>
            ))}
            <Button variant="primary" style={{ marginTop: 8 }} onClick={() => toast.success('Merge intent sent to Node API')}>
              <i className="ti ti-layers-union" style={{ fontSize: 13 }} />Merge selected
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function Chip({ icon, label, color = 'blue' }) {
  const colors = {
    blue:  { background: '#E6F1FB', color: '#185FA5' },
    green: { background: '#DCFCE7', color: '#166534' },
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 500,
      ...colors[color],
    }}>
      <i className={`ti ${icon}`} style={{ fontSize: 11 }} />{label}
    </span>
  )
}

const iconBtnStyle = {
  width: 24, height: 24, border: '0.5px solid #E5E7EB',
  borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: '#fff', color: '#6B7280', cursor: 'pointer', fontSize: 13,
}

const miniInput = {
  width: 64, padding: '4px 8px',
  border: '0.5px solid #E5E7EB', borderRadius: 5,
  fontSize: 12,
}
