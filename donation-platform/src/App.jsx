import { useEffect, useState } from 'react'
import './App.css'
import DonationCards from './DonationCards'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Login from './Login';
import Aboutus from './aboutus';

function App() {
  const [count, setCount] = useState(0)
  const [cards,setCards]=useState(false)
  function handlecards(){
    return setCards(!cards);
  }

  return (
    <>
     <NavbarComp></NavbarComp>
      <h1>Donation Platform</h1>
      <br></br>
      <img src="../images/icon.png"></img>
      <br></br><br></br>
      <Aboutus></Aboutus>
      <br></br>
      <button type="button" className="btn btn-info" onClick={()=>{handlecards()}}>See Donation Information</button>
      {cards&&(<DonationCards/>)}
    </>
    
  )
}

export default App
