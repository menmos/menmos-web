import React, { FC, useEffect, useRef } from 'react'

interface Properties {
  children?: React.ReactNode
  callback?: () => void
}

export const InfiniteScroll: FC<Properties> = (properties): JSX.Element => {
  const pageEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pageEnd.current) {
      return
    }

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (!target) {
        return
      }

      if (target.isIntersecting) {
        properties.callback?.()
      }
    }

    const observer = new IntersectionObserver(handleObserver, {
      root: undefined, // window by default
      rootMargin: '0px',
      threshold: 1
    })

    observer.observe(pageEnd.current)

    const currentPageEnd = pageEnd.current
    return () => {
      if (currentPageEnd) {
        observer.unobserve(currentPageEnd)
      }
    }
  }, [properties])

  return (
    <>
      {properties.children}
      <div ref={pageEnd}></div>
    </>
  )
}
