import React from "react";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import MyButton from "./MyButton";
import SetsContainer from "./SetsContainer";

import { Entypo } from "@expo/vector-icons";

export default function ExerciseContainer(props) {
  const { exercise, onChange, autoFocusInput, startTimer } = props;
  const [timeInputVisible, setTimeInputVisible] = React.useState(false);

  const handleSetChanged = (updatedSet) => {
    let setToUpdate = exercise.sets.find((set) => set.id === updatedSet.id);
    setToUpdate = { ...setToUpdate, ...updatedSet };
    let newState = [...exercise.sets];
    newState[updatedSet.id] = setToUpdate;
    onChange({ ...exercise, sets: [...newState] });
  };

  const handleNewSet = () => {
    onChange({
      id: exercise.id,
      name: exercise.name,
      sets: [
        ...exercise.sets,
        { id: exercise.sets.length, weight: "", reps: "" },
      ],
    });
  };

  const handleSetTimerForExercise = (timeInSeconds) => {
    setTimeInputVisible(false);
    onChange({
      ...exercise,
      timer: timeInSeconds,
    });
  };

  const handleStartTimer = () => {
    if (exercise.timer) {
      startTimer(exercise.timer);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.exerciseText}>{exercise.name}</Text>
      <Pressable
        onPress={() => setTimeInputVisible(true)}
        style={styles.pullRight}
      >
        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </Pressable>
      {timeInputVisible && (
        <View style={styles.timeInput}>
          <Text style={{ margin: 8, fontSize: 18 }}>Set Timer: </Text>
          <Button onPress={() => handleSetTimerForExercise(30)} title="00:30" />
          <Button onPress={() => handleSetTimerForExercise(60)} title="1:00" />
          <Button onPress={() => handleSetTimerForExercise(180)} title="1:30" />
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.headerText}>Set</Text>
        <Text style={styles.headerText}>lbs</Text>
        <Text style={styles.headerText}>Reps</Text>
        <Text style={styles.headerText}></Text>
      </View>
      {exercise.sets.length > 0 &&
        exercise.sets.map((set) => (
          <SetsContainer
            set={set}
            key={set.id}
            onChanged={handleSetChanged}
            autoFocusInput={autoFocusInput}
            startTimer={handleStartTimer}
          />
        ))}
      <View style={{ ...styles.row, alignSelf: "center" }}>
        <MyButton onPress={handleNewSet} title="Add New Set" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    marginBottom: 10,
    flex: 1,
  },
  exerciseText: {
    fontSize: 22,
    textAlign: "left",
    padding: 5,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    width: 50,
  },
  pullRight: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 2,
  },
  timeInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
});
