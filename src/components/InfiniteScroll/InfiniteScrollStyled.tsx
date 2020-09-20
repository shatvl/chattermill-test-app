import styled, { keyframes } from 'styled-components';

export const loadingAnimation = keyframes`
  0% {
    font-size: 1.5rem;
  }
  50% {
    font-size: 2.5rem;
  }
  100% {
    font-size: 1.5rem;
  }
`;

export const InfiniteScrollWrapper = styled.div`
  overflow-y: auto;
`;

export const InfiniteScrollAnchor = styled.div``;

export const InfiniteScrollLoader = styled.div`
  width: 100%;
  height: 2.5rem;
  margin-bottom: 0.75rem;
  text-align: center;
  position: relative;
  animation: ${loadingAnimation} 1.2s linear infinite;
`;
