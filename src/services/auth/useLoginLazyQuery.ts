import { useState } from 'react';
import { navigate } from 'gatsby';
import { CHATTER_TOKEN_COOKIE, setCookie } from '../cookie';

export interface LoginRequestInput {
  username: string;
  password: string;
}

interface LoginLazyQueryResponse {
  loading: boolean;
  error: string;
}

type LoginLazyQuery = [(input: LoginRequestInput) => void, LoginLazyQueryResponse];

/**
 * Lazy login query, if 200 response, sets token in cookie and redirect user to index
 */
export const useLoginLazyQuery = (): LoginLazyQuery => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const request = (input: LoginRequestInput) => {
    setLoading(true);

    const req = new XMLHttpRequest();

    req.open('POST', `${process.env.API_URL}/login`, true);
    req.onreadystatechange = () => {
      if (req.status === 401) {
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
            setCookie(CHATTER_TOKEN_COOKIE, result.token, result.expire);
            navigate('/');
          }
        } else {
          setError('Attempt to login is failed');
        }
      }
      if (req.readyState === 4) {
        setLoading(false);
      }
    };
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(input));
  };

  return [request, { loading, error }];
};
