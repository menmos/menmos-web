import React, { FC, useEffect, useRef, useState } from "react";
import Bricks from "bricks.js";
import { InfiniteScroll } from "./infiniteScroll";
import { usePrevious } from "./utils/usePrevious";

export interface Properties {
  children: React.ReactChild[];
  packed?: string;
  sizes?: Bricks.SizeDetail[];
  loadMore?: () => void;
  hasLoaded: boolean;
}

export const Grid: FC<Properties> = ({
  children,
  hasLoaded,
  packed = "data-packed",
  sizes = [
    { columns: 1, gutter: 20 },
    { mq: "768px", columns: 2, gutter: 20 },
    { mq: "1280px", columns: 3, gutter: 20 },
    { mq: "1792px", columns: 4, gutter: 20 },
  ],
  loadMore,
}: Properties) => {
  const previousChildrenLength = usePrevious<number>(children.length);
  const container = useRef<HTMLDivElement>(null);
  const [instance, setInstance] = useState<Bricks.Instance | undefined>(
    undefined
  );

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
      packed,
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
