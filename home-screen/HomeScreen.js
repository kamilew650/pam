import React, { Component } from "react";
import { Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { StatusBar } from "react-native";
import Movies from "./movies/Movies";
import { ScreenOrientation } from "expo";

export default class HomeScreen extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  state = {
    search: ""
  };

  updateSearch = search => {
    this.setState({ search });
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
        <Movies
          search={search}
          navigate={this.props.navigation.navigate}
        ></Movies>
      </View>
    );
  }
}
