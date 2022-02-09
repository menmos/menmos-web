import React, { FC, useEffect, useRef, useState } from "react";
import Bricks from "bricks.js";
import { InfiniteScroll } from "./infiniteScroll";
import { usePrevious } from "./utils/usePrevious";

export interface Properties {
  children: React.ReactChild[];
  sizes?: Bricks.SizeDetail[];
  loadMore?: () => void;
  hasLoaded: boolean;
}

const generateBreakpoints = ({
  count,
  itemSize,
  gutter,
}: {
  count: number;
  itemSize: number;
  gutter: number;
}): Bricks.SizeDetail[] => {
  const breakpoints: Bricks.SizeDetail[] = [];

  for (let i = 1; i <= count; i++) {
    const breakpoint: Bricks.SizeDetail = {
      mq: `${i * (itemSize + gutter)}px`,
      columns: i,
      gutter,
    };

    // We don´t want any minimum viewport width for the first breakpoint
    if (i === 1) {
      delete breakpoint.mq;
    }

    breakpoints.push(breakpoint);
  }

  return breakpoints;
};

export const Grid: FC<Properties> = ({
  children,
  hasLoaded,
  sizes = generateBreakpoints({ count: 20, itemSize: 300, gutter: 20 }),
  loadMore,
}: Properties) => {
  const previousChildrenLength = usePrevious<number>(children.length);
  const container = useRef<HTMLDivElement>(null);
  const [instance, setInstance] = useState<Bricks.Instance | undefined>(
    undefined
  );

  // Semi-hack to make sure we pack everything once the images and videos are loaded
  // It ensures that the grid computations will be done on fully rendered content
  useEffect(() => {
    if (hasLoaded) {
      instance?.pack();
    }
  }, [hasLoaded]);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const instance = Bricks({
      container: container.current,
      packed: "data-packed",
      sizes,
      position: true,
    });

    instance.resize(true);
    instance.pack();

    setInstance(instance);
  }, [container.current]);

  useEffect(() => {
    if ((previousChildrenLength === 0 && children.length === 0) || !instance) {
      return;
    }

    if (children.length > previousChildrenLength) {
      instance.update();
    } else {
      instance.pack();
    }
  }, [children, instance]);

  if (!children.length) {
    return null;
  }

  return (
    <InfiniteScroll callback={loadMore}>
      <div ref={container}>{children}</div>
    </InfiniteScroll>
  );
};
