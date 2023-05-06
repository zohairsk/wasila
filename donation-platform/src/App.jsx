import { useState } from 'react'
import './App.css'
import DonationCards from './DonationCards'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Navbar';
import Signup from './Signup';
import Login from './Login'
import DonationSubmission from './DonationSubmission';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavbarComp></NavbarComp>
      <DonationCards></DonationCards>
    </>
  )
}

export default App
