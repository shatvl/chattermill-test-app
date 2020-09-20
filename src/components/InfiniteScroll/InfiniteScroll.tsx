import React, { FC, useEffect, useRef, useState } from 'react';
import { InfiniteScrollAnchor, InfiniteScrollLoader, InfiniteScrollWrapper } from './InfiniteScrollStyled';

interface InifiniteScrollProps {
  hasMore: boolean;
  loading: boolean;
  load: () => void;
}

const InfiniteScroll: FC<InifiniteScrollProps> = ({ hasMore, load, loading, children }) => {
  // acnchor to observe appearence in viewport
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          load();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      },
    );

    if (anchorRef?.current) {
      observer.observe(anchorRef.current);
    }

    // disconnect from all .observes
    return () => {
      observer.disconnect();
    };
  }, [anchorRef]);

  return (
    <InfiniteScrollWrapper>
      {children}
      <InfiniteScrollAnchor ref={anchorRef} />
      {loading && <InfiniteScrollLoader>😴</InfiniteScrollLoader>}
    </InfiniteScrollWrapper>
  );
};

export default InfiniteScroll;
