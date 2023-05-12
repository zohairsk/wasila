import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

export default function SimpleDonation() {
    const [Organisations, setOrganisations] = useState([])
    
    useEffect(()=>{
        fetch('http://localhost:8080/api/organisation')
        .then(response => response.json())
        .then(data => setOrganisations(data))
        .catch(error => console.error(error))
    },[]);
    const [amount, setAmount] = useState("")
    
    function handleClick(){
        console.log(event.target.id)
        // setOrganizations(event.target.id)
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
                        {
                            Organisations.map((Organisation,index) =>{
                                return(
                                    <>
                                    <Dropdown.Item key={index} href={`action${index}`} id={`org${index}`} onClick={()=>handleClick()}>{Organisation.name}</Dropdown.Item>
                                    </>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control className = "my-3" style={{position: 'relative', left: '32%', width: '10rem'}}  required type="text" name="amount" placeholder="Amount" onChange={handleChange}></Form.Control>
                <button type="submit" className='border border-dark'>Donate</button>
            </Form>
        </div>
        </>
   )
}