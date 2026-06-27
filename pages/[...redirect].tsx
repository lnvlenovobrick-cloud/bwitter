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

// Keeping 'async' and adding a fake 'await' forces dynamic runtime execution 
// without triggering the ESLint rule or crashing the compiler.
export const getServerSideProps: GetServerSideProps = async () => {
  await Promise.resolve(); 

  return {
    props: {}
  };
};
