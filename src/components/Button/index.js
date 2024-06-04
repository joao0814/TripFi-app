import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // ou qualquer outra biblioteca de ícones que você esteja usando

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
    padding: 5
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(200, 200, 200, 0.5)", // cinza claro meio transparente
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5, // Espaço entre o botão e o texto
  },
  buttonText: {
    color: "#000", // cor do texto
    fontSize: 16, // tamanho do texto
    textAlign: "center", // Alinhar o texto ao centro
  },
});

export default Button;
