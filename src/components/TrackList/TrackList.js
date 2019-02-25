import React, { Component } from "react";
import Track from "../Track/Track";
import "./TrackList.css";

export default class TrackList extends Component {
  // constructor(props) {
  //   super(props);
  // }
  handleAddRemove() {}
  render() {
    return (
      <div className="TrackList">
        {this.props.tracksList.map((track, i) => {
          return (
            // <Track
            //   key={i}
            //   song={track.song}
            //   artist={track.artist}
            //   album={track.album}
            //   added={track.added}
            //   onClick={this.props.onClick(track)}
            // />
            <Track track={track} key={i} />
          );
        })}
      </div>
    );
  }
}
