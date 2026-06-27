import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';

export default function RedirectPage(): JSX.Element {
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (redirect) {
      const targetPath = Array.isArray(redirect) ? redirect.join('/') : redirect;
      
      // Use the 'void' operator to explicitly tell ESLint we are purposely discarding the Promise
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

// Removed the 'async' keyword to satisfy the @typescript-eslint/require-await rule
export const getServerSideProps: GetServerSideProps = () => {
  return {
    props: {}
  };
};
