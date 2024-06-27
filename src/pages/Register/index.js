import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe o AsyncStorage correto

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }

        try {
            const userData = await AsyncStorage.getItem(email);
            if (userData) {
                Alert.alert('User already exists');
            } else {
                const user = { email, password };
                await AsyncStorage.setItem(email, JSON.stringify(user));
                Alert.alert('User registered successfully');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error(error);
        }
    };

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
