export const rp = {
  common(code: number, data: any, message?: string) {
    return Response.json({
      code,
      message: message ?? '',
      data,
    })
  },
  ret200(data: any) {
    return this.common(200, data)
  },
  ret201(data: any, message: string) {
    return this.common(201, data, message)
  },
  ret500(message: any = '500 Internal Error.') {
    return this.common(500, {}, message)
  },
}
