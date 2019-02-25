import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import TrackList from "../TrackList/TrackList";
import Playlist from "../Playlist/Playlist";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <h1>
          Ja<span class="highlight">mmm</span>ing
        </h1>
        <div class="App">
          <SearchBar />
          <div class="App-playlist">
            <div class="SearchResults">
              <h2>Results</h2>
              <TrackList />
            </div>
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
