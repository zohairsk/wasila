import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import './App.css'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

export default function Payment({sendData, setSendData, userID, prevUserAmount,donations}) {
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
            console.log(data);
          })
          .catch(error => console.error(error));
      });
    }
    setSendData(false)
    //copy this 
    fetch(`http://localhost:8080/api/user/donation/${newUserAmount}/u1`)
      .then(response => response.json())
      .then(console.log("sent!"))
      .catch(error => console.error(error));
  }, [sendData]);

return (
    <>
        <Card style={{ width: '25rem'}}>
        <Card.Body>
        <Card.Title>Payment from Card</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Form className="ms-4 mt-2 py-2" onSubmit={handleSubmit}>
            <Form.Control className="my-3" required type="text" name="number" placeholder="Card Number" />
            <Form.Control className="my-3" required type="text" name="name" placeholder="Card Holder name" />
            <Form.Control className="my-3" required type="date" name="Expiry Date" placeholder="Expiry Date"  />
            <Form.Control className="my-3" required type="text" name="CVC" placeholder="CVC"  />
            <button type="submit" className='border border-dark'>Submit Payment</button>
        </Form>
      </Card.Body>
    </Card>
    </>
  );
}

