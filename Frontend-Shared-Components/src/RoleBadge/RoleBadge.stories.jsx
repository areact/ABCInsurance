import React from 'react'
import { RoleBadge } from './RoleBadge'

export default {
  title:     'Shared/RoleBadge',
  component: RoleBadge,
  argTypes: {
    role: { control: 'select', options: ['adjuster', 'supervisor', 'admin', 'auditor'] },
  },
}

const Template = (args) => <RoleBadge {...args} />

export const Adjuster   = Template.bind({}); Adjuster.args   = { role: 'adjuster' }
export const Supervisor = Template.bind({}); Supervisor.args = { role: 'supervisor' }
export const Admin      = Template.bind({}); Admin.args      = { role: 'admin' }
export const Auditor    = Template.bind({}); Auditor.args    = { role: 'auditor' }

export const AllRoles = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {['adjuster', 'supervisor', 'admin', 'auditor'].map(r => (
      <RoleBadge key={r} role={r} />
    ))}
  </div>
)
