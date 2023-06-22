export const AuthReducer = (user, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('isAuthenticated', JSON.stringify(true));
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', JSON.stringify(action.payload.token));
            return {
                ...user,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user
            }
        case 'LOGOUT':
            localStorage.clear();
            return {
                ...user,
                isAuthenticated: false,
                token: null,
                user: null
            }
        default:
            return user
    }
}