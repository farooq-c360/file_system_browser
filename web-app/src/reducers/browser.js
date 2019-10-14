export default function(state={}, action) {
    switch(action.type) {
        case 'LIST_ALL_FILES':
            return {...state, files:action.payload, type:action.type}
        case 'ADD_FILES':
            return {...state, files:action.payload, type:action.type}
        case 'CLEAR_STATE':
            return {...state, files:action.payload, type:action.type}
        default:
            return state;
    }
}