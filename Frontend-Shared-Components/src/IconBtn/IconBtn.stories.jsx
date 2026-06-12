import React from 'react'
import { IconBtn } from './IconBtn'

export default {
  title:     'Shared/IconBtn',
  component: IconBtn,
  argTypes: {
    variant:  { control: 'select', options: ['default', 'danger', 'primary'] },
    disabled: { control: 'boolean' },
  },
}

const Template = (args) => <IconBtn {...args} />

export const Edit    = Template.bind({}); Edit.args    = { icon: 'ti-edit',      title: 'Edit' }
export const Delete  = Template.bind({}); Delete.args  = { icon: 'ti-trash',     title: 'Delete',  variant: 'danger' }
export const Assign  = Template.bind({}); Assign.args  = { icon: 'ti-user-plus', title: 'Assign',  variant: 'primary' }
export const Disabled= Template.bind({}); Disabled.args= { icon: 'ti-trash',     title: 'Disabled',disabled: true, variant: 'danger' }

export const ActionSet = () => (
  <div style={{ display: 'flex', gap: 4 }}>
    <IconBtn icon="ti-edit"      title="Edit"   />
    <IconBtn icon="ti-user-plus" title="Assign" variant="primary" />
    <IconBtn icon="ti-trash"     title="Delete" variant="danger" />
  </div>
)
