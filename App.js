import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import HomeScreen from "./screens/HomeScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import AddNewScreen from "./screens/AddNewScreen";
import AuthScreen from "./screens/AuthScreen";

import { WorkoutProvider } from "./context/WorkoutContext";
import { AuthProvider } from "./context/AuthContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={AuthScreen} />
            <Stack.Screen name="Workout" component={WorkoutScreen} />
            <Stack.Screen name="New" component={AddNewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </WorkoutProvider>
    </AuthProvider>
  );
}
