export default function DatePicker() {
  return {
    MuiDatePicker: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        disableFocusRipple: true,
        inputFormat: 'yyyy/MM/dd'
      }
    }
  }
}
