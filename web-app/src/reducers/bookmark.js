export default function(state={}, action) {
    switch(action.type) {
        case 'LIST_BOOKMARK':
            console.log('in reducer');
            console.log(action.payload);
            return {...state, recent:action.payload}
        case 'ADD_BOOKMARK':
            console.log('in reducer');
            return {...state, recent:action.payload}
        case 'CLEAR_STATE':
            return {...state, recent:action.payload}
        default:
            return state;
    }
}