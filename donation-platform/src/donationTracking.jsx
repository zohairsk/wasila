import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import './App.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';


export default function DonationTracking({userID}) {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/donation/${userID}`)//u1 must be generated through a variable
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setDonations(data)
      })
      .catch(error => console.error(error));    
  }, []);
  
  return ( 
    <div>
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
                return (<><ProgressBar now={100} variant="success"/><p>Received</p></>)
              }else if(donation.status == "verified"){
                return (<><ProgressBar now={50} variant="warning"/><p>Sent</p></>)
              }else{
                return(<><ProgressBar now={30} variant="info"/><p>In progress</p></>)
                }
            })()}</td>
        </tr>
          )
        })}
       </tbody>
      </Table>
  
    </div>
  );
}
