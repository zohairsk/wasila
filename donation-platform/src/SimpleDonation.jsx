import './SimpleDonation.css'
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

export default function SimpleDonation() {
    const [organization, setOrganization] = useState("")
    const [amount, setAmount] = useState("")
    
    function handleClick(){
        console.log(event.target.id)
        setOrganization(event.target.id)
    }
    function handleChange(event){
        setAmount(event.target.value)
    }
    return (
        <>
        <h2 className='mb-3'>Simple Donation</h2>
        <div className="border rounded" style={{width: '100%', height: '20rem' , backgroundColor: "rgb(240,248,255)", display: 'flex', flexDirection: 'column'}}>
            <h6 className='mt-3 mx-3'>Simply choose your desired organization, 
            enter the amount<br>
            </br>and we will handle the rest for you!</h6>
            <Form className='ms-4 mt-2 py-2'>      
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Organization
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" id="org1" onClick={()=>handleClick()}>Org 1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" id="org2" onClick={()=>handleClick()}>org 2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" id="org3" onClick={()=>handleClick()}>org 3</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control className = "my-3" style={{position: 'relative', left: '32%', width: '10rem'}}  required type="text" name="amount" placeholder="Amount" onChange={handleChange}></Form.Control>
                <button type="submit" className='border border-dark'>Donate</button>
            </Form>
        </div>
        </>
   )
}