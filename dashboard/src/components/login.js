import React, {useState} from "react"
import "./login.css"
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setMail] = useState("");
    const [password, setPassword]=useState("");
    const nav=useNavigate();

    const handleMail = (e) => {
        setMail(e.target.value)
    }
    const handlePass = (e) => {
        setPassword(e.target.value)
        
    }

    const handleLogin =(e)=>{
        e.preventDefault();
        if(!email){
            alert("Enter the MailId Please...")
        }
        if(!password){
            alert("Enter the Password Please...")
        }
        
        fetch('http://localhost:8000/login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,password
                    })
                  })
                    .then((res) => res.json())
                    .then((data)=>{
                        console.log(data, "userLogin");
                        if(data.status === "OK"){
                            alert("Congrats!!! Login Successfull")
                            window.localStorage.setItem("token",data.data);
                           nav("/home");
                        }
                    });
    }
 

    const handleNav=()=>{
        nav("/register")
    }

    return (
        <>
        <h1 className='Home-head'>Welcome to Crypto<span>Tracker</span></h1>
        
        <div className="logContainer">
            <div className="Rcontainer">
                <form onSubmit={handleLogin} className="login">
                    <h3>Login</h3>
                    <input type="text" name="email" value={email} onChange={handleMail} placeholder="Enter your Email"></input>
                    <input type="password" name="password" value={password} onChange={handlePass}  placeholder="Enter your Password" autoComplete="true"></input>
                    <button className="button">Login</button>
                    <div>
                     <h4><span className="purple">If you are a new user,Kindly </span></h4>    <span className="sign"  onClick={handleNav}>SignUp</span><span className="purple">here</span>
                    </div>
                </form>        
            </div>
        
        </div>
        </>
    )
}

export default Login