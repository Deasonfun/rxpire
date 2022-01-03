import React from "react";

const TableHead = () => {
    return <div className='row'>
        <div className='head-cell'><p>Name</p></div>
        <div className='head-cell'><p>NDC</p></div>
        <div className='head-cell'><p>Date</p></div>
        <div className='head-cell'><p>Count</p></div>
        <div className='head-cell'>Remove</div>
    </div>
}

export default TableHead;