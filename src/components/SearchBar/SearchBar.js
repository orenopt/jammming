/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./SearchBar.css";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      type: "track"
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);

    this.searchByType = {
      Track: "track",
      Artist: "artist",
      Album: "album"
    };
  }

  search(e) {
    this.props.onSearch(this.state.term, this.state.type);
    e.preventDefault();
  }

  handleTermChange(e) {
    this.setState({ term: e.target.value });
  }

  getSearchByTypeClass(searchByType) {
    if (this.state.type === searchByType) {
      return "active";
    } else {
      return "";
    }
  }
  handleSearchByTypeChange(searchByType) {
    this.setState({ type: searchByType });
  }

  renderSearchByType() {
    return Object.keys(this.searchByType).map(searchType => {
      let type = this.searchByType[searchType];
      return (
        <li
          className={this.getSearchByTypeClass(type)}
          key={type}
          onClick={this.handleSearchByTypeChange.bind(this, type)}
        >
          {searchType}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSearchByType()}</ul>
        </div>
        <input
          placeholder="Enter A Song Title"
          onChange={this.handleTermChange}
        />
        <a href="#" onClick={this.search}>
          SEARCH
        </a>
      </div>
    );
  }
}
