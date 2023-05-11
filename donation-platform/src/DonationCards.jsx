import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function DonationCards(){
    
    //database se aaega
    const org_array = [
        {name: "Edhi Foundation",
    description: "slay"},
    {name: "Aleena FOundation",
    description: "yummy"
    },{name: "Edhi Foundation",
    description: "slay"},
    {name: "Aleena FOundation",
    description: "yummy"
    },{name: "Edhi Foundation",
    description: "slay"},
    {name: "Aleena FOundation",
    description: "yummy"
    }
    ]

    const orgData=[]
    const totalrows = org_array.length/3


    for (let i=0; i<totalrows; i++){
        orgData.push(
        <Row>
        <Col>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="Edhi-foundation.png" />
        <Card.Body>
            <Card.Title>{org_array[((i+1)*3)-3].name}</Card.Title>
            <Card.Text>
            {org_array[((i+1)*3)-3].description}
            </Card.Text>
            <Button variant="primary">Read Mores</Button>
        </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="Edhi-foundation.png" />
        <Card.Body>
            <Card.Title>{org_array[((i+1)*3)-2].name}</Card.Title>
            <Card.Text>
            {org_array[((i+1)*3)-2].description}
            </Card.Text>
            <Button variant="primary">Read Mores</Button>
        </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="Edhi-foundation.png" />
        <Card.Body>
            <Card.Title>{org_array[((i+1)*3)-1].name}</Card.Title>
            <Card.Text>
            {org_array[((i+1)*3)-1].description}
            </Card.Text>
            <Button variant="primary">Read Mores</Button>
        </Card.Body>
        </Card>
        </Col>
        </Row>
        )
    }


    // const orgdata = org_array.map(org => (
    //     <>
    //     <Card style={{ width: '18rem' }}>
    //     <Card.Img variant="top" src="Edhi-foundation.png" />
    //     <Card.Body>
    //         <Card.Title>{org.name}</Card.Title>
    //         <Card.Text>
    //         {org.description}
    //         </Card.Text>
    //         <Button variant="primary">Read Mores</Button>
    //     </Card.Body>
    //     </Card>
    //     </>
    // ))
    return(
    <>
        {orgData}
    </>
    )
}