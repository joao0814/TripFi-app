import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = ({ title, onPress, style, iconName }) => (
  <View style={styles.container}>
    <View style={styles.containerCard}>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        {iconName && (
          <Text>
            <Icon name={iconName} size={18} color="#000000" />
          </Text>
        )}
      </TouchableOpacity>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  containerCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    margin: 5,
    padding: 5,
    backgroundColor: "#fff"
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#d8d8d8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Button;
