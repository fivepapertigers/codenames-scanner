import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { flattenBoard } from "../helpers/BoardUtils";
import { toggleCardCovered } from "../Actions";
import { CardTypes } from "../Constants";
import { getCardColor } from "../helpers/ViewHelpers";

import CardTerm from "../components/CardTerm";
import CardList from "../components/CardList";


const ListContainer = ({ board, toggleCovered }) => {
  const assassinCard =
    flattenBoard({sort: ({ card }) => card.type === CardTypes.Assassin})(board)[0];
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
          toggleCardCovered={toggleCovered}
        />
        <CardList
          board={board}
          cardType={CardTypes.Red}
          toggleCardCovered={toggleCovered}
        />
        <CardList
          board={board}
          cardType={CardTypes.Bystander}
          toggleCardCovered={toggleCovered}
        />
      </View>
    </View>
  );
};

const mapStateToProps = ({ board }) => ({ board });

const mapDispatchToProps = dispatch => ({
  toggleCovered: (row, col) => dispatch(toggleCardCovered(row, col))
});


export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
