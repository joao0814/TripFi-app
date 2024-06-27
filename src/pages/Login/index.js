// Importa os módulos necessários do React e React Native
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe o AsyncStorage correto

// Define o componente funcional Login
export default function Login({ navigation, onLoginSuccess }) {
    // Declara os estados locais email e password, usando useState para gerenciá-los
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Função assíncrona para lidar com o login
    const handleLogin = async () => {
        try {
            // Tenta obter os dados do usuário armazenados no AsyncStorage usando o email como chave
            const userData = await AsyncStorage.getItem(email);
            if (userData) {
                // Se os dados do usuário existem, converte-os de volta para um objeto JavaScript
                const user = JSON.parse(userData);
                // Verifica se a senha fornecida corresponde à senha armazenada
                if (user.password === password) {
                    // Se as senhas correspondem, chama a função onLoginSuccess passada como prop
                    onLoginSuccess();
                } else {
                    // Se as senhas não correspondem, exibe um alerta informando que a senha é inválida
                    Alert.alert('Senha inválida');
                }
            } else {
                // Se não há dados para o email fornecido, exibe um alerta informando que o usuário não existe
                Alert.alert('Usuário não existe');
            }
        } catch (error) {
            // Captura e exibe erros no console
            console.error(error);
        }
    };

    // Retorna o layout do componente
    return (
        <View style={styles.container}>
            {/* Exibe a imagem do logo */}
            <View style={styles.image}>
                <Image source={require('../../../assets/tripfi2.png')} style={{ width: 230, height: 90 }} />
            </View>
            {/* Campo de entrada para o email */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            {/* Campo de entrada para a senha */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {/* Botões de login e registro */}
            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={handleLogin} style={[styles.button, { marginRight: 15 }]}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Registrar-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Define os estilos do componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    image: {
        alignItems: "center",
        paddingBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#dddddd',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#dddddd',
        borderRadius: 8,
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
