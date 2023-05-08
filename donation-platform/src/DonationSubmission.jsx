import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import NavbarComp from './Navbar';
import DonationType from './DonationType'
import SimpleDonation from './SimpleDonation';

export default function DonationSubmission(){
    const [option, setOption] = useState()
    const [flag, setFlag] = useState(1)
    function handleDonationType(id){
        setOption(id)
        setFlag(0)
    }
    return (
        <>
            <NavbarComp></NavbarComp>
            <h1 className='mb-3'>Donation Submission</h1>
            {flag ? 
                <>
                <Row>
                <DonationType handleClick={handleDonationType}/>
                </Row>
                </>
                :
                option ? <p>Advanced</p> : <SimpleDonation/>
            }
        </>
    )
}
