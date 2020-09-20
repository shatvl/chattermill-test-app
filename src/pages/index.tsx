import React, { FC } from 'react';
import { navigate } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import { CHATTER_TOKEN_COOKIE, getCoockie } from '../services/cookie';
import Feed from '../components/Reviews/Reviews';
import { FilterProvider } from '../context/FilterContext';

const IndexPage: FC = () => {
  if (!getCoockie(CHATTER_TOKEN_COOKIE)) {
    navigate('/login');
    return null;
  }

  return (
    <FilterProvider>
      <Layout>
        <SEO title="Login" />
        <Feed />
      </Layout>
    </FilterProvider>
  );
};

export default IndexPage;
