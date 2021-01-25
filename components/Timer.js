import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Timer(props) {
  const { currentTime } = props;

  return (
    <View style={styles.container}>
      {currentTime > 0 && <Text style={styles.timerText}>{currentTime}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  timerText: {
    padding: 5,
    fontSize: 24,
    fontWeight: "bold",
  },
});
