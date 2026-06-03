/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: "AIzaSyAFLMpqL2CZFH_550IxSZNSDAOYr4ulHI8"
  readonly VITE_FIREBASE_AUTH_DOMAIN: "apetiflow.firebaseapp.com"
  readonly VITE_FIREBASE_DATABASE_URL: "https://apetiflow-default-rtdb.firebaseio.com"
  readonly VITE_FIREBASE_PROJECT_ID: "apetiflow"
  readonly VITE_FIREBASE_STORAGE_BUCKET: "apetiflow.firebasestorage.app"
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: "1077896741490"
  readonly VITE_FIREBASE_APP_ID: "1:1077896741490:web:fbd98b9407c09a9e50f8eb"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
