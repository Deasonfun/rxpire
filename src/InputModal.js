import axios from "axios";
import React, {useState} from "react";
import "./Modal.css";


const Input = ({setInputModalOpen}) => {

    const [drugName, setDrugName] = useState('');
    const [drugNDC, setDrugNDC] = useState('');
    const [drugDate, setDrugDate] = useState('');
    const [drugCount, setDrugCount] = useState('');

    return <div className='modal-background'>

        <div className='modal-container'>

            <div className='modal-close-container'>
                <button onClick={() => setInputModalOpen(false)}>X</button>
            </div>

            <div className='modal-body'>
                <p>Name: </p>
                <input onChange={event => setDrugName(event.target.value)} id='name-input'></input> 
                <p>NDC: </p>
                <input onChange={event => setDrugNDC(event.target.value)} id='ndc-input'></input> 
                <p>Date: </p>
                <input onChange={event => setDrugDate(event.target.value)} id='date-input' type='date'></input> 
                <p>Count: </p>
                <input onChange={event => setDrugCount(event.target.value)} id='count-input' type='number' min='1'></input>
            </div>

            <div className='modal-footer'>
                <button id='cancel-button' onClick={() => setInputModalOpen(false)}>Cancel</button>
                <button onClick={() => 
                    AddDrug()
                }>Continue</button>
            </div>

        </div>

    </div>

    function AddDrug() {
        axios.get('http://localhost:5000/add/' + drugName + '/' + drugNDC + '/' + drugDate + '/' + drugCount);
        setInputModalOpen(false);
        window.location.reload();
    }
}

export default Input