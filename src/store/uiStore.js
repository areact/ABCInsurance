import { create } from 'zustand'

export const useUIStore = create((set) => ({
  selectedClaim: null,
  sidebarCollapsed: false,

  setSelectedClaim: (claim) => set({ selectedClaim: claim }),
  clearSelectedClaim: () => set({ selectedClaim: null }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}))
