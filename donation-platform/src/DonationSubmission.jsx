import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
// import NavbarComp from './Navbar';
import DonationType from './DonationType'
import SimpleDonation from './SimpleDonation';
import AdvancedDonation from './AdvancedDonation';

export default function DonationSubmission(){
    const [option, setOption] = useState()
    const [flag, setFlag] = useState(1)
    function handleDonationType(id){
        setOption(id)
        setFlag(0)
    }
    return (
        <>
            {/* <NavbarComp></NavbarComp> */}
            {flag ? 
                <>
                <h1 className='mb-3 display-5'>Donation Submission</h1>
                <Row>
                <DonationType handleClick={handleDonationType}/>
                </Row>
                </>
                :
                option ? <AdvancedDonation/> : <SimpleDonation/>
            }
        </>
    )
}
