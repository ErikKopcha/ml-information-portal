import { useState, useCallback } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /**
   * @param { Object } options
   * @param { String } options.url
   * @param { Object } options.method
   * @param { Object | null } options.body
   * @param { Object } options.headers
   */
  const request = useCallback(async (options = {}) => {
    const {
      url,
      method = 'GET',
      body = null,
      headers = {
        'Content-Type': 'application/json',
      },
    } = options;

    setLoading(true); 

    try {
      const response = await fetch(url, { method, headers, body });

      if (!response.ok) throw new Error(`Could not fetch ${url}, status: ${response.status}`);

      const data = await response.json();

      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      
      throw e;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    loading,
    error,
    request,
    clearError
  }
};

export { useHttp }