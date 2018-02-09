import React from "react";
import { Text, View } from "react-native";
import FontAwesome, { Icons } from "react-native-fontawesome";


const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text
        style={{
          fontSize: 32,
          marginBottom: 20,
          color: "#FFAAAA"
        }}
      >
        <Text>Welcome to </Text>
        <Text
          style={{
            fontWeight: "bold"
          }}
        >
        CODENAMES SCANNER
        </Text>
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "#FFAAAA"
        }}
      >
        <Text>Click the </Text>
        <Text
          style={{
            color: "#D46A6A"
          }}
        >
          <FontAwesome>{Icons.camera}</FontAwesome>
        </Text>
        <Text> icon to scan your board and begin playing</Text>
      </Text>
    </View>
  );
};

export default HomeScreen;
