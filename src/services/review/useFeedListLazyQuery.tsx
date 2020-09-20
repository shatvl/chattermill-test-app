import { useState } from 'react';
import { navigate } from 'gatsby';

import { Review } from '../../models/Review.model';
import { CHATTER_TOKEN_COOKIE, getCoockie, removeCookie } from '../cookie';

export interface FeedListRequestInput {
  limit?: number;
  offset?: number;
  themeId?: number;
}

interface FeedListLazyQueryResponse {
  data?: Review[];
  loading: boolean;
  error: string;
}

type FeedListLazyQuery = [(input: FeedListRequestInput) => void, FeedListLazyQueryResponse];

/**
 * Lazy query hook to review feed list (reviews) with paging options
 */
export const useFeedListLazyQuery = (): FeedListLazyQuery => {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const request = ({ limit = 20, offset = 0, themeId }: FeedListRequestInput) => {
    setLoading(true);
    const req = new XMLHttpRequest();

    req.open(
      'GET',
      `${process.env.API_URL}/${process.env.API_PREFIX}/reviews?offset=${offset}&limit=${limit}${themeId ? `&theme_id=${themeId}` : ''}`,
      true,
    );
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
