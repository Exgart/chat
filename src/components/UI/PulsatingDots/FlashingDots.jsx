import { useTheme } from '@mui/material'
import style from './style.module.scss'

function PulsatingDots({dotsColor = 'primary'}) {
  const theme = useTheme()
  const bgcolor = theme['palette'][dotsColor]['main']

  return <span className={style.dots}>
    <span className={style.dot} style={{backgroundColor: bgcolor}}></span>
    <span className={style.dot} style={{backgroundColor: bgcolor}}></span>
    <span className={style.dot} style={{backgroundColor: bgcolor}}></span>
  </span>
}

export default PulsatingDots
