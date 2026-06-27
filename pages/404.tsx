import { useState, useEffect } from 'react';
import Error from 'next/error';
import { useTheme } from '@lib/context/theme-context';
import { SEO } from '@components/common/seo';
import type { GetServerSideProps } from 'next';

export default function NotFound(): JSX.Element {
  // CRITICAL BUILD GUARD: Stops Next.js from reading context properties on the build server
  if (typeof window === 'undefined') {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-light-secondary dark:text-dark-secondary animate-pulse'>
          Loading...
        </p>
      </div>
    );
  }

  // The rest runs safely inside the user's browser context at runtime
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (theme) setIsDarkMode(['dim', 'dark'].includes(theme));
  }, [theme]);

  return (
    <>
      <SEO
        title='Page not found / Twitter'
        description='Sorry we couldn’t find the page you were looking for.'
        image='/404.png'
      />
      <Error statusCode={404} withDarkMode={isDarkMode} />
    </>
  );
}

// Forces Next.js to fully treat this page as server-rendered on demand
export const getServerSideProps: GetServerSideProps = async (context) => {
  await Promise.resolve(!!context.res);
  return {
    props: {}
  };
};
