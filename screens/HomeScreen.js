import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import * as Notifications from "expo-notifications";
import { Entypo } from "@expo/vector-icons";

import WorkoutsList from "../components/WorkoutsList";
import { WorkoutContext } from "../context/WorkoutContext";
import { useAuth } from "../context/AuthContext";
import { registerForPushNotificationsAsync } from "../expoNotifications";

export default function HomeScreen({ navigation }) {
  const { workouts } = useContext(WorkoutContext);
  const { currentUser } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState("");
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        setExpoPushToken(token);
      })
      .catch((e) => {
        console.error(e);
      });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (response.actionIdentifier === "nextSet") {
          // TODO: CLicking "Next Set" in notification should start the next
          // rest timer.
          //sendNotificationAfterSeconds(60);
        }
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <View style={styles.container}>
      {currentUser ? (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.pageHeader}>Your Workouts</Text>
            <Pressable onPress={() => navigation.navigate("New")}>
              <Entypo name="squared-plus" size={30} color="#28B6FC" />
            </Pressable>
          </View>
          <WorkoutsList workouts={workouts} navigation={navigation} />
        </>
      ) : (
        <Button title="Sign In" onPress={() => navigation.navigate("Login")} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  pageHeader: {
    fontSize: 24,
    margin: 10,
    fontWeight: "bold",
  },
});
