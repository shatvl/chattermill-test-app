import styled from 'styled-components';
import { Button } from '../Button';

export const ReviewList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  margin-top: 1.25rem;
`;

export const ReviewListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 1rem;
`;

export const NotFoundContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  font-size: 1.125rem;
  ${Button} {
    margin-left: 0.5rem;
  }
`;
