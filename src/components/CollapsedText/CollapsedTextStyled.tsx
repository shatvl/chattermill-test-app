import styled from 'styled-components';
import { Button } from '../Button';

export const CollapsedTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${Button} {
    margin-left: -0.375rem;
  }
`;

export const WrappedText = styled.div<{ maxHeight: string; lineHeight: string }>`
  max-height: ${({ maxHeight }) => maxHeight};
  line-height: ${({ lineHeight }) => lineHeight};
  width: 100%;
  overflow: hidden;
`;
