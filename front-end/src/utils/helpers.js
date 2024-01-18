
import store from '../store'
import router from '../router'

export const authGuard = (to, from, next) => {
  const isLoggedIn = store.state.core.loggedIn
  if (isLoggedIn === false) {
    router.push("/admin-login")
  } else { 
    next()
  }
};