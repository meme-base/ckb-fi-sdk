import { useState } from 'react'
import { Stack, Typography, Button, Link } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useAuthProviderContext } from '@/providers/AuthProvider'
import ConnectButton from '@/components/ConnectButton/Index'
import ModalDirectLaunch from './component/ModalDirectLaunch'
import { BondingItem } from '@/types/module/bonding'
import BondingRow from './component/BondingRow'
import NoData from '@/components/NoData'
import { HOST, HOST_CONFIG } from '@/config/host'
import { IS_DEV_ENV } from '@/config/env'
import { PATH } from '@/constants/path'
import { toast } from 'react-toastify'
import './index.css'

const LOCAL_BONDING_KEY = 'ckb-fi-web-demo:local_bonding_list'

const WebDemo = () => {
  const { isLogin } = useAuthProviderContext()
  const [link, setLink] = useState('')
  const [list, setList] = useState<BondingItem[]>(
    JSON.parse(localStorage.getItem(LOCAL_BONDING_KEY) || '[]')
  )
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
  const handleReset = () => {
    setLink('')
    setList(() => {
      localStorage.removeItem(LOCAL_BONDING_KEY)
      return []
    })
    toast.success('Reset successfully')
  }

  return (
    <>
      <Stack className="web-demo-container" spacing={2}>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" className="title">
              Web Demo <span>{IS_DEV_ENV ? '@dev' : ''}</span>
            </Typography>
            <Button id="btn-reset" onClick={handleReset}>
              ↪️ Reset
            </Button>
          </Stack>
          <Typography
            variant="body1"
            sx={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.6)'
            }}
          >
            This example is extracted from{' '}
            <Link href={HOST_CONFIG.prod} target="_blank" rel="noreferrer">
              {HOST_CONFIG.prod}
            </Link>{' '}
            and is only used to demonstrate the complete functionality.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h6">🟢 Launch Bonding</Typography>
          </Stack>
          <Stack className="step-col" spacing={1} pl={3}>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>Step 1</Typography>{' '}
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.6)'
                  }}
                >
                  (connectWallet + getTicket + signMessage + login)
                </Typography>
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

export default WebDemo
