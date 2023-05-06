import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Navbar';

export default function Login(){
    return(
        <>
        <NavbarComp></NavbarComp>
        <h1>Donation Platform</h1>
        <div className="login" >
            <h1>Login</h1>
            <div className="login-form">
                <form>
                    <input type="text" placeholder="Email"></input>
                    <br></br>
                    <input type="password" placeholder="Password"></input>
                    <br></br>
                    <button type="submit" onClick={verifyUser}>Login</button>
                </form>
                <p>Click 
                    <a href="https://www.w3schools.com/" target="_blank"> here </a>
                if you are a new user</p>
            </div>
        </div>
        </>
    )
}

function verifyUser(){
    email = document.querySelector("input[type=text]").value
    password = document.querySelector("input[type=password]").value

    //verify user from database
    //if user exists, redirect to home page
    //else, show error

    if (checkUserfromDB(email, password)){
        //redirect to home page
    }
}