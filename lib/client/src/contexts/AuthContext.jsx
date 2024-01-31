import { createContext, useState, useContext, useEffect } from 'react'
import backend from '../utils/backend'

import LoginPage from '../containers/loginPage'
const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider(props) {
  const [admin, setAdmin] = useState(null)
  const [isAuth, setIsAuth] = useState(null)
  const [sessionChecked, setSessionChecked] = useState(false)

  useEffect(() => {
    checkSessionConnexion()
  }, [])

  function handleLogin(admin) {
    setIsAuth(true)
    setAdmin(admin)
  }

  function handleLogout() {
    setIsAuth(false)
    setAdmin(null)
  }

  async function checkSessionConnexion() {
    const res = await backend.get('./auth/me')
    if (res.data.isAuthenticated) {
      handleLogin(res.data.admin)
    }
    setSessionChecked(true)
  }

  return (
    <>
      {sessionChecked && !isAuth && <LoginPage onLogin={handleLogin} />}
      {isAuth && <AuthContext.Provider value={{ admin, isAuth, handleLogin, handleLogout }}>{props.children}</AuthContext.Provider>}
    </>
  )
}
