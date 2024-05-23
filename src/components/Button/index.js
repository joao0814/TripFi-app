import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Button = ({ title, onPress, style }) => (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            {/* Ícone ou conteúdo do botão aqui */}
        </TouchableOpacity>
        <Text style={styles.buttonText}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'left',
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(200, 200, 200, 0.5)', // cinza claro meio transparente
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5, // Espaço entre o botão e o texto
    },
    buttonText: {
        color: '#000', // cor do texto
        fontSize: 16, // tamanho do texto
        textAlign: 'left', // Alinhar o texto ao centro
    },
});

export default Button;
