import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Movements({ item }) {
    return (
        <View style={styles.container}>
            <Text>{item.title}</Text>
            <Text>{item.value}</Text>
            <Text>{item.date}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
