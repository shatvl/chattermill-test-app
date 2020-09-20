import React, { FC } from 'react';
import { LoadingBox } from '../Loading';
import { ThemeWrapper } from './ThemeStyled';

const ThemeLoading: FC = () => (
  <ThemeWrapper>
    <LoadingBox height={2} />
  </ThemeWrapper>
);

export default ThemeLoading;
