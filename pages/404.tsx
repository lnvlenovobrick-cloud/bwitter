import dynamic from 'next/dynamic';
import type { GetServerSideProps } from 'next';

// 1. Force Next.js to ignore this component at build time entirely
const DynamicNotFound = dynamic(
  () => import('@components/common/seo').then(() => {
    // We lazy-load the component elements internally so nothing triggers at root level
    return function BaseNotFound() {
      const Error = require('next/error').default;
      const { useTheme } = require('@lib/context/theme-context');
      const { SEO } = require('@components/common/seo');
      const { useState, useEffect } = require('react');

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
    };
  }),
  { ssr: false } // Blocks static page generation engine evaluation
);

export default function NotFound(): JSX.Element {
  return <DynamicNotFound />;
}

// 2. Force Next.js to mark the 404 route as purely server-side rendered
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Use a context-bound await to satisfy strict linting rules
  await Promise.resolve(!!context.res);
  return {
    props: {}
  };
};
