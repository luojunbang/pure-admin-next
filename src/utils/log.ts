import { generatorDate } from 'lo-utils'
import { ensureFile, appendFile } from 'fs-extra'
import { resolve } from 'path'
import { generatorLogText } from './'
enum LogType {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const LOG_PATH = 'log'
const SYSTEM_LOG = resolve(LOG_PATH, './system.log')
const BUSSINESS_LOG = resolve(LOG_PATH, './bussiness.log')

export class Log {
  path: string
  type?: string
  constructor(path: string, type?: string) {
    this.path = path
    this.type = type
  }

  common(logType: LogType, ...[logText, ...args]) {
    const ret =
      generatorLogText(logType, this.type, ...[logText, ...args]) + '\n'
    ensureFile(this.path)
      .then((res) => {
        return appendFile(this.path, ret)
      })
      .then((res) => {})
      .catch((err) => {})
  }

  debug(...[logText, ...args]) {
    this.common(LogType.DEBUG, ...[logText, ...args])
  }
  info(...[logText, ...args]) {
    this.common(LogType.INFO, ...[logText, ...args])
  }
  warn(...[logText, ...args]) {
    this.common(LogType.WARN, ...[logText, ...args])
  }
  error(...[logText, ...args]) {
    this.common(LogType.ERROR, ...[logText, ...args])
  }
}

export const sysLog = new Log(SYSTEM_LOG)
export const busLog = new Log(BUSSINESS_LOG)
