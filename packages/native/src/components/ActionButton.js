import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import FontAwesome from "react-native-fontawesome";

const ActionButton = ({ icon, onPress, isActive }) => (
  <Text
    style={{
      flex: 1,
      color: isActive ? "#FFAAAA" : "#D46A6A",
      textAlign: "center",
      fontSize: 24
    }}
    onPress={onPress}
  >
    <FontAwesome>
      {icon}
    </FontAwesome>
  </Text>
);

ActionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default ActionButton;
