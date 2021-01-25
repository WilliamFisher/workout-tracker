import React from "react";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function SetsContainer(props) {
  const { set, onChanged, autoFocusInput, startTimer } = props;

  const updateWeight = (newValue) =>
    onChanged({ id: set.id, weight: newValue });

  const updateReps = (newValue) => onChanged({ id: set.id, reps: newValue });

  const toggleCompleted = () => {
    onChanged({ id: set.id, completed: !set.completed });
    startTimer();
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.rowText}
        value={`${set.id}`}
        editable={false}
      ></TextInput>
      <TextInput
        style={styles.rowText}
        keyboardType="number-pad"
        autoFocus={autoFocusInput}
        value={set.weight}
        onChangeText={(newValue) => updateWeight(newValue)}
      ></TextInput>
      <TextInput
        style={styles.rowText}
        keyboardType="number-pad"
        value={set.reps}
        onChangeText={(newValue) => updateReps(newValue)}
      ></TextInput>
      <Pressable
        style={[styles.rowText, set.completed && styles.completed]}
        onPress={toggleCompleted}
      >
        <Entypo
          style={{ alignSelf: "center" }}
          name="check"
          size={24}
          color={set.completed ? "white" : "black"}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowText: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "center",
    width: 50,
    backgroundColor: "#CDCDCD",
    borderRadius: 6,
  },
  completed: {
    backgroundColor: "#19c251",
  },
});
