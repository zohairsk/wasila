import Card from 'react-bootstrap/Card';

export default function DonationType({handleClick}){
    return (
        <>
            <Card className="m-3 border border-dark" style={{ width: 'auto', height: '20rem'}} onClick={()=>handleClick(0)}>
            <Card.Body>
                <Card.Title>Simple Donation</Card.Title>
                <Card.Text>
                Donate to an organization of your choice!
                </Card.Text>
            </Card.Body>
            </Card>
            <Card className="m-3 border border-dark" style={{ width: 'auto', height: '20rem'}} onClick={()=>handleClick(1)}>
            <Card.Body>
                <Card.Title>Advanced</Card.Title>
                <Card.Text>
                Easily split your donations among various organisations
                </Card.Text>
            </Card.Body>
            </Card>
        </>
    )
}