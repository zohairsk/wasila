import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Navbar';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Outlet, Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from 'react-router-dom';

export default function Login({setUserID, loginState, setLoginState, users, loginRequired, setLoginRequired, showWelcome, setShowWelcome}){
    const navigate = useNavigate(); 

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginAttempt, setLoginAttempt] = useState(false)

    function redirect(){
        setLoginState(true)
        setShowWelcome(true)
        setLoginRequired(false)
        navigate("/")
        
    }

    function verifyUser(e){
        e.preventDefault();
        for(let i=0;i<users.length;i++){
            if(users[i].email==email && users[i].password==password){
                console.log("in login, userID:", users[i].UserID)
                setUserID(users[i].UserID)
                setLoginState(true)
                return;
            }
        }
        setLoginState(false);
        setLoginAttempt(true);
        return;
    }

    function handleClose(){
        setLoginRequired(false);
    }
    
    return(
        <>
        <h1 className="display-5">Login to Donate</h1>
        {loginState ? 
            <>
                {redirect()}
            </>
        : 
        <>
            {loginRequired && <Toast className="mb-5 mx-4" onClose={handleClose} style={{width: '90%', height: '100%',backgroundColor:"#FFFFE0"}}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Login/Signup</strong>
                    </Toast.Header>
                    <Toast.Body className="py-3">Only registered users can donate. Please login or signup to continue!</Toast.Body>
            </Toast>}
        <Row>
            <Col style={{marginRight: "10%"}}>
                <img src="../images/login.png" width="100%" height="85%" style={{position:'relative', marginTop:'20%'}}></img>
            </Col>
            <Col style={{marginLeft: "5%", marginTop: "5%"}}>
                <div className="my-5 px-3 login border rounded" style={{backgroundColor:"rgb(190, 223, 255)"}}>
                    <div className="login-form">
                        <Form>
                            <Form.Control className="mt-5" type="email" placeholder="Email" required onChange={()=>setEmail(event.target.value)}></Form.Control>
                            <Form.Control className="my-4" type="password" placeholder="Password" required onChange={()=>setPassword(event.target.value)}></Form.Control>
                            <button className="mb-2 border border-dark" type="submit" onClick={verifyUser}>Login</button>
                        </Form>
                        {loginAttempt && <p>Incorrect username or id. Please try again.</p>}
                        <p>Click 
                            <Link to="/Signup"> here </Link>
                        if you are a new user</p>
                    </div>
                </div>
            </Col>
        </Row>
        </>
        }
        </>
    )
}

