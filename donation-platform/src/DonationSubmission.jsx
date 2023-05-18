import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
// import NavbarComp from './Navbar';
import DonationType from './DonationType'
import SimpleDonation from './SimpleDonation';
import AdvancedDonation from './AdvancedDonation';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function DonationSubmission({users, sendData, setSendData, userID, loginState, loginRequired, setLoginRequired}){

    const navigate = useNavigate();
    const [ userCardNum, setUserCardNum ] = useState('')
    const [ userCardExpiry, setUserCardExpiry ] = useState('')
    const [ userCardCVC, setUserCardCVC ] = useState('')
    const [ savedCard, setSavedCard ] = useState(false)
    function loginRedirect(){
        setLoginRequired(true)
        navigate('/Login')
    }

    const [option, setOption] = useState()
    const [flag, setFlag] = useState(1)
    function handleDonationType(id){
        setOption(id)
        setFlag(0)
    }
    
    useEffect(()=>{
        fetch(`http://localhost:8080/api/user/${userID}`)
        .then(response => response.json())
        .then(data => {
            if(data[0].cardnum.length !=0){
                setSavedCard(true)
                setUserCardNum(data[0].cardnum);
                setUserCardExpiry(data[0].expiry);
                setUserCardCVC(data[0].cvc);
            }
        })
        .catch(error => console.error(error))
      },[])

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
                    option ? <AdvancedDonation savedCard = {savedCard} userCardNum={userCardNum} userCardExpiry={userCardExpiry} userCardCVC={userCardCVC} sendData={sendData} setSendData={setSendData} userID={userID}/> : <SimpleDonation savedCard = {savedCard} userCardNum={userCardNum} userCardExpiry={userCardExpiry} userCardCVC={userCardCVC} users={users} sendData={sendData} setSendData={setSendData} userID={userID}/>
                }
            </>
            :   
                <>
                        {loginRedirect()}
                </>
            }
        </>
    )
}
