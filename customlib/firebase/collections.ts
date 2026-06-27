import { collection } from 'firebase/firestore';
import { userConverter } from '@lib/types/user';
import { tweetConverter } from '@lib/types/tweet';
import { bookmarkConverter } from '@lib/types/bookmark';
import { statsConverter } from '@lib/types/stats';
import { db } from './app';
import type { CollectionReference, Firestore } from 'firebase/firestore';
import type { Bookmark } from '@lib/types/bookmark';
import type { Stats } from '@lib/types/stats';

export const usersCollection = collection(db as Firestore, 'users').withConverter(
  userConverter
);

export const tweetsCollection = collection(db as Firestore, 'tweets').withConverter(
  tweetConverter
);

export function userBookmarksCollection(
  id: string
): CollectionReference<Bookmark> {
  return collection(db as Firestore, `users/${id}/bookmarks`).withConverter(
    bookmarkConverter
  );
}

export function userStatsCollection(id: string): CollectionReference<Stats> {
  return collection(db as Firestore, `users/${id}/stats`).withConverter(statsConverter);
}
