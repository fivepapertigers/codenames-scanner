import React from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";

import { toggleCardCovered } from "../Actions";
import GridCard from "../components/GridCard";

const GridContainer = ({ board, dispatch }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column"
      }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            minWidth: 600,
            minHeight: 300
          }}
        >
        {board.map((cards, row) => (
          <View
            key={row}
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              width: "100%"
            }}>
            {cards.map((card, col) => (
              <GridCard
                key={`${row}-${col}`}
                card={card}
                onPress={() => {
                  dispatch(toggleCardCovered(row, col));
                }}
              />
            ))}
          </View>
        ))}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({ board }) => ({ board });

const mapDispatchToProps = dispatch => ({ dispatch });


export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
