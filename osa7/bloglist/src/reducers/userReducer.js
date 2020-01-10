import blogService from '../services/blogs'


const userReducer = (state=null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'LOGOUT':
    return action.user
  default:
    return state
  }}

export const initializeUser = (user) => {
    return ({
      type:'SET_USER',
      user
    })
  
}


export const setUser = user => {
  return {
    type: 'SET_USER',
    user
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return {
    type: 'LOGOUT',
    user: null
  }
}

export default userReducer