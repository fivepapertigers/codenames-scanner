import React from "react";
import { View, TouchableOpacity } from "react-native";

import { flattenBoard, sortCardsByCovered } from "../helpers/BoardUtils";
import { getCardColor } from "../helpers/ViewHelpers";

import CardTerm from "./CardTerm";


const CardList = ({ board, cardType, toggleCardCovered }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: getCardColor(cardType),
        justifyContent: "flex-start"
      }}
    >
      {flattenBoard(
        ({card, row, col}) => (
          <TouchableOpacity
            style={{
              flex: 1
            }}
            key={`${row}${col}`}
            onPress={() => {
              toggleCardCovered(row, col);
            }}
          >
            <CardTerm card={card}/>
          </TouchableOpacity>
        ),
        ({ card }) => card.type === cardType,
        sortCardsByCovered,
      )(board)}
    </View>
  );
};

export default CardList;