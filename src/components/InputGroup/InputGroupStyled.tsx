import styled from 'styled-components';

export const InputGroupControl = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const InputGroupInput = styled.input<{ focused?: boolean }>`
  display: block;
  width: 100%;
  height: 3.375rem;
  padding: ${({ theme }) => `calc(.75rem - ${theme.borderWidth}) calc(.9rem - ${theme.borderWidth})`};
  border: ${({ theme }) => theme.borderWidth} solid ${({ theme }) => theme.colors.gray};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.text};
  outline: none;
  transition: border-color 0.15s ease;
  word-break: break-word;
  font-size: 1rem;
  line-height: 1.25rem;
  ::placeholder {
    opacity: ${({ focused }) => (focused ? '0' : '1')};
  }
`;

export const InputGroupLabel = styled.label<{ focused?: boolean; empty?: boolean }>`
  display: block;
  padding: 0 0.25rem;
  position: absolute;
  left: 0.7rem;
  top: -0.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: 400;
  opacity: ${({ focused, empty }) => (focused || !empty ? 1 : 0)};
  transition: all 0.15s ease;
`;
