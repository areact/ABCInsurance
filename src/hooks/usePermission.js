import { useAuthStore } from '../store/authStore'

/**
 * Returns true/false for a given capability key.
 * Reads from the RBAC flat-map computed at login.
 * 
 * Usage:
 *   const canDelete = usePermission('canDelete')
 */
export function usePermission(capability) {
  return useAuthStore((s) => s.permissions[capability] ?? false)
}
