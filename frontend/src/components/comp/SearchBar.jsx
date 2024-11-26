import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <form className='flex gap-4'>
      <input
        className='px-4 py-2 outline-none rounded-full  bg-zinc-500/20 w-full'
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search..."
      />
      <button type="submit" onClick={handleSearch} >
        <BsSearch />
      </button>
      
    </form>
  );
};

export default SearchBar;