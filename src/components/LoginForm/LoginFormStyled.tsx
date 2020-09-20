import styled from 'styled-components';

export const LoginFormLogo = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 2.5rem;
  border-radius: 50%;
  background-color: #d5adc8;
  text-align: center;
  background-image: linear-gradient(315deg, #d5adc8 0%, #ff8489 74%);
  box-shadow: 0px -1px 23px 3px rgba(255, 132, 137, 0.66);
`;

export const LoginFormLogoEmoji = styled.div`
  margin-left: 0.125rem;
  margin-top: 0.425rem;
`;

export const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  margin: 4rem auto;
`;

export const LoginError = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-size: 0.875rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  text-align: center;
  width: 100%;
`;
