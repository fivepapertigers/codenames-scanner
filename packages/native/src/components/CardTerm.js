import React from "react"; // eslint-disable-line no-unused-vars
import { Text, View, ActivityIndicator, TouchableHighlight } from "react-native"; // eslint-disable-line no-unused-vars
import FontAwesome, { Icons } from "react-native-fontawesome";

import { getFontColor } from "../helpers/ViewHelpers";
import { getCardTerm } from "../helpers/BoardUtils";

const CardTerm = ({ card = {} }) => {
  const term = getCardTerm(card) || "(not found)";
  let warning;
  if (card.termResult && card.termResult.confidence < 1) {
    warning = (<FontAwesome> {Icons.exclamationTriangle}</FontAwesome>);
  }
  return (
    <View>
      {
        card.termResult
        ?
          <Text
            style={{
              fontSize: 12,
              color: getFontColor(card.type)
            }}
          >
            <Text
              style={{
                fontFamily: "courier-new-bold",
                color: getFontColor(card.type),
                textDecorationLine: card.covered ? "line-through" : "none"
              }}
            >
              {term}
            </Text>
            {warning}
          </Text>
        :
          <ActivityIndicator size="small" color={getFontColor(card.type)}/>
      }
    </View>
  );
};


export default CardTerm;
