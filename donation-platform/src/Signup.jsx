import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import NavbarComp from './Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { v4 as uuidv4 } from 'uuid';

export default function Signup() {
  const navigate = useNavigate() 

  //credit card
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();


  //new account redirect
  const [newAccCreated, setNewAccCreated] = useState(false)
  const [showspinner, setshowspinner] = useState(false);

  //spinner stuff
  useEffect(() => {
    if(!showspinner) return;
    // Set a timeout to hide the spinner after 2 seconds
    const timeout = setTimeout(() => {
      setshowspinner(false);
    }, 3000);

    // Cleanup function to clear the timeout if the component unmounts before the 2 seconds are up
    return () => {
      clearTimeout(timeout);
    };
  }, [showspinner])
  

  const [user, setUser] = useState({
    userID: '',
    name: '',
    email: '',
    password: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    amountdonated: null,
    city:'',
    address:''
  });

  const [input, setInput] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // setInput((values) => ({ ...values, [name]: value });
    setUser({...user, [name]: value});
    // setUser((prevUser) => ({ ...prevUser, userID: 'u2', [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const alphabets = /^[a-zA-Z\s]*$/; // Allow space in the name
    // Checking if name contains only alphabets
    if (!alphabets.test(user.name)) {
      alert('Name must only include alphabets.');
      return;
    }
  

    // Checking phone number pattern
    const validPhoneNo = /^\+?\d{1,3}?\d{9}$/; // Allow phone numbers with or without country code
    if (!validPhoneNo.test(user.phonenum)) {
      alert('Incorrect format of phone number.');
      return;
    }

    // Checking if passwords match
    if (!(user.password.trim() === user.password2.trim())) {
      alert('Passwords do not match.');
      return;
    }
    
    
    try {
      await handleClick(event);
    } catch (error) {
      console.error(error);
    }

  };

  const handleClick = async (e) => {
    e.preventDefault();
    const id = uuidv4();

    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...user, UserID: id}), // body data type must match "Content-Type" header
      });
      const ok = response.json(); 
      console.log({ ok })
    }
    catch (error) {
      console.error(error);
      alert('Error signing up. Please try again.');
      return;
    }
    setNewAccCreated(true)
    setshowspinner(true)
  };

  return (
    <>
      {newAccCreated ? 
      <>
        {showspinner ?
        <>
          <h1 className='display-3'> Account Created!</h1>
          <p className='display-6'>You may proceed to login</p>
          <Spinner animation="grow" variant='primary' />
        </>
          :
          <>
          {navigate('/Login')}
          </>
          }
      </>
    :
    <Row>
        <Col>
          <img src="../images/signup.png" width="90%" height="70%" style={{position:'relative', marginTop:'20%'}}></img>
        </Col>
        <Col>
            <div style={{paddingLeft: '20%'}}>
               <h2 className="my-4 display-6" style={{marginRight: '22%'}}>Register as a New User</h2>
                <div className="justify-content-center border rounded" style={{ backgroundColor: 'rgb(190, 223, 255)', width: '24rem', height: 'auto' }}>
                  <div className="justify-content-center" style={{ width: '22rem' }}>
                    <Form className="ms-4 mt-2 py-2">
                      <Form.Control className="my-3" required type="text" name="name" placeholder="Name" onChange={handleChange} />
                      <Form.Control className="my-3" required type="email" name="email" placeholder="Email" onChange={handleChange} />
                      <Form.Control className="my-3" required type="tel" name="phonenum" placeholder="Phone Number" onChange={handleChange} />
                      <Form.Control className="my-3" required type="password" name="password" placeholder="Password" onChange={handleChange} />
                      <Form.Control className="my-3" required type="password" name="password2" placeholder="Confirm Password" onChange={handleChange} />
                      <Form.Control className="my-3" required type="text" name="city" placeholder="City" onChange={handleChange} />
                      <Form.Control className="my-3" required type="text" name="address" placeholder="Address" onChange={handleChange} />
                      <PaymentInputsWrapper {...wrapperProps}>
                        <svg {...getCardImageProps({ images })} />
                        <input name="cardnum" {...getCardNumberProps({onChange: handleChange}) } />
                        <input name="expiry" {...getExpiryDateProps({onChange: handleChange})} />
                        <input name="cvc" {...getCVCProps({onChange: handleChange})} />
                      </PaymentInputsWrapper>

                      {/* <Form.Control className="my-3" required type="number" name="cardno" placeholder="Card Number" onChange={handleChange} /> */}
                      <button type="submit" onClick={handleSubmit} className="border border-dark">
                        Sign Up
                      </button>
                  </Form>
                </div>
                </div>
            </div>
        </Col>
      </Row>
    }
      
    </>
  );
}