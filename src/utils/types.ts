export type ResponseType<T> = {
  code: string
  msg: string
  data: T
}

export type CommonRes<T> = Promise<ResponseType<T>>

export enum CODE {
  OK = '200',
  DONE = '201',
  FAIL = '500',
}
