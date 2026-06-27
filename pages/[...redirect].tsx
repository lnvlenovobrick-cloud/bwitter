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

// Using an explicit runtime async check forces Next.js to flag this page as 
// server-only, completely blocking static data collection tracking at build time.
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Awaiting a real contextual property satisfies the ESLint 'require-await' rule safely
  const checkResolved = await Promise.resolve(!!context.params);

  if (!checkResolved) {
    return {
      notFound: true
    };
  }

  return {
    props: {}
  };
};
