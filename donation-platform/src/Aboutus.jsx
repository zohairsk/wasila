import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Aboutus() {
    return (
    <>
        <Row className='my-5'>
          <Col>
            <Card className='border border-dark bg-light' style={{marginLeft:'auto', marginRight: 'auto', width: '24rem', paddingTop: "2%", paddingBottom: "2%" }}>
              <Card.Body>
                <Card.Title style={{color: "#1e4bd3"}}>Our Mission</Card.Title>
                <Card.Text>
                We aim to streamline the donation experience by offering a 
                platform that empowers users to make informed decisions and support causes they are 
                passionate about. Users can effortlessly compare causes, 
                search for specific organizations, and gain insights to guide their donations.
                Together, we aim to create a seamless donation process, 
                fostering positive change in communities.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='border border-dark bg-light' style={{marginLeft:'auto', marginRight: 'auto', width: '24rem', paddingTop: "2%", paddingBottom: "2%" }}>
            <Card.Body>
              <Card.Title style={{color: "#1e4bd3"}}>Our Vision</Card.Title>
              <Card.Text>
              Our vision is to create a world where giving back is effortless and meaningful. We 
              strive to build a platform that connects individuals with diverse causes, fostering a 
              global community of generosity and compassion. Through our user-centric approach, 
              we aim to inspire and empower people to make a lasting positive impact, creating a brighter future for all.
              </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        
    </>
    )
}