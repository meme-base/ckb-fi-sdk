/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react'
import { Stack, TextField, Typography, FormHelperText } from '@mui/material'
import Uploader from '@/components/Upload/Uploader'
import LoadingButton from '@mui/lab/LoadingButton'
import IModal from '@/components/Modal'
import { directLaunchBonding } from '@/apis/bonding'
import { BondingItem } from '@/types/module/bonding'
import { IFormItem } from '@/types/module/common'
import { EnumFileObjType } from '@/enum/common'
import { toast } from 'react-toastify'
import numeral from 'numeral'

interface Props {
  show: boolean
  onSuccess: (data: BondingItem) => void
  onClose: () => void
}

const ModalDirectLaunch = ({ show, onSuccess, onClose }: Props) => {
  const [formValues, setFormValues] = useState<
    Record<string, IFormItem<string>>
  >({
    icon_url: {
      label: 'Icon Url',
      field: 'icon_url',
      value: '',
      placeholder: 'Icon Url',
      required: true,
      error: false,
      errorMessage: 'Icon url is required'
    },
    name: {
      label: 'Name',
      field: 'name',
      value: '',
      placeholder: 'Name',
      required: true,
      error: false,
      errorMessage: 'Name is required'
    },
    symbol: {
      label: 'Symbol',
      field: 'symbol',
      value: '',
      placeholder: 'Symbol',
      required: true,
      error: false,
      errorMessage: 'Symbol is required'
    },
    tokenized_url: {
      label: 'Tokenized Twitter Content Url',
      field: 'tokenized_url',
      value: '',
      placeholder: 'Tokenized twitter content url',
      required: true,
      error: false,
      errorMessage: 'Tokenized twitter content url is required'
    },
    desc: {
      label: 'Description',
      field: 'desc',
      value: '',
      multiline: true,
      rows: 4,
      placeholder: 'Description',
      required: true,
      error: false,
      errorMessage: 'Description is required'
    }
  })
  const refUpload = useRef()
  const [loading, setLoading] = useState(false)
  // const {
  //   proposal: { loadingCreateProposal, handleCreateProposal }
  // } = useVotingContract()

  const handleFieldChange = (field: string, value: string) => {
    const result = {
      ...formValues,
      [field]: {
        ...formValues[field],
        value
      }
    }

    setFormValues(result)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formFields = Object.keys(formValues)
    let newFormValues = { ...formValues }

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index]
      const { value, required, validator } = formValues[currentField]

      const isError = required
        ? validator
          ? validator(value, formValues)
          : typeof value === 'string'
            ? value.trim() === ''
            : value
        : false

      newFormValues = {
        ...newFormValues,
        [currentField]: {
          ...newFormValues[currentField],
          error: !!isError,
          validatorMessage: typeof isError === 'string' ? isError : ''
        }
      }
    }
    setFormValues(newFormValues)
    const hasError = Object.values(newFormValues).some(itm => itm.error)
    if (hasError) return

    setLoading(true)
    refUpload?.current
      // @ts-ignore
      ?.upload()
      .then(async (url: string) => {
        const params = {
          name: formValues.name.value.trim(),
          symbol: formValues.symbol.value.trim(),
          desc: formValues.desc.value.trim(),
          icon_url: url,
          tokenized_url: formValues.tokenized_url.value.trim()
        }
        const res = await directLaunchBonding({
          bonding: params
        })
        toast.success('Launch successfully')
        setLoading(false)
        onSuccess(res)
      })
      .catch((err: string) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <IModal
      title="Launch Memecoin"
      open={show}
      width={{ xs: '96vw', sm: 500 }}
      showCancelButton={false}
      onClose={onClose}
    >
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit}
        spacing={2}
        sx={{
          position: 'relative',
          width: '100%',
          '& .MuiInputBase-root': {
            color: '#fff',
            '& .MuiInputBase-input': {
              color: '#fff'
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.4)!important',
              borderRadius: '8px',
              '& legend': {
                color: '#fff'
              }
            }
          },
          '& .MuiFormHelperText-root': {
            ml: 0
          },
          '& .field-col': {
            '& input': {
              fontSize: 14
            }
          },
          '& .field-col_deadline .MuiInputAdornment-root button': {
            color: '#d2d2d2'
          }
        }}
      >
        {Object.keys(formValues).map(key => {
          const {
            label,
            field,
            value,
            hidden,
            placeholder,
            inputProps,
            multiline,
            rows,
            postFormat,
            useDivision,
            required,
            error,
            errorMessage,
            validatorMessage
          } = formValues[key]
          if (!hidden) {
            if (field === 'icon_url') {
              return (
                <Stack
                  key={field}
                  className={`field-col field-col_${field}`}
                  spacing={1}
                >
                  <Uploader
                    ref={refUpload}
                    autoUpload={false}
                    crop
                    cropAspectRatio={{
                      minimum: 1,
                      maximum: 1
                    }}
                    objectType={EnumFileObjType.BONDINGS}
                    placeholder="Token Icon"
                    sizeLimit={5}
                    sx={{ width: '100%', height: 160 }}
                    onFileChange={(url, _file) => {
                      handleFieldChange(field, url)
                    }}
                  />

                  <Typography sx={{ color: '#999' }}>
                    * Aspect ratio 1:1, limited to 5MB or less.
                  </Typography>
                  {error && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errorMessage}
                    </FormHelperText>
                  )}
                </Stack>
              )
            } else {
              return (
                <TextField
                  key={field}
                  size="small"
                  variant="outlined"
                  className={`field-col field-col_${field}`}
                  label={label}
                  name={field}
                  required={required}
                  placeholder={placeholder}
                  multiline={multiline}
                  minRows={rows}
                  value={
                    useDivision && /\d+/.test(value + '')
                      ? numeral(value).format('0,0')
                      : value
                  }
                  InputProps={inputProps}
                  onChange={e => {
                    handleFieldChange(field, e.target.value)
                  }}
                  onBlur={e => {
                    if (postFormat) {
                      const result = postFormat(e, field)
                      handleFieldChange(field, result)
                    }
                  }}
                  sx={{ fontSize: 14 }}
                  error={error}
                  helperText={error ? validatorMessage || errorMessage : ''}
                />
              )
            }
          }
        })}
        <LoadingButton
          type="submit"
          size="large"
          loading={loading}
          sx={{ mt: '20px!important' }}
        >
          Submit
        </LoadingButton>
      </Stack>
    </IModal>
  )
}

export default ModalDirectLaunch
