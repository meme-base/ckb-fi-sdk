import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react'
import { SignerType, SignerSignType } from '@ckb-ccc/connector-react'
import { AuthManager } from '@/request/authManager'
import Loading from '@/components/Loading'
import { IUserProfile } from '@/types/module/user'
import { getUserInfo } from '@/apis/users'
import { debounce } from '@mui/material'

export interface IAccountInfo {
  token: string
  chainId: number
  signerType: SignerType
  signerSignType: SignerSignType
  walletName: string
  address: string
  ckbAddress: string
}

interface IAuthProviderContext {
  loading: boolean
  isLogin: boolean
  version: string
  address?: string
  ckbAddress?: string
  account: IAccountInfo | null
  profile: IUserProfile | null
  getUserProfile?: () => void
  setVersion?: (version: string) => void
  setAccount?: (data: IAccountInfo, isFromFarcaster?: boolean) => void
  clearAccount?: () => void
}

const DefaultValue = {
  loading: true,
  isLogin: false,
  version: '2',
  account: null,
  profile: null
}

const AuthProviderContext = createContext<IAuthProviderContext>(DefaultValue)

export const useAuthProviderContext = () => {
  const context = useContext(AuthProviderContext)
  if (!context)
    throw new Error('useAuthProviderContext must be used inside AuthProvider')
  return context
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { contractVersion, accountInfo } = AuthManager
  const [version, setVersion] = useState('2')
  const [account, setAccount] = useState<IAccountInfo | null>(null)
  const [profile, setProfile] = useState<IUserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(false)

  const getUserProfile = async () => {
    getUserInfo()
      .then(res => {
        setProfile(res)
        return res
      })
      .catch(error => {
        setLoading(false)
        console.error(error)
      })
  }
  const handleSetContractVersion = async (version: string) => {
    setLoading(true)
    setVersion(version)
    AuthManager.setContractVersion(version)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
  const handleSetAccount = async (
    data: IAccountInfo,
    _isFromFarcaster = false
  ) => {
    setAccount(data)
    AuthManager.setSession(data)
    setIsLogin(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
  const handleClearAccount = () => {
    setAccount(null)
    setProfile(null)
    AuthManager.clearSession()
    setIsLogin(false)
  }

  useEffect(
    debounce(() => {
      const init = async () => {
        setLoading(true)
        await getUserProfile()
        setAccount(accountInfo)
        setIsLogin(true)
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
      handleSetContractVersion(contractVersion)
      if (!accountInfo) return

      init()
    }, 100),
    [accountInfo]
  )

  if (loading) return <Loading height="100vh" />

  return (
    <AuthProviderContext.Provider
      value={{
        isLogin,
        loading,
        version,
        address: account?.address || '',
        ckbAddress: account?.ckbAddress || '',
        account,
        profile,
        getUserProfile,
        setVersion: handleSetContractVersion,
        setAccount: handleSetAccount,
        clearAccount: handleClearAccount
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  )
}

export default AuthProvider
