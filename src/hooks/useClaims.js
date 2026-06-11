import { useMemo, useState } from 'react'
import { ALL_CLAIMS } from '../data/mockData'

const PAGE_SIZE = 50

export function useClaims() {
  const [search, setSearch]             = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [channelFilter, setChannelFilter] = useState('All')
  const [page, setPage]                 = useState(1)
  const [sortCol, setSortCol]           = useState('id')
  const [sortDir, setSortDir]           = useState('asc')

  const toggleSort = (col) => {
    if (sortCol === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortCol(col)
      setSortDir('asc')
    }
    setPage(1)
  }

  const filtered = useMemo(() => {
    let data = ALL_CLAIMS

    if (search) {
      const s = search.toLowerCase()
      data = data.filter(
        (c) =>
          c.id.toLowerCase().includes(s) ||
          c.customer.toLowerCase().includes(s) ||
          c.adjuster.toLowerCase().includes(s)
      )
    }

    if (statusFilter !== 'All') data = data.filter((c) => c.status === statusFilter)
    if (channelFilter !== 'All') data = data.filter((c) => c.channel === channelFilter)

    return [...data].sort((a, b) => {
      let av = a[sortCol]
      let bv = b[sortCol]
      if (sortCol === 'amount') { av = +av; bv = +bv }
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [search, statusFilter, channelFilter, sortCol, sortDir])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pageData   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const statusCounts = useMemo(() => {
    const counts = {}
    ALL_CLAIMS.forEach((c) => {
      counts[c.status] = (counts[c.status] || 0) + 1
    })
    return counts
  }, [])

  return {
    // Data
    pageData,
    filtered,
    totalPages,
    statusCounts,
    totalRecords: ALL_CLAIMS.length,
    // Filters
    search, setSearch: (v) => { setSearch(v); setPage(1) },
    statusFilter, setStatusFilter: (v) => { setStatusFilter(v); setPage(1) },
    channelFilter, setChannelFilter: (v) => { setChannelFilter(v); setPage(1) },
    // Pagination
    page, setPage,
    // Sorting
    sortCol, sortDir, toggleSort,
    PAGE_SIZE,
  }
}
