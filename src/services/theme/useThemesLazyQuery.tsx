import { useState } from 'react';
import { navigate } from 'gatsby';

import { Review } from '../../models/Review.model';
import { CHATTER_TOKEN_COOKIE, getCoockie, removeCookie } from '../cookie';
import { Theme } from '../../models/Theme.model';

export interface ThemesListRequestInput {
  limit?: number;
  offset?: number;
}

interface ThemesListLazyQueryResponse {
  data?: Theme[];
  loading: boolean;
  error: string;
}

type ThemesListLazyQuery = [(input: ThemesListRequestInput) => void, ThemesListLazyQueryResponse];

/**
 * Lazy query hook to review themes
 */
export const useThemesListLazyQuery = (): ThemesListLazyQuery => {
  const [data, setData] = useState<Theme[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const request = ({ limit = 20, offset = 0 }: ThemesListRequestInput) => {
    setLoading(true);
    const req = new XMLHttpRequest();

    req.open('GET', `${process.env.API_URL}/${process.env.API_PREFIX}/themes?offset=${offset}&limit=${limit}`, true);
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
        if (req.readyState === 4) {
          setLoading(false);
        }
      }
    };
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Authorization', `Bearer ${getCoockie(CHATTER_TOKEN_COOKIE)}`);
    req.send();
  };

  return [request, { data, loading, error }];
};
