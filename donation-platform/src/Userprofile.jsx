import React, { useEffect, useState } from 'react';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';


export default function Userprofile({ users, userID, setUsers }) {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [email, setEmail] = useState('');

    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();


    const [editable, setEditable] = useState(false);


    useEffect(() => {


        for (let i = 0; i < users.length; i++) {
            console.log(users[i].UserID, userID)
            if (users[i].UserID === userID) {
                setPassword(users[i].password);
                setName(users[i].name);
                setEmail(users[i].email);
                setAddress(users[i].address);
                setCity(users[i].city);
                setCardNumber(users[i].cardnum);
                setExpiryDate(users[i].expirydate);
                setCvc(users[i].cvc);
                break;
            }
        }
    }, [userID, users]);


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };




    const handleSubmit = () => {
        setEditable(false);
        //send post req to backend

        const formdata = { name, city, address };
        if (password) {
            formdata.password = password;
        }

        if (cvc && expiryDate && cardNumber) {
            formdata.cardnum = cardNumber;
            formdata.expirydate = expiryDate;
            formdata.cvc = cvc;
        }


        const res = fetch(`http://localhost:8080/api/user/${userID}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setEditable(true);
                const user = users.find(user => user.UserID === userID);
                user.name = name || user.name;
                user.city = city || user.city;
                user.address = address || user.address;
                user.cardnum = cardNumber || user.cardnum;
                user.expirydate = expiryDate || user.expirydate;
                user.cvc = cvc || user.cvc;
                user.password = password || user.password;
                setUsers([...users]);
            })
            .catch(err => console.log(err))



    }


    return (


        <div style={{ marginLeft: '10%' }} className="container">
            <h2 className='display-6'>User Profile</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input id="name" type="text" className="form-control" value={name} onChange={handleNameChange} disabled={!editable} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input id="email" type="email" className="form-control" value={email} disabled={true} />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address:</label>
                <input id="address" type="text" className="form-control" value={address} onChange={handleAddressChange} disabled={!editable} />
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">City:</label>
                <input id="city" type="text" className="form-control" value={city} onChange={handleCityChange} disabled={!editable} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input id="password" type="password" className="form-control" value={password} onChange={handlePasswordChange} disabled={!editable} />
            </div>
            <PaymentInputsWrapper {...wrapperProps}>
                <svg {...getCardImageProps({ images })} />
                <input name="cardnum" value={cardNumber} disabled={!editable} {...getCardNumberProps({ onChange: (e) => { setCardNumber(e.target.value) } })} />
                <input name="expiry" value={expiryDate} disabled={!editable} {...getExpiryDateProps({ onChange: e => setExpiryDate(e.target.value) })} />
                <input name="cvc" value={cvc} disabled={!editable} {...getCVCProps({ onChange: e => setCvc(e.target.value) })} />
            </PaymentInputsWrapper>
            <div className="my-3" style={{ display: "flex", gap: "1rem", justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => setEditable(!editable)}>📝 Edit</button>
                <button className="btn btn-primary" onClick={() => handleSubmit()}>📋 Save</button>
            </div>

        </div>
    );
}
