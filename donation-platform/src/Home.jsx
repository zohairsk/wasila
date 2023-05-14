import Aboutus from './Aboutus'
import Button from 'react-bootstrap/Button'
import Info from './Info'
import Searching from './Searching'

export default function Home({cards,setCards}){

    function link1(){
        window.location.href = "/Donate";
    }
    function link2(){
        window.location.href = "/Organizations";
    }

    return (
    <>  
        <div className="mt-5" style={{backgroundImage: `url("../images/Waseela.png")`, overflow: "visible", backgroundSize: "cover", width: "100%", height: '35rem', padding: '0px'}}>
        <br></br>
        <br></br><br></br>
        <br></br>
        <div style={{marginLeft: "10%", padding: '1%', position: 'relative', top: '64%', left: '18%'}}>
            <Button className="btn btn-success" style={{marginLeft:'10%', fontSize:'1.5rem'}} onClick={link1} type="button" size="lg" >Donate Now
            </Button>
            <Button className="btn btn-info" style={{marginLeft:'8%', fontSize:'1.5rem'}} onClick={link2} type="button" size="lg" >Where to Donate
            </Button>
        </div>
        </div>
        {/* {cards&&(<DonationCards/>)} */}
        <br></br>
        <Aboutus></Aboutus>
        <br></br>
        <Info></Info>
      </>
    )
}