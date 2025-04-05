/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CUBEJS_TOKEN: string
  readonly VITE_CUBEJS_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 