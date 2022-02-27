import React, { useEffect, useRef, useState } from 'react'
import Bricks from 'bricks.js'
import { InfiniteScroll } from './infinite-scroll'
import { usePrevious } from './utils/use-previous'

export interface Properties {
  children: React.ReactChild[]
  loadMore?: () => void
  hasLoaded: boolean
}

const generateBreakpoints = ({
  count,
  itemSize,
  gutter
}: {
  count: number
  itemSize: number
  gutter: number
}): Bricks.SizeDetail[] => {
  const breakpoints: Bricks.SizeDetail[] = []

  for (let index = 1; index <= count; index++) {
    const breakpoint: Bricks.SizeDetail = {
      mq: `${index * (itemSize + gutter)}px`,
      columns: index,
      gutter
    }

    // We don´t want any minimum viewport width for the first breakpoint
    if (index === 1) {
      delete breakpoint.mq
    }

    breakpoints.push(breakpoint)
  }

  return breakpoints
}

export const Grid = ({ children, hasLoaded, loadMore }: Properties) => {
  const previousChildrenLength = usePrevious<number>(children.length)
  const container = useRef<HTMLDivElement>(null)
  const [instance, setInstance] = useState<Bricks.Instance | undefined>()

  // Semi-hack to make sure we pack everything once the images and videos are loaded
  // It ensures that the grid computations will be done on fully rendered content
  useEffect(() => {
    if (hasLoaded && instance) {
      instance.pack()
    }
  }, [instance, hasLoaded])

  useEffect(() => {
    if (!container.current) {
      return
    }

    const instance = Bricks({
      container: container.current,
      packed: 'data-packed',
      sizes: generateBreakpoints({ count: 20, itemSize: 300, gutter: 20 }),
      position: true
    })

    instance.resize(true)
    instance.pack()

    setInstance(instance)
  }, [])

  useEffect(() => {
    if ((previousChildrenLength === 0 && children.length === 0) || !instance) {
      return
    }

    if (children.length > previousChildrenLength) {
      instance.update()
    }
  }, [children.length, instance, previousChildrenLength])

  if (children.length === 0) {
    // eslint-disable-next-line unicorn/no-null
    return null
  }

  return (
    <InfiniteScroll callback={hasLoaded ? loadMore : undefined}>
      <div ref={container}>{children}</div>
    </InfiniteScroll>
  )
}
