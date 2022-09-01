import { Alert, Snackbar as Bar } from '@mui/material'

function Snackbar({
  children,
  open,
  severity = 'success',
  autoHideDuration,
  onClose,
  anchorOrigin = {
    vertical: 'top',
        horizontal: 'right'
  }
}) {
  return (
    <Bar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      onClose={() => onClose()}
    >
      <Alert
        severity={severity}
        sx={{ width: '100%' }}
      >
        {children}
      </Alert>
    </Bar>
  )
}

export default Snackbar
