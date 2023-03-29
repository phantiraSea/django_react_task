import { axiosInstance } from '../../axiosInstance'

export const signup = (email, password) => {
    return axiosInstance.post("user/create/",{
        email: email,
        password: password
    })
}

export const signin = (email, password) => {
    return axiosInstance.post("user/token/",{
        email: email,
        password: password
    })
}

export const isAuthenticated = () => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt) {
        return jwt
    }
    return false;
}

export const authenticate = (jwt,email) => {
    if (jwt) {
        localStorage.setItem("jwt",JSON.stringify(jwt));
        localStorage.setItem("email",JSON.stringify(email));
    }
}

export const signout = (next=f=>f) => {
    localStorage.clear();
    next();
}

export const getEmail = () => {
    const email = JSON.parse(localStorage.getItem("email"))
    return email;
}