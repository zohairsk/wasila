import { useState } from 'react'
import './App.css'
import DonationCards from './DonationCards'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <section>
        <NavbarComp></NavbarComp>
        <h1>Donation Platform</h1>
        <div>
          <p>donate pls!</p>
        </div>
        <DonationCards></DonationCards>
     </section>
    </>
  )
}

export default App
