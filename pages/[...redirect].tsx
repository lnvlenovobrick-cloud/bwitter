import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';

export default function RedirectPage() {
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (redirect) {
      // Construct your target destination path from the catch-all array
      const targetPath = Array.isArray(redirect) ? redirect.join('/') : redirect;
      
      // Perform your redirect logic here (e.g., redirecting to a profile or home)
      router.replace(`/${targetPath}`);
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

// CRITICAL: Forces Next.js to bypass static pre-rendering during Vercel build phase
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  };
};
