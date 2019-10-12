export default function(state={}, action) {
    switch(action.type) {
        case 'LIST_RECENT':
            console.log('in reducer');
            return {...state, recent:action.payload}
        case 'CLEAR_STATE':
            return {...state, recent:action.payload}
        default:
            return state;
    }
}