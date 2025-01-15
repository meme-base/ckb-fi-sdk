import { Box, Stack, Typography, Link } from '@mui/material'
import { BondingItem } from '@/types/module/bonding'
import { LogoImg } from '@/constants/file'
import { PATH } from '@/constants/path'

const BondingRow = ({ data }: { data: BondingItem }) => {
  const { id, name, icon_url, symbol } = data

  const handleClick = () => {
    window.open(PATH.detail(id))
  }

  return (
    <Stack
      component="li"
      className="flex w-full justify-between items-center cursor-pointer p-2 text-xs rounded bg-gray-900 hover:bg-gray-800"
      onClick={handleClick}
    >
      <Stack width="100%" direction="row" alignItems="center" spacing={1}>
        <Box
          component="img"
          src={icon_url || LogoImg}
          onError={e => {
            // @ts-ignore
            e.target.src = LogoImg
          }}
          alt={name}
          sx={{
            flexShrink: 0,
            width: 36,
            height: 36,
            objectFit: 'cover',
            background: '#262626',
            borderRadius: '4px'
          }}
        />
        <Stack
          justifyContent={symbol ? 'space-between' : 'center'}
          sx={{
            width: icon_url ? 'calc(100% - 40px)' : '100%',
            height: 30
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography
              className="ellipsis"
              title={name}
              sx={{
                lineHeight: 1,
                fontSize: 12,
                color: '#fff'
              }}
            >
              {name}
            </Typography>
            {id && (
              <Typography
                sx={{
                  lineHeight: 1,
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.6)'
                }}
              >
                #{id}
              </Typography>
            )}
          </Stack>
          {symbol && (
            <Typography
              className="ellipsis"
              sx={{
                lineHeight: 1,
                fontSize: 10,
                color: 'orange'
              }}
            >
              {symbol.toUpperCase()}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default BondingRow
