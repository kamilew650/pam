import React, { Component } from "react";
import { Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { StatusBar } from "react-native";
import Movies from "./movies/Movies";
import Search from "./search/Search";

export default class HomeScreen extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
    this.setState({ search: "", searchExists: true });
  }

  updateSearch = search => {
    if (search.localeCompare("") === 0)
      this.setState({ search, searchExists: false });
    else this.setState({ search, searchExists: true });
  };

  render() {
    const { search } = this.state;

    return (
      <View>
        <SearchBar
          placeholder="Znajdz film..."
          onChangeText={this.updateSearch}
          value={search}
          showCancel
        />
        {/* {this.state.searchExists && ( */}
        <Search search={this.state.search}></Search>
        {/* )} */}
      </View>
    );
  }
}
