import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { Board } from "./Models";
import { sliceImageIntoCards } from "./ImageProcessor";
import CameraExample from "./components/CameraExample";
import BoardOverlay from "./components/BoardOverlay";



export default class App extends React.Component {

  state = {
    board: new Board(),
    cardImages: [],
    image: null
  }

  async imageCaptured(image) {
    this.setState({ image });
    const cardImages = await sliceImageIntoCards(image, this.state.board);
    this.setState({ cardImages });
  }

  render() {
    if (this.state.image) {
      return (
        <View>
          <Image source={this.state.image} style={{width: 400, height: 300}}/>
          {this.renderCardImages()}
        </View>
      );
    } else {
      return (
        <CameraExample imageCaptured={this.imageCaptured.bind(this)}>
          <BoardOverlay board={this.state.board} />
        </CameraExample>
      );
    }
  }

  renderCardImages() {
    return this.state.cardImages.map((cardImage) => {
      const {card, image} = cardImage;
      return (
        <View
          key={`${card.row}${card.column}`}
        >
          <Text>Row: {`${card.row}`} / Column: {`${card.column}`}</Text>
          <Image source={image} style={{width: 210, height: 130}}></Image>
        </View>
      );
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
