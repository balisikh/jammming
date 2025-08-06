import React from 'react';
import styles from './Track.module.css';

function Track({ track, onAdd, onRemove, isRemoval }) {
  return (
    <div className={styles.Track}>
      <div className={styles.TrackInfo}>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
        {track.previewUrl ? (
          <audio controls>
            <source src={track.previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p><em>No preview available</em></p>
        )}
      </div>
      {isRemoval ? (
        <button className={styles.TrackAction} onClick={() => onRemove(track)} aria-label={`Remove ${track.name} from playlist`}>-</button>
      ) : (
        <button className={styles.TrackAction} onClick={() => onAdd(track)} aria-label={`Add ${track.name} to playlist`}>+</button>
      )}
    </div>
  );
}

export default Track;