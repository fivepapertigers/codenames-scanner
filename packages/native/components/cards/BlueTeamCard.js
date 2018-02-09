import React from "react"; // eslint-disable-line no-unused-vars
import { Text, View, TouchableOpacity, Dimensions } from "react-native"; // eslint-disable-line no-unused-vars

import { cardDisplayType } from "../Models";

const GridCard = ({ card, row, col }) => (
  <View
    key={`${row}${col}`}
    style={{
      flex: .2,
      margin: "1%",
      height: 80,
      backgroundColor: ,
      justifyContent: "center"
    }}
  >{
    card.termResult
      ? (
          <Text
            style={{
              flex: 1,
              color: "white"
            }}
          >
            {card.termResult.term} / {card.termResult.confidence}
          </Text>
        )
      : (
        <Text
          style={{
            flex: 1, color: "white"
          }}
        >
          processing...
        </Text>
      )
  }
  </View>
);


export default GridCard;
