export const appName = process.env.NEXT_PUBLIC_APP_NAME as string
export const localStorageName = `${appName}__token`

export const getToken = () => {
  return localStorage.getItem(localStorageName) ?? ''
}

export const removeToken = () => {
  return localStorage.removeItem(localStorageName)
}

export const hasToken = () => !!getToken()

export const saveToken = token => {
  return localStorage.setItem(localStorageName, `Bearer ${token}`)
}
