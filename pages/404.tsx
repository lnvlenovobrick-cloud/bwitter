import { useEffect, useState } from 'react';
import { SEO } from '@components/common/seo';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import type { ReactElement, ReactNode } from 'react';

// Safe client-side mount wrapper to completely hide contexts from the build engine
function ClientOnlyWrapper({ children }: { children: ReactNode }): JSX.Element | null {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return <>{children}</>;
}

export default function Custom404(): JSX.Element {
  return (
    <>
      <SEO title='Page not found / Twitter' />
      <div className='flex flex-col items-center gap-6 p-8 text-center'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold'>📢 This page doesn’t exist.</h2>
          <p className='text-sm text-light-secondary dark:text-dark-secondary'>
            Try searching for something else or head back to your home feed.
          </p>
        </div>
      </div>
    </>
  );
}

Custom404.getLayout = (page: ReactElement): ReactNode => {
  return (
    <ClientOnlyWrapper>
      <ProtectedLayout>
        <MainLayout>
          <HomeLayout>{page}</HomeLayout>
        </MainLayout>
      </ProtectedLayout>
    </ClientOnlyWrapper>
  );
};
