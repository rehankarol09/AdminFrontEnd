import { authConstants } from "../actions/constants";

const initState = {
    token: null,
    user: {
        firstname: '',
        lastname: '',
        email: '',

    },
    authenthicate: false,
    authenthicating: false
};

export default (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenthicating: true
            }
            break;

        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenthicate: true,
                authenthicating:false
            }
            break;
        /* case authConstants.LOGIN_FAILURE:
            state={
                authenthicating:true,
                ...action
            } */
    }

    return state;
}