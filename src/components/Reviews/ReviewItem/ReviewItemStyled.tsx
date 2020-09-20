import styled from 'styled-components';

export const ReviewItemWrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.18);
  border: 1px solid ${({ theme }) => theme.colors.grayLight};
  border-radius: 0.25rem;
  max-width: 40rem;
  margin: auto;
  padding: 0.5rem 1rem;
`;

export const ReviewItemComment = styled.div`
  text-align: left;
  font-size: 1rem;
  margin: 0;
  line-height: 1.125rem;
  color: ${({ theme }) => theme.text};
`;

export const ReviewItemDate = styled.div`
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.colors.textMeta};
`;

export const ReviewThemes = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
