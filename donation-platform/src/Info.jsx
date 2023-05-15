import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Info(){

  let previousScrollPos = window.pageYOffset;

document.addEventListener('scroll', function() {
  var element1 = document.querySelector('.animate-on-scroll');
  var element2 = document.querySelector('.animate-on-scroll1');
  var element3 = document.querySelector('.animate-on-scroll2');
  var elements = [element1, element2, element3];

  // Adjust the offset value (-100) as needed to trigger the animation at the desired scroll position
  var offset = window.innerHeight - 100;
  var currentScrollPos = window.pageYOffset;

  if (currentScrollPos > previousScrollPos) {
    // Scrolling down
    elements.forEach(function(element) {
      var position = element.getBoundingClientRect().top;

      if (position < offset) {
        element.classList.add('animate');
      }
    });
  } else {
    // Scrolling up
    elements.forEach(function(element) {
      element.classList.remove('animate');
    });
  }

  previousScrollPos = currentScrollPos;
});

  
    return (
        <Container>
          <Row className='my-4'>
            <Col className='mx-3 border border-2 p-2 rounded animate-on-scroll'>
              <img src="../images/data.png" alt="icon" style={{width: '55%'}}/>
              <h3 className='mt-4'>Informed Decisions</h3>
              <p>with our comprehensive database</p>
            </Col>

            <Col className='mx-3 border border-2 p-2 rounded animate-on-scroll1'>
              <img src="../images/split.png" alt="icon" style={{width: '55%'}}/>
              <h3 className='mt-4'>Customizable Donations</h3>
              <p>through flexible options.</p> 
            </Col>

            <Col className='mx-3 border border-2 p-2 rounded animate-on-scroll2'>
              <img src="../images/reliable.png" alt="icon" style={{width: '55%'}}/>
              <h3 className='mt-4'>Security & Reliability</h3>
              <p>with only authentic organizations.</p>
            </Col>
          </Row>
        </Container>
      );
}