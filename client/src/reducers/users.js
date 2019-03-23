import isEmpty from 'lodash/isEmpty';
import jwtDecode from 'jwt-decode'

const authToken = localStorage.authToken

let initialState
if (authToken) {
    const user = jwtDecode(authToken)
    initialState = {
        isAuthenticated: true,
        user: user
    };
} else {
    initialState = {}
}

const userReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        default: return state;
    }
}
export default userReducer