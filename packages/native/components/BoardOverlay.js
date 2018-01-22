import React from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native"; // eslint-disable-line no-unused-vars
import * as BoardDimensions from "../BoardDimensions"; // eslint-disable-line no-unused-vars

export default class BoardOverlay extends React.Component {

  renderBoard() {
    return this.props.board.cards.map((card) => {
      let style = {
          position: "absolute",
          top: ratioToPerc(BoardDimensions.cardTopRatio(card)),
          left: ratioToPerc(BoardDimensions.cardLeftRatio(card)),
          width: ratioToPerc(BoardDimensions.CARD_WIDTH_RATIO),
          height: ratioToPerc(BoardDimensions.CARD_HEIGHT_RATIO),
          borderWidth: 2,
          borderColor: "black"
        };
      return (
        <View
          key={`${card.row}${card.column}`}
          style={style}
        >
          <View
            style={{
              backgroundColor: "lightgrey",
              width: "100%",
              height: "100%",
              opacity: .2
            }} />
        </View>
      );
    });
  }

  render() {
    return (
      <View style={{
        position: "absolute",
        width: "100%",
        height: "100%"
      }}>
        {this.renderBoard()}
      </View>
    );
  }
}

function ratioToPerc(ratio) {
  return `${roundTwoDecimals(ratio * 100)}%`;
}

function roundTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}
