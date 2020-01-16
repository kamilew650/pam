import React, { Component } from "react";
import { View } from "react-native";
import { StatusBar, Dimensions } from "react-native";
import { Text } from "react-native-elements";
import { Video } from "expo-av";
import { ScreenOrientation } from "expo";

export default class Player extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE);
  }

  state = {
    movie: (() => this.props.navigation.getParam("movie", "default value"))()
  };

  render() {
    const videoDisplayWidth = Dimensions.get("window").width;
    const videoDisplayHeight = videoDisplayWidth * 0.6;

    return (
      <View>
        {this.state.movie && (
          <Video
            source={{
              uri: `https://simpletube.s3.eu-central-1.amazonaws.com/${this.state.movie.videoToken}`
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: videoDisplayWidth, height: videoDisplayHeight }}
          />
        )}
      </View>
    );
  }
}
