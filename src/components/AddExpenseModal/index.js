import React, { useState } from 'react';
import { Modal, View, StyleSheet, Text, FlatList, TouchableOpacity, Button, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

AddExpenseModal = ({ visible, onClose, onCreate, categories }) => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCreateExpense = () => {
        onCreate({ title, value, date, categoryId: selectedCategory }); // Passando o categoryId ao criar a despesa
        setTitle('');
        setValue('');
        setDate('');
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
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Criar Despesa</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Título"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInputMask
                        style={styles.input}
                        type={'money'}
                        placeholder="Valor"
                        value={value}
                        onChangeText={setValue}
                    />
                    <TextInputMask
                        style={styles.input}
                        type={'datetime'}
                        options={{ format: 'DD/MM/YYYY' }}
                        placeholder="Data (DD/MM/AAAA)"
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
                    <View style={styles.buttonRow}>
                        <Button title="Criar" onPress={handleCreateExpense} />
                        <Button title="Cancelar" onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    categoryTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    categoryList: {
        width: '100%',
        maxHeight: 200,
        marginBottom: 10,
    },
    categoryItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 5,
    },
    selectedCategory: {
        backgroundColor: '#007AFF',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default AddExpenseModal;
