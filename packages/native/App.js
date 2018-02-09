/* eslint-env node, es6 */

import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { View, ActivityIndicator, Text } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Font, ScreenOrientation } from "expo";
import { createNavigationContainer, StackRouter, addNavigationHelpers } from "react-navigation";

import { appReducer } from "./Reducer";
import { clearBoard } from "./Actions";
import GridScreen from "./GridScreen";
import ListScreen from "./ListScreen";
import HomeScreen from "./HomeScreen";
import BoardCaptureScreen from "./BoardCaptureScreen";
import ActionBar from "./components/ActionBar";


const store = createStore(
  appReducer,
  applyMiddleware(thunk)
);

store.dispatch(clearBoard());

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


class App extends React.Component {
  state = {
    appLoaded: false,
  };

  async componentWillMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_LEFT);
  }

  async componentDidMount() {
    await Font.loadAsync({
      "spy-agency": require("./assets/fonts/SpyAgency.ttf"),
      "FontAwesome": require("./assets/fonts/FontAwesome.ttf"),
      "courier-new-bold": require("./assets/fonts/CourierNewBold.ttf")
    });

    this.setState({ appLoaded: true });
  }

  render () {
    return (
      <View
        style={{
          backgroundColor: "#b56161",
          flex: 1
        }}
      >{
        this.state.appLoaded
          ? (
            <Provider store={store}>
              <RootNavigator />
            </Provider>
          )
          :
          <ActivityIndicator
            color="white"
          />
      }
      </View>
    );
  }
}

export default App;
