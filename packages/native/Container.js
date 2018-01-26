/* eslint-env node, es6 */

import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native"; // eslint-disable-line no-unused-vars

import { Board, Card, CardImage } from "./Models";
import { sliceImageIntoCards, detectTerm } from "./ImageProcessor";
import BoardCapture from "./components/BoardCapture"; // eslint-disable-line no-unused-vars
import BoardOverlay from "./components/BoardOverlay"; // eslint-disable-line no-unused-vars


export default class Container extends React.Component {

  state = {
    board: new Board(),
    cardImages: [],
    image: null
  }

  async imageCaptured(image) {
    this.setState({ image });
    const cardImages = await sliceImageIntoCards(image, this.state.board);
    this.setState({ cardImages });
    cardImages.forEach(async(cardImage, idx) => {
      const { card } = cardImage;
      const { id, term, confidence } = await detectTerm(cardImage.image);
      const newCard = new Card(card.row, card.column, term, card.type, id, confidence);
      const newCardImage = Object.assign(new CardImage(newCard, cardImage.image));
      this.setState({
        cardImages: this.state.cardImages
          .map((ci, ix) => ix === idx ? newCardImage : ci)
      });
    });
  }

  render() {
    if (this.state.image) {
      return (
        <ScrollView>
          <Image source={this.state.image} style={{width: 400, height: 300}}/>
          {this.renderCardImages()}
        </ScrollView>
      );
    } else {
      return (
        <BoardCapture imageCaptured={this.imageCaptured.bind(this)}>
          <BoardOverlay board={this.state.board} />
        </BoardCapture>
      );
    }
  }

  renderCardImages() {
    const board = [[], [], [], [], []];
    this.state.cardImages.forEach((cardImage) => {
      const { card } = cardImage;
      board[card.row][card.column] = (
        <View
          key={`${card.row}${card.column}`}
          style={{flex: .2, margin: "1%", height: 80, backgroundColor: card.color(), justifyContent: "center"}}
        >
          <Text style={{flex: 1, color: "white"}}>{card.term} / {card.confidence}</Text>
        </View>
      );
    });
    return board.map((cards, idx) =>
      <View key={idx} style={{flex: 1, flexDirection: "row"}}>
        {cards}
      </View>
    );
  }
}
