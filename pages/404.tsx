import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SEO } from '@components/common/seo';
import type { ReactElement, ReactNode } from 'react';

const DynamicProtectedLayout = dynamic<{ children: ReactNode }>(
  () => import('@components/layout/common-layout').then((mod) => mod.ProtectedLayout),
  { ssr: false }
);

const DynamicHomeLayout = dynamic<{ children: ReactNode }>(
  () => import('@components/layout/common-layout').then((mod) => mod.HomeLayout),
  { ssr: false }
);

const DynamicMainLayout = dynamic<{ children: ReactNode }>(
  () => import('@components/layout/main-layout').then((mod) => mod.MainLayout),
  { ssr: false }
);

export default function Custom404(): JSX.Element {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <SEO title='Page not found / Twitter' />
      <div className='flex flex-col items-center gap-6 p-8 text-center'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold'>📢 This page doesn’t exist.</h2>
          <p className='text-sm text-light-secondary dark:text-dark-secondary'>
            Try searching for something else or head back to your settings.
          </p>
        </div>
      </div>
    </>
  );
}

Custom404.getLayout = (page: ReactElement): ReactNode => {
  // This client-side guard wrapper inside the layout completely blocks 
  // Next.js from triggering context side-effects during build static extraction!
  return (
    <ClientOnlyWrapper>
      <DynamicProtectedLayout>
        <DynamicMainLayout>
          <DynamicHomeLayout>{page}</DynamicHomeLayout>
        </DynamicMainLayout>
      </DynamicProtectedLayout>
    </ClientOnlyWrapper>
  );
};

// Internal safe guard component
function ClientOnlyWrapper({ children }: { children: ReactNode }): JSX.Element | null {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return <>{children}</>;
}
