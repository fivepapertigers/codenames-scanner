import React from "react"; // eslint-disable-line no-unused-vars
import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native"; // eslint-disable-line no-unused-vars
import FontAwesome, { Icons } from "react-native-fontawesome";

import { getCardColor, getFontColor } from "../ViewHelpers";
import CardTerm from "./CardTerm";

const GridCard = ({ card, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={.7}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: getCardColor(card.type),
        borderRadius: 10,
        width: 118,
        height: 50,
        elevation: 5,
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: .5,
        shadowRadius: 5
      }}
    >{
        card.covered
          ?
            <FontAwesome
              style={{
                color: getFontColor(card.type),
                fontSize: 26
              }}
            >
              {Icons.userCircle}
            </FontAwesome>
          : <CardTerm card={card}/>
    }
    </View>
  </TouchableOpacity>
);


export default GridCard;
