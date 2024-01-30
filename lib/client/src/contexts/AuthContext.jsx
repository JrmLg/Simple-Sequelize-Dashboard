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

  useEffect(() => {
    checkSessionConnexion()
  }, [])

  function handleLogin(admin) {
    console.log('login with admin :', admin)
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
  }

  return (
    <>
      {!isAuth && <LoginPage onLogin={handleLogin} />}
      {isAuth && <AuthContext.Provider value={{ admin, isAuth, handleLogin, handleLogout }}>{props.children}</AuthContext.Provider>}
    </>
  )
}
