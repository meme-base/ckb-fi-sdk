import { Theme } from '@mui/material'

export default function Table(theme: Theme) {
  const palette = theme.palette

  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
          '& .MuiTableHead-root th': {
            lineHeight: 1,
            height: 50,
            fontWeight: 700,
            fontSize: 16,
            color: palette.neutral[100]
          },
          '& .MuiTableBody-root tr': {
            '& td': {
              lineHeight: 1,
              height: 50,
              fontWeight: 400,
              fontSize: 14,
              color: palette.neutral[50]
            },
            '&:hover td': {
              background: palette.neutral[500]
            }
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: palette.action.selected,
            '&:hover': {
              backgroundColor: palette.action.hover
            }
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '6px 16px',
          borderBottom: 'none'
        },
        head: {
          color: palette.neutral[100],
          backgroundColor: palette.background.paper
        },
        body: {
          color: palette.neutral[100],
          backgroundColor: palette.background.paper
        },
        stickyHeader: {
          backgroundColor: palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${palette.background.paper} 0%, ${palette.background.paper} 100%)`
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1)
        }
      }
    },
    MuiTablePagination: {
      defaultProps: {
        backIconButtonProps: {
          size: 'small'
        },
        nextIconButtonProps: {
          size: 'small'
        },
        SelectProps: {
          MenuProps: {
            MenuListProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  ...theme.typography.body2
                }
              }
            }
          }
        }
      },

      styleOverrides: {
        root: {
          borderTop: `solid 1px ${palette.divider}`
        },
        toolbar: {
          height: 64
        },
        actions: {
          marginRight: theme.spacing(1)
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius
          }
        }
      }
    }
  }
}
