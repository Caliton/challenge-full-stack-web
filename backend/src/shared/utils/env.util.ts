// Environment Config

const getEnv = (): string => {
  const env = process.env.NODE_ENV || 'dev'
  return ['dev', 'test', 'prod'].includes(env) ? env : 'dev'
}

export const isDev = (): boolean => getEnv() === 'dev'

export const isTest = (): boolean => getEnv() === 'test'

export const isProd = (): boolean => getEnv() === 'prod'

// Web Config

export const getPort = (): number => Number(process.env.PORT) || 4000

export const getServerBaseUrl = (): string => process.env.SERVER_BASE_URL || 'http://localhost:4000'
