import {useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Searching({filteredOrg, setFilteredOrg}){

    const [causes, setCauses] = useState([])
   import Dropdown from 'react-bootstrap/Dropdown';

    useEffect(()=>{
        fetch('http://localhost:8080/api/causes')
        .then(response => response.json())
        .then(data => setCauses(data))
        .catch(error => console.error(error))
    },[]);
    
    const handleClick = (eventKey) => {
        console.log(eventKey)}


    // const [causes, setCauses] = useState([])
    
    // useEffect(()=>{
    //     fetch('http://localhost:8080/api/causes')
    //     .then(response => response.json())
    //     .then(data => setCauses(data))
    //     .catch(error => console.error(error))
    // },[])

    return (
        <>
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