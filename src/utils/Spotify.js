const clientId = "59bcb6e0bf744f5c998e6c1e2df089c2";
const redirectUri = "http://localhost:5000/";
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
  searchTracksByName(term) {
    let accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        let res = response.json();
        return res;
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
  searchTopTracksByArtist(term) {
    let accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?q=${term}&type=artist`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.artists) {
          return jsonResponse.artists.items[0].id;
        }
      })
      .then(artistId => {
        return fetch(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=IL`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
          .then(response => {
            let res = response.json();
            return res;
          })
          .then(jsonResponse => {
            if (jsonResponse.tracks) {
              return jsonResponse.tracks.map(item => {
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
      });
  },
  searchTracksByAlbumName(term) {
    let accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?q=${term}&type=album`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.albums) {
          return jsonResponse.albums.items[0].id;
        }
      })
      .then(albumId => {
        return fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            let res = response.json();
            return res;
          })
          .then(jsonResponse => {
            if (jsonResponse.items) {
              console.log(jsonResponse);
              return jsonResponse.items.map(item => {
                return {
                  artist: item.artists[0].name,
                  album: term,
                  song: item.name,
                  uri: item.uri,
                  id: item.id
                };
              });
            } else {
              return [];
            }
          });
      });
  },
  search(term, type) {
    switch (type) {
      case "artist":
        return Spotify.searchTopTracksByArtist(term);
      case "album":
        return Spotify.searchTracksByAlbumName(term);
      case "track":
        return Spotify.searchTracksByName(term);
      default:
        return Spotify.searchTracksByName(term);
    }
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
