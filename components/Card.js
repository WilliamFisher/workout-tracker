import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import MyButton from "./MyButton";

const Card = (props) => {
  const { title, listData } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={listData}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.bodyText}>{item.name}</Text>
            {item.sets.map((set, index) => (
              <Text style={styles.bodyText} key={index}>
                - {set.weight} x {set.reps}
              </Text>
            ))}
          </View>
        )}
      />
      <MyButton title="Start Exercise" onPress={props.onPress} />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ededed",
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    margin: 5,
    fontWeight: "bold",
  },
  bodyText: {
    marginLeft: 10,
    fontSize: 18,
  },
});
