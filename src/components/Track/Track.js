import React, { Component } from "react";
import "./Track.css";

export default class Track extends Component {
  render() {
    const { track } = this.props;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.song}</h3>
          <p>
            {track.artist} | {track.album}
          </p>
        </div>
        <a onClick={() => this.props.onClick(track)} className="Track-action">
          {track.isRemoval ? "-" : "+"}
        </a>
      </div>
    );
  }
}
