import React from "react";
import { View, Text, FlatList } from "react-native";
import Card from "./Card";

export default function WorkoutsList({ workouts, navigation }) {
  const getShortList = (workout) => workout.exercises.slice(0, 4);

  const renderItem = ({ item }) => (
    <Card
      title={item.name}
      onPress={() => navigation.navigate("Workout", { workout: item })}
      listData={getShortList(item)}
    />
  );

  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      {workouts.length < 1 && (
        <Text style={{ fontSize: 18, alignSelf: "center" }}>
          You haven't created any workouts!
        </Text>
      )}

      <FlatList
        data={workouts}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}
