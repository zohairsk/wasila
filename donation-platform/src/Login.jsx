import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Navbar';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Outlet, Link } from "react-router-dom";
import App from './App';
import Toast from 'react-bootstrap/Toast';

export default function Login({loginState, setLoginState, users, loginRequired}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [loginState, setLoginState] = useState(false)
    const [loginAttempt, setLoginAttempt] = useState(false)

    function redirect(){
        setLoginState(true)
        window.location.href = "/"
        
    }

    function verifyUser(e){
        e.preventDefault();
        for(let i=0;i<users.length;i++){
            console.log("Checking", users[i].email, users[i].password);
            if(users[i].email==email && users[i].password==password){
                setLoginState(true)
                return;
            }
        }
        setLoginState(false);
        setLoginAttempt(true);
        return;
    }
    
    return(
        <>
        {loginState ? 
        redirect()
        : 
        <>
            {loginRequired && <Toast className="mb-5 mx-4" style={{width: '90%', height: '100%',backgroundColor:"#FFFFE0"}}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Login/Signup</strong>
                    </Toast.Header>
                    <Toast.Body className="py-3">Only registered users can donate. Please login or signup to continue!</Toast.Body>
            </Toast>}
        <div className="login border rounded" style={{backgroundColor:"rgb(190, 223, 255)"}}>
            <h3>Login</h3>
            <div className="login-form">
                <Form>
                    <Form.Control className="m-3" type="email" placeholder="Email" required onChange={()=>setEmail(event.target.value)}></Form.Control>
                    <Form.Control className="m-3" type="password" placeholder="Password" required onChange={()=>setPassword(event.target.value)}></Form.Control>
                    <button className="my-2 border border-dark" type="submit" onClick={verifyUser}>Login</button>
                </Form>
                {loginAttempt && <p>Incorrect username or id. Please try again.</p>}
                <p>Click 
                    <Link to="/Signup"> here </Link>
                if you are a new user</p>
            </div>
        </div>
        </>
        }
        </>
    )
}

// email = document.querySelector("input[type=text]").value
// password = document.querySelector("input[type=password]").value

