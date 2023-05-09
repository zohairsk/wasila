import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Navbar';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function Login(){
    const users=[
        {
            'email': 'a@gmail.com',
            'password': '123'
        },
        {
            'email': 'b@gmail.com',
            'password': '123'
        }
    ]
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginState, setLoginState] = useState(false)
    const [loginAttempt, setLoginAttempt] = useState(false)

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
    
    // function handleLogin(){
    //     setLoginState(verifyUser(event, email, password))
    // }
    return(
        <>
        <h1>Donation Platform</h1>
        {loginState ? 
        <h2>You are logged in!</h2>
        : 
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
                    <a href="https://www.w3schools.com/" target="_blank"> here </a>
                if you are a new user</p>
            </div>
        </div>
        }
        </>
    )
}

// email = document.querySelector("input[type=text]").value
// password = document.querySelector("input[type=password]").value

