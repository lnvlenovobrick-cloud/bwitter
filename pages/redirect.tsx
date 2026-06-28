import { useEffect } from 'react';

export default function RedirectPage(): JSX.Element {
  useEffect(() => {
    // Read the fallback path directly from the browser URL address bar safely
    const queryParams = new URLSearchParams(window.location.search);
    const targetPath = queryParams.get('to');

    if (targetPath) {
      void window.location.replace(`/${targetPath}`);
    } else {
      void window.location.replace('/');
    }
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'sans-serif', opacity: 0.6 }}>Redirecting...</p>
    </div>
  );
}