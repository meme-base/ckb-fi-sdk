// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Skeleton(theme: any) {
  return {
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave'
      },
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.neutral,
          '&.MuiSkeleton-rounded': {
            borderRadius: '4px'
          }
        }
      }
    }
  }
}
