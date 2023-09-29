import pino, { type Logger } from 'pino'
export type { Logger } from 'pino'

export default (): Logger => {
  const enabled = process.env.LOGGER === 'true'
  const level: string = ((process?.env?.LOG_LEVEL) != null) ? process.env.LOG_LEVEL : 'debug'
  const nodeEnv: string = ((process?.env?.NODE_ENV) != null) ? process.env.NODE_ENV : 'local'

  if (nodeEnv === 'local') {
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
