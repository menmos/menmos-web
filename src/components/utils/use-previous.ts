import { useEffect, useRef } from 'react'

export const usePrevious = <T>(value: T) => {
  const reference = useRef<T>(value)
  useEffect(() => {
    reference.current = value
  })
  return reference.current
}
