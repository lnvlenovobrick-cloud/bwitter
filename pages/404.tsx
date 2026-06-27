import { useState, useEffect } from 'react';
import Error from 'next/error';
import { useTheme } from '@lib/context/theme-context';
import { SEO } from '@components/common/seo';
import type { GetServerSideProps } from 'next';

export default function NotFound(): JSX.Element {
  // 1. Always call hooks at the very top level of the component
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This only executes once the page safely hits the browser window
    setIsMounted(true);
    if (theme) {
      setIsDarkMode(['dim', 'dark'].includes(theme));
    }
  }, [theme]);

  // 2. Conditional returns are completely safe down here, AFTER all hooks are declared
  if (!isMounted) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-light-secondary dark:text-dark-secondary animate-pulse'>
          Loading...
        </p>
      </div>
    );
  }

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  await Promise.resolve(!!context.res);
  return {
    props: {}
  };
};
