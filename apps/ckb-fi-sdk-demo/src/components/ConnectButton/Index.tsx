import { MouseEvent, useCallback, useState } from 'react'
import {
  Stack,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  SxProps
} from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
// import ArrowRightIcon from '@mui/icons-material/ArrowRight'
// import PersonIcon from '@mui/icons-material/Person'
import LoadingButton from '@mui/lab/LoadingButton'
import { EnsAvatar } from '@/components/EnsAvatar'
import Logout from '@mui/icons-material/Logout'
import { useAuthProviderContext } from '@/providers/AuthProvider'
import { ellipsisLabel } from '@/utils/common'
import { COMMON_EVENTS } from '@/enum/events'
import useCccConnect from './useCccConnect'
import { useEvent } from '@/hooks/useEvent'
import useMedia from '@/hooks/useMedia'
import { PATH } from '@/constants/path'

const ConnectButton = ({ sx = {} }: { sx?: SxProps }) => {
  const { isXs } = useMedia()
  const { loading, isLogin, profile, account, clearAccount } =
    useAuthProviderContext()
  const { connecting, connect, disconnect } = useCccConnect()
  const { name, avatar_url, had_set_profile } = profile || {}
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const showUserMenu = Boolean(anchorEl)
  // const navigate = useNavigate()

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // 重置登录状态（包括钱包和用户token）
  const resetConnectStatus = useCallback(
    (returnHome = false) => {
      clearAccount?.()

      if (!returnHome) return

      // // 跳转到首页
      // if (location.pathname === PATH.profile) {
      //   setTimeout(() => {
      //     navigate(PATH.root)
      //   }, 1500)
      // }
    },
    [clearAccount]
  )
  const handleLogout = () => {
    disconnect()
    resetConnectStatus(true)
    clearAccount?.()
    // setAnchorEl(null)
  }

  useEvent(COMMON_EVENTS.SESSION_EXPIRED, () => {
    resetConnectStatus()
  })

  if (loading) return null

  return (
    <>
      <Stack direction="row" alignItems="center" sx={sx}>
        {isLogin ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              // onClick={handleClick}
              sx={{
                cursor: 'pointer',
                height: { xs: '28px', md: '32px' }
              }}
            >
              <EnsAvatar
                address={account?.address}
                imageUrl={
                  had_set_profile && avatar_url
                    ? avatar_url
                    : // @ts-ignore
                      account?.ensAvatar
                }
                size={28}
              />
              <Typography
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                {had_set_profile && name
                  ? name
                  : ellipsisLabel(account?.address || '', { tailLen: 6 })}
              </Typography>
              {/* <ArrowRightIcon
                sx={{
                  display: { xs: 'none', md: 'block' },
                  ml: '0!important',
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: 500
                }}
              /> */}
              <Logout
                sx={{ fontSize: 18, color: '#fff' }}
                onClick={handleLogout}
              />
            </Stack>
          </Stack>
        ) : (
          <LoadingButton
            className="btn-connect-wallet"
            loading={connecting}
            sx={{
              minWidth: 150,
              px: '20px',
              py: '6px',
              fontWeight: 600,
              color: '#333',
              background: '#fff',
              '&:hover': {
                background: '#eee'
              },
              '&[disabled]': {
                background: '#fff'
              }
            }}
            onClick={connect}
          >
            <AccountBalanceWalletIcon sx={{ mr: '4px', fontSize: 18 }} />
            Connect
          </LoadingButton>
        )}
      </Stack>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={showUserMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
      >
        {/* <MenuItem onClick={handleClickProfile}>
          <ListItemIcon>
            <PersonIcon fontSize="small" sx={{ color: '#fff' }} />
          </ListItemIcon>
          Profile
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: '#fff' }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default ConnectButton
