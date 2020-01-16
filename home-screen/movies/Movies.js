import React, { Component } from "react";
import { View, FlatList, TouchableHighlight } from "react-native";
import { StatusBar } from "react-native";
import apiConfig from "../../constants/Api";
import { ListItem, Text } from "react-native-elements";
import equal from "fast-deep-equal";

export default class Movies extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
    this.getMoviesFromApiAsync();
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.search, prevProps.search)) {
      this.getMoviesFromApiAsync();
    }
  }

  state = {
    search: "",
    error: ""
  };

  getMoviesFromApiAsync = async () => {
    try {
      if (this.props.search) {
        const search = this.props.search;
        const response = await fetch(
          `${apiConfig.apiUrl}/movie/find/${search}`,
          {
            method: "GET"
          }
        );
        const movies = await response.json();
        this.setState({
          movies: movies
        });
      } else {
        const response = await fetch(`${apiConfig.apiUrl}/movie/new`, {
          method: "GET"
        });
        const movies = await response.json();
        this.setState({
          movies: movies
        });
      }
    } catch (error) {
      this.setState({ error: "no cos nie fajnie" });
    }
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
      onPress={() => this.props.navigate("Player", { movie: item })}
    />
  );

  render() {
    const { movies } = this.state;

    return (
      <View>
        <Text style={{ marginLeft: 15 }} h3>
          Dostępne filmy: {this.props.search} {this.state.error}
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
