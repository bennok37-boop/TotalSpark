/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GTM_ID?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_WORDPRESS_URL?: string;
  readonly VITE_RESEND_API_KEY?: string;
  readonly VITE_CALLRAIL_COMPANY_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}