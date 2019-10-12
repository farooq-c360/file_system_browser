export default function(state={}, action) {
    switch(action.type) {
        case 'LIST_ALL_FILES':
            console.log('in reducer');
            return {...state, files:action.payload}
        case 'ADD_FILES':
            return {...state, files:action.payload}
        case 'CLEAR_STATE':
            return {...state, files:action.payload}
        default:
            return state;
    }
}