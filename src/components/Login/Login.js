import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import "./Login.css";

const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);


    useEffect(()=>{
        setFormIsValid(
            enteredEmail.includes("@") &&
            enteredPassword.trim().length > 6
        )
    },
    [enteredEmail,enteredPassword])

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value)

    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
        
    }

    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes("@"));
    }

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(enteredEmail, enteredPassword);
    }



    return (
        <Card className={"login"}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${"control"} ${!emailIsValid ? "invalid" : ""}`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input type="email"
                        id="email"
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>

                <div
                    className={`${"control"} ${passwordIsValid === false ? "invalid" : ""
                        }`}
                >

                    <label htmlFor="password">Password</label>
                    <input type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />

                </div>

                <div>
                    <div className={"actions"}>
                        <Button
                            type="Submit"
                            className={"btn"}
                            disabled={!formIsValid}
                        >
                            Login
                        </Button>

                    </div>
                </div>



            </form>

        </Card>
    )

}


export default Login;