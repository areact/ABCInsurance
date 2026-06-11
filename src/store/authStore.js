import { create } from 'zustand'

// Role definitions — maps to backend permission model
export const ROLE_USERS = {
  adjuster: {
    name: 'Sarah Chen',
    email: 'sarah.chen@abcinsurance.com',
    role: 'adjuster',
    initials: 'SC',
  },
  supervisor: {
    name: 'Mike Torres',
    email: 'mike.torres@abcinsurance.com',
    role: 'supervisor',
    initials: 'MT',
  },
  admin: {
    name: 'Priya Patel',
    email: 'priya.patel@abcinsurance.com',
    role: 'admin',
    initials: 'PP',
  },
  auditor: {
    name: 'James Wilson',
    email: 'james.wilson@abcinsurance.com',
    role: 'auditor',
    initials: 'JW',
  },
}

// Flat permission map — computed once from role at login
// In production: derived from /api/auth/me response
function buildPermissions(role) {
  return {
    canEdit:     ['adjuster', 'supervisor', 'admin'].includes(role),
    canDelete:   ['supervisor', 'admin'].includes(role),
    canAssign:   ['supervisor', 'admin'].includes(role),
    canUpload:   ['adjuster', 'supervisor', 'admin'].includes(role),
    canAnnotate: ['adjuster', 'supervisor', 'admin'].includes(role),
    canMerge:    ['supervisor', 'admin'].includes(role),
    canSplit:    ['supervisor', 'admin'].includes(role),
    canExport:   ['adjuster', 'supervisor', 'admin'].includes(role),
  }
}

export const useAuthStore = create((set) => ({
  user: null,
  permissions: {},

  login: (role) => {
    const user = ROLE_USERS[role]
    const permissions = buildPermissions(role)
    // In production: store JWT from API response
    localStorage.setItem('demo_role', role)
    set({ user, permissions })
  },

  logout: () => {
    localStorage.removeItem('demo_role')
    set({ user: null, permissions: {} })
  },
}))
