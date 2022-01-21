import React, { FC, useEffect, useRef, useState } from "react";
import Bricks from "bricks.js";
import { InfiniteScroll } from "./infiniteScroll";
import { usePrevious } from "./utils/usePrevious";

export interface Properties {
  children: React.ReactChild[];
  packed?: string;
  sizes?: Bricks.SizeDetail[];
  loadMore?: () => void;
}

export const Grid: FC<Properties> = ({
  children,
  packed = "data-packed",
  sizes = [
    { columns: 1, gutter: 20 },
    { mq: "768px", columns: 2, gutter: 20 },
    { mq: "1024px", columns: 3, gutter: 20 },
    { mq: "1280px", columns: 4, gutter: 20 },
    { mq: "1536px", columns: 5, gutter: 20 },
    { mq: "1792px", columns: 6, gutter: 20 },
  ],
  loadMore,
}: Properties) => {
  const previousChildrenLength = usePrevious<number>(children.length);
  const container = useRef<HTMLDivElement>(null);
  const [instance, setInstance] = useState<Bricks.Instance | undefined>(
    undefined
  );

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const instance = Bricks({
      container: container.current,
      packed,
      sizes,
    });

    instance.resize(true);

    if (children.length) {
      instance.pack();
    }

    setInstance(instance);
  }, [container]);

  useEffect(() => {
    if ((previousChildrenLength === 0 && children.length === 0) || !instance) {
      return;
    }

    if (children.length > previousChildrenLength) {
      instance.update();
    } else {
      instance.pack();
    }

    return () => {
      instance.resize(false);
    };
  }, [children, instance]);

  return (
    <InfiniteScroll callback={loadMore}>
      <div ref={container}>{children}</div>
    </InfiniteScroll>
  );
};
