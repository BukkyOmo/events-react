import { useState } from "react";

export default function useToken() {
    // const getToken = () => {
    //     const tokenString = sessionStorage.getItem('usertoken');
    //     const userToken = JSON.parse(tokenString);
    //     return userToken
    // }

    // const [token, setToken] = useState(getToken());

    // const saveToken = userToken => {
    //     console.log(userToken, 'usertoken')
    //     sessionStorage.setItem('usertoken', JSON.stringify(userToken));
    //     setToken(userToken)
    // };

    const saveToken = userToken 

    return {
        // getToken,
        token,
        setToken: saveToken
    }
}
