const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
} as const;

type Config = typeof config;

export function getFirebaseConfig(): Config {
  // Check if keys are missing
  const isIncomplete = Object.values(config).some((value) => !value);
  
  if (isIncomplete && process.env.NODE_ENV === 'production') {
    // Log a warning instead of a hard crash during static page builds
    console.warn('Firebase configuration is incomplete. This is normal during static compilation builds.');
  }

  return config;
}
