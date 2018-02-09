import React from "react";
import { View, Text } from "react-native";
import { createNavigationContainer, StackRouter, addNavigationHelpers } from "react-navigation";

import GridScreen from "../screens/GridScreen";
import ListScreen from "../screens/ListScreen";
import HomeScreen from "../screens/HomeScreen";
import BoardCaptureScreen from "../screens/BoardCaptureScreen";
import ActionBar from "../components/ActionBar";


const RootRouter = StackRouter({
  Grid: {
    screen: GridScreen
  },
  List: {
    screen: ListScreen
  },
  Home: {
    screen: HomeScreen
  },
  BoardCapture: {
    screen: BoardCaptureScreen
  }
}, {
  initialRouteName: "Home",
});


class RootNavigationView extends React.Component {

  static router = RootRouter;

  render() {
    const { state, dispatch } = this.props.navigation;
    const { routes, index } = state;

    // Figure out what to render based on the navigation state and the router:
    const RouteComponent = RootRouter.getComponentForState(state);

    // The state of the active child screen can be found at routes[index]
    let childNavigation = { dispatch, state: routes[index] };
    // If we want, we can also tinker with the dispatch function here, to limit
    // or augment our children's actions

    // Assuming our children want the convenience of calling .navigate() and so on,
    // we should call addNavigationHelpers to augment our navigation prop:
    childNavigation = addNavigationHelpers(childNavigation);

    return (
      <View
      style={{
        flex: 1,
        flexDirection: "column",
        height: "100%",
        alignItems: "stretch"
      }}>
        {/* Start header */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingTop: 15,
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#550000"
          }}
        >
          <Text
            style={{
              color: "#FFAAAA",
              fontSize: 28,
              textAlign: "center",
              fontFamily: "spy-agency",
              flex: 3
            }}
          >
            Codenames Scanner
          </Text>
          <ActionBar navigation={childNavigation} />
        </View>
        {/* End header */}
        <View
          style={{
            flex: 6,
            backgroundColor: "#AA3939",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch"
          }}
        >
          <RouteComponent navigation={childNavigation} />
        </View>
      </View>
    );
  }
}

const RootNavigator = createNavigationContainer(RootNavigationView);

export default RootNavigator;
