import { useCallback, useEffect, useState } from 'react'
import { IAccountInfo, useAuthProviderContext } from '@/providers/AuthProvider'
import { joyIdPresign, joyIdLogin } from '@/apis/users'
import { useApp } from '@/providers/AppProvider'
import { toast } from 'react-toastify'

interface IUseCccConnnectOption {
  onStateChange?: (
    state: 'connected' | 'disconnected',
    data?: IAccountInfo
  ) => void
}

const useCccConnect = (option?: IUseCccConnnectOption) => {
  const { onStateChange } = option || {}
  const { setAccount, getUserProfile } = useAuthProviderContext()
  const {
    isOpen,
    wallet,
    signer,
    connect: openConnectModal,
    disconnect,
    removeLocalSigner
  } = useApp()
  const [connecting, setConnecting] = useState(false)

  // 连接
  const handleConnect = () => {
    setConnecting(true)
    if (signer) {
      handleSign()
    } else {
      openConnectModal()
    }
  }

  // 连接成功
  const handleSuccess = useCallback(
    (data: IAccountInfo) => {
      setAccount?.(data)
      getUserProfile?.()
      onStateChange?.('connected', data)
      toast.success('Connected')
    },
    [setAccount, getUserProfile, onStateChange]
  )

  // 签名
  const handleSign = useCallback(async () => {
    try {
      if (!signer) {
        setConnecting(false)
        return
      }

      // 1.获取 address
      const address = (await signer.getInternalAddress()) || '' // 真实钱包地址
      const ckbAddress = (await signer.getRecommendedAddress()) || '' // CKB 钱包地址

      // 2.获取 ticket
      const resPreSign = await joyIdPresign(ckbAddress).catch(err => {
        console.log('Presign', err)
        removeLocalSigner()
      })
      if (!resPreSign) {
        setConnecting(false)
        return toast.error('Failed to get ticket')
      }

      // 3.签名
      const resSign = await signer.signMessage(resPreSign.ticket).catch(err => {
        console.log('SignMessage', err)
        toast.error(err.message)
        removeLocalSigner()
      })
      if (!resSign) {
        setConnecting(false)
        return
      }

      // 4.登录
      joyIdLogin({
        verify_type: 'ccc',
        internal_address: address,
        sign_response_data: resSign,
        ticket: resPreSign.ticket
      })
        .then(res => {
          handleSuccess({
            chainId: 0,
            token: res.token,
            signerType: signer.type,
            signerSignType: signer.signType,
            walletName: wallet.name,
            address,
            ckbAddress
          })
          setConnecting(false)
        })
        .catch(err => {
          setConnecting(false)
          removeLocalSigner()
          console.log(err)
        })
    } catch (error) {
      console.log('Try catch error', error)
      setConnecting(false)
      removeLocalSigner()
    }
  }, [signer, handleSuccess, removeLocalSigner])

  // 监听 CCC 关闭
  useEffect(() => {
    if (isOpen) return

    // const isConnected = await signer.isConnected()
    // console.log(isConnected)
    setTimeout(() => {
      if (!wallet && !signer) {
        setConnecting(false)
      }
    }, 300)
  }, [isOpen, signer, wallet])

  useEffect(() => {
    if (signer && connecting) {
      console.log(signer, 'Signer updated')
      handleSign()
    }
  }, [signer, connecting])

  return {
    connecting,
    connect: handleConnect,
    disconnect
  }
}

export default useCccConnect
