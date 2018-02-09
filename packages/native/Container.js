/* eslint-env node, es6 */
import React from "react"; // eslint-disable-line no-unused-vars
import { Text, View, ActivityIndicator, ScrollView, TouchableHighlight } from "react-native"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { processBoardImage } from "./Actions";
import { getProcessedCards } from "./BoardUtils";

import BoardCapture from "./components/BoardCapture"; // eslint-disable-line no-unused-vars
import BoardOverlay from "./components/BoardOverlay"; // eslint-disable-line no-unused-vars
import ActionBar from "./components/ActionBar"; // eslint-disable-line no-unused-vars
import GridCard from "./components/GridCard"; // eslint-disable-line no-unused-vars

const Container = ({ boardImage, board, imageCaptured, totalProcessed }) => {
  if (boardImage) {
    if (totalProcessed.length < 25) {
      return (
        <View>
          <ActivityIndicator size="large" />
          <Text>Detecting terms: {totalProcessed.length} of 25</Text>
        </View>
      );
    }
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
                  />
                ))}
              </View>
            ))}
            </View>
          </ScrollView>
        </View>
        <ActionBar/>
      </View>
    );
  } else if (board) {
    return (
      <BoardCapture imageCaptured={imageCaptured}>
        <BoardOverlay board={board} />
      </BoardCapture>
    );
  } else {
    return (<Text>Loading...</Text>);
  }
};

const mapStateToProps = ({ boardImage, board }) => ({
  boardImage, board,
  totalProcessed: getProcessedCards(board)
});

const mapDispatchToProps = dispatch => ({
  imageCaptured: image => dispatch(processBoardImage(image)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Container);
