import React from 'react'
import { EmptyState } from './EmptyState'

export default {
  title:     'Shared/EmptyState',
  component: EmptyState,
}

export const NoDocs     = () => <EmptyState icon="ti-file-off" message="No documents attached yet" />
export const NoClaims   = () => <EmptyState icon="ti-inbox"    message="No claims found" />
export const NoResults  = () => <EmptyState icon="ti-search-off" message="No results for this search" />
