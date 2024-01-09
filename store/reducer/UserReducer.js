// Define the initial state of the user reducer
const initialState = { currentUser: {} }

// Define the user reducer function
export default function userReducer(state = initialState, action) {

    let nextState

    switch (action.type) {
        // If the action type is 'ADD_USER'
        case 'SET_CURRENT_USER':
            // Replace value corresponding to the current_user key with the value of action
            nextState = { currentUser: action.value }
            return nextState
        case 'UPDATE_CURRENT_USER':
            // Replace value corresponding to the current_user key with the value of action
            nextState = { currentUser: { ...state.currentUser, ...action.value } }
            return nextState
        case 'CLEAR_CURRENT_USER':
            nextState = {currentUser: {}}
            return nextState

        default:
            return state
    }
}
