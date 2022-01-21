import React, { FC, useEffect, useRef } from "react";

interface Properties {
  children?: React.ReactNode;
  callback?: () => void;
}

export const InfiniteScroll: FC<Properties> = (properties): JSX.Element => {
  const pageEnd = useRef<HTMLDivElement>(null);

  const handleObserver = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target?.isIntersecting) {
      properties.callback?.();
    }
  };

  useEffect(() => {
    if (!pageEnd.current) {
      return;
    }

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    observer.observe(pageEnd.current);

    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  return (
    <>
      {properties.children}
      <div ref={pageEnd}></div>
    </>
  );
};
