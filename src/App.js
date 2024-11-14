import React, { useState, useEffect } from "react";
import AuthContext from "./store/auth-context";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
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



  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: logOutHandler,
    }}
    >
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={logInHandler} />}
        {isLoggedIn && <Home onLogout={logOutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
