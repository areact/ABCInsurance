// Deterministic seeded random — same data every run
function seededRand(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const STATUSES = ['Open', 'Pending', 'Under Review', 'Closed', 'Rejected']
const CHANNELS = ['Email', 'SFTP', 'Portal', 'Fax', 'API']
const PRIORITIES = ['High', 'Medium', 'Normal']

const ADJUSTERS = [
  'Sarah Chen', 'Mike Torres', 'Priya Patel',
  'James Wilson', 'Aisha Rahman', 'Tom Nguyen', 'Laura Sims',
]

const CUSTOMERS = [
  'John Hartley', 'Maria Santos', 'David Kim', 'Emma Johnson',
  'Robert Okafor', 'Fatima Al-Hassan', 'Carlos Rivera', 'Lily Zhang',
  'Mohammed Farooq', 'Anne Murphy', 'Rajesh Gupta', 'Ingrid Larsen',
  'Thomas Osei', 'Nina Petrova', 'Lucas Fernandez', 'Grace Adeyemi',
  'Samuel Park', 'Chloe Dubois', 'Ivan Petrov', 'Amara Diallo',
]

const DOC_NAMES = [
  'Policy_Document_Original.pdf',
  'Medical_Records_2024.pdf',
  'Accident_Report_Final.pdf',
  'Evidence_Photos_Bundle.pdf',
  'Witness_Statement_Signed.pdf',
  'Hospital_Invoice_Complete.pdf',
]

export function generateClaims(count = 20000) {
  const claims = []
  for (let i = 1; i <= count; i++) {
    const r1 = seededRand(i * 37 + 13)
    const r2 = seededRand(i * 53 + 7)
    const r3 = seededRand(i * 17 + 29)

    const year = 2023 + Math.floor(r1() * 2)
    const month = Math.floor(r2() * 12)
    const day = Math.floor(r3() * 28) + 1
    const date = new Date(year, month, day)

    const docCount = Math.floor(r1() * 4) + 1
    const docs = Array.from({ length: docCount }, (_, di) => ({
      id: `DOC-${String(i).padStart(5, '0')}-${di + 1}`,
      name: DOC_NAMES[Math.floor(r2() * DOC_NAMES.length)],
      sizeMB: Math.floor(r3() * 900) + 100,   // 100MB – 1GB
      pages: Math.floor(r1() * 600) + 40,
      uploadedAt: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }))

    claims.push({
      id: `CLM-${String(i).padStart(5, '0')}`,
      customer: CUSTOMERS[Math.floor(r1() * CUSTOMERS.length)],
      status: STATUSES[Math.floor(r2() * STATUSES.length)],
      channel: CHANNELS[Math.floor(r3() * CHANNELS.length)],
      amount: Math.floor(r1() * 95000) + 5000,
      adjuster: ADJUSTERS[Math.floor(r2() * ADJUSTERS.length)],
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      priority: PRIORITIES[Math.floor(r3() * PRIORITIES.length)],
      docs,
    })
  }
  return claims
}

// Generate once, export as singleton — no regeneration on re-import
export const ALL_CLAIMS = generateClaims(20000)

export const MOCK_ANNOTATIONS = [
  {
    id: 'AN-001',
    author: 'Sarah Chen',
    text: 'Page 12: Discrepancy in reported incident date vs hospital admission. Needs follow-up with claimant.',
    page: 12,
    createdAt: '2h ago',
    resolved: false,
  },
  {
    id: 'AN-002',
    author: 'Mike Torres',
    text: 'Section 3.2 coverage limits confirmed. Approved up to $50,000 per policy terms.',
    page: 28,
    createdAt: '1d ago',
    resolved: true,
  },
  {
    id: 'AN-003',
    author: 'Priya Patel',
    text: 'Missing witness statement. Requested from claimant on 15 Jan — follow up if not received by 22 Jan.',
    page: 45,
    createdAt: '3d ago',
    resolved: false,
  },
]
