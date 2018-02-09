import React from "react";
import { View } from "react-native";

import { generateEmptyBoard, flattenBoard } from "../helpers/BoardUtils";
import * as BoardDimensions from "../helpers/BoardDimensions";

const BOARD = generateEmptyBoard();

const BoardOverlay = () => (
  <View style={{
    position: "absolute",
    width: "100%",
    height: "100%"
  }}>
    {flattenBoard((cards, row, col, idx) => {
      const card = { row, col };
      return (
        <View
          key={idx}
          style={{
            position: "absolute",
            top: ratioToPerc(BoardDimensions.cardTopRatio(card)),
            left: ratioToPerc(BoardDimensions.cardLeftRatio(card)),
            width: ratioToPerc(BoardDimensions.CARD_WIDTH_RATIO),
            height: ratioToPerc(BoardDimensions.CARD_HEIGHT_RATIO),
            borderWidth: 2,
            borderColor: "black",
            backgroundColor: (idx % 2 === 0) ? "rgba(120, 120, 120, 0.5)" : "rgba(30, 30, 30, 0.5)"
          }}
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
    })(BOARD)
  }
  </View>
);

function ratioToPerc(ratio) {
  return `${roundTwoDecimals(ratio * 100)}%`;
}

function roundTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

export default BoardOverlay;
