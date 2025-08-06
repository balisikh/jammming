// src/components/SearchBar/SearchBar.js
import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  // Debounce input by 500ms
  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedTerm(term), 500);
    return () => clearTimeout(timerId);
  }, [term]);

  // Call onSearch when debounced term changes
  useEffect(() => {
    if (debouncedTerm) {
      onSearch(debouncedTerm);
      // Save search term for restoring after redirect
      localStorage.setItem('lastSearchTerm', debouncedTerm);
    }
  }, [debouncedTerm, onSearch]);

  // Restore saved search term on mount
  useEffect(() => {
    const savedTerm = localStorage.getItem('lastSearchTerm');
    if (savedTerm) setTerm(savedTerm);
  }, []);

  return (
    <div className={styles.SearchBar}>
      <input
        placeholder="Enter A Song, Album, or Artist"
        value={term}
        onChange={e => setTerm(e.target.value)}
        aria-label="Search for songs, albums or artists"
      />
      <button onClick={() => onSearch(term)}>SEARCH</button>
    </div>
  );
}

export default SearchBar;