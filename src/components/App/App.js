import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { Spotify } from "../../utils/Spotify";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const { playlistTracks } = this.state;
    if (playlistTracks.find(t => track.id === t.id)) {
      return;
    }
    const newTrack = { ...track };
    const updatedPlaylist = [...playlistTracks, newTrack];
    updatedPlaylist[updatedPlaylist.length - 1]["isRemoval"] = true;
    this.setState({ playlistTracks: updatedPlaylist });
  }

  removeTrack(track) {
    const updatedPlaylist = this.state.playlistTracks.filter(
      t => t.id !== track.id
    );
    this.setState({ playlistTracks: updatedPlaylist });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const { playlistName, playlistTracks } = this.state;
    Spotify.savePlaylist(playlistName, playlistTracks).then(() => {
      this.setState({ playlistName: "New Playlist", playlistTracks: [] });
    });
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({ SearchResults: tracks });
    });
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              tracksList={this.state.SearchResults}
              onClick={this.addTrack}
            />
            <Playlist
              name={this.state.playlistName}
              tracksList={this.state.playlistTracks}
              onClick={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
