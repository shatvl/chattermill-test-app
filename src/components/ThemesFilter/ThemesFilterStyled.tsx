import styled from 'styled-components';

export const FilterWrapper = styled.div`
  position: relative;
  max-width: 40rem;
  margin: auto;
`;

export const FilterInput = styled.input`
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
`;

export const FilterPopupList = styled.ul`
  position: absolute;
  background: ${({ theme }) => theme.colors.white};
  list-style: none;
  width: 20rem;
  min-height: 2.5rem;
  max-height: 15rem;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndex.xxl};
  margin: 0.25rem 0;
  padding: 0.25rem 0;
  border-radius: 0.25rem;
  box-shadow: 0px 5px 30px -15px rgba(0, 0, 0, 0.75);
`;

export const FilterPopupListItem = styled.li`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.25rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FilterClear = styled.div`
  position: absolute;
  font-size: 2.25rem;
  font-weight: 300;
  right: 1rem;
  cursor: pointer;
`;

export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
