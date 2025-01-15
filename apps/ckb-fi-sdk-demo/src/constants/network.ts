/* eslint-disable @typescript-eslint/no-unused-vars */
import { IS_PROD_ENV } from '@/config/env'
import { base, baseSepolia } from 'wagmi/chains'

// BaseNetwork
// export const NETWORK_MAP = {
//   [base.id]: {
//     chainId: base.id,
//     networkId: 8453,
//     chainName: 'Base Mainnet',
//     nativeCurrency: {
//       name: 'ETH',
//       symbol: 'ETH',
//       decimals: 18
//     },
//     rpcUrls: ['https://mainnet.base.org'],
//     blockExplorerUrls: ['https://basescan.org']
//   },
//   [baseSepolia.id]: {
//     chainId: baseSepolia.id,
//     networkId: 84532,
//     chainName: 'Base Testnet (Sepolia)',
//     nativeCurrency: {
//       name: 'ETH',
//       symbol: 'ETH',
//       decimals: 18
//     },
//     rpcUrls: ['https://sepolia.base.org'],
//     blockExplorerUrls: ['https://sepolia-explorer.base.org']
//   }
// }

// export const CURRENT_BASE_NETWORK = IS_PROD_ENV ? base : baseSepolia
// export const CURRENT_BASE_NETWORK_ID = IS_PROD_ENV ? base.id : baseSepolia.id
export const CURRENT_BASE_NETWORK = IS_PROD_ENV ? base : baseSepolia
export const CURRENT_BASE_NETWORK_ID = 0
