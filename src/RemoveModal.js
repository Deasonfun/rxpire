import React from "react";
import './Modal.css';

const Remove = ({setRemoveModalOpen}) => {
    return <div className='modal-background'>

        <div className='modal-container'>

            <div className='modal-close-container'>
                <button onClick={() => setRemoveModalOpen(false)}>X</button>
            </div>

            <div className='modal-body'>
               <p>hey</p> 
            </div>

            <div className='modal-footer'>
                <button id='cancel-button' onClick={() => setRemoveModalOpen(false)}>Cancel</button>
                <button onClick={() => 
                    console.log('hey')
                }>Continue</button>
            </div>

        </div>

    </div>
}

export default Remove;