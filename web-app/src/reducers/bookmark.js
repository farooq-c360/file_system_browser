export default function(state={}, action) {
    switch(action.type) {
        case 'LIST_BOOKMARK':
            return {...state, recent:action.payload, type:action.type}
        case 'ADD_BOOKMARK':
            return {...state, recent:action.payload, type:action.type}
        case 'CLEAR_STATE':
            return {...state, recent:action.payload, type:action.type}
        default:
            return state;
    }
}