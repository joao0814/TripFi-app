import React, { useState } from "react";
import { Modal, View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";

const AddExpenseModal = ({ visible, onClose, onCreate, categories }) => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCreateExpense = () => {
        onCreate({ title, value, date, category: selectedCategory });
        setTitle("");
        setValue("");
        setDate("");
        setSelectedCategory(null);
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.categoryItem, selectedCategory === item.id && styles.selectedCategory]}
            onPress={() => setSelectedCategory(item.id)}
        >
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>Criar Despesa</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Título"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Valor"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={setValue}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Data (DD/MM/AAAA)"
                    keyboardType="numeric"
                    value={date}
                    onChangeText={setDate}
                />
                <Text style={styles.categoryTitle}>Selecione uma categoria:</Text>
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.categoryList}
                />
                <Button title="Criar" onPress={handleCreateExpense} />
                <Button title="Cancelar" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: "80%",
    },
    categoryTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    categoryList: {
        width: "80%",
        maxHeight: 200,
        marginBottom: 10,
    },
    categoryItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 5,
    },
    selectedCategory: {
        backgroundColor: "#007AFF",
    },
});

export default AddExpenseModal;
