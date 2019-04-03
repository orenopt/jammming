/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

export default class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }
  render() {
    return (
      <div className="Playlist">
        <input value={this.props.name} onChange={this.handleNameChange} />
        <TrackList
          tracksList={this.props.tracksList}
          onClick={this.props.onClick}
        />
        <a className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}
