import React, { FC } from 'react';
import { navigate } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import LoginForm from '../components/LoginForm';
import { CHATTER_TOKEN_COOKIE, getCoockie } from '../services/cookie';

const LoginPage: FC = () => {
  if (getCoockie(CHATTER_TOKEN_COOKIE)) {
    navigate('/');
    return null;
  }

  return (
    <Layout>
      <SEO title="Login" />
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
