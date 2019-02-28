const clientId = "59bcb6e0bf744f5c998e6c1e2df089c2";
const redirectUri = "http://localhost:3000/";
let accessToken = "";

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      console.log(accessToken);
      return;
    }

    let endpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location = endpoint;

    accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
    console.log(accessToken);
    console.log(expiresIn);
    window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
    window.history.pushState("Access Token", null, "/");
  },

  search(term) {
    this.getAccessToken();
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
  }
};
