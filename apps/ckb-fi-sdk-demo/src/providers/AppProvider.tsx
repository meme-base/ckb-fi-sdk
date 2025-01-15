import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { useAuthProviderContext } from './AuthProvider'
import { ccc } from '@ckb-ccc/connector-react'

export const APP_CONTEXT = createContext<
  | {
      isOpen: boolean
      client: ccc.Client
      wallet: ccc.Wallet
      signer: ccc.Signer
      connect: () => void
      disconnect: () => void
      removeLocalSigner: () => void
    }
  | undefined
>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const cccInstance = ccc.useCcc()
  const { version } = useAuthProviderContext()
  const { isOpen, client, wallet, signerInfo, open, disconnect } = cccInstance
  const [privateKeySigner, setPrivateKeySigner] = useState<
    ccc.SignerCkbPrivateKey | undefined
  >(undefined)
  const signer = (privateKeySigner ?? signerInfo?.signer) as ccc.Signer

  // console.log(cccInstance, 'cccInstance', signer)

  const handleDisconnect = () => {
    if (signerInfo) {
      disconnect()
    } else {
      setPrivateKeySigner(undefined)
    }
  }

  const removeLocalSigner = () => {
    console.log('removeLocalSigner', signer, cccInstance)
    cccInstance.disconnect()
  }

  useEffect(() => {
    if (
      !privateKeySigner ||
      privateKeySigner.client.addressPrefix === client.addressPrefix
    ) {
      return
    }

    setPrivateKeySigner(
      new ccc.SignerCkbPrivateKey(client, privateKeySigner.privateKey)
    )
  }, [privateKeySigner, client])

  return (
    <APP_CONTEXT.Provider
      key={version}
      value={{
        isOpen,
        client,
        wallet: wallet as ccc.Wallet,
        signer,
        connect: open,
        disconnect: handleDisconnect,
        removeLocalSigner
      }}
    >
      {children}
    </APP_CONTEXT.Provider>
  )
}

export function useApp() {
  const context = useContext(APP_CONTEXT)
  if (!context) {
    throw Error(
      'The component which invokes the useApp hook should be placed in a AppProvider.'
    )
  }
  return context
}
