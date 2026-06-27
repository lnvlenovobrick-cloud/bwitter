import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';

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

// Wrapping the return value in Promise.resolve satisfies the Next.js type requirement 
// without triggering the ESLint 'require-await' rule.
export const getServerSideProps: GetServerSideProps = () => {
  return Promise.resolve({
    props: {}
  });
};
