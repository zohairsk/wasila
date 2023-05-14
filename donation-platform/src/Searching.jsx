import {useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Searching(){

    const handleClick = (eventKey) => {
        console.log(eventKey)}


    const [causes, setCauses] = useState([])
    useEffect(()=>{
        fetch('http://localhost:8080/api/causes')
        .then(response => response.json())
        .then(data => setCauses(data))
        .catch(error => console.error(error))
    },[]);
    
    // const [causeorg, setCauseorg] = useState([])
    // useEffect(()=>{
    //     fetch('http://localhost:8080/api/organisations/{causes}')
    //     .then(response => response.json())
    //     .then(data => setCauseorg(data))
    //     .catch(error => console.error(error))
    // },[]);
    

    return (
        <>
        <p>slay</p>
            <Dropdown onSelect={handleClick}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Filter by Cause
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            causes.map((causes,index) =>{
                                return(
                                    <>
                                    <Dropdown.Item key={index} eventKey={causes.cause} id={`org${index}`}>{causes.cause}</Dropdown.Item>
                                    </>
                                )
                            })
                        }
                    </Dropdown.Menu>
            </Dropdown>
        </>
    )

}