import Aboutus from './Aboutus'
import Button from 'react-bootstrap/Button'
import Info from './Info'
export default function Home({cards,setCards}){
    return (
    <>  
        <div className="mt-5" style={{backgroundImage: `url("../images/bg.jpg")`, maxWidth: "100%", width: '100rem', height: '35rem', padding: '0px'}}>
        <h1 >Donation Platform</h1>
        <br></br>
        <img src="../images/icon.png"></img>
        <br></br><br></br>
        <Aboutus></Aboutus>
        <br></br>
        <Button type="button" size="lg" className="btn btn-info" onClick={()=>{handlecards()}}>Donation Data
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" style={{marginLeft: '5px'}} fill="currentColor" className="bi bi-bar-chart-line" viewBox="0 0 16 16">
            <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"/>
            </svg>
        </Button>
        </div>
        {/* {cards&&(<DonationCards/>)} */}
        <br></br>
        <Info></Info>
      </>
    )
}