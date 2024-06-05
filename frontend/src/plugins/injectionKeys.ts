import { InjectionKey, inject } from "vue"

// const NOTIFY_FUNC_KEY: InjectionKey<(message: string, duration?: number) => void> =
Symbol("notify function")

export function injectAny<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }

  return resolved
}

// export { NOTIFY_FUNC_KEY }
