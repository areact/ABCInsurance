import React from 'react'
import { StatusPill } from './StatusPill'

export default {
  title:     'Shared/StatusPill',
  component: StatusPill,
  argTypes: {
    status: {
      control: 'select',
      options: ['Open', 'Pending', 'Under Review', 'Closed', 'Rejected'],
    },
  },
}

const Template = (args) => <StatusPill {...args} />

export const Open        = Template.bind({}); Open.args        = { status: 'Open' }
export const Pending     = Template.bind({}); Pending.args     = { status: 'Pending' }
export const UnderReview = Template.bind({}); UnderReview.args = { status: 'Under Review' }
export const Closed      = Template.bind({}); Closed.args      = { status: 'Closed' }
export const Rejected    = Template.bind({}); Rejected.args    = { status: 'Rejected' }

export const AllStatuses = () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    {['Open', 'Pending', 'Under Review', 'Closed', 'Rejected'].map(s => (
      <StatusPill key={s} status={s} />
    ))}
  </div>
)
