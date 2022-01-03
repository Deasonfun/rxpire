import axios from "axios";
import React, {useState} from "react";
import Remove from './RemoveModal';

const Row = (props) => {

    const [removeNumber, setRemoveNumber] = useState(0);
       
    return <div className='row'>
        <div className='cell'><p>{props.name}</p></div>
        <div className='cell'><p>{props.ndc}</p></div>
        <div className='cell'><p>{props.date}</p></div>
        <div className='cell'><p>{props.count}</p></div>
        <div className='cell' id='remove-cell'>
            <input className='remove-num' onChange={event => setRemoveNumber(event.target.value)} type='number' min='1'></input>
            <button className='remove-button' onClick={() => RemoveDrug()}>X</button>
        </div>
    </div>
    function RemoveDrug() {
        if (removeNumber >= props.count) {
            axios.get('http://localhost:5000/remove/' + props.id);
            window.location.reload();
        } else {
            console.log('removing: ' + removeNumber);
            axios.get('http://localhost:5000/removeCount/' + props.id + '/' + props.count + '/' + removeNumber).then((response) => {
                window.location.reload();
            });
        }
    }
}



export default Row;