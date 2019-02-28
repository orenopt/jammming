import React, { Component } from "react";
import "./SearchBar.css";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
    // e.preventDefault();
  }

  handleTermChange(e) {
    this.setState({ term: e.target.value });
    e.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song Title"
          onChange={this.handleTermChange}
        />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}
