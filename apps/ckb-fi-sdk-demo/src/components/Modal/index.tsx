/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import {
  Box,
  Stack,
  Button,
  Typography,
  Modal,
  DialogContent,
  ModalProps,
  Fade,
  SxProps
} from '@mui/material'
import CloseButton from '@/components/Button/CloseButton'
import { LoadingButton } from '@mui/lab'

export interface IModalCloseParams {
  event?: any
  reason?: string
}
interface IModalProps extends Omit<ModalProps, 'title'> {
  title?: string | JSX.Element
  width?: SxProps | string | number
  noContentPadding?: boolean
  disableBackdropClose?: boolean
  showTitle?: boolean
  showCloseButton?: boolean
  showHeader?: boolean
  showFooter?: boolean
  showConfirmButton?: boolean
  showCancelButton?: boolean
  confirmText?: string
  cancelText?: string
  confirmButtonLoading?: boolean
  // children?: ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  onClose?: (data?: IModalCloseParams) => void
}

const IModal = (props: IModalProps) => {
  const {
    open = false,
    title,
    width,
    noContentPadding = false,
    disableBackdropClose = false,
    children,
    showTitle = true,
    showCloseButton = true,
    showHeader = true,
    showFooter = false,
    showConfirmButton = true,
    showCancelButton = true,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmButtonLoading,
    onConfirm,
    onCancel,
    onClose,
    ...rest
  } = props
  const [visible, setVisible] = useState(false)

  const handleConfirm = () => {
    onConfirm && onConfirm()
  }
  const handleClose = (event?: any, reason?: string) => {
    if (disableBackdropClose && reason === 'backdropClick') return

    setVisible(false)
    onClose && onClose({ event, reason })
  }
  const handleCancel = (e: any) => {
    setVisible(false)
    onClose && onClose({ event: e, reason: 'cancelButtonClick' })
    onCancel && onCancel()
  }

  useEffect(() => setVisible(open), [open])

  return (
    <Modal
      component="div"
      closeAfterTransition
      open={visible}
      aria-labelledby={typeof title === 'string' ? title : ''}
      onClose={handleClose}
      // sx={{
      // hack for walletConnect Modal
      //   zIndex: 80,
      //   ...(rest.sx || {})
      // }}
      {...rest}
    >
      <Fade in={visible}>
        <DialogContent
          sx={{
            height: '100vh',
            WebkitTapHighlightColor: 'transparent',
            outline: 'unset'
          }}
        >
          <Box
            className="modal-container"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate3d(-50%, -50%, 0)'
            }}
          >
            <Box
              className="showInUp animated"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: (width
                  ? width
                  : { xs: '96vw', sm: 500, md: 600 }) as any,
                outline: 'none',
                background: '#161616',
                // backdropFilter: 'blur(5px)',
                // background:
                //   'linear-gradient(343deg, rgba(0,0,0,0.5), rgba(46,46,51,0.8))',
                // border: '1px solid rgb(255,255,255,0.25)',
                border: '1px solid rgb(152 226 158 / 25%)',
                // boxShadow: 'inset -4px -2px 0 10px black',
                borderRadius: { xs: '8px', sm: '12px', md: '16px', lg: '20px' }
              }}
            >
              {showHeader && (
                <Stack
                  className="modal-header-wrapper"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  p={showTitle ? 2 : 0}
                  sx={{
                    position: 'relative',
                    ...(showTitle
                      ? {
                          '&:after': {
                            position: 'absolute',
                            left: '16px',
                            right: '16px',
                            bottom: 0,
                            content: '""',
                            height: '1px',
                            bgcolor: 'rgba(255, 255, 255, 0.25);'
                          }
                        }
                      : {})
                  }}
                >
                  {showTitle &&
                    (typeof title === 'string' ? (
                      <Typography
                        id="transition-modal-title"
                        component="div"
                        fontSize={{ xs: 16, sm: 18, md: 20 }}
                        color="neutral.50"
                        fontWeight={{ xs: 600, sm: 700 }}
                      >
                        {title}
                      </Typography>
                    ) : (
                      title
                    ))}
                  {showCloseButton ? (
                    <CloseButton
                      circle
                      sx={{
                        ...(!showTitle
                          ? {
                              position: 'absolute',
                              right: '12px',
                              top: '12px',
                              zIndex: 10
                            }
                          : {}),
                        width: 28,
                        height: 28,
                        minWidth: 28
                      }}
                      onClick={e => handleClose(e, 'closeButtonClick')}
                    />
                  ) : null}
                </Stack>
              )}
              <Box
                className="modal-content-wrapper"
                sx={{
                  ...(!noContentPadding ? { p: 2 } : {}),
                  maxHeight: '90vh',
                  overflow: 'auto'
                }}
              >
                {children}
              </Box>
              {showFooter && (showCancelButton || showConfirmButton) && (
                <Stack
                  className="modal-footer-wrapper"
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={2}
                  p={2}
                >
                  {showCancelButton && (
                    <Button
                      variant="outlined"
                      className="button-cancel"
                      sx={{
                        px: 3,
                        borderRadius: { xs: '4px', sm: '8px' }
                      }}
                      onClick={handleCancel}
                    >
                      {cancelText}
                    </Button>
                  )}
                  {showConfirmButton && (
                    <LoadingButton
                      variant="contained"
                      className="button-confirm"
                      loading={confirmButtonLoading}
                      sx={{
                        px: 3,
                        borderRadius: { xs: '4px', sm: '8px' }
                      }}
                      onClick={handleConfirm}
                    >
                      {confirmText}
                    </LoadingButton>
                  )}
                </Stack>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Fade>
    </Modal>
  )
}

export default IModal
