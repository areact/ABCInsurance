import React from 'react'
import { Button } from './Button'

export default {
  title:     'Shared/Button',
  component: Button,
  argTypes: {
    variant:  { control: 'select', options: ['default', 'primary', 'danger', 'ghost'] },
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
}

const Template = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = { children: 'Default', variant: 'default' }

export const Primary = Template.bind({})
Primary.args = { children: 'Save claim', variant: 'primary' }

export const Danger = Template.bind({})
Danger.args = { children: 'Delete', variant: 'danger' }

export const Ghost = Template.bind({})
Ghost.args = { children: 'Cancel', variant: 'ghost' }

export const Small = Template.bind({})
Small.args = { children: 'Back', size: 'sm' }

export const Large = Template.bind({})
Large.args = { children: 'Sign in', variant: 'primary', size: 'lg' }

export const Disabled = Template.bind({})
Disabled.args = { children: 'Unavailable', disabled: true }

export const WithIcon = Template.bind({})
WithIcon.args = {
  variant: 'primary',
  children: (
    <>
      <i className="ti ti-upload" style={{ fontSize: 12 }} />
      Upload document
    </>
  ),
}

export const AllVariants = () => (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
    <Button variant="default">Default</Button>
    <Button variant="primary">Primary</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="ghost">Ghost</Button>
    <Button disabled>Disabled</Button>
  </div>
)
