import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import './App.css'
import Card from 'react-bootstrap/Card';
import { v4 as uuidv4 } from 'uuid';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

export default function SimplePayment({savedCard, userCardNum, userCardCVC, userCardExpiry, sendData, setSendData, userID, organization, selectedProject, amountValue, prevUserAmount}){
    
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();


    const [donationEntry, setDonationEntry] = useState('')
    const [newUserAmount, setNewUserAmount] = useState('')


    function handleSubmit(event){
      event.preventDefault();
      
      let num;
      prevUserAmount.length != 0 ? num = Number(prevUserAmount[0].amountdonated) : num=''
      num = num + Number(amountValue)
      setNewUserAmount(num)
      
      //generating date: 
      const date = new Date(); // Create a new Date object with the current date and time
      const year = date.getFullYear(); // Get the year (YYYY)
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (MM) and pad with leading zero if necessary
      const day = String(date.getDate()).padStart(2, '0'); // Get the day (DD) and pad with leading zero if necessary
      const formattedDate = `${year}-${month}-${day}`
      
      console.log("date: ", formattedDate)
      const id = uuidv4();
      setDonationEntry({
        DonID: id,
        amount: amountValue,
        d: formattedDate,
        status:'inProgress',
        pName: selectedProject,
        oName: organization,
        UserID: userID
      })

      setSendData(true)
  }

useEffect(() => {
  if (sendData) {
    console.log(newUserAmount)
    console.log(userID)
    const response = fetch('http://localhost:8080/api/donation/add', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationEntry),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSendData(false);
      })
      .catch(error => console.error(error));
  }
    fetch(`http://localhost:8080/api/user/donation/${newUserAmount}/${userID}`)
      .then(response => response.json())
      .then(console.log("sent!")) 
      .catch(error => console.error(userID));
}, [sendData]);
  
   
    return(
      <>
      {savedCard ? 
        <>
        <Card style={{ width: '25rem'}}>
        <Card.Body>
        <Card.Title className="mt-2 mb-3">Payment from Card</Card.Title>
        <PaymentInputsWrapper {...wrapperProps}>
          <svg {...getCardImageProps({ images })} />
          <input disabled readOnly value = {userCardNum} {...getCardNumberProps()} />
          <input disabled readOnly value = {userCardExpiry} {...getExpiryDateProps()} />
          <input disabled readOnly value = {userCardCVC} {...getCVCProps()} />
        </PaymentInputsWrapper>
        <button type="submit" onClick={handleSubmit} className="border border-dark mt-4">Submit Payment</button>
        </Card.Body>
      </Card>
        </> 
        : 
        <>
        <Card style={{ width: '25rem'}}>
        <Card.Body>
        <Card.Title>Payment from Card</Card.Title>
        <PaymentInputsWrapper {...wrapperProps}>
          <svg {...getCardImageProps({ images })} />
          <input {...getCardNumberProps()} />
          <input {...getExpiryDateProps()} />
          <input {...getCVCProps()} />
        </PaymentInputsWrapper>
        </Card.Body>
      </Card>
      </>
      }
      </>
    )
} 