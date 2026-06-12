import React from 'react'
import { StatCard } from './StatCard'

export default {
  title:     'Shared/StatCard',
  component: StatCard,
  argTypes: {
    color:   { control: 'select', options: ['blue', 'green', 'amber', 'red', 'gray'] },
    loading: { control: 'boolean' },
  },
}

const Template = (args) => (
  <div style={{ width: 200 }}>
    <StatCard {...args} />
  </div>
)

export const TotalClaims = Template.bind({})
TotalClaims.args = { icon: 'ti-files', label: 'Total Claims', value: '20,000', color: 'blue' }

export const OpenClaims = Template.bind({})
OpenClaims.args = { icon: 'ti-folder-open', label: 'Open', value: '4,231', color: 'green' }

export const InProgress = Template.bind({})
InProgress.args = { icon: 'ti-clock', label: 'In Progress', value: '2,847', color: 'amber' }

export const Loading = Template.bind({})
Loading.args = { icon: 'ti-files', label: 'Total Claims', value: '', color: 'blue', loading: true }

export const Dashboard = () => (
  <div style={{ display: 'flex', gap: 10, width: 600 }}>
    <StatCard icon="ti-files"       label="Total Claims" value="20,000" color="blue" />
    <StatCard icon="ti-folder-open" label="Open"         value="4,231"  color="green" />
    <StatCard icon="ti-clock"       label="In Progress"  value="2,847"  color="amber" />
  </div>
)
