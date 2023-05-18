import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import './App.css'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { useNavigate } from 'react-router-dom';

export default function Payment({savedCard, userCardNum, userCardCVC, userCardExpiry, sendData, setSendData, userID, prevUserAmount,donations}) {
  const navigate = useNavigate();

  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();

  const [newUserAmount, setNewUserAmount] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const num = prevUserAmount.length !== 0 ? Number(prevUserAmount[0].amountdonated) : '';
    const totalAmount = donations.reduce((total, donationData) => total + Number(donationData.amountValue), 0);

    setNewUserAmount(num + totalAmount);
    setSendData(true);
  }

  useEffect(() => {
    if (sendData) {
      donations.forEach((donationData) => {
        const { organization, amountValue } = donationData;

        //generating date: 
        const date = new Date(); // Create a new Date object with the current date and time
        const year = date.getFullYear(); // Get the year (YYYY)
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (MM) and pad with leading zero if necessary
        const day = String(date.getDate()).padStart(2, '0'); // Get the day (DD) and pad with leading zero if necessary
        const formattedDate = `${year}-${month}-${day}`;
        const id = uuidv4();

        const donationEntry = {
          DonID: id,
          amount: amountValue,
          d: formattedDate,
          status: 'inProgress',
          oName: organization,
          UserID: userID
        };

      
        fetch('http://localhost:8080/api/advanceddonation/add', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(donationEntry),
        })
          .then(response => response.json())
          .then(data => {
            alert('Donation Successful!')
            navigate('/')
          })
          .catch(error => console.error(error));
      });
    }
    setSendData(false)
    fetch(`http://localhost:8080/api/user/donation/${newUserAmount}/${userID}`)
      .then(response => response.json())
      .then(console.log("sent!"))
      .catch(error => console.error(error));
  }, [sendData]);

return (
    <>
        {savedCard ? 
        <>
        <Card style={{ width: '25rem'}}>
        <Card.Body>
        <Card.Title className="mt-2 mb-3">Payment from Card</Card.Title>
        <PaymentInputsWrapper {...wrapperProps}>
          <svg {...getCardImageProps({ images })} />
          <input value = {userCardNum} {...getCardNumberProps()} />
          <input value = {userCardExpiry} {...getExpiryDateProps()} />
          <input value = {userCardCVC} {...getCVCProps()} />
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
  );
}

