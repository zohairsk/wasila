import {Multiselect} from "multiselect-react-dropdown"
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';


export default function AdvancedDonation(){
    const data = [
        {
            "name": "Edhi Foundation"
        },
        {
            "name": "Akhuwat Foundation"
        },
        {
            "name": "Chhipa Foundation"
        },
        {
            "name": "Aleena Foundation"
        }
    ]
    const [org, setOrg] = useState(data)
    const [selectedOptions, setSelectedOptions] = useState([])
    const [paymentState, setPaymentState] = useState(false)
    const [checked, setChecked] = useState("")
    const   [amounts, setAmounts] = useState([])
    const [totalAmount, setTotalAmount] = useState("")
    const [incorrectSplitAmount, setIncorrectSplitAmount] = useState(false)
    const [evenlySplit, setEvenlySplit] = useState(true)

    const handleChange = (event) => {
        setTotalAmount(event.target.value)
    }
    function handleSubmit(){
        event.preventDefault();
        setPaymentState(true);
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
    
    let evenamount = parseInt(totalAmount.replace(/,/g, ""));
    evenamount = evenamount/amounts;

    return (
        <div>
            {paymentState ? 
                evenlySplit ? 
                <>
                    {selectedOptions.map((val, index) => (
                                <div style={{display: 'flex'}}>
                                <Form.Label className="mx-5 pt-2" key={index}>{val}</Form.Label>
                                <Form.Control className="m-1" placeholder={evenamount} style={{width: '25%', height: '30%'}} key={`input-${index}`} type="text" required onChange={handleAmount} disabled readonly></Form.Control>
                                </div>
                    ))}
                    
                </> 
                :
                <>
                    <Form className='ms-4 mt-2 py-2'>

                            <Form.Check
                                inline
                                label="Split evenly"
                                name="splitType"
                                type='radio'
                                value="even"
                                onChange = {(e)=> {
                                    setEvenlySplit(!evenlySplit)
                                }
                                }
                            />

                            <>
                            <h5>Split your amount by: </h5>
                            <div className="mb-3">
                            <Form.Check
                                inline
                                label="Percentage"
                                name="splitType"
                                type='radio'
                                value="percentage"
                                onChange = {(e)=> {
                                    setChecked(e.currentTarget.value)
                                    // console.log(checked)
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
                                    // console.log(checked)
                                    }
                                }
                            />
                            </div>
                            {selectedOptions.map((val, index) => (
                                <div style={{display: 'flex'}}>
                                <Form.Label className="mx-5 pt-2" key={index}>{val}</Form.Label>
                                <Form.Control className="m-1" style={{width: '25%', height: '30%'}} key={`input-${index}`} type="text" required onChange={handleAmount}></Form.Control>
                                </div>
                            ))}

                            <Button onClick={donationSplitCheck}>Submit</Button>
                            {incorrectSplitAmount ? <><p>Yummy</p></> : <></>}
                            </>
                    </Form> 
                </>
            :
            <>
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
                    <button type="submit" className='border border-dark'>Proceed Further</button>
                </Form>
            </> 
            }
            
        </div>
    )
   
}