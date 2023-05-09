export default function AdvancedDonation(){
    <div>
    <Form className='ms-4 mt-2 py-2'>      
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Organizations
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" id="org1" onClick={()=>handleClick()}>Org 1</Dropdown.Item>
                <Dropdown.Item href="#/action-2" id="org2" onClick={()=>handleClick()}>org 2</Dropdown.Item>
                <Dropdown.Item href="#/action-3" id="org3" onClick={()=>handleClick()}>org 3</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <Form.Control className = "my-3" required type="text" name="amount" placeholder="Amount" onChange={handleChange}></Form.Control>
        <button type="submit" className='border border-dark'>Donate</button>
    </Form>
    </div>
}