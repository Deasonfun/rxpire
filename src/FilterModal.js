import axios from 'axios';
import React, {useState} from 'react';
import "./Modal.css";

const Filter = ({ setDrugs }, { setFilterModelOpen }) => {
    return <div className='modal-background'>
        <div className='modal-container'>
            <div className='modal-close-container'>
                <button onClick={() => setFilterModelOpen(false)}>X</button> 
            </div> 
        </div> 
    </div>
}

export default Filter;