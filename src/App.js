import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from './Row';
import TableHead from './TableHead';
import Input from './InputModal';
import Filter from './FilterModal';
import './App.css'

function App() {
  const [drugs, setDrugs] = useState([]);
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('2021-06-04');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:5000/test').then((response) => {
      setDrugs(response.data);
      console.log(response.data);
    })
  }, [])

  var pageCount = Math.ceil(drugs.length/pageSize);

  var indexOfLastPost = currentPage * pageSize;
  var indexOfFirstPost = indexOfLastPost - pageSize;
  var currentPosts = drugs.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="App">
      
      {inputModalOpen && <Input setInputModalOpen={setInputModalOpen}/>}
      {filterModalOpen && <Filter setDrugs={setDrugs} setFilterModalOpen={setFilterModalOpen}/>}
      <div className='add-button-container'>
        <button id='add-button' onClick={() => {setInputModalOpen(true)}}>Add</button>
        <button id='filter-button' onClick={() => {setFilterModalOpen(true)}}>Filter</button>
      </div>
      <div className='table-container'>
        <div className='header-container'>
          <TableHead />
        </div>
        {currentPosts.map((val, key) => {
          return <div key={key} className='table'>
            <Row id={val._id} name={val.name} ndc={val.ndc} date={val.date} count={val.count}/>
          </div>
        })} 
        <div className='paginator-container'>
          <button id='prev-button' onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage(currentPage - 1);
            }
          }}>Previous</button>
          <p className='page-counter'>{currentPage} / {pageCount}</p>
          <button id='next-button' onClick={() => {
            if (currentPage !== pageCount) {
              setCurrentPage(currentPage + 1);
            }
          }}>Next</button>
        </div>
      </div>
    </div>
  );
}



export default App;
