import { userConstants } from "../actions/constants"

const initState = {
    error: null,
    message: '',
    loading: false,  
}
const userreducer = (state = initState, action) => {
   
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message

            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...initState,
                error:action.payload.error,
                message:action.payload.message
            }
            break;
        default:

    }
    return state;
}

export default userreducer;