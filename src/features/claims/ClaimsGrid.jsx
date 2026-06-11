import React, { memo } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { useClaims } from '../../hooks/useClaims'
import { StatusPill, StatCard, IconBtn, Button } from '../../components/UI'
import toast from 'react-hot-toast'

const STATUSES  = ['All', 'Open', 'Pending', 'Under Review', 'Closed', 'Rejected']
const CHANNELS  = ['All', 'Email', 'SFTP', 'Portal', 'Fax', 'API']
const STATUS_COLOR = { Open: 'green', Pending: 'amber', 'Under Review': 'blue', Closed: '', Rejected: 'red' }

// Memoised row — only re-renders if this specific claim changes
const ClaimRow = memo(function ClaimRow({ claim, isSelected, onSelect, permissions }) {
  return (
    <tr
      onClick={() => onSelect(claim)}
      style={{
        cursor: 'pointer',
        background: isSelected ? '#EFF6FF' : 'transparent',
        transition: 'background 0.1s',
      }}
    >
      <td style={{ color: '#185FA5', fontWeight: 500, padding: '7px 12px', borderBottom: '0.5px solid #F3F4F6', whiteSpace: 'nowrap' }}>
        {claim.id}
      </td>
      <td style={tdStyle}>{claim.customer}</td>
      <td style={tdStyle}><StatusPill status={claim.status} /></td>
      <td style={{ ...tdStyle, fontVariantNumeric: 'tabular-nums' }}>${claim.amount.toLocaleString()}</td>
      <td style={tdStyle}>{claim.channel}</td>
      <td style={tdStyle}>{claim.adjuster}</td>
      <td style={{ ...tdStyle, color: '#9CA3AF' }}>{claim.date}</td>
      <td style={{ ...tdStyle, width: 95 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', gap: 3 }}>
          <IconBtn icon="ti-edit"      title="Edit"    disabled={!permissions.canEdit}
            onClick={() => toast.success(`Editing ${claim.id}`)} />
          <IconBtn icon="ti-trash"     title="Delete"  disabled={!permissions.canDelete} variant="danger"
            onClick={() => toast.success(`Deleted ${claim.id}`)} />
          <IconBtn icon="ti-user-plus" title="Assign"  disabled={!permissions.canAssign}
            onClick={() => toast.success(`Assigning ${claim.id}`)} />
        </div>
      </td>
    </tr>
  )
})

const tdStyle = {
  padding: '7px 12px',
  borderBottom: '0.5px solid #F3F4F6',
  whiteSpace: 'nowrap',
  fontSize: 12,
  color: '#111827',
}

export default function ClaimsGrid() {
  const { user, permissions } = useAuthStore()
  const { selectedClaim, setSelectedClaim } = useUIStore()

  const {
    pageData, filtered, totalPages, statusCounts, totalRecords,
    search, setSearch,
    statusFilter, setStatusFilter,
    channelFilter, setChannelFilter,
    page, setPage,
    sortCol, sortDir, toggleSort,
    PAGE_SIZE,
  } = useClaims()

  const SortTh = ({ col, label, width }) => (
    <th
      onClick={() => toggleSort(col)}
      style={{
        padding: '7px 12px',
        textAlign: 'left',
        fontWeight: 500,
        fontSize: 11,
        color: '#6B7280',
        background: '#F9FAFB',
        borderBottom: '0.5px solid #E5E7EB',
        cursor: 'pointer',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width,
      }}
    >
      {label}
      <span style={{ marginLeft: 3, fontSize: 10, opacity: 0.5 }}>
        {sortCol === col ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
      </span>
    </th>
  )

  const pageNumbers = () => {
    const total = Math.min(5, totalPages)
    const start = Math.max(1, Math.min(totalPages - total + 1, page - 2))
    return Array.from({ length: total }, (_, i) => start + i)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '10px 16px', background: '#fff', borderBottom: '0.5px solid #E5E7EB', flexShrink: 0 }}>
        <div style={{ fontWeight: 500, fontSize: 14 }}>Claims Dashboard</div>
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>
          {filtered.length.toLocaleString()} of {totalRecords.toLocaleString()} claims
          · Cursor pagination · Virtualised render
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 8, padding: '8px 16px', background: '#fff', borderBottom: '0.5px solid #E5E7EB', flexShrink: 0, flexWrap: 'wrap' }}>
        {Object.entries(statusCounts).map(([s, n]) => (
          <StatCard key={s} label={s} value={n.toLocaleString()} color={STATUS_COLOR[s]} />
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px', background: '#fff', borderBottom: '0.5px solid #E5E7EB', flexShrink: 0 }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
          <i className="ti ti-search" style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#9CA3AF' }} />
          <input
            style={{ width: '100%', padding: '5px 8px 5px 28px', border: '0.5px solid #E5E7EB', borderRadius: 6, fontSize: 12 }}
            placeholder="Search ID, customer, adjuster..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select style={selectStyle} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>

        <select style={selectStyle} value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}>
          {CHANNELS.map((c) => <option key={c}>{c}</option>)}
        </select>

        <div style={{ flex: 1 }} />

        {permissions.canUpload && (
          <Button variant="primary" onClick={() => toast.success('Upload — connects to Node multipart endpoint')}>
            <i className="ti ti-upload" style={{ fontSize: 13 }} />Upload
          </Button>
        )}
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr>
              <SortTh col="id"       label="Claim ID"  width={110} />
              <SortTh col="customer" label="Customer"  width={140} />
              <SortTh col="status"   label="Status"    width={120} />
              <SortTh col="amount"   label="Amount"    width={100} />
              <SortTh col="channel"  label="Channel"   width={90}  />
              <SortTh col="adjuster" label="Adjuster"  width={120} />
              <SortTh col="date"     label="Date"      width={110} />
              <th style={{ ...thStyle, width: 95, cursor: 'default' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((claim) => (
              <ClaimRow
                key={claim.id}
                claim={claim}
                isSelected={selectedClaim?.id === claim.id}
                onSelect={setSelectedClaim}
                permissions={permissions}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '7px 16px', background: '#fff', borderTop: '0.5px solid #E5E7EB', flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, color: '#6B7280' }}>
          Showing {((page - 1) * PAGE_SIZE + 1).toLocaleString()}–{Math.min(page * PAGE_SIZE, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <PageBtn onClick={() => setPage((p) => Math.max(1, p - 1))}><i className="ti ti-chevron-left" /></PageBtn>
          {pageNumbers().map((pg) => (
            <PageBtn key={pg} active={pg === page} onClick={() => setPage(pg)}>{pg}</PageBtn>
          ))}
          <PageBtn onClick={() => setPage((p) => Math.min(totalPages, p + 1))}><i className="ti ti-chevron-right" /></PageBtn>
        </div>
      </div>
    </div>
  )
}

function PageBtn({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 26, height: 26,
        border: '0.5px solid #E5E7EB',
        borderRadius: 5,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        fontSize: 12,
        background: active ? '#1B2A4A' : '#fff',
        color: active ? '#fff' : '#6B7280',
        borderColor: active ? '#1B2A4A' : '#E5E7EB',
      }}
    >
      {children}
    </button>
  )
}

const thStyle = {
  padding: '7px 12px', textAlign: 'left',
  fontWeight: 500, fontSize: 11, color: '#6B7280',
  background: '#F9FAFB', borderBottom: '0.5px solid #E5E7EB',
  position: 'sticky', top: 0, zIndex: 1,
}

const selectStyle = {
  padding: '5px 8px', border: '0.5px solid #E5E7EB',
  borderRadius: 6, fontSize: 12, background: '#fff', color: '#111827',
}
