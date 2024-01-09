const initialState = { currentUser: {} }


export default function userReducer(state = initialState, action) {

    let nextState

    switch (action.type) {
        case 'SET_CURRENT_USER':
            nextState = { currentUser: action.value }
            return nextState
        case 'UPDATE_CURRENT_USER':
            nextState = { currentUser: { ...state.currentUser, ...action.value } }
            return nextState
        case 'CLEAR_CURRENT_USER':
            nextState = {currentUser: {}}
            return nextState

        default:
            return state
    }
}
