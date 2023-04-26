import { useEffect, useRef } from 'react';
import refreshToken from './refreshToken';

const useInactivityTimer = (refreshTokenValue, setAccessToken, inactivityTimeout = 15 * 60 * 1000) => {
  const timer = useRef(null);

  const resetTimer = async () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const newAccessToken = await refreshToken(refreshTokenValue);
      if (newAccessToken) {
        setAccessToken(newAccessToken);
      } else {
        // Handle token refresh failure, e.g. redirect to login
      }
    }, inactivityTimeout);
  };

  useEffect(() => {
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);
    document.addEventListener('scroll', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer.current);
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keydown', resetTimer);
      document.removeEventListener('scroll', resetTimer);
    };
  }, [refreshTokenValue, setAccessToken, inactivityTimeout]);
};

export default useInactivityTimer;
