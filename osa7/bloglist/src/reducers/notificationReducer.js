

const notificationReducer = (state = '', action) => {

  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.message
  case 'CLEAR':
    return ''

  default:
    return state
  }

}

export const newNotification = (message) => {
  return async dispatch => {
    await dispatch({
      type: 'NEW_NOTIFICATION',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        message: ''
      })
    },5000)
  }
}

// export const newNotification = (message) => {
//   return {
//     type: 'NEW_NOTIFICATION',
//     message
//   }
// }

export default notificationReducer