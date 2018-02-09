import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import FontAwesome, { Icons } from "react-native-fontawesome";


const routeIsActive = navigation => routeName => {
  return navigation.state.routeName === routeName;
};

const routeIfStateChange = navigation => routeName => () => {
  if (!routeIsActive(navigation)(routeName)) {
    navigation.navigate(routeName);
  }
};

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
