import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: abortCont.signal });

        if (!res.ok) {
          throw Error('could not fetch data for that resource');
        }

        const result = await res.json();

        setData(result);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => abortCont.abort();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
