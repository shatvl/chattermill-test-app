import styled, { keyframes } from 'styled-components';

export const loadingAnimation = keyframes`
  from {
    transform: translate(-100%);
  }

  to {
    transform: translate(100%);
  }
`;

export const Loading = styled.span<{ width?: number }>`
  font-size: 1em;
  display: inline-block;
  height: 1.25rem;
  width: ${({ width = 5 }) => width}rem;
  max-width: ${({ width = 5 }) => width}rem;
  position: relative;
  border-radius: 0.25rem;
  background: #f2f2f2;
  overflow: hidden;
  z-index: -1;
  ::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    animation: ${loadingAnimation} 1.2s linear infinite;
    background-image: linear-gradient(
      90deg,
      rgba(248, 248, 249, 0) 0,
      rgba(248, 248, 249, 1) 40%,
      rgba(248, 248, 249, 1) 60%,
      rgba(248, 248, 249, 0)
    );
  }
`;

export const LoadingGreedy = styled(Loading)`
  height: 100%;
  width: 100%;
`;

export const LoadingBox = styled(Loading)<{ height?: number }>`
  border-radius: 0.25rem;
  height: ${({ height = 1 }) => height}rem;
`;
