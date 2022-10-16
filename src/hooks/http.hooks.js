import { useState, useCallback } from "react";

export default function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (
    url, 
    method = 'GET', 
    body = null, 
    headers = { 'Content-Type': 'application/json' }
    ) => {
      setLoading(true);

      try {
        const res = await fetch(url, { method, body, headers });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, err status ${res.status}`);
          }
        const data = await res.json();
        setLoading(false);

        return data;
        
      } catch (err) {
        setLoading(false);
        setError(err.message)
        throw err;
      }
    }, []);

  const clearError = useCallback(() => setError(null), []);
   
  return { loading, request, error, clearError };
}
