import { useState, useEffect } from 'react';
import Error from 'next/error';
import { useTheme } from '@lib/context/theme-context';
import { SEO } from '@components/common/seo';

export default function NotFound(): JSX.Element {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Only checks the theme once safely loaded in the user's browser window
    if (theme) {
      setIsDarkMode(['dim', 'dark'].includes(theme));
    }
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
