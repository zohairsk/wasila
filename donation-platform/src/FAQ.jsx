import Accordion from 'react-bootstrap/Accordion';

export default function FAQ(){
    return (
        <>
        <h2 className='display-6'>Frequently Asked Questions</h2>
        <br></br>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
            <Accordion.Header>How does the donation platform work?</Accordion.Header>
            <Accordion.Body>
            Our donation platform provides a user-friendly interface where you can 
            explore a comprehensive database of organizations. You can compare causes,
            search for specific organizations, and make informed decisions before donating.
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>How can I search for specific causes or organizations to donate to?</Accordion.Header>
            <Accordion.Body>
            Our platform offers powerful search functionality that allows you to search for 
            organizations based on specific causes, keywords, or location. You can easily
             find and support causes that resonate with you.
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
            <Accordion.Header>Can I donate to multiple organizations at once?</Accordion.Header>
            <Accordion.Body>
            Absolutely! Our platform supports customizable donation options, enabling you to
            specify multiple organizations to donate to in a single transaction. This simplifies
            the process of supporting multiple causes simultaneously.
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
            <Accordion.Header>Is my donation secure and confidential?</Accordion.Header>
            <Accordion.Body>
            Yes, we prioritize the security and confidentiality of your donations. We utilize
             industry-standard encryption protocols to ensure the safety of your personal
              information and financial transactions.
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
            <Accordion.Header>How can I track the impact of my donations?</Accordion.Header>
            <Accordion.Body>
            LWe provide regular updates and reports on the impact of donations. Through
             your account dashboard, you can access information about how your contributions 
             are making a difference and changing lives.
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </>
    )
}