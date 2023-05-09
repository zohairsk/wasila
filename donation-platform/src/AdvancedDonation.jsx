import {Multiselect} from "multiselect-react-dropdown"
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';

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
    const [input, setInput] = useState({'amount': '10000',
'organization': ['Edhi', 'Qudsia']})
    var amount; var userData;
    const handleChange = (event) => {
        amount = event.target.value
    }
    function handleSubmit(){
        event.preventDefault();
        setPaymentState(true);
        userData = {'amount': amount, organizations: selectedOptions}
        setInput(data)
    }
    return (
        <div>
            {paymentState ? 
            <>
                <Form className='ms-4 mt-2 py-2'>
                    {

                        selectedOptions.map((val, index) => (
                            <>
                            <Form.Label key={index}>{val}</Form.Label>
                            <Form.Control key={`input-${index}`} type="text" required></Form.Control>
                            </>
                        ))}
                </Form> 
            </>
            :
            <>
                <Form className='ms-4 mt-2 py-2' onSubmit={handleSubmit}>      
                    <Multiselect options={org} displayValue="name" 
                    onSelect={(selectedList, selectedValue) => 
                        {
                            setSelectedOptions([...selectedOptions, selectedValue.name])
                            console.log("selected: ", selectedOptions); 
                        }
                    }
                    onRemove={(selectedList, selectedValue) => 
                        {
                            setSelectedOptions(selectedOptions.filter(item => item !== selectedValue.name))
                            console.log("selected: ", selectedOptions);
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