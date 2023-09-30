import pino, { type Logger } from 'pino'
export type { Logger } from 'pino'

export default (): Logger => {
  const enabled = process?.env?.LOGGER === 'true'
  const level: string = ((process?.env?.LOG_LEVEL) != null) ? process.env.LOG_LEVEL : 'debug'
  const debugMode = process?.env?.DEBUG_MODE === 'true'

  if (debugMode) {
    return pino({
      enabled,
      level,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    })
  }

  return pino({
    enabled,
    level
  })
}
