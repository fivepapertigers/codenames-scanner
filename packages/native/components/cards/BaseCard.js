import React from "react"; // eslint-disable-line no-unused-vars
import { Text, View } from "react-native"; // eslint-disable-line no-unused-vars

export default color => ({ card, row, col }) => (
  <View
    key={`${row}${col}`}
    style={{
      flex: .2,
      margin: "1%",
      height: 80,
      backgroundColor: color,
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
            {card.termResult.term}
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
