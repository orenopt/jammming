const clientId = "59bcb6e0bf744f5c998e6c1e2df089c2";
const redirectUri = "http://localhost:3000/";
let accessToken;
let expiresIn;

export const Spotify = {
  getAccessToken() {
    let url = window.location.href;
    if (accessToken) {
      return accessToken;
    }

    if (url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)) {
      accessToken = url.match(/access_token=([^&]*)/)[1];
      expiresIn = url.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      let endpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = endpoint;
    }
  },

  search(term) {
    let accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map(item => {
            return {
              artist: item.artists[0].name,
              album: item.album.name,
              song: item.name,
              uri: item.uri,
              id: item.id
            };
          });
        } else {
          return [];
        }
      });
  },
  savePlaylist(name, tracksURI) {
    let accessToken = this.getAccessToken();
    if (!name || !tracksURI) {
      return;
    }
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    };
    let userId;
    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => jsonResponse.id)
      .then(id => {
        userId = id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ name: name })
        })
          .then(response => response.json())
          .then(jsonResponse => jsonResponse.id)
          .then(id => {
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${id}/tracks`,
              {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ uris: tracksURI.map(item => item.uri) })
              }
            )
              .then(response => response.json())
              .then(jsonResponse => {
                return jsonResponse;
              });
          });
      });
  }
};
