// Load Tabler Icons so all stories render icons correctly
const preview = {
  decorators: [
    (Story) => {
      // Inject Tabler Icons CDN if not already present
      if (!document.querySelector('#tabler-icons')) {
        const link = document.createElement('link')
        link.id   = 'tabler-icons'
        link.rel  = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css'
        document.head.appendChild(link)
      }
      return Story()
    },
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F8FAFC' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
}
export default preview
