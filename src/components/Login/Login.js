import React, { useEffect, useReducer, useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import "./Login.css";

const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.payload, isValid: action.payload.includes("@") };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.includes("@") };
    }



    return { value: "", isValid: false }
}

const passwordReducer = (state, action) => {

    if (action.type === "PASSWORD_INPUT") {
        return { value: action.payload, isValid: action.payload.trim().length > 6 };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }

    return { value: "", isValid: false };
}


const Login = (props) => {


    const [formIsValid, setFormIsValid] = useState(false);
    const [emailState, dispatchEmail] = useReducer(emailReducer,
        { value: "", isValid: false }
    )
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: "", isValid: false });

    useEffect(()=>{
        setFormIsValid(emailState.isValid && passwordState.isValid);
    },[emailState.isValid,passwordState.isValid])



    const emailChangeHandler = (event) => {
        dispatchEmail({ type: "USER_INPUT", payload: event.target.value })
    }

    const passwordChangeHandler = (event) => {

        dispatchPassword({ type: "PASSWORD_INPUT", payload: event.target.value });
    }

    const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" })
    }

    const validatePasswordHandler = () => {
        dispatchPassword({ type: "INPUT_BLUR" });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    }



    return (
        <Card className={"login"}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${"control"} ${!emailState.isValid ? "invalid" : ""}`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>

                <div
                    className={`${"control"} ${passwordState.isValid === false ? "invalid" : ""
                        }`}
                >

                    <label htmlFor="password">Password</label>
                    <input type="password"
                        id="password"
                        value={passwordState.value}
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