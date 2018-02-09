import React from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import { flattenBoard } from "../helpers/BoardUtils";
import { toggleCardCovered } from "../Actions";
import { CardTypes } from "../Constants";
import { getCardColor } from "../helpers/ViewHelpers";

import CardTerm from "../components/CardTerm";

const flattenBoardByType = cardType => processFunc =>
  flattenBoard((card, ...args) =>
    card.type === cardType
      ? (processFunc ? processFunc(card, ...args) : card)
      : null);

const CardList = ({ board, cardType, dispatch }) => {
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
      {flattenBoardByType(cardType)((card, row, col) => (
        <TouchableOpacity
          style={{
            flex: 1
          }}
          key={`${row}${col}`}
          onPress={() => {
            dispatch(toggleCardCovered(row, col));
          }}
        >
          <CardTerm card={card}/>
        </TouchableOpacity>
      ))(board)}
    </View>
  );
};

const ListScreen = ({ board, dispatch }) => {
  const assassinCard = flattenBoardByType(CardTypes.Assassin)()(board)[0];
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "stretch"
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: getCardColor(CardTypes.Assassin)
        }}
      >
        <CardTerm card={assassinCard}/>
      </View>
      <View
        style={{
          flex: 7,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "stretch"
        }}
      >
        <CardList
          board={board}
          cardType={CardTypes.Blue}
          dispatch={dispatch}
        />
        <CardList
          board={board}
          cardType={CardTypes.Red}
          dispatch={dispatch}
        />
        <CardList
          board={board}
          cardType={CardTypes.Bystander}
          dispatch={dispatch}
        />
      </View>
    </View>
  );
};

const mapStateToProps = ({ board }) => ({ board });

const mapDispatchToProps = dispatch => ({ dispatch });


export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
