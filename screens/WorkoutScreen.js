import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import ExerciseContainer from "../components/ExerciseContainer";
import { WorkoutContext } from "../context/WorkoutContext";
import Timer from "../components/Timer";
import { sendNotificationAfterSeconds } from "../expoNotifications";

export default function WorkoutScreen({ navigation, route }) {
  const { workouts, saveWorkout } = React.useContext(WorkoutContext);
  const workout = workouts.find((w) => w.name === route.params.workout.name);
  const exercises = workout.exercises;
  const [currentTimer, setCurrentTimer] = React.useState(0);

  const handleUpdateExercise = (updatedExercise) => {
    if (exercises.some((exercise) => exercise.id === updatedExercise.id)) {
      let index = exercises.findIndex(
        (exercise) => exercise.id === updatedExercise.id
      );
      let newExercises = [...exercises];
      newExercises[index] = updatedExercise;
      const workoutIndex = workouts.findIndex((w) => w.name == workout.name);
      let newWorkouts = [...workouts];
      newWorkouts[workoutIndex] = {
        name: workout.name,
        exercises: newExercises,
      };
      saveWorkout(newWorkouts);
    }
  };

  const handleStartTimer = (timeInSeconds) => {
    sendNotificationAfterSeconds(timeInSeconds);
    setCurrentTimer(timeInSeconds);
  };

  React.useEffect(() => {
    currentTimer > 0 &&
      setTimeout(() => setCurrentTimer(currentTimer - 1), 1000);
  }, [currentTimer]);

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
      <Timer currentTime={currentTimer} />
      {workout.exercises.map((exercise) => (
        <ExerciseContainer
          key={exercise.id}
          exercise={exercise}
          autoFocusInput={false}
          onChange={handleUpdateExercise}
          startTimer={handleStartTimer}
        />
      ))}
    </KeyboardAwareScrollView>
  );
}
