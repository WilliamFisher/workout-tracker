import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function MyButton(props) {
  const { title, style, onPress, pressableStyle } = props;
  return (
    <Pressable onPress={onPress} style={pressableStyle}>
      <View behavior="padding" style={{ ...styles.container, ...style }}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "#28B6FC",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 20,
    borderRadius: 5,
    flexShrink: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
