import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarComp from './Navbar';

export default function DonationType(){
    return (
        <>
        <NavbarComp></NavbarComp>
        <h1 className='mt-5 mb-3'>Donation Submission</h1>
        <Row className="h-100">
            <Col className="h-100">
                <Card style={{ width: 'auto', height: '30rem'}}>
                <Card.Img variant="top" src="Edhi-foundation.png" />
                <Card.Body>
                    <Card.Title><input type="radio" name="donationType" value="simple"/> Simple Donation</Card.Title>
                    <Card.Text>
                    Specify an amount and organization to donate to. 
                    </Card.Text>
                </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card style={{  width: '25rem', height: '30rem'}}>
                <Card.Img variant="top" src="Edhi-foundation.png" />
                <Card.Body>
                    <Card.Title><input type="radio" name="donationType"value="advanced"/> Advanced Donation</Card.Title>
                    <Card.Text>
                    Split funds between multiple organizations with just a few clicks! 
                    </Card.Text>
                </Card.Body>
                </Card> 
            </Col>
        </Row>
        </>
    )
}