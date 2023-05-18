import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DonationCards from './DonationCards'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Login from './Login';
import Signup from './Signup';
import Aboutus from './Aboutus';
import Donationinfo from './Donationinfo';
import Button from 'react-bootstrap/Button';
import DonationSubmission from './DonationSubmission';
import Home from './Home';
import FAQ from './FAQ';
import Payment from './Payment'
import Userprofile from './Userprofile';
import DonationTracking from './DonationTracking';
import Graph from './Graph'


function App() {
  const [count, setCount] = useState(0)

  const [userID, setUserID] = useState(localStorage.getItem("userID") || '')
  const [sendData, setSendData] = useState(false)

  const [userObj, setUserObj] = useState({})


  //welcome prompt lol
  const [showWelcome, setShowWelcome] = useState(false);

  const [users,setUsers] = useState([])
  useEffect(()=>{
    fetch("http://localhost:8080/api/login")
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.error(error))
  },[])
  useEffect(()=>{console.log(users)},[users])

  useEffect(()=>{
    setUserObj(users.find(user=>user.UserID==userID))
  },[users,userID])

  const [loginState, setLoginState] = useState(userID ? true : false)
  const [loginRequired, setLoginRequired] = useState(false)

  return (  
  <>
    <BrowserRouter>
    <>
    <NavbarComp userID={userID} user={userObj} loginState={loginState} setLoginState={setLoginState} showWelcome={showWelcome} setShowWelcome={setShowWelcome}></NavbarComp>


      <Routes>
          <Route path='/' element={<Home showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
          <Route path="/Organizations" element={<Donationinfo/>} />
          <Route path="/Login" element={<Login setUserID={setUserID} loginState={loginState} setLoginState={setLoginState} users={users} loginRequired={loginRequired} setLoginRequired={setLoginRequired} showWelcome={showWelcome} setShowWelcome={setShowWelcome}/>} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Donate" element={<DonationSubmission users={users} sendData={sendData} setSendData={setSendData} userID = {userID} loginState={loginState} loginRequired={loginRequired} setLoginRequired={setLoginRequired}/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Payment" element={<Payment sendData={sendData} setSendData={setSendData} userID={userID}/>} />
          <Route path="/Tracking" element={<DonationTracking userID={userID} users={users} />} />
          <Route path="/Userprofile" element={<Userprofile users={users} setUsers={setUsers} userID={userID}/>} />
      </Routes>

    </>
    
    </BrowserRouter></> 
  )
}

export default App

