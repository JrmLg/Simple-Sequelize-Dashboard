import { createContext, useState, useContext } from 'react'

import LoginPage from '../containers/loginPage/loginPage'
const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null)
  const [isAuth, setIsAuth] = useState(null)

  const value = {
    authUser,
    setAuthUser,
    isAuth,
    setIsAuth,
  }

  return (
    <>
      {isAuth && <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>}
      {!isAuth && <LoginPage />}
    </>
  )
}
