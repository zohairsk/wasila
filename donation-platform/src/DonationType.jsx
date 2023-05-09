import Card from 'react-bootstrap/Card';
import './DonationType.css'


export default function DonationType({handleClick}){
    return (
        <>
            <Card className="m-3 border border-dark dontype" style={{ width: '20rem', height: '22rem'}} onClick={()=>handleClick(0)}>
            <Card.Body>
                <Card.Img style={{width: '40%', height: '55%', objectFit: 'contain'}} variant="bottom" src="../images/simple.png"/>
                <Card.Title>Simple Donation</Card.Title>
                <Card.Text>
                Donate to an organization of your choice!
                </Card.Text>
                <br></br>
            </Card.Body>
            </Card>
            <Card className="m-3 border border-dark dontype" style={{ width: '20rem', height: '22rem'}} onClick={()=>handleClick(1)}>
            <Card.Body>
            <Card.Img style={{width: '40%', height: '55%', objectFit: 'contain'}} variant="bottom" src="../images/advanced.png"/>
                <Card.Title>Advanced</Card.Title>
                <Card.Text>
                Easily split your donations among various organisations
                </Card.Text>
            </Card.Body>
            </Card>
        </>
    )
}