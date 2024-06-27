import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe o AsyncStorage correto

export default function Register({ navigation }) {
    // State para armazenar os valores dos campos de entrada
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Função para lidar com o registro do usuário
    const handleRegister = async () => {
        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }

        try {
            // Tenta obter os dados do usuário do AsyncStorage pelo email
            const userData = await AsyncStorage.getItem(email);
            if (userData) {
                // Se já existir um usuário com o email, exibe um alerta
                Alert.alert('User already exists');
            } else {
                // Se o usuário não existir, cria um objeto de usuário com email e senha
                const user = { email, password };
                // Salva os dados do usuário no AsyncStorage
                await AsyncStorage.setItem(email, JSON.stringify(user));
                // Exibe um alerta de sucesso e navega para a tela de login
                Alert.alert('User registered successfully');
                navigation.navigate('Login');
            }
        } catch (error) {
            // Captura e exibe erros ocorridos durante o processo
            console.error(error);
        }
    };

    // Componente de registro
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registre-se</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            {/* Linha de botões para registro e volta para a tela de login */}
            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={handleRegister} style={[styles.button, { marginRight: 15 }]}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Registre-se</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Estilos para o componente Register
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#dddddd',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        width: '80%',
        borderRadius: 20,
    },
    button: {
        height: 30,
        width: 120,
        backgroundColor: 'rgb(37, 53, 78)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});
