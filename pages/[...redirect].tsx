import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { GetStaticPaths, GetStaticProps } from 'next';

export default function RedirectPage(): JSX.Element {
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (redirect) {
      const targetPath = Array.isArray(redirect) ? redirect.join('/') : redirect;
      void router.replace(`/${targetPath}`);
    }
  }, [redirect, router]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <p className='text-light-secondary dark:text-dark-secondary animate-pulse'>
        Redirecting...
      </p>
    </div>
  );
}

// 1. Tell Next.js to pre-render exactly ZERO static paths during the build phase
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking' // Forces Next.js to run the file on-demand for any route visited
  };
};

// 2. Clear the lint warning with a synchronous resolved promise payload
export const getStaticProps: GetStaticProps = () => {
  return Promise.resolve({
    props: {}
  });
};
