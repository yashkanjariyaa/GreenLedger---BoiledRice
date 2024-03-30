import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Location = () => {
  const [pincode, setPincode] = useState('');

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here using the pincode state
    console.log('Searching for pincode:', pincode);
  };

  return (
    <div className="">
      <Sidebar />
      <div className="ml-[60px]">
        <div className='ml-[-60px] flex items-center rounded-lg p-4 justify-center'>
        <input 
          type="text" 
          placeholder="Enter Pincode" 
          value={pincode} 
          onChange={handlePincodeChange} 
          className="px-4 py-2 rounded-l-md border"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-gray-400 text-white rounded-r-md hover:bg-gray-500 focus:outline-none">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        </div>
      </div>
    </div>
  );
};

export default Location;
