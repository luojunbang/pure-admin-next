import chalk from 'chalk'
import { generatorDate } from 'lo-utils'
import { ensureFile, appendFile } from 'fs-extra'
import { resolve } from 'path'

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
    ensureFile(this.path)
      .then(res => {
        return appendFile(
          this.path,
          `[${generatorDate(Date.now(), 'y-m-d h:i:s.e')}][${logType}]${
            this.type ? ` [${this.type}]` : ''
          } ${args.reduce((rs, i) => rs.replace('{}', i), logText)} \n`
        )
      })
      .then(res => {})
      .catch(err => {})
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
