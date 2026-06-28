import { useEffect, useState } from 'react';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import type { ReactElement, ReactNode } from 'react';

export default function Custom404(): JSX.Element {
  const [isMounted, setIsMounted] = useState(false);

  // Ensures code execution only happens on the client after mounting,
  // completely bypassing build-time evaluation issues.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a clean placeholder during the static build generation phase
    return (
      <>
        <SEO title="Page not found / Twitter" />
        <div className="flex items-center justify-center p-8">
          <span className="text-light-secondary dark:text-dark-secondary">Loading...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Page not found / Twitter" />
      <div className="flex flex-col items-center gap-6 p-8 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">📢 This page doesn’t exist.</h2>
          <p className="text-sm text-light-secondary dark:text-dark-secondary">
            Try searching for something else or head back to your settings.
          </p>
        </div>
      </div>
    </>
  );
}

Custom404.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
