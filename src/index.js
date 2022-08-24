import { CssBaseline, ThemeProvider } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'styles/index.scss'
import theme from 'theme'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)
