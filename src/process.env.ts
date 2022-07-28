export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LOCALAPPDATA?: string
      TANGO_ENV?: "local"
    }
  }
}
