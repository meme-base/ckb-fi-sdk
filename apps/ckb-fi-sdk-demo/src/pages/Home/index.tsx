import { Stack, Typography } from '@mui/material'
import WebDemo from './WebDemo'
import SDKDemo from './SDKDemo'

const PageHome = () => {
  return (
    <Stack width="100%" spacing={2} sx={{ p: { xs: 2, sm: 2, md: 3 } }}>
      <Typography variant="h2">CKB-FI Bonding</Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 2, sm: 2, md: 3 }}
      >
        <WebDemo />
        <SDKDemo />
      </Stack>
    </Stack>
  )
}

export default PageHome
