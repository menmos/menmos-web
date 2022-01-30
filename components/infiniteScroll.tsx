import React, { FC, useEffect, useRef } from "react";

interface Properties {
  children?: React.ReactNode;
  callback?: () => void;
}

export const InfiniteScroll: FC<Properties> = (properties): JSX.Element => {
  const pageEnd = useRef<HTMLDivElement>(null);

  const handleObserver = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (!target) {
      return;
    }

    if (target.isIntersecting) {
      properties.callback?.();
    }
  };

  useEffect(() => {
    if (!pageEnd.current) {
      return;
    }

    const observer = new IntersectionObserver(handleObserver, {
      root: null, // window by default
      rootMargin: "0px",
      threshold: 1.0,
    });

    observer.observe(pageEnd.current);

    return () => {
      if (pageEnd.current) {
        observer.unobserve(pageEnd.current);
      }
    };
  }, [handleObserver]);

  return (
    <>
      {properties.children}
      <div ref={pageEnd}></div>
    </>
  );
};
