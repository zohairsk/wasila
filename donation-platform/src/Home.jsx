import Aboutus from './Aboutus'
import Button from 'react-bootstrap/Button'
import Info from './Info'
import Searching from './Searching'
import { Toast } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Card from 'react-bootstrap/Card'
import Graph from './Graph'


export default function Home({showWelcome, setShowWelcome}){


    const navigate = useNavigate();

    function link1(){
        navigate('/Donate')
    }
    function link2(){
        navigate('/Organizations')
    }

    function handleClose(){
        setShowWelcome(false);
    }

    return (
    <div id='home' style={{width: "100%"}}>  
        {showWelcome && <Toast onClose={handleClose} style={{margin: '10%',position: 'absolute',backgroundColor:"#FFFFE0"}}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Message from wasila</strong>
                    </Toast.Header>
                    <Toast.Body className="py-3">Welcome!</Toast.Body>
        </Toast>}
        <div className="mt-5" style={{backgroundImage: `url("../images/Waseela.png")`, overflow: "visible", backgroundSize: "cover", width: "100%", height: '35rem'}}>
        <br></br>
        <br></br><br></br>
        <br></br>
        <div style={{marginLeft: "10%", padding: '1%', position: 'relative', top: '64%', left: '18%'}}>
        <button class="button-19" style={{marginLeft:'4%'}} onClick={link1} role="button">Donate Now</button>
        <button class="button-19" style={{marginLeft:'3%'}} onClick={link2} role="button">Where to Donate</button>
        </div>
        </div>
        <br></br>
        <Aboutus></Aboutus>
        <br></br>
        <Info></Info>
        <div style={{display: 'flex', flexDirection: 'row', margin: "5%", justifyContent: 'center'}}>
            <div style={{width: '32%', marginRight: '5%'}}><Graph></Graph></div>
            <Card style={{width: '25rem', height: '24rem', marginLeft: '5%'}} className='card mt-3 mx-2'>
                <Card.Body>
                    <Card.Title style={{color: '#1111ad'}} className='my-3'>Generosity in Action: Your Donations to Organizations</Card.Title>
                    <Card.Text>
                    This chart illustrates 
                    the proportion of donations made to each organization. Easily grasp the distribution 
                    of contributions at a glance, enabling you to make informed decisions on where 
                    your generosity can make the greatest impact. Empower yourself with insights and 
                    join the movement towards positive change!
                    <hr></hr>
                    Hover over the chart to see the exact percentage of donations made to each organization.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
      </div>
    )

}