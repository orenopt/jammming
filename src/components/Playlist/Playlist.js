import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

export default class Playlist extends Component {
  render() {
    return (
      <div class="Playlist">
        <input value="New Playlist" />
        <TrackList />
        <a class="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
