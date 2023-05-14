import {Multiselect} from "multiselect-react-dropdown"
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';


export default function AdvancedDonation(){

    const [org, setOrg] = useState([])
    useEffect(()=>{
        fetch('http://localhost:8080/api/organisation')
        .then(response => response.json())
        .then(data => setOrg(data))
        .catch(error => console.error(error))
    },[]);

    const [selectedOptions, setSelectedOptions] = useState([]) //to keep track of organizations user selected

    const [checked, setChecked] = useState("") //keep track of payment split style (evenly, by percentage, or by amount)
    
    const   [amounts, setAmounts] = useState([]) //ARRAY OF OBJECTS containing org name and amount. WILL BE SENT TO DATABASE FOR RECORD!
    //e.g [{org: Edhi Foundation, amount: 5000}, {org: SKMH, amount: 3000}]

    const [totalAmount, setTotalAmount] = useState("") //variable which has total amount entered by user

    const [incorrectSplitAmount, setIncorrectSplitAmount] = useState(false) //if splitting does not equal total

    const [evenlySplit, setEvenlySplit] = useState(false)

    const handleChange = (event) => {
        setTotalAmount(event.target.value)
    }
    function handleSubmit(){
        event.preventDefault();
        // setPaymentState(true);
    }
    function handleAmount(e){
        const label = event.target.previousSibling.innerText;
        const amount = event.target.value

        const labelObjIndex = amounts.findIndex((obj) => obj.org === label);
        // if (labelObj)
        if (labelObjIndex >= 0) {
            const updatedAmounts = [...amounts];
            updatedAmounts[labelObjIndex].amount = amount;
            setAmounts(updatedAmounts);

        }
          else {
            // Add new object
            const newObj = { "org": label, "amount": amount };
            setAmounts((prevAmounts) => [...prevAmounts, newObj]); 
        }
    }
    function donationSplitCheck(){
        let total = "";
        console.log("Total Amount:", totalAmount)
        if(checked=="percentage"){
            total="100"
        }
        else{
            let num = parseInt(totalAmount.replace(/,/g, ""));
            total=num;
        }
        setIncorrectSplitAmount(inputCheck(total, amounts))
    }
    function inputCheck(total, amountArray){
        let sum=0;
        for(let i=0;i<amountArray.length;i++){
            sum+=parseInt(amountArray[i].amount); 
        }
        return(!(sum==total))
    }


    return (
        <div>
            <>
            <div style={{display:'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
            <h2>Advanced Donation</h2>
            <h6>Easily split your donation amongst different recipients. <br></br>You can choose custom amounts for each 
                organization or split the amount evenly.</h6>
            </div>
            <div className="border rounded py-4 px-3" style={{width: '30rem', height: '100%' , backgroundColor: "rgb(240,248,255)",}}>        
            <Form className='ms-4 mt-2 py-2' onSubmit={handleSubmit}>      
                <Multiselect options={org} displayValue="name" 
                onSelect={(selectedList, selectedValue) => 
                    {
                        setSelectedOptions([...selectedOptions, selectedValue.name]) 
                    }
                }
                onRemove={(selectedList, selectedValue) => 
                    {
                        setSelectedOptions(selectedOptions.filter(item => item !== selectedValue.name))
                    }
                }
                />
                <Form.Control className = "my-3" required type="text" name="amount" placeholder="Amount" onChange={handleChange}></Form.Control>
                <h5>Split your amount by: </h5>
                <div className="mb-3">
                <div>
                    <Form.Check
                        inline
                        label="Split evenly"
                        name="splitType"
                        type='radio'
                        value="even"
                        onChange = {(e)=> {
                            setEvenlySplit(true)
                        }
                        }
                    />
                    <p className="mt-2"> OR </p>
                    <Form.Check
                        inline
                        label="Percentage"
                        name="splitType"
                        type='radio'
                        value="percentage"
                        onChange = {(e)=> {
                            setChecked(e.currentTarget.value)
                            evenlySplit ?  setEvenlySplit(!evenlySplit) : setEvenlySplit(evenlySplit);
                        }
                        }
                        />
                        <Form.Check
                            inline
                            label="Exact Amount"
                            name="splitType"
                            type='radio'
                            value="amount"
                            onChange = {(e)=> {
                                setChecked(e.currentTarget.value)
                                evenlySplit ? setEvenlySplit(!evenlySplit) : setEvenlySplit(evenlySplit);
                            }
                            }
                        />
                    </div>
                    </div>
                { evenlySplit ? 
                <>
                    {selectedOptions.map((val, index) => (
                                <div style={{display: 'flex'}}>
                                <Form.Label className="mx-5 pt-2" key={index}>{val}</Form.Label>
                                <Form.Control className="m-1" placeholder={parseInt(totalAmount.replace(/,/g, ""))/selectedOptions.length} style={{width: '25%', height: '30%'}} key={`input-${index}`} type="text" required onChange={handleAmount} disabled readonly></Form.Control>
                                </div>
                    ))}
                    
                </> 
                :
                <>  
                            {selectedOptions.map((val, index) => (
                                <div style={{display: 'flex'}}>
                                <Form.Label className="mx-5 pt-2" key={index}>{val}</Form.Label>
                                <Form.Control className="m-1" style={{width: '25%', height: '30%'}} key={`input-${index}`} type="text" required onChange={handleAmount}></Form.Control>
                                </div>
                            ))}

                            {incorrectSplitAmount ? <><p>Amount divided must equal the total amount specified.</p></> : <></>} 
                </>
                }
                <Button className="mt-4" onClick={donationSplitCheck}>Submit</Button>
            </Form>
            </div> 
            </>
        </div>
    )
   
}