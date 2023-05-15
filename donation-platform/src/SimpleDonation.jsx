import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { Outlet, Link } from "react-router-dom";
import Payment from './Payment'

export default function SimpleDonation() {
    const [Organisations, setOrganisations] = useState([])
    
    useEffect(()=>{
        fetch('http://localhost:8080/api/organisation')
        .then(response => response.json())
        .then(data => setOrganisations(data))
        .catch(error => console.error(error))
    },[]);
    useEffect(()=>{
        fetch('http://localhost:8080/api/user/donation/add/:amount/:pName/:oName')
        .then(response => response.json())
        .then(data => setOrganisations(data))
        .catch(error => console.error(error))
    },[]);
    

    const [proj, setProj] = useState([])
    const [orgSelected, setOrgSelected] = useState(false)
    
    const [organization, setOrganization] = useState('') //ORG CHOSEN BY USER
    const [amountValue, setAmountValue] = useState('') //AMOUNT BY USER
    const [selectedProject, setSelectedProject] = useState('none') //PROJECT SELECTED BY USER
    const [proceedFurther, setProceedFurther] = useState(false)
    
    useEffect(()=>{
        fetch(`http://localhost:8080/api/organisation/project/${organization}`)
        .then(response => response.json())
        .then(data => setProj(data))
        .catch(error => console.error(error))
    },[organization]);

    const [amount, setAmount] = useState("")
    const [projAmount, setProjAmount] = useState('')

    
    function handleClick(eventKey){
        setOrgSelected(true)
        setOrganization(eventKey);
        console.log("org:", organization);
    }
    function handleProject(eventKey){
        console.log(eventKey);
        setSelectedProject(eventKey);

    }
    function handleChange(event){
        setAmount(event.target.value)
    }
    function handleSubmit(event){
        event.preventDefault(); // Prevent form submission

        // Get the value of the input field by name
        setAmountValue(event.target.elements.amount.value);
        setProceedFurther(true)
    }
    return (
        <>
        {proceedFurther ? <>
        <Payment organization={organization} selectedProject={selectedProject} amountValue={amountValue}/>
        </> 
        : 
        <>
            <h2 className='mb-3'>Simple Donation</h2>
        <div className="border rounded" style={{width: '100%', height: '20rem' , backgroundColor: "rgb(240,248,255)", display: 'flex', flexDirection: 'column'}}>
            <h6 className='mt-3 mx-3'> Simply choose your desired organization, 
            enter the amount<br>
            </br>and we will handle the rest for you!</h6>
            <Form className='ms-4 mt-2 py-2' onSubmit={handleSubmit}>      
                <Dropdown onSelect={handleClick}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Organization
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            Organisations.map((Organisation,index) =>{
                                return(
                                    <>
                                    <Dropdown.Item key={index} eventKey={Organisation.name} id={`org${index}`}>{Organisation.name}</Dropdown.Item>
                                    </>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                {orgSelected ? 
                <>
                    <Dropdown onSelect={handleProject}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Projects
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            proj.map((proj,index) =>{
                                return(
                                    <>
                                    <Dropdown.Item key={index} eventKey={proj.name} id={`org${index}`}>{proj.name}</Dropdown.Item>
                                    </>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                </> 

                : <></>}
                <Form.Control className = "my-3" style={{position: 'relative', left: '32%', width: '10rem'}}  required type="text" name="amount" placeholder="Amount" onChange={handleChange}></Form.Control>
                <button type="submit" className='border border-dark'>Proceed to Payment</button>
            </Form>
        </div>
        </>
        }
    </>
   )
}