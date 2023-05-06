import Form from 'react-bootstrap/Form';
import NavbarComp from './Navbar';
import { useState } from "react";
//validity checks: fname & lname, phone num pattern, password matching

export default function Signup(){
    const [input, setInput] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const alphabets = /^[a-zA-Z]*$/;
        //checking if name contains only alphabets
        if(!((alphabets.test(input.fname)) && alphabets.test(input.lname))){
            alert(`Name must only include alphabets.`)
        }

        //checking phone number pattern: 
        const validPhoneNo = /^0\d{10}$/;
        if(!validPhoneNo.test(input.phonenum)){
            alert(`Incorrect format of phone number.`)
        }

        console.log(input.password, input.password2);
        //checking if passwords match:
        if(!(input.password.trim()===input.password2.trim())){
            alert("Passwords do not match.")
        }
        console.log(input);
        
        //call function to send data (in input object) to database and create user
    }
    return (
        <>
        <NavbarComp></NavbarComp>
        <h2 className='mt-4'>Register as a New User</h2>
        <div className='justify-content-center border rounded' style={{backgroundColor:'#FFE5CC', width: '24rem', height: 'auto'}}>
            <div className='justify-content-center' style={{width: '22rem'}}>
                <Form onSubmit={handleSubmit} className='ms-4 mt-2 py-2'>      
                    <Form.Control className = "my-3" required type="text" name="fname" placeholder="First Name" onChange={handleChange}></Form.Control>
                    <Form.Control required type="text" name="lname" placeholder="Last Name" onChange={handleChange}></Form.Control>
                    <Form.Control className = "my-3" required type="email" name="email" placeholder="Email" onChange={handleChange}></Form.Control>
                    <Form.Control className = "my-3" required type="tel" name="phonenum" placeholder="Phone Number" onChange={handleChange}></Form.Control>
                    <Form.Control className = "my-3" required type="password" name="password" placeholder="Password" onChange={handleChange}></Form.Control>
                    <Form.Control className = "my-3" required type="password" name="password2" placeholder="Confirm Password" onChange={handleChange}></Form.Control>
                    <Form.Control className = "my-3" required type="text" name="address" placeholder="Address" onChange={handleChange}></Form.Control>
                    <Form.Control className = "my-3" required type="text" name="city" placeholder="City" onChange={handleChange}></Form.Control>
                    <button type="submit" className='border border-dark'>Sign Up</button>
                </Form>
            </div>
        </div>
        </> 
    )
}

