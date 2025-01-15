import { ccc } from '@ckb-ccc/connector-react'
import { IS_DEV_ENV } from './env'

const cccConfig = {
  name: 'ckb-fi', // App name
  // icon: 'https://custom.icon', // App icon
  defaultClient: IS_DEV_ENV
    ? new ccc.ClientPublicTestnet()
    : new ccc.ClientPublicMainnet(), // default client
  connectorProps: {
    className: 'ccc-connector',
    hideMark: true,
    style: {
      '--background': '#fff',
      '--divider': '#eee',
      '--btn-primary': '#f8f8f8',
      '--btn-primary-hover': '#efeeee',
      '--btn-secondary': '#ddd',
      '--btn-secondary-hover': '#ccc',
      '--icon-primary': '#1E1E1E',
      '--icon-secondary': '#666666',
      '--tip-color': '#666',
      color: '#1e1e1e'
    } as React.CSSProperties
  }
}

export default cccConfig
