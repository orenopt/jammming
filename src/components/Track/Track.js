import React, { Component } from "react";
import "./Track.css";

export default class Track extends Component {
  render() {
    return (
      <div class="Track">
        <div class="Track-information">
          <h3>{this.props.song}</h3>
          <p>
            {this.props.artist} | {this.props.album}
          </p>
        </div>
        <a class="Track-action">{this.props.added ? "-" : "+"}</a>
      </div>
    );
  }
}
