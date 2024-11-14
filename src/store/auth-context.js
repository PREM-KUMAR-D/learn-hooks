import React,{useEffect,useState} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogOut: () => { },
    onLogIn: (email, password) => { }

})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoggedIn = localStorage.getItem("isLoggedIn");
        if (storedLoggedIn === "1") {
            setIsLoggedIn(true);
        }

    }, [])


    const logInHandler = (email, password) => {


        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "1");
    }

    const logOutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
    }



    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogOut: logOutHandler,
        onLogIn: logInHandler
    
    }}>
        {props.children}
    </AuthContext.Provider>
}



export default AuthContext;