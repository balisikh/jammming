# Jammming

Jammming is a React web app that lets users create playlists by searching Spotify’s library, customise playlists, and save them directly to their Spotify account.

---

## Features

- Search for songs, artists, and albums using the Spotify API  
- Add and remove tracks from a custom playlist  
- Rename playlists  
- Save playlists to your personal Spotify account  
- Preview 30-second samples of tracks  
- Dark mode toggle  
- Persistent playlist state between sessions  

---

## Getting Started

### Prerequisites

- Node.js and npm installed  
- A Spotify Developer account and app with Client ID and Redirect URI set  
- Git installed  

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/jammming.git

2. Navigate into the folder:

   cd jammmering

3. Install dependencies:

   npm install

4. Set up your Spotify credentials:

   Create a .env file (or update Spotify.js) with your Client ID and Redirect URI.

5. Run the app locally:

   npm start

### Usage

- Enter a search term in the search bar and press SEARCH (debounced input to reduce API calls)
- Add tracks from search results to your playlist
- Customise your playlist name
- Preview track samples
- Save your playlist to your Spotify account by clicking Save to Spotify
- The app handles authentication and access tokens behind the scenes

### Technologies Used

1. React (with Hooks)
2. Spotify Web API (Implicit Grant Flow)
3. CSS Modules for styling
4. Fetch API for HTTP requests

### Potential Improvements

- Add loading spinners and user feedback for all async actions
- Implement better error handling and messages
- Allow reordering tracks in playlists
- Save playlists as private or public
- Add pagination for search results
- Implement tests with Jest and React Testing Library
- Deploy the app and use HTTPS Redirect URI
