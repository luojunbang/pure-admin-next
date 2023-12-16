export const appName = process.env.APP_NAME as string
export const localStorageName = `${appName}__token`

export const getToken = () => {
  return localStorage.getItem(localStorageName) ?? ''
}

export const hasToken = () => !!getToken()

export const saveToken = token => {
  return localStorage.setItem(localStorageName, token)
}
