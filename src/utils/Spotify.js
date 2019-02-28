const clientId = "59bcb6e0bf744f5c998e6c1e2df089c2";
const redirectUri = "http://localhost:3000/";
let accessToken = "";

export const Spotify = {
  getAccessToken() {
    let url = window.location.href;
    if (accessToken) {
      console.log("Token exists");
      return accessToken;
    }
    if (url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)) {
      accessToken = url.match(/access_token=([^&]*)/)[1];
      const expiresIn = url.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    }

    let endpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location = endpoint;
  },

  search(term) {
    Spotify.getAccessToken();
    // accessToken =
    //   "BQDiHc6jTo4HUiA99a0gw-q5ZFs1n13pGOJwTcSYjyQLKjInJqYlOTv3xUEDvvgQTt-XHFULOVhk-QoUxXps3XtoC0IcMc452ampXw_7kEI7lH3eeBiwvUD_acovIOxPcUNoSkxD8v5eDy3YCWEBtzSDyiydb0KLYgX17_TQvkS9-CO_yrENYYn7m7qBnwtnbA";
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
