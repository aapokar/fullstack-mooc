const notificationReducer = (state = '', action) => {

    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.message
        case 'CLEAR':
            return action.message
        default:
            return state
    }
}

export const newNotification = (message, time) => {
    console.log(time)
    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            message,
          })
        await setTimeout(()=> {
        dispatch({
            type: 'CLEAR',
            message: ''
        })
              
        }, time*1000)

    }
}

export const clearNotification = () => {
    console.log('pitäis tyhjätä')
    return {
        type: 'CLEAR',
        message: ''
    }
}

export default notificationReducer