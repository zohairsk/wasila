import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
// import NavbarComp from './Navbar';
import DonationType from './DonationType'
import SimpleDonation from './SimpleDonation';
import AdvancedDonation from './AdvancedDonation';

export default function DonationSubmission({sendData, setSendData, userID, loginState}){
    function loginRedirect(){
       console.log("login required")
    }
    const [option, setOption] = useState()
    const [flag, setFlag] = useState(1)
    function handleDonationType(id){
        setOption(id)
        setFlag(0)
    }
    return (
        <>
            {loginState ? 
            <>
                {
                    flag ? 
                    <>
                    <h1 className='mb-3 display-5'>Donation Submission</h1>
                    <Row>
                    <DonationType handleClick={handleDonationType}/>
                    </Row>
                    </>
                    :
                    option ? <AdvancedDonation sendData={sendData} setSendData={setSendData} userID={userID}/> : <SimpleDonation sendData={sendData} setSendData={setSendData} userID={userID}/>
                }
            </>
            :   
                loginRedirect()
            }
        </>
    )
}
