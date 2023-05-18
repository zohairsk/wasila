import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import './App.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';
import UserGraph from './UserGraph';

export default function DonationTracking({userID, users}) {
  const [donations, setDonations] = useState([]);
  const [money, setMoney] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/donation/${userID}`)//u1 must be generated through a variable
      .then(response => response.json())
      .then(data => {
        setDonations(data)
      })
      .catch(error => console.error(error));    
  }, []);

  useEffect(()=>{
    fetch(`http://localhost:8080/api/user/${userID}`)
    .then(response => response.json())
    .then(data => {
      console.log("hiiii", data[0].amountdonated)
      setMoney(data[0].amountdonated)})
    .catch(error => console.error(error))
    },[])
  
  return ( 
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width:'100%'}}>
        <div style={{width: '42%', marginRight: '8%', marginTop: '16%'}}>
            <UserGraph userID={userID}></UserGraph>
            <h4 style={{margin: '5%'}} >Total Amount Donated: Rs {money} </h4>
        </div>
        <div style={{paddingTop: "10%"}}>
            <Table bordered hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation,index)=>{
              return (
              
                <tr key={index}>
                <td>{index+1}</td>
                <td>{donation.name}</td>
                <td>{donation.amount}</td>
                <td>{donation.d}</td>
                <td>{(()=>{
                  if(donation.status == "completed"){
                    return (<><ProgressBar animated now={100} variant="success"/><p>Received</p></>)
                  }else if(donation.status == "verified"){
                    return (<><ProgressBar animated now={50} variant="warning"/><p>Sent</p></>)
                  }else{
                    return(<><ProgressBar animated now={30} variant="info"/><p>In progress</p></>)
                    }
                })()}</td>
            </tr>
              )
            })}
          </tbody>
          </Table>
      
        </div>
    </div>
  );
}
