export default function Login(){
    return(
        <>
        <div className="login">
            <h1>Login</h1>
            <div className="login-form">
                <form>
                    <input type="text" placeholder="Email"></input>
                    <input type="password" placeholder="Password"></input>
                    <button type="submit" onClick="verifyUser">Login</button>
                </form>
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