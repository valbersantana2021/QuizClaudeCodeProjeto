import { useState, useEffect, useRef } from 'react'

export function useTimer(seconds, onExpire) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  const activeRef = useRef(true)

  useEffect(() => {
    activeRef.current = true
    setTimeLeft(seconds)

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          if (activeRef.current) onExpireRef.current()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      activeRef.current = false
      clearInterval(interval)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function resetTimer() {
    activeRef.current = false
  }

  return { timeLeft, resetTimer }
}
