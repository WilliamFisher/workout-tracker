import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Text,
  Modal,
  FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import MyButton from "../components/MyButton";
import ExerciseContainer from "../components/ExerciseContainer";

import { WorkoutContext } from "../context/WorkoutContext";

import exerciseData from "../exerciseList.json";

const Exercise = ({ exerciseName, target }) => (
  <View style={styles.item}>
    <Text style={styles.exerciseText}>{exerciseName}</Text>
    <Text style={styles.targetText}>{target}</Text>
  </View>
);

export default function AddNewScreen({ navigation }) {
  const [workoutName, onChangeName] = React.useState(null);
  const [exercises, setExercises] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { workouts, saveWorkout } = React.useContext(WorkoutContext);
  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: "#121212",
        borderBottomWidth: 2,
      }}
    >
      <Exercise exerciseName={item.exerciseName} target={item.target} />
      <Button
        title="Add"
        onPress={() => {
          setExercises([
            ...exercises,
            {
              id: exercises.length,
              name: item.exerciseName,
              sets: [],
            },
          ]);
          setModalVisible(false);
        }}
      />
    </View>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            onChangeName("");
            saveWorkout((prevWorkouts) => [
              ...prevWorkouts,
              { name: workoutName, exercises: exercises },
            ]);
            navigation.goBack();
          }}
          style={{
            borderRadius: 10,
            backgroundColor: "#28B6FC",
            padding: 6,
            marginRight: 15,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "#fff",
              fontWeight: "700",
            }}
          >
            Save
          </Text>
        </Pressable>
      ),
    });
  });

  const handleUpdateExercise = (updatedExercise) => {
    if (exercises.some((exercise) => exercise.id === updatedExercise.id)) {
      let index = exercises.findIndex(
        (exercise) => exercise.id === updatedExercise.id
      );
      let newState = [...exercises];
      newState[index] = updatedExercise;
      setExercises(newState);
      //Update the existing exercise
    } else {
      //Add a new exericse
      setExercises((prevState) => [...prevState, updatedExercise]);
    }
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Choose an exercise</Text>
            <FlatList
              data={exerciseData}
              renderItem={renderItem}
              keyExtractor={(item) => item.exerciseName}
            />
            <Button onPress={() => setModalVisible(false)} title="Hide Modal" />
          </View>
        </View>
      </Modal>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeName(text)}
        value={workoutName}
        autoFocus={true}
        placeholder="Exercise Name"
      />
      <MyButton
        title="Add Exercises"
        onPress={() => {
          setModalVisible(true);
        }}
      />
      {exercises.map((exercise) => (
        <ExerciseContainer
          key={exercise.id}
          exercise={exercise}
          onChange={handleUpdateExercise}
          autoFocusInput={true}
        />
      ))}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
  input: {
    fontSize: 24,
    padding: 10,
    margin: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    marginTop: 25,
  },
  modal: {
    flex: 1,
    margin: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: "stretch",
    justifyContent: "space-evenly",
    flexDirection: "column",
    elevation: 5,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  exerciseText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  targetText: {
    fontSize: 16,
    color: "#121212",
  },
  item: {
    padding: 10,
    margin: 5,
    borderBottomColor: "#bbb",
  },
});
