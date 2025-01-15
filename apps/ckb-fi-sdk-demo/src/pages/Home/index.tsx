import { useState } from 'react'
import { Stack, Typography, Button, Link } from '@mui/material'
import { Bonding, Enum_Env, type I_LaunchParams } from '@ckb-fi/bonding'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useAuthProviderContext } from '@/providers/AuthProvider'
import ConnectButton from '@/components/ConnectButton/Index'
import ModalDirectLaunch from './component/ModalDirectLaunch'
import { BondingItem } from '@/types/module/bonding'
import BondingRow from './component/BondingRow'
import NoData from '@/components/NoData'
import { APP_ENV, IS_DEV_ENV } from '@/config/env'
import { PATH } from '@/constants/path'
import { toast } from 'react-toastify'
import './index.css'

const LOCAL_BONDING_KEY = 'ckb-fi:local_bonding_list'

const BondingInstance = new Bonding({ env: APP_ENV }) // 初始化 Bonding SDK
console.log(BondingInstance)

// const defaultParams: I_LaunchParams = {
//   name: 'The Banana Game',
//   symbol: 'Banana',
//   description: 'We are THE 🍌 game',
//   icon_url: 'https://img.icons8.com/ios/452/ethereum.png',
//   tweet_url: 'https://x.com/thebananagameee/status/1816759320526356680'
// }

const PageHome = () => {
  const { isLogin } = useAuthProviderContext()
  // const [params, setParams] = useState<I_LaunchParams>(defaultParams)
  const [link, setLink] = useState('')
  const [list, setList] = useState<BondingItem[]>(
    JSON.parse(localStorage.getItem(LOCAL_BONDING_KEY) || '[]')
  )

  // const [token, setToken] = useState('')
  // const paramsStr = JSON.stringify(params, null, 2)
  const [showLaunchModal, setShowLaunchModal] = useState(false)

  const handleDirectLaunch = () => {
    setShowLaunchModal(true)
  }
  const handleSuccessLaunch = (data: BondingItem) => {
    setShowLaunchModal(false)
    toast.success('Launch successfully')

    setList(prev => {
      const res = [data, ...prev]
      localStorage.setItem(LOCAL_BONDING_KEY, JSON.stringify(res))
      return res
    })
    setLink(PATH.detail(data.id))
  }
  const handleCloseLaunchModal = () => {
    setShowLaunchModal(false)
  }

  // const handleLogin = async () => {
  //   try {
  //     // 1. 获取待签名内容
  //     const text = await bonding.getSignatureText()

  //     // 2. 签名 (这里需要对接钱包签名,暂时mock)
  //     const mockAddress = '0x123...'
  //     const mockSignature = '0x456...'

  //     // 3. 登录获取token
  //     const token = await bonding.login({
  //       address: mockAddress,
  //       signatureText: text,
  //       signature: mockSignature
  //     })

  //     setToken(token)
  //     toast.success('Login successfully')
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // }

  // const handleLaunch = async () => {
  //   if (!params) return toast.warn('Params is required')

  //   try {
  //     const id = await bonding.launch(params)
  //     toast.success('Launch successfully')
  //     setLink(`${Enum_Env.DEV === 'dev' ? 'dev.' : ''}.ckb.fi/detail/${id}`)
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // }

  // const handleParamsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   try {
  //     setParams(JSON.parse(e.target.value || 'null'))
  //   } catch (error) {
  //     toast.error('Invalid JSON format')
  //   }
  // }

  const handleReset = () => {
    // setParams(defaultParams)
    setLink('')
    setList(() => {
      localStorage.removeItem(LOCAL_BONDING_KEY)
      return []
    })
    toast.success('Reset successfully')
  }

  return (
    <>
      <Stack className="container-bonding" spacing={2}>
        <Stack>
          <Typography variant="h2" className="title">
            CKB-FI Bonding SDK <span>Demo{IS_DEV_ENV ? '@dev' : ''}</span>
          </Typography>
          <Link
            href="https://github.com/meme-base/ckb-fi-sdk/blob/main/README.md"
            target="_blank"
            rel="noreferrer"
            sx={{
              fontSize: 13,
              fontWeight: 400
            }}
          >
            📋 Documentation
          </Link>
        </Stack>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h6">🟢 Launch Bonding</Typography>
            <Button id="btn-reset" onClick={handleReset}>
              ↪️ Reset
            </Button>
            {/* <textarea rows={8} value={paramsStr} onChange={handleParamsChange} /> */}
          </Stack>
          <Stack className="step-col" spacing={1} pl={3}>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing="4px">
                <Typography>Step 1</Typography>
                {isLogin && (
                  <CheckCircleIcon
                    sx={{ fontSize: 16, color: 'success.main' }}
                  />
                )}
              </Stack>
              <ConnectButton />
            </Stack>
            <Stack spacing={1}>
              <Typography>Step 2</Typography>
              <Stack spacing={1}>
                <Button
                  id="btn-launch"
                  disabled={!isLogin}
                  onClick={handleDirectLaunch}
                >
                  🕹️ Launch
                </Button>
                {link && (
                  <pre>
                    <Link target="_blank" href={link} rel="noreferrer">
                      👉🏻 {link}
                    </Link>
                  </pre>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Stack spacing={1}>
            <Typography variant="h6">🔵 Bonding List</Typography>
          </Stack>
          <Stack spacing={1} pl={3}>
            {list.map((item, index) => {
              return <BondingRow key={`${item.id}_${index}`} data={item} />
            })}
            {list.length === 0 && <NoData />}
          </Stack>
        </Stack>
      </Stack>

      {showLaunchModal && (
        <ModalDirectLaunch
          show={showLaunchModal}
          onSuccess={handleSuccessLaunch}
          onClose={handleCloseLaunchModal}
        />
      )}
    </>
  )
}

export default PageHome
