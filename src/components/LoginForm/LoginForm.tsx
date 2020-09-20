import React, { FC, useState } from 'react';
import { LoginRequestInput, useLoginLazyQuery } from '../../services/auth/useLoginLazyQuery';
import { PrimaryButton } from '../Button';
import InputGroup, { InputTypes } from '../InputGroup/InputGroup';
import { LoginFormWrapper, LoginFormLogo, LoginError, LoginFormLogoEmoji } from './LoginFormStyled';

const LoginForm: FC = () => {
  const [data, setData] = useState<LoginRequestInput>({ username: '', password: '' });
  const [login, { loading, error }] = useLoginLazyQuery();

  const handleOnFieldChange = (key: string, value: string) => setData({ ...data, [key]: value });
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login(data);
  };

  return (
    <LoginFormWrapper onSubmit={handleSubmit}>
      <LoginFormLogo>
        <LoginFormLogoEmoji>🤩</LoginFormLogoEmoji>
      </LoginFormLogo>
      <InputGroup
        formControlName="username"
        value={data?.username}
        onChange={handleOnFieldChange}
        label="Username"
        placeholder="Username"
      />
      <InputGroup
        type={InputTypes.PASSWORD}
        formControlName="password"
        value={data?.password}
        onChange={handleOnFieldChange}
        label="Password"
        placeholder="Password"
      />
      {!loading && error && <LoginError>{error.toUpperCase()}</LoginError>}
      <PrimaryButton disabled={loading} type="submit" block>
        Log In
      </PrimaryButton>
    </LoginFormWrapper>
  );
};

export default LoginForm;
