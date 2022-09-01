import { useState, useEffect } from 'react'

export default function useDebounce(value, delay) {
  const [state, setState] = useState()
  
  useEffect(() => {
    const t = setTimeout(() => setState(value), delay)

    return () => clearTimeout(t)
  }, [value, delay])

  return state
}
