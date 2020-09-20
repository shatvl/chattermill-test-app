import React, { FC, useEffect } from 'react';
import { Sentiment } from '../../models/ReviewTheme';
import { useThemeLazyQuery } from '../../services/theme/useThemeLazyQuery';
import ThemeLoading from './ThemeLoading';
import { ThemeDescription, ThemeEmoji, ThemeWrapper } from './ThemeStyled';

interface ThemeProps {
  id: number;
  sentiment: Sentiment;
}

const getThemeEmoji = (sentiment: Sentiment): JSX.Element => {
  switch (sentiment) {
    case -1:
      return <span>😡</span>;
    case 0:
      return <span>😐</span>;
    case 1:
      return <span>🤩</span>;
    default:
      return <span>😐</span>;
  }
};

const Theme: FC<ThemeProps> = ({ id, sentiment }) => {
  const [loadTheme, { data, loading, error }] = useThemeLazyQuery();

  useEffect(() => loadTheme(id), [id]);

  if (loading) {
    return <ThemeLoading />;
  }

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <ThemeWrapper>
      <ThemeEmoji>{getThemeEmoji(sentiment)}</ThemeEmoji>
      {data.name && <ThemeDescription>{data.name}</ThemeDescription>}
    </ThemeWrapper>
  );
};

export default Theme;
