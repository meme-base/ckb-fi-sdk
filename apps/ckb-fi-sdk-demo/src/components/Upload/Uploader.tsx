/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  forwardRef,
  ChangeEvent,
  useImperativeHandle,
  useCallback,
  useState,
  useRef,
  useEffect
} from 'react'
import {
  Box,
  Stack,
  Button,
  Typography,
  CircularProgress,
  SxProps
} from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import CloseIcon from '@mui/icons-material/Close'
import {
  CropperRef,
  Cropper,
  CropperState,
  AspectRatio
} from 'react-advanced-cropper'
import AddIcon from '@mui/icons-material/Add'
import 'react-advanced-cropper/dist/style.css'
import { EnumFileObjType } from '@/enum/common'
import { toastWarning } from '@/utils/common'
import { uploadImage } from '@/apis/common'
import { debounce } from 'lodash-es'
import axios from 'axios'

interface Props {
  uuid?: string
  accept?: string
  autoUpload?: boolean
  crop?: boolean
  cropAspectRatio?: AspectRatio
  objectType: EnumFileObjType
  sizeLimit?: number // MB
  sizeLimitTip?: string
  value?: string
  placeholder?: string | JSX.Element
  onFileChange?: (url: string, file: File | null) => void
  onSuccess?: (url: string) => void
  sx?: SxProps
}

const SIZE_LIMIT = 5 // MB

const Uploader = forwardRef((props: Props, ref) => {
  const {
    uuid = '',
    accept = 'image/*',
    autoUpload = true,
    crop = false,
    cropAspectRatio,
    objectType,
    sizeLimit = SIZE_LIMIT,
    sizeLimitTip,
    value,
    placeholder = 'Upload',
    onFileChange,
    onSuccess,
    sx = {}
  } = props
  const refInput = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [showCropper, setShowCropper] = useState(false)
  const refCropper = useRef<CropperRef | null>(null)

  const clear = useCallback(() => {
    if (!refInput?.current) return

    refInput.current.value = '' // 清空元素
    setFile(null)
    setFileUrl('')
  }, [refInput?.current])

  const upload = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!file && !fileUrl) return reject('file is empty')

      // a.回显时未修改的场景下，跳过上传
      if (!file && fileUrl) {
        onSuccess?.(fileUrl)
        return resolve(fileUrl)
      }

      // b.需要上传的场景
      if (!file) return

      uploadImage({
        obj_type: objectType,
        file_content_type: file.type
      })
        .then(async ({ presigned_url, url }) => {
          if (!presigned_url) return reject('get presigned_url failed!')

          await axios.put(presigned_url, file, {
            headers: {
              'Content-Type': file.type
            }
          })

          const lastFileUrl = url.replace(
            'https://memebase-image.s3.ap-southeast-1.amazonaws.com',
            'https://img.memebase.co'
          )
          console.log(lastFileUrl, 'fileUrl')

          clear()
          setUploading(false)
          onSuccess?.(lastFileUrl)
          resolve(lastFileUrl)
        })
        .catch((error: any) => {
          console.error('Error:', error)
          setUploading(false)
          reject(error)
        })
    })
  }, [onSuccess, file, fileUrl])

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target?.files?.[0]

      if (!file) return

      const size = file.size
      if (size >= sizeLimit * 1024 * 1024) {
        clear()
        return toastWarning(sizeLimitTip || `Maximum support of ${sizeLimit}MB`)
      }

      setFile(file)

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const url = reader.result as string
        setUploading(true)
        setFileUrl(url)

        // 如果需要裁剪，不自动上传
        if (crop) {
          setShowCropper(true)
          setUploading(false)
          return
        }

        if (autoUpload) {
          upload()
        } else {
          setTimeout(() => {
            setUploading(false)
            onFileChange?.(url, file)
          }, 500)
        }
      }
    },
    [sizeLimit, sizeLimitTip, autoUpload, onFileChange, clear]
  )

  const handleCropChange = debounce((cropper: CropperRef) => {
    if (!file) return

    const canvas = cropper.getCanvas()
    if (!canvas) return

    canvas.toBlob(blob => {
      if (blob) {
        const newFile = new File([blob], file.name, { type: file.type })
        const src = canvas.toDataURL()

        setTimeout(() => {
          setFile(newFile)
          onFileChange?.(src, newFile)
        }, 500)
      }
    }, file.type)
  }, 300)

  const handleDelete = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (isFromCrop = false) => {
      setFile(null)
      setFileUrl('')
      onFileChange?.('', null)
      setUploading(false)
      isFromCrop && setShowCropper(false)
    },
    [onFileChange]
  )

  const defaultCropCoordinates = (
    state: CropperState
    // settings: CoreSettings
  ) => {
    // console.log(state, settings)
    return {
      left: 0,
      top: 0,
      width: state.imageSize.width,
      height: state.imageSize.height
    }
  }

  const handleCropConfirm = useCallback(() => {
    if (!file) return

    const canvas = refCropper.current?.getCanvas()
    if (!canvas) return

    // 是否需要确认裁剪结果
    canvas.toBlob(blob => {
      if (blob) {
        // const newFile = new File([blob], file.name, { type: file.type })
        const src = canvas.toDataURL()
        // setFile(newFile)
        setFileUrl(src)
        setShowCropper(false)
        //   onFileChange?.(src, newFile)

        // autoUpload 为 true 时自动上传
        if (autoUpload) {
          setUploading(true)
          upload()
        }
      }
    }, file.type)
  }, [autoUpload, file])

  const handleCropReset = () => {
    refCropper.current?.reset()
  }

  useImperativeHandle(ref, () => ({ upload }), [ref, file, upload])
  useEffect(() => {
    if (value) {
      setFileUrl(value)
    }
  }, [value])

  return (
    <Box
      className="uploader-placeholder"
      sx={{
        position: 'relative',
        width: 136,
        height: 136,
        ...(showCropper ? { mb: '40px!important' } : {}),
        ...sx
      }}
    >
      {!fileUrl && (
        <Stack
          className="uploader-placeholder"
          alignItems="center"
          justifyContent="center"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            textAlign: 'center',
            color: '#ddd',
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed #999',
            borderRadius: '6px',
            transition: 'all 0.2s',
            '&:hover': {
              background: 'rgba(255,255,255,0.03)'
            }
          }}
        >
          <AddIcon sx={{ fontSize: 30, color: '#fff' }} />
          <Typography sx={{ color: '#999' }}>{placeholder}</Typography>
          <Box
            component="label"
            htmlFor={`file-upload_${uuid}`}
            sx={{
              opacity: 0,
              cursor: 'pointer',
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              zIndex: 2,
              '& input': {
                display: 'none',
                width: 0,
                height: 0
              }
            }}
          >
            <input
              ref={refInput}
              id={`file-upload_${uuid}`}
              type="file"
              accept={accept}
              onChange={handleFileChange}
            />
          </Box>
        </Stack>
      )}

      {fileUrl && (
        <Stack
          className="uploader-fileholder"
          alignItems="center"
          justifyContent="center"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            textAlign: 'center',
            color: '#ddd',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '6px',
            '&:hover': {
              '& .delete-icon': {
                display: 'block'
              }
            }
          }}
        >
          <Stack
            className="delete-icon"
            sx={{
              display: 'none',
              cursor: 'pointer',
              position: 'absolute',
              width: 24,
              height: 24,
              lineHeight: '23px',
              textAlign: 'center',
              right: '-6px',
              top: '-6px',
              zIndex: 3,
              color: '#fff',
              bgcolor: 'error.dark',
              borderRadius: '50%',
              transition: 'background 0.2s',
              '&:hover': {
                bgcolor: 'error.main'
              }
            }}
            onClick={() => handleDelete()}
          >
            <CloseIcon
              sx={{
                fontSize: 18
              }}
            />
          </Stack>
          <Box
            component="img"
            src={fileUrl}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '6px'
            }}
          />
          {uploading && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                zIndex: 2,
                backdropFilter: 'blur(2px)',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '6px'
              }}
            >
              <CircularProgress size={24} sx={{ color: '#ccc' }} />
            </Stack>
          )}
        </Stack>
      )}

      {showCropper && (
        <Box
          sx={{
            position: 'relative',
            height: '100%'
          }}
        >
          <Cropper
            ref={refCropper}
            className="cropper"
            src={fileUrl}
            aspectRatio={cropAspectRatio}
            defaultCoordinates={defaultCropCoordinates}
            onChange={handleCropChange}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            sx={{
              position: 'absolute',
              width: '100%',
              minWidth: 240,
              height: 40,
              left: 0,
              right: 0,
              bottom: '-40px',
              zIndex: 2,
              px: 1,
              background: 'rgba(0,0,0,1)',
              borderRadius: '0 0 6px 6px',
              '& .MuiButton-root': {
                minWidth: 58,
                height: 28,
                fontSize: 12,
                borderRadius: '40px'
              }
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                color="info"
                startIcon={<RefreshIcon />}
                onClick={handleCropReset}
              >
                Reset
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={() => handleDelete(true)}
              >
                Delete
              </Button>
            </Stack>
            <Button
              size="small"
              variant="outlined"
              color="success"
              startIcon={<CheckOutlinedIcon />}
              onClick={handleCropConfirm}
            >
              OK
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  )
})

export default Uploader
