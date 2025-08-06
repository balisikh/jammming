import React from 'react';
import TrackList from '../TrackList/TrackList';
import styles from './Playlist.module.css';

function Playlist({ name, tracks, onNameChange, onRemove, onSave, isSaving }) {
  return (
    <div className={styles.Playlist}>
      <input
        value={name}
        onChange={e => onNameChange(e.target.value)}
        aria-label="Playlist Name"
      />
      <TrackList tracks={tracks} onRemove={onRemove} isRemoval={true} />
      <button onClick={onSave} disabled={isSaving || tracks.length === 0}>
        {isSaving ? 'Saving...' : 'Save to Spotify'}
      </button>
    </div>
  );
}

export default Playlist;