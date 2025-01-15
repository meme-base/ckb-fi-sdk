import { alpha, Theme } from '@mui/material'

export default function Input(theme: Theme) {
  return {
    MuiInputBase: {
      // defaultProps: {
      //   size: 'small'
      // },
      styleOverrides: {
        root: {
          '&.MuiInputBase-sizeSmall': {
            '& .MuiSelect-select, & input': {
              fontSize: 14
            },
            '& input': {
              height: 40,
              padding: '0 14px!important',
              fontSize: 14
            }
            // '& .MuiOutlinedInput-notchedOutline': {
            //   borderRadius: '6px'
            // }
          },
          '& .MuiOutlinedInput-notchedOutline': {
            // borderRadius: '8px'
            borderRadius: 0,
            border: '1px solid transparent',
            // borderColor: theme.palette.neutral[700],
            borderImage: `linear-gradient(150deg, ${theme.palette.neutral[300]}, ${theme.palette.neutral[700]} 40%) 1`
          },
          '& .MuiSvgIcon-root': {
            color: theme.palette.neutral[300]
          },
          '&.Mui-disabled': {
            '& svg': {
              color: theme.palette.text.disabled
            }
          }
        },
        input: {
          height: 50,
          padding: '0 14px!important',
          fontSize: 15,
          color: theme.palette.text.primary,
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:hover:not(.Mui-disabled):before': {
            borderColor: theme.palette.neutral[200]
          },
          '&.Mui-focused': {
            '&:not(.Mui-disabled):before': {
              borderColor: theme.palette.primary.main
            },
            '&:not(.Mui-disabled):after': {
              borderColor: theme.palette.primary.main
            }
          }
        },
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.neutral[300], 0.56)
          },
          '&:after': {
            borderBottomColor: theme.palette.text.primary
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.text.primary
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          // borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.grey[500], 0.08),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16)
          },
          '&.Mui-focused': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16)
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground
          }
        },
        underline: {
          '&:before, :after': {
            display: 'none'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // '& .MuiOutlinedInput-notchedOutline': {
          //   borderWidth: '1px!important',
          //   borderColor: alpha(theme.palette.grey[500], 0.32)
          // },
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderImage: `linear-gradient(150deg, ${theme.palette.neutral[200]}, ${theme.palette.neutral[700]} 40%) 1`
            }
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: `unset!important`,
              borderWidth: '1px!important'
              // borderImage: `linear-gradient(150deg, ${
              //   theme.palette.primary.main
              // }, ${alpha(theme.palette.primary.main, 0.3)} 40%) 1`
            }
          },
          // '&:hover': {
          //   '& .MuiOutlinedInput-notchedOutline': {
          //     borderWidth: 1,
          //     borderColor: alpha(theme.palette.grey[500], 0.5)
          //   }
          // },
          // '&.Mui-focused': {
          //   '& .MuiOutlinedInput-notchedOutline': {
          //     borderWidth: 1,
          //     borderColor: `${theme.palette.primary.main}!important`
          //   }
          // },
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
              borderColor: theme.palette.error
            }
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground
            }
          }
        }
      }
    }
  }
}
