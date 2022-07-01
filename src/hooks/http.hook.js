import { useState, useCallback } from 'react';
import { processTypes } from '../types/types';

const useHttp = () => {
  const [process, setProcess] = useState(processTypes.waiting);

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

    setProcess(processTypes.loading);

    try {
      const response = await fetch(url, { method, headers, body });

      if (!response.ok) throw new Error(`Could not fetch ${url}, status: ${response.status}`);

      const data = await response.json();

      setProcess(processTypes.confirmed);

      return data;
    } catch (e) {
      setProcess(processTypes.error);
      
      throw e;
    }
  }, []);

  const clearError = useCallback(() => {
    setProcess(processTypes.waiting)
  }, []);

  return {
    process,
    setProcess,
    request,
    clearError,
  };
};

export { useHttp }