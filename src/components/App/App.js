import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [
        {
          song: "Tiny Dancer",
          artist: "Elton John",
          album: "Madman Across The Water",
          added: false
        },
        {
          song: "Tiny Dancer",
          artist: "Elton John",
          album: "Madman Across The Water",
          added: false
        },
        {
          song: "Tiny Dancer",
          artist: "Elton John",
          album: "Madman Across The Water",
          added: false
        },
        {
          song: "Tiny Dancer",
          artist: "Elton John",
          album: "Madman Across The Water",
          added: false
        },
        {
          song: "Tiny Dancer",
          artist: "Elton John",
          album: "Madman Across The Water",
          added: false
        }
      ]
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick(e) {
    console.log(e.target);
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              tracksList={this.state.tracks}
              onClick={this.handleOnClick}
            />
            <Playlist tracksList={[]} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
