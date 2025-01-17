import { useEffect, useMemo, useRef, useState } from 'react'
import { Stack, Typography, Button, Link } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useAuthProviderContext } from '@/providers/AuthProvider'
import ConnectButton from '@/components/ConnectButton/Index'
import { Bonding, I_LaunchParams } from '@ckb-fi/bonding'
import { useApp } from '@/providers/AppProvider'
import { PATH } from '@/constants/path'
import { APP_ENV } from '@/config/env'
import { toast } from 'react-toastify'
import './index.css'

// Only for test
const defaultParams: I_LaunchParams = {
  bonding: {
    name: 'The Banana Game',
    symbol: 'Banana',
    desc: 'We are THE 🍌 game',
    icon_url:
      'https://img.memebase.co/bondings/f40af00c-f33d-409a-b940-1d4592afcf2f.png',
    tokenized_url: 'https://x.com/thebananagameee/status/1816759320526356680'
  }
}

const SDKDemo = () => {
  const { ckbAddress } = useAuthProviderContext()
  const { signer } = useApp()
  const [ticket, setTicket] = useState('')
  const [resSignature, setResSignature] = useState('')
  const [token, setToken] = useState('')
  const [params, setParams] = useState(JSON.stringify(defaultParams, null, 2))
  const [link, setLink] = useState('')
  const [resLaunch, setResLaunch] = useState('')
  const [loading, setLoading] = useState(false)
  const instance = useRef<any>(null)
  const refParams = useRef<HTMLTextAreaElement | null>(null)

  const handleGetTicket = async () => {
    const res = await instance.current.getTicket(ckbAddress)
    setTicket(res)
  }
  const handleSignMessage = async () => {
    const res = await instance.current.signMessage({
      signer,
      ticket
    })
    setResSignature(res)
  }
  const handleLogin = async () => {
    const token = await instance.current.login({
      verify_type: 'ccc',
      ticket,
      internal_address: ckbAddress,
      sign_response_data: resSignature
    })

    setToken(token)
  }
  const handleLaunch = async () => {
    try {
      setLoading(true)
      const data = await instance.current.launch(
        JSON.parse(refParams.current!.value)
      )
      toast.success('Launch successfully')
      setLink(PATH.detail(data.id))
      setResLaunch(JSON.stringify(data, null, 2))
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      if (err instanceof Error) {
        throw new Error(`Launch failed: ${err.message}`)
      }
      toast.error('Launch failed')
    }
  }
  const handleReset = () => {
    setTicket('')
    setToken('')
    setResSignature('')
    setResLaunch('')
    setLink('')
    setLoading(false)
    const params = JSON.stringify(defaultParams, null, 2)
    setParams(params)
    refParams.current!.value = params
    toast.success('Reset successfully')
  }

  useEffect(() => {
    instance.current = new Bonding({ env: APP_ENV }) // Initialize Bonding SDK
    console.log(instance.current, 'SDK Instance')

    if (!instance.current?.token) return
    setToken(instance.current.token)
  }, [])

  return (
    <Stack className="sdk-demo-container" spacing={2}>
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3" className="title">
            SDK Demo <span>@{APP_ENV}</span>
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
          This example is mainly used to demonstrate the functionality of the
          SDK version for easy integration elsewhere.
          <Link
            href="https://github.com/meme-base/ckb-fi-sdk/blob/main/README.md"
            target="_blank"
            rel="noreferrer"
            sx={{
              ml: 1,
              fontSize: 13,
              fontWeight: 400
            }}
          >
            📋 README.md
          </Link>
        </Typography>
      </Stack>
      <Stack spacing={1}>
        <Stack className="step-col" spacing={1}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography flexShrink={0}>Step 1:</Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)'
                }}
              >
                Connect the wallet to obtain the CKB address
              </Typography>
              {ckbAddress && (
                <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
              )}
            </Stack>
            <ConnectButton />
            {ckbAddress && <pre>{ckbAddress}</pre>}
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography flexShrink={0}>Step 2:</Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)'
                }}
              >
                Get the ticket used for signing
              </Typography>
              {(ticket || token) && (
                <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
              )}
            </Stack>
            <Stack spacing={1}>
              {!ticket && !token && (
                <Button
                  disabled={!ckbAddress || !!ticket}
                  onClick={handleGetTicket}
                >
                  Get Ticket
                </Button>
              )}
              {ticket && <pre>{ticket}</pre>}
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography flexShrink={0}>Step 3:</Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)'
                }}
              >
                Sign the ticket using your provider
              </Typography>
              {(resSignature || token) && (
                <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
              )}
            </Stack>
            <Stack spacing={1}>
              {!resSignature && !token && (
                <Button
                  disabled={!ckbAddress || !ticket || !!resSignature}
                  onClick={handleSignMessage}
                >
                  Sign Message
                </Button>
              )}
              {resSignature && (
                <pre>{JSON.stringify(resSignature, null, 2)}</pre>
              )}
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography flexShrink={0}>Step 4:</Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)'
                }}
              >
                Log in to ckb.fi
              </Typography>
              {token && (
                <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
              )}
            </Stack>
            <Stack spacing={1}>
              {!token && (
                <Button
                  disabled={!ckbAddress || !ticket || !resSignature}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
              {token && <pre>{token}</pre>}
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography flexShrink={0}>Step 5:</Typography>
                {link && (
                  <CheckCircleIcon
                    sx={{ fontSize: 16, color: 'success.main' }}
                  />
                )}
              </Stack>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)'
                }}
              >
                Launch your memecoin using the following parameters. Icon_url
                needs to upload images and obtain URLs by yourself, which can be
                referred to:
                <br />
                <b>
                  <Link
                    target="_blank"
                    href="https://github.com/meme-base/ckb-fi-sdk/blob/main/apps/ckb-fi-sdk-demo/src/components/Upload/Uploader.tsx"
                  >
                    /apps/ckb-fi-sdk-demo/src/components/Upload/Uploader.tsx
                  </Link>
                </b>
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <textarea ref={refParams} rows={9} defaultValue={params} />
              {!link && (
                <LoadingButton
                  id="btn-launch"
                  loading={loading}
                  disabled={!token || !params}
                  onClick={handleLaunch}
                >
                  🚀 Launch
                </LoadingButton>
              )}
              {link && (
                <pre>
                  <Link target="_blank" href={link} rel="noreferrer">
                    👉🏻 {link}
                  </Link>
                  <br />
                  {resLaunch}
                </pre>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default SDKDemo
