import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { View, ActivityIndicator } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Font, ScreenOrientation } from "expo";

import { appReducer } from "./Reducer";
import { clearBoard } from "./Actions";

import RootNavigator from "./navigation/RootNavigator";

const store = createStore(
  appReducer,
  applyMiddleware(thunk)
);

store.dispatch(clearBoard());


class App extends React.Component {
  state = {
    appLoaded: false,
  };

  async componentWillMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_LEFT);
  }

  async componentDidMount() {
    await Font.loadAsync({
      "spy-agency": require("../assets/fonts/SpyAgency.ttf"),
      "FontAwesome": require("../assets/fonts/FontAwesome.ttf"),
      "courier-new-bold": require("../assets/fonts/CourierNewBold.ttf")
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
