import { useState } from 'react'
import './App.css'
import Homepage from './Homepage'
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
        <Homepage></Homepage>
     </section>
    </>
  )
}

export default App
