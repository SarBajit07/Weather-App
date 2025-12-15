import React from 'react';
import search_icon from '../assets/search.png';
import './Weather.css'; // Shared styles for now

const SearchBar = ({ inputRef, onSearch }) => {
    return (
        <div className='search-bar'>
            <input
                ref={inputRef}
                type="text"
                placeholder='Search City...'
                onKeyDown={(e) => e.key === 'Enter' && onSearch(inputRef.current.value)}
            />
            <img src={search_icon} alt="Search" onClick={() => onSearch(inputRef.current.value)} />
        </div>
    );
};

export default SearchBar;
