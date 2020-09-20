export const CHATTER_TOKEN_COOKIE = 'chatter_token';

/**
 * Get default expiration time for all cookie items
 */
const getDefaultExpires = (): Date => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  return currentDate;
};

/**
 * Set cookie by key/vay
 *
 * @param key
 * @param value
 * @param expires expiration time (default 1 day) see getDefaultExpires func
 */
export const setCookie = (key: string, value: string, expires?: Date): void => {
  if (document) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const expiration = expires ?? getDefaultExpires();
    document.cookie = `${key}=${value}; expires=${expiration}; path=/;`;
  }
};

/**
 * Get cookie by key
 *
 * @param key
 */
export const getCoockie = (key: string): string | undefined => {
  if (document && document.cookie) {
    const cookies = document.cookie.split(/; */).reduce((prev, cur) => {
      const [key, ...val] = cur.split('=');
      return { ...prev, [key]: decodeURIComponent(val.join('=')) };
    }, {});

    return cookies[key];
  }

  return undefined;
};

/**
 * Remove cookie
 *
 * @param key
 */
export const removeCookie = (key: string) => {
  if (document && document.cookie) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};
