import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

export default class Playlist extends Component {
  handleOnChange() {
    console.log("Playlist input value handleOnChnage");
  }
  render() {
    return (
      <div className="Playlist">
        <input value="New Playlist" onChange={this.handleOnChange} />
        <TrackList tracksList={this.props.tracksList} />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
