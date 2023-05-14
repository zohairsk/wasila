import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Aboutus() {
    return (
    <>
        {/* <Card  border='dark' bg='light' style={{width: '80%', margin: 'auto'}}>
        <Card.Body>
          <Card.Title className='display-6'>About Us</Card.Title>
          <Card.Text>
          we r so cool and slay pls donate yummy we r so cool and slay pls donate yummywe r so cool and slay pls donate yummy
          we r so cool and slay pls donate yummywe r so cool and slay pls donate yummywe r so cool and slay pls donate yummy
          </Card.Text>
        </Card.Body>
        </Card> */}

        <Row className='my-5'>
          <Col>
            <Card className='border border-dark bg-light' style={{marginLeft:'auto', marginRight: 'auto', width: '24rem' }}>
              <Card.Body>
                <Card.Title style={{color: "#39296b"}}>Our Mission</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.Some quick example text to build on the card title and make up the
                  bulk of the card's content.Some quick example text to build on the card title and make up the
                  bulk of the card's content.Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='border border-dark bg-light' style={{marginLeft:'auto', marginRight: 'auto', width: '24rem' }}>
            <Card.Body>
              <Card.Title style={{color: "#39296b"}}>Our Vision</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.Some quick example text to build on the card title and make up the
                  bulk of the card's content.Some quick example text to build on the card title and make up the
                  bulk of the card's content.Some quick example text to build on the card title and make up the
                  bulk of the card's content.
              </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        
    </>
    )
}