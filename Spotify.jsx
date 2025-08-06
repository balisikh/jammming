// src/util/Spotify.js

const clientId = 'YOUR_SPOTIFY_CLIENT_ID'; // Replace with your client ID
const redirectUri = 'http://localhost:3000/'; // Your redirect URI

let accessToken = '';
let tokenExpirationTime = 0;

const Spotify = {
  getAccessToken() {
    // Check if token exists and not expired
    const currentTime = Date.now();

    if (accessToken && currentTime < tokenExpirationTime) {
      return accessToken;
    }

    // Check URL for access_token and expires_in
    const url = window.location.href;
    const accessTokenMatch = url.match(/access_token=([^&]*)/);
    const expiresInMatch = url.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      tokenExpirationTime = currentTime + expiresIn * 1000;

      // Store in localStorage to persist across reloads
      localStorage.setItem('spotify_access_token', accessToken);
      localStorage.setItem('spotify_token_expiration', tokenExpirationTime);

      // Clear URL params
      window.history.pushState({}, null, '/');

      // Set timeout to clear token on expiration
      window.setTimeout(() => {
        accessToken = '';
        tokenExpirationTime = 0;
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_token_expiration');
      }, expiresIn * 1000);

      return accessToken;
    }

    // Check if token exists in localStorage and is valid
    const storedToken = localStorage.getItem('spotify_access_token');
    const storedExpiration = localStorage.getItem('spotify_token_expiration');

    if (storedToken && storedExpiration && currentTime < storedExpiration) {
      accessToken = storedToken;
      tokenExpirationTime = Number(storedExpiration);
      return accessToken;
    }

    // Redirect user to Spotify authorization
    const scope = 'playlist-modify-public playlist-modify-private';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location = authUrl;
  },

  // Example search function
  async search(term) {
    const token = this.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;

    try {
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Spotify search request failed');

      const json = await response.json();

      if (!json.tracks) return [];

      return json.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        previewUrl: track.preview_url,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  // Add other Spotify API methods (getUserId, savePlaylist, etc.) here
};

export default Spotify;