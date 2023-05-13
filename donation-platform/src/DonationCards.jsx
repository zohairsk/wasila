import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';

export default function DonationCards(){
    
    const [Organisations,setOrganisations] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8080/api/organisation')
        .then(response => response.json())
        .then(data => setOrganisations(data))
        .catch(error => console.error(error))
    },[])


    return (
        <>
            {Organisations.map(
                Organisation => {
                    return(
                        <Row>
                        <Col>
                        <Card style={{ width: '18rem'}} className='mt-3'>
                        <Card.Img variant="top" src={Organisation.image} />
                        <Card.Body>
                            <Card.Title>{Organisation.name}</Card.Title>
                            <Card.Text>
                            {<a href={Organisation.weblink}>{Organisation.weblink}</a>}
                            </Card.Text>
                            <Button variant="primary">Read More</Button>
                        </Card.Body>
                        </Card>
                        </Col>
                        </Row>
                    )
                }
            )}
        </>
    )
}


// export default function DonationCards(){
    
//     //database se aaega
//     const org_array = [
//         {name: "Edhi Foundation",
//     description: "slay"},
//     {name: "Aleena Foundation",
//     description: "yummy"
//     },{name: "Edhi Foundation",
//     description: "slay"},
//     {name: "Aleena Foundation",
//     description: "yummy"
//     },{name: "Edhi Foundation",
//     description: "slay"},
//     {name: "Aleena Foundation",
//     description: "yummy"
//     }
//     ]

//     const orgData=[]
//     const totalrows = org_array.length/3


//     for (let i=0; i<totalrows; i++){
//         orgData.push(
//         <Row>
//         <Col>
//         <Card style={{ width: '18rem'}} className='mt-3'>
//         <Card.Img variant="top" src="Edhi-foundation.png" />
//         <Card.Body>
//             <Card.Title>{org_array[((i+1)*3)-3].name}</Card.Title>
//             <Card.Text>
//             {org_array[((i+1)*3)-3].description}
//             </Card.Text>
//             <Button variant="primary">Read More</Button>
//         </Card.Body>
//         </Card>
//         </Col>
//         <Col>
//         <Card style={{ width: '18rem' }} className='mt-3'>
//         <Card.Img variant="top" src="Edhi-foundation.png" />
//         <Card.Body>
//             <Card.Title>{org_array[((i+1)*3)-2].name}</Card.Title>
//             <Card.Text>
//             {org_array[((i+1)*3)-2].description}
//             </Card.Text>
//             <Button variant="primary">Read More</Button>
//         </Card.Body>
//         </Card>
//         </Col>
//         <Col>
//         <Card style={{ width: '18rem' }} className='mt-3'>
//         <Card.Img variant="top" src="Edhi-foundation.png" />
//         <Card.Body>
//             <Card.Title>{org_array[((i+1)*3)-1].name}</Card.Title>
//             <Card.Text>
//             {org_array[((i+1)*3)-1].description}
//             </Card.Text>
//             <Button variant="primary">Read More</Button>
//         </Card.Body>
//         </Card>
//         </Col>
//         </Row>
//         )
//     }


//     // const orgdata = org_array.map(org => (
//     //     <>
//     //     <Card style={{ width: '18rem' }}>
//     //     <Card.Img variant="top" src="Edhi-foundation.png" />
//     //     <Card.Body>
//     //         <Card.Title>{org.name}</Card.Title>
//     //         <Card.Text>
//     //         {org.description}
//     //         </Card.Text>
//     //         <Button variant="primary">Read Mores</Button>
//     //     </Card.Body>
//     //     </Card>
//     //     </>
//     // ))
//     return(
//     <>
//         {orgData}
//     </>
//     )
// }