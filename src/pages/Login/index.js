import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe o AsyncStorage correto

export default function Login({ navigation, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userData = await AsyncStorage.getItem(email);
            if (userData) {
                const user = JSON.parse(userData);
                if (user.password === password) {
                    Alert.alert('Login Successful');
                    onLoginSuccess();
                } else {
                    Alert.alert('Invalid password');
                }
            } else {
                Alert.alert('User not found');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Image source={require('../../../assets/tripfi2.png')} style={{ width: 230, height: 90 }} />
            </View>
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
