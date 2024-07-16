import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const abortCtrl = useRef(new AbortController());

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}, token=null) => {
      setIsLoading(true);      

      try {
        const authHeaders = {
          ...headers,
          Authorization: token ? `Bearer ${token}` : undefined,
        };
        const response = await fetch(url, {
          method,
          body,
          headers: authHeaders, 
          signal: abortCtrl.current.signal,     
          timeout: 10000,
              
        });
     

        const responseData = await response.json();

        

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        if (err.name === 'DOMException' && err.message === 'signal is aborted without reason') {
          // Ignore this specific error
          console.log('Ignoring signal aborted error');
        } else {
          setError(err.message);
          setIsLoading(false);
          throw err;
        }
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };



  useEffect(() => {
    const abortCtrlCurrent = abortCtrl.current;
    return () => {
      if (abortCtrlCurrent) {
        abortCtrlCurrent.abort();
      }
    };
  }, [abortCtrl]);

  return { isLoading, error, sendRequest, clearError };
};
