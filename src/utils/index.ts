import { generatorDate } from 'lo-utils'
export function generatorLogText(
  logType: string,
  type?: string,
  ...[logText, ...args]
) {
  return `[${generatorDate(Date.now(), 'y-m-d h:i:s.e')}][${logType}]${
    type ? ` [${type}]` : ''
  } ${args.reduce((rs, i) => rs.replace('{}', i), logText)}`
}

export function log(...[logText, ...args]) {
  console.log(generatorLogText('INFO', undefined, logText, ...args))
}

export * from './http'
export * from './auth'
