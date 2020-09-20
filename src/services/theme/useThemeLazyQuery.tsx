import { useState } from 'react';
import { navigate } from 'gatsby';

import { CHATTER_TOKEN_COOKIE, getCoockie, removeCookie } from '../cookie';
import { Theme } from '../../models/Theme.model';

interface ThemeLazyQueryResponse {
  data?: Theme;
  loading: boolean;
  error: string;
}

type ThemeLazyQuery = [(id: number) => void, ThemeLazyQueryResponse];

/**
 * Lazy query hook to review theme by ID
 */
export const useThemeLazyQuery = (): ThemeLazyQuery => {
  const [data, setData] = useState<Theme>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const request = (id: number) => {
    setLoading(true);

    const req = new XMLHttpRequest();

    req.open('GET', `${process.env.API_URL}/${process.env.API_PREFIX}/themes/${id}`, true);
    req.onreadystatechange = () => {
      if (req.status === 401) {
        removeCookie(CHATTER_TOKEN_COOKIE);
        navigate('/login');
        return;
      }
      if (req.status === 400) {
        if (req.response) {
          const error = JSON.parse(req.response);
          setError(error.message);
        }
      }
      if (req.readyState === 4 && req.status === 200) {
        if (req.status === 200) {
          setError(null);
          if (req.response) {
            const result = JSON.parse(req.response);
            setData(result.data);
          }
        }
      }
      if (req.readyState === 4) {
        setLoading(false);
      }
    };
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Authorization', `Bearer ${getCoockie(CHATTER_TOKEN_COOKIE)}`);
    req.send();
  };

  return [request, { data, loading, error }];
};
