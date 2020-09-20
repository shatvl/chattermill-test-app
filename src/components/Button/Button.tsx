import styled from 'styled-components';

export enum ButtonSizes {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const Button = styled.button<{
  size?: ButtonSizes | null;
  block?: boolean;
  active?: boolean;
  disabled?: boolean;
}>`
  display: inline-block;
  width: ${({ block }) => (block ? '100%' : 'initial')};
  vertical-align: middle;
  background: ${({ theme, active }) => (active ? theme.colors.primary : 'transparent')};
  border: 1px solid ${({ theme, active }) => (active ? theme.colors.primaryMedium : 'transparent')};
  font-size: ${({ size = ButtonSizes.MD }) => {
    switch (size) {
      case ButtonSizes.XS:
        return '0.875rem';
      case ButtonSizes.SM:
        return '0.875rem';
      case ButtonSizes.MD:
        return '1rem';
      case ButtonSizes.LG:
        return '1.125rem';
      default:
        return '0.875rem';
    }
  }};
  line-height: ${({ size = ButtonSizes.MD }) => {
    switch (size) {
      case ButtonSizes.XS:
        return '1rem';
      case ButtonSizes.SM:
        return '1.25rem';
      case ButtonSizes.MD:
        return '1.5rem';
      case ButtonSizes.LG:
        return '1.75rem';
      default:
        return '1.25rem';
    }
  }};
  padding: ${({ size = ButtonSizes.MD }) => {
    switch (size) {
      case ButtonSizes.XS:
        return '0.25rem 0.375rem';
      case ButtonSizes.SM:
        return '0.5rem 0.525rem';
      case ButtonSizes.MD:
        return '0.625rem 1.25rem';
      case ButtonSizes.LG:
        return '0.75rem 1.25rem';
      default:
        return '0.375rem 1rem';
    }
  }};
  border-radius: 0.25rem;
  color: ${({ theme, disabled }) => (disabled ? `${theme.colors.gray}` : theme.colors.primary)};
  box-sizing: border-box;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: 0.15s all ease-in-out;
  text-decoration: none;
  white-space: nowrap;

  &:hover,
  &:active {
    outline: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray200};
    border-color: ${({ theme }) => theme.colors.gray200};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primaryMedium};
    border-color: ${({ theme }) => theme.colors.primaryLight};
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:focus,
  &:disabled:active {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

export default Button;
