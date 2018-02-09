import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Icons } from "react-native-fontawesome";

import ActionButton from "./ActionButton";


const routeIsActive = navigation => routeName => {
  return navigation.state.routeName === routeName;
};

const routeIfStateChange = navigation => routeName => () => {
  if (!routeIsActive(navigation)(routeName)) {
    navigation.navigate(routeName);
  }
};

const ActionBar = ({ navigation }) => {
  const onPress = routeIfStateChange(navigation);
  const active = routeIsActive(navigation);
  return (
    <View
      style={{
        flex: 2,
        flexDirection: "row",
        justifyContent: "flex-start"
      }}
    >
      <ActionButton
        icon={Icons.camera}
        onPress={onPress("BoardCapture")}
        isActive={active("BoardCapture")}
      />
      <ActionButton
        icon={Icons.th}
        onPress={onPress("Grid")}
        isActive={active("Grid")}
      />
      <ActionButton
        icon={Icons.list}
        onPress={onPress("List")}
        isActive={active("List")}
      />
      <ActionButton
        icon={Icons.refresh}
        onPress={onPress("Reset")}
        isActive={active("Reset")}
      />
    </View>
  );
};

ActionBar.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default ActionBar;
