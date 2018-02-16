import React from "react";
import { Button, Text, View } from "react-native";

const BoardCaptureExplanation = ({ closeExplanation }) => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        position: "absolute",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: 10
      }}
    >
      <Text
        style={{
          fontSize: 32,
          marginBottom: 20,
          color: "#FFAAAA"
        }}
      >
        HOW TO CAPTURE YOUR BOARD
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "#FFAAAA",
          textAlign: "center"
        }}
      >
        Line up each card so that the black word is inside the approriate
        box. Make sure that all of the black words are face-up.
      </Text>
      <View
        style={{
          marginTop: 20
        }}
      >
        <Button
          onPress={closeExplanation}
          title="Got it"
        />
      </View>
    </View>
  );
};

export default BoardCaptureExplanation;
