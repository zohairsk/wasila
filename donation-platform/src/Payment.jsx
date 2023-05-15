import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import './App.css'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

export default function Payment({organization, selectedProject, amountValue,id}){
    const [sendData, setSendData] = useState(false)
    function handleSubmit(event){
        event.preventDefault();
        setSendData(true)
    }
    // const [dataSent, setDataSent] = useState(false)
    // //To get user donation amount
    // const [userAmount, setUserAmount] = useState([])
    // useEffect(()=>{
    //     fetch(`http://localhost:8080/api/user/amount/${id}`)
    //     .then(response => response.json())
    //     .then(data => setUserAmount(data))
    //     .catch(error => console.error(error))
    // },[]);
    // //To get project donation amount
    // const [projAmount, setProjAmount] = useState([])
    // useEffect(()=>{
    //     fetch(`http://localhost:8080/api/user/project/amount/${selectedProject}/${organization}`)
    //     .then(response => response.json())
    //     .then(data => setProjAmount(data))
    //     .catch(error => console.error(error))
    // },[]);
    // //api to get data into projects table
    // const [projectTotal, setProjectTotal] = useState('')
    // var currentamount = parseInt(amountValue)
    // currentamount = currentamount + projAmount
    // setProjectTotal(currentamount)
    // useEffect(()=>{
    //     fetch(`http://localhost:8080/api/user/donation/add/${projectTotal!=projAmount?projectTotal:null}/${selectedProject}/${organization}`)
    //     .then(response => response.json())
    //     .then(setDataSent(true))
    //     .catch(error => console.error(error))
    // },[]);
    // //api to get data into users table
    // const [userTotal, setUserTotal] = useState('')
    // var currentUserAmount = parseInt(amountValue);
    // currentUserAmount += userAmount
    // setUserTotal(currentUserAmount)
    // useEffect(()=>{
    //     fetch(`http://localhost:8080/api/user/donation/${userTotal!=userAmount? userTotal: null}/${id}`)
    //     .then(response => response.json())
    //     .then(setDataSent(true))
    //     .catch(error => console.error(error))
    // },[]);
    return(
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
    )
} 