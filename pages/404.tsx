import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SEO } from '@components/common/seo';
import type { ReactElement, ReactNode } from 'react';

// Dynamically import the layouts with SSR disabled so Next.js doesn't execute 
// any of their underlying context hooks during the static production compilation build phase.
const DynamicProtectedLayout = dynamic(
  () => import('@components/layout/common-layout').then((mod) => mod.ProtectedLayout),
  { ssr: false }
);

const DynamicHomeLayout = dynamic(
  () => import('@components/layout/common-layout').then((mod) => mod.HomeLayout),
  { ssr: false }
);

const DynamicMainLayout = dynamic(
  () => import('@components/layout/main-layout').then((mod) => mod.MainLayout),
  { ssr: false }
);

export default function Custom404(): JSX.Element {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <>
        <SEO title='Page not found / Twitter' />
        <div className='flex items-center justify-center p-8'>
          <span className='text-light-secondary dark:text-dark-secondary'>Loading...</span>
        </div>
      </>
    );
  }

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

Custom404.getLayout = (page: ReactElement): ReactNode => (
  <DynamicProtectedLayout>
    <DynamicMainLayout>
      <DynamicHomeLayout>{page}</DynamicHomeLayout>
    </DynamicMainLayout>
  </DynamicProtectedLayout>
);
