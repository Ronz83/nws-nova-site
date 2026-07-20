import { useEffect } from 'react';

export default function Promo1Redirect() {
  useEffect(() => {
    window.location.href = '/promo1.html';
  }, []);
  return null;
}
