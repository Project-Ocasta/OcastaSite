/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_API_KEY: string;
  VITE_APP_AUTH_DOMAIN: string;
  VITE_APP_PROJECT_ID: string;
  VITE_APP_STORAGE_BUCKET: string;
  VITE_APP_MESSAGING_SENDER_ID: string;
  VITE_APP_APP_ID: string;
  VITE_APP_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
