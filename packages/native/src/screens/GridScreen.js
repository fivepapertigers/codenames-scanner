/* eslint-env node, es6 */
import React from "react"; // eslint-disable-line no-unused-vars
import { Text, View, ActivityIndicator, ScrollView, TouchableHighlight } from "react-native"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";

import { toggleCardCovered } from "../Actions";
import ActionBar from "../components/ActionBar"; // eslint-disable-line no-unused-vars
import GridCard from "../components/GridCard"; // eslint-disable-line no-unused-vars

const GridScreen = ({ board, dispatch }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column"
      }}
    >
      <View
        style={{
          flex: 8
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
    </View>
  );
};

const mapStateToProps = ({ board }) => ({ board });

const mapDispatchToProps = dispatch => ({ dispatch });


export default connect(mapStateToProps, mapDispatchToProps)(GridScreen);
