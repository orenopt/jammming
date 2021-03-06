import React, { Component } from "react";
import Track from "../Track/Track";
import "./TrackList.css";

export default class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracksList.map(track => {
          return (
            <Track track={track} key={track.id} onClick={this.props.onClick} />
          );
        })}
      </div>
    );
  }
}
