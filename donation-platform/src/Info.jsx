import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Info(){
    return (
        <Container>
          <Row className='my-4'>
            <Col className='mx-3 border border-2 p-2 rounded'>
              <img src="../images/data.png" alt="icon" style={{width: '55%'}}/>
              <h3 className='mt-4'>Informed Decisions</h3>
            </Col>

            <Col className='mx-3 border border-2 p-2 rounded'>
              <img src="../images/split.png" alt="icon" style={{width: '55%'}}/>
              <h3 className='mt-4'>Customizable Donation Options</h3> 
            </Col>

            <Col className='mx-3 border border-2 p-2 rounded'>
              <img src="../images/reliable.png" alt="icon" style={{width: '55%'}}/>
              <h3 className='mt-4'>100% Reliable</h3>
            </Col>
          </Row>
        </Container>
      );
}