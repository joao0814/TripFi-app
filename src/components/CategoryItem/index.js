import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryItem = ({ category, onEdit, onDelete }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{category.name}</Text>
            <TouchableOpacity style={styles.button} onPress={() => onEdit(category)}>
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onDelete(category.id)}>
                <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
    },
    button: {
        marginLeft: 10,
    },
    buttonText: {
        color: 'blue',
    },
});

export default CategoryItem;
