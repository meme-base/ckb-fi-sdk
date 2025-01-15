import { Button, ButtonProps, SxProps } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface ICloseButtonProps extends ButtonProps {
  circle?: boolean
  sx?: SxProps
  style?: object
}

const CloseButton = (props: ICloseButtonProps) => {
  const { circle, sx = {}, style = {}, ...rest } = props
  return (
    <Button
      disableFocusRipple
      disableTouchRipple
      sx={{
        width: 32,
        height: 32,
        minWidth: 32,
        padding: 0,
        ...(circle
          ? {
              bgcolor: 'rgba(255,255,255,0.06)',
              borderRadius: '50%',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }
          : {}),
        ...sx
      }}
      style={style}
      {...rest}
    >
      <CloseIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.6)' }} />
    </Button>
  )
}

export default CloseButton
