import { useState, useEffect } from 'react';

export default function useDebug() {
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('debug')) {
      setDebug(true);
    } else {
      setDebug(false);
    }
  }, []);

  return debug;
}
