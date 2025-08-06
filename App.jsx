import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';
import Spotify from '../util/Spotify';
import styles from './App.module.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState(() => {
    return localStorage.getItem('playlistName') || 'My Playlist';
  });
  const [playlistTracks, setPlaylistTracks] = useState(() => {
    const savedTracks = localStorage.getItem('playlistTracks');
    return savedTracks ? JSON.parse(savedTracks) : [];
  });
  const [isSaving, setIsSaving] = useState(false);

  // Persist playlist name and tracks
  useEffect(() => {
    localStorage.setItem('playlistName', playlistName);
  }, [playlistName]);

  useEffect(() => {
    localStorage.setItem('playlistTracks', JSON.stringify(playlistTracks));
  }, [playlistTracks]);

  const search = async (term) => {
    const results = await Spotify.search(term);

    // Filter out tracks already in playlist by id
    const filteredResults = results.filter(
      (track) => !playlistTracks.find((t) => t.id === track.id)
    );

    setSearchResults(filteredResults);
  };

  const addTrack = (track) => {
    if (playlistTracks.find(t => t.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
  };

  const savePlaylist = async () => {
    setIsSaving(true);
    const trackUris = playlistTracks.map(track => track.uri);
    try {
      await Spotify.savePlaylist(playlistName, trackUris);
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
      alert('Playlist saved to your Spotify account!');
    } catch (error) {
      alert('Failed to save playlist.');
      console.error(error);
    }
    setIsSaving(false);
  };

  return (
    <div className={styles.App}>
      <h1>Jammming</h1>
      <SearchBar onSearch={search} />
      <div className={styles.AppContent}>
        <SearchResults
          searchResults={searchResults}
          onAdd={addTrack}
        />
        <Playlist
          name={playlistName}
          tracks={playlistTracks}
          onNameChange={setPlaylistName}
          onRemove={removeTrack}
          onSave={savePlaylist}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}

export default App;