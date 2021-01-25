import React, { useState } from "react";
import { db } from "../firebase";

export const WorkoutContext = React.createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveWorkout = (newWorkouts) => {
    setWorkouts(newWorkouts);
  };

  const state = {
    workouts,
    saveWorkout,
  };

  return (
    <WorkoutContext.Provider value={state}>
      {loading ? <Text>Loading...</Text> : children}
    </WorkoutContext.Provider>
  );
};
