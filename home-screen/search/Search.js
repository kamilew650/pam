import React, { Component } from "react";
import { View, FlatList, TouchableHighlight } from "react-native";
import { StatusBar } from "react-native";
import apiConfig from "../../constants/Api";
import { ListItem, Text } from "react-native-elements";

export default class Search extends Component {
  componentDidMount(props) {
    StatusBar.setHidden(true);
    this.getMoviesFromApiAsync();
    state = {
      search: this.props.search
    };
  }

  getMoviesFromApiAsync = async () => {
    try {
      const response = await fetch(
        `${apiConfig.apiUrl}/movie/find/${this.state.search}`,
        {
          method: "GET"
        }
      );
      const movies = await response.json();
      this.setState({
        movies: movies
      });
    } catch (error) {}
  };

  updateSearch = search => {
    this.setState({ search });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem
      Component={TouchableHighlight}
      title={item.title}
      subtitle={(() => {
        const date = new Date(item.uploadDate);

        var dd = date.getDate();
        var mm = date.getMonth() + 1;

        var yyyy = date.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        const rightFormatDate = dd + "/" + mm + "/" + yyyy;
        return `Dodano: ${rightFormatDate}`;
      })()}
      bottomDivider
      chevron
      onPress={() => {}}
    />
  );

  render() {
    const { search, movies, test } = this.state;

    return (
      <View>
        <Text style={{ marginLeft: 15 }} h3>
          Znalezione filmy:
        </Text>
        {this.state.movies && (
          <View style={{ height: 610 }}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.movies}
              renderItem={this.renderItem}
            />
          </View>
        )}
      </View>
    );
  }
}
