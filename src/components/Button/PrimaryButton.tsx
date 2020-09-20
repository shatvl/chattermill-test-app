import styled from 'styled-components';
import Button from './Button';

const PrimaryButton = styled(Button)`
  background: ${({ theme, active }) => (active ? theme.colors.primaryMedium : theme.colors.primary)};
  color: ${({ theme }) => theme.colors.white};
`;

export default PrimaryButton;
