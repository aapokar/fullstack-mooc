const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_USERS':
    return [...state, action.data]
  case 'INIT_USERS':
    return action.users
  default:
    return state
  }
}

export const initializeUsers = users => {
  return ({
    type: 'INIT_USERS',
    users
  })
}

export default blogsReducer