import React, { Component } from "react";
import Track from "../Track/Track";
import "./TrackList.css";

const tracks = [
  {
    song: "Tiny Dancer",
    artist: "Elton John",
    album: "Madman Across The Water",
    added: true
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
    added: true
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
    album: "Madman Across The Water"
  }
];

export default class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {tracks.map(track => {
          return (
            <Track
              song={track.song}
              artist={track.artist}
              album={track.album}
              added={track.added}
            />
          );
        })}
      </div>
    );
  }
}
