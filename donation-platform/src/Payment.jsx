import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import './App.css'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

export default function Payment(){
    console.log("hello")
    return(
    <>
        <Card style={{ width: '25rem'}}>
        <Card.Body>
        <Card.Title>Payment from Card</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Form className="ms-4 mt-2 py-2">
            <Form.Control className="my-3" required type="text" name="number" placeholder="Card Number" />
            <Form.Control className="my-3" required type="text" name="name" placeholder="Card Holder name" />
            <Form.Control className="my-3" required type="date" name="Expiry Date" placeholder="Expiry Date"  />
            <Form.Control className="my-3" required type="text" name="CVC" placeholder="CVC"  />
            
        </Form>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
    </>
    )
} 