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
import Footer from './Footer';
import Spinner from 'react-bootstrap/Spinner';
import Payment from './Payment'


function App() {
  const [count, setCount] = useState(0)
  const [cards,setCards]=useState(false)
  function handlecards(){
    return setCards(!cards);
  }
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the spinner after 2 seconds
    const timeout = setTimeout(() => {
      setShowSpinner(false);
    }, 10);

    // Cleanup function to clear the timeout if the component unmounts before the 2 seconds are up
    return () => {
      clearTimeout(timeout);
    };
  }, [])

  const [users,setUsers] = useState([])
  useEffect(()=>{
    fetch("http://localhost:8080/api/login")
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.error(error))
  },[])
  useEffect(()=>{console.log(users)},[users])

  const [loginState, setLoginState] = useState(false)

  return (  
  <>
    <BrowserRouter>
    {showSpinner ? 
    <Spinner animation="border" />
    :
    <>
    <NavbarComp loginState={loginState} setLoginState={setLoginState}></NavbarComp>

      <Routes>
          <Route path='/' element={<Home cards={cards} setCards={setCards} />} />
          <Route path="/Organizations" element={<Donationinfo/>} />
          <Route path="/Login" element={<Login loginState={loginState} setLoginState={setLoginState} users={users}/>} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Donate" element={<DonationSubmission />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Payment" element={<Payment />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    
    </>
    }
    
    {/* <Footer></Footer> */}
    </BrowserRouter></> 
  )
}

export default App

