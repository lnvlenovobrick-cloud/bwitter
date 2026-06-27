import { useState, useEffect } from 'react';
import Error from 'next/error';
import { useTheme } from '@lib/context/theme-context';
import { SEO } from '@components/common/seo';
import type { GetStaticProps } from 'next';

export default function NotFound(): JSX.Element {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Cleaned up the brackets to satisfy the single-line curly rule
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

// Bypasses Next.js static collection failures during empty context compilation
export const getStaticProps: GetStaticProps = () => {
  return {
    props: {}
  };
};
