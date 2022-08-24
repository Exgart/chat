import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7986cb',
    },
    secondary: {
      main: '#90caf9',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    error: {
      main: '#fe4336',
    },
  },
  typography: {
    allVariants: {
      textTransform: 'none',
      fontFamily: "'Exo 2', sans-serif",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            textTransform: 'uppercase',
          },
        },
      ],
    },
  },
})

export default theme
