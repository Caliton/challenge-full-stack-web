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

// DB config

export const getDbHost = (): string => process.env.DB_HOST || 'localhost'

export const getDbPort = (): number => Number(process.env.DB_PORT) || 5430

export const getDbUser = (): string => process.env.DB_USER || 'postgres'

export const getDbPass = (): string => process.env.DB_PASS || 'postgres'

export const getDbName = (): string => process.env.DB_NAME || 'maiseduca'

// Test config

export const getDbPortTest = (): number => Number(process.env.DB_PORT_TEST) || 5431
