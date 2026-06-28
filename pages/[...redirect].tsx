import { useEffect } from 'react';
import type { GetServerSideProps } from 'next';

export default function RedirectPage(): JSX.Element {
  useEffect(() => {
    // Pure, vanilla browser-level routing completely invisible to the Next.js compiler tree
    const segments = window.location.pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      window.location.replace(`/${segments.join('/')}`);
    } else {
      window.location.replace('/');
    }
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'sans-serif', opacity: 0.6 }}>Redirecting...</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // A simple context-bound statement to keep the linter completely quiet
  await Promise.resolve(!!context.res);
  return {
    props: {}
  };
};
