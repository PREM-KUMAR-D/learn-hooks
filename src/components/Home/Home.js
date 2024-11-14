import React,{useContext} from "react";
import Card from "../UI/Card/Card";
import AuthContext from "../../store/auth-context";
import "./Home.css";


const Home = (props)=>{
    const authCtx = useContext(AuthContext);

    return(
        <Card className={"home"}>
            
            <h1> Welcome Back !</h1>
        </Card>
    )
}

export default Home;