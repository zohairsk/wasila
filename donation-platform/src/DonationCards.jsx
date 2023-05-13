import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReadMoreDonation from './ReadMoreDonation';
import { useEffect, useState } from 'react';

export default function DonationCards(){
    
    const [Organisations,setOrganisations] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8080/api/organisation')
        .then(response => response.json())
        .then(data => setOrganisations(data))
        .catch(error => console.error(error))
    },[])

    
    const [showDetails, setShowDetails] = useState(false);
    const [description, setDescription] = useState('');
    const [weblink, setWeblink] = useState('');
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleReadMoreClick = (event) => {
        Organisations.map(
            Organisation => {
                if (Organisation.name === event.target.previousSibling.previousSibling.innerText){
                    setTitle(event.target.previousSibling.previousSibling.innerText)
                    setDescription(Organisation.description)
                    setWeblink(Organisation.weblink)
                    setEmail(Organisation.email)
                    setPhone(Organisation.contactno)
            }
        }
        )
        setShowDetails(true);
      }


    return (
            <>  
            {(showDetails) ?
            <>
            <ReadMoreDonation showDetails={showDetails} setShowDetails={setShowDetails} description={description} weblink={weblink} title={title} email={email} phone={phone}></ReadMoreDonation>
            </>
            : <></>}
            <Row>
            {Organisations.map(
                Organisation => {
                    return(
                        <Col>
                        <Card style={{width: '19rem', height: '30rem'}} className='mt-3'>
                        <Card.Img style={{width: '19rem', height: '18rem'}} variant="top" src={Organisation.image} />
                        <Card.Body>
                            <Card.Title>{Organisation.name}</Card.Title>
                            <Card.Text>
                            {<a href={Organisation.weblink}>{Organisation.weblink}</a>}
                            </Card.Text>
                            <Button variant="primary" onClick={handleReadMoreClick}>Read More</Button>
                        </Card.Body>
                        </Card>
                        </Col>   
                    )
                }
            )} 
            </Row>
        </>
    )
}