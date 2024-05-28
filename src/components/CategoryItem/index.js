import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryItem = ({ category, onSelect }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onSelect(category)}>
            <Text style={styles.text}>{category.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 18,
    },
});

export default CategoryItem;
