
const filterReducer  = (state='', action) => {

    switch (action.type) {
        case 'NEW_FILTER':
            return action.data
        default:
            return state
    }
}

export const newFilter = data => {
    return {
        type: 'NEW_FILTER',
        data
    }
}

export default filterReducer