import { useMemo, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { orderBy, query } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { useAuth } from '@lib/context/auth-context';
import {
  tweetsCollection,
  userBookmarksCollection
} from '@lib/firebase/collections';
import { clearAllBookmarks } from '@lib/firebase/utils';
import { useArrayDocument } from '@lib/hooks/useArrayDocument';
import { useCollection } from '@lib/hooks/useCollection';
import { useModal } from '@lib/hooks/useModal';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Tweet } from '@components/tweet/tweet';
import { StatsEmpty } from '@components/tweet/stats-empty';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { HeroIcon } from '@components/ui/hero-icon';
import { Loading } from '@components/ui/loading';
import type { CollectionReference } from 'firebase/firestore';
import type { ReactElement, ReactNode } from 'react';
import type { GetServerSideProps } from 'next';

type InferCollectionType<T> = T extends CollectionReference<infer U> ? U : never;

type TargetBookmark = InferCollectionType<ReturnType<typeof userBookmarksCollection>>;
type TargetTweet = InferCollectionType<typeof tweetsCollection>;

// Client-side guard to isolate layout evaluation away from build-time static engine
function ClientOnlyWrapper({ children }: { children: ReactNode }): JSX.Element | null {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return <>{children}</>;
}

export default function Bookmarks(): JSX.Element {
  const { user } = useAuth();
  const { open, openModal, closeModal } = useModal();
  const userId = user?.id ? String(user.id) : '';

  const { data: bookmarksRef, loading: bookmarksRefLoading } = useCollection<TargetBookmark>(
    query(userBookmarksCollection(userId), orderBy('createdAt', 'desc')),
    { allowNull: true }
  );

  const tweetIds = useMemo(
    () => bookmarksRef?.map(({ id }): string => id) ?? [],
    [bookmarksRef]
  );

  const { data: tweetData, loading: tweetLoading } = useArrayDocument<TargetTweet>(
    tweetIds,
    tweetsCollection,
    { includeUser: true }
  );

  const handleClear = async (): Promise<void> => {
    await clearAllBookmarks(userId);
    closeModal();
    toast.success('Successfully cleared all bookmarks');
  };

  return (
    <MainContainer>
      <SEO title='Bookmarks / Twitter' />
      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
      >
        <ActionModal
          title='Clear all Bookmarks?'
          description='This can’t be undone and you’ll remove all Tweets you’ve added to your Bookmarks.'
          mainBtnClassName='bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab 
                            focus-visible:bg-accent-red/90'
          mainBtnLabel='Clear'
          action={handleClear}
          closeModal={closeModal}
        />
      </Modal>
      <MainHeader className='flex items-center justify-between'>
        <div className='-mb-1 flex flex-col'>
          <h2 className='-mt-1 text-xl font-bold'>Bookmarks</h2>
          <p className='text-xs text-light-secondary dark:text-dark-secondary'>
            @{user?.username}
          </p>
        </div>
        <Button
          className='dark-bg-tab group relative p-2 hover:bg-light-primary/10
                     active:bg-light-primary/20 dark:hover:bg-dark-primary/10 
                     dark:active:bg-dark-primary/20'
          onClick={openModal}
        >
          <HeroIcon className='h-5 w-5' iconName='ArchiveBoxXMarkIcon' />
          <ToolTip
            className='!-translate-x-20 translate-y-3 md:-translate-x-1/2'
            tip='Clear bookmarks'
          />
        </Button>
      </MainHeader>
      <section className='mt-0.5'>
        {bookmarksRefLoading || tweetLoading ? (
          <Loading className='mt-5' />
        ) : !bookmarksRef ? (
          <StatsEmpty
            title='Save Tweets for later'
            description='Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.'
            imageData={{ src: '/assets/no-bookmarks.png', alt: 'No bookmarks' }}
          />
        ) : (
          <AnimatePresence mode='popLayout'>
            {tweetData?.map((tweet) => (
              <Tweet {...(tweet as React.ComponentProps<typeof Tweet>)} key={tweet.id} />
            ))}
          </AnimatePresence>
        )}
      </section>
    </MainContainer>
  );
}

Bookmarks.getLayout = (page: ReactElement): ReactNode => (
  <ClientOnlyWrapper>
    <ProtectedLayout>
      <MainLayout>
        <HomeLayout>{page}</HomeLayout>
      </MainLayout>
    </ProtectedLayout>
  </ClientOnlyWrapper>
);

export const getServerSideProps: GetServerSideProps = async () => {
  await Promise.resolve();
  return {
    props: {}
  };
};
