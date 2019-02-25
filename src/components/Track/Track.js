import React, { Component } from "react";
import "./Track.css";

export default class Track extends Component {
  handleClick(e) {
    const track = e.target;
    console.log(track);
    // this.props.onClick(track);
  }
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
        <a onClick={this.handleClick} className="Track-action" value={track}>
          {track.added ? "-" : "+"}
        </a>
      </div>
    );
  }
}
