import styled from 'styled-components';

export const ThemeWrapper = styled.dl`
  display: flex;
  align-items: center;
  margin: 0.75rem 0 0;
  padding-right: 1.5rem;
`;

export const ThemeEmoji = styled.dt`
  font-size: 1.25rem;
`;

export const ThemeDescription = styled.dd`
  margin: -0.25rem 0 0 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
