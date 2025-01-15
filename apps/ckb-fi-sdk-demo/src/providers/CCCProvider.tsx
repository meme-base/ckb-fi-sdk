import { ReactNode } from 'react'
import { ccc } from '@ckb-ccc/connector-react'
import cccConfig from '../config/ccc'

export function CCCProvider({ children }: { children: ReactNode }) {
  return <ccc.Provider {...cccConfig}>{children}</ccc.Provider>
}
