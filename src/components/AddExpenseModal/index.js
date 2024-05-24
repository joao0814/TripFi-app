// AddExpenseModal.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddExpenseModal = ({ visible, onClose, onSave, categories }) => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSave = () => {
        if (title && value && date && selectedCategory) {
            onSave({ title, value, date, category: selectedCategory });
            onClose();
        } else {
            alert('Please fill all fields');
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Add Expense</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Value"
                        value={value}
                        onChangeText={setValue}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Date"
                        value={date}
                        onChangeText={setDate}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Category"
                        value={selectedCategory}
                        onChangeText={setSelectedCategory}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#fff',
    },
    closeButton: {
        padding: 10,
    },
    closeButtonText: {
        color: '#007AFF',
    },
});

export default AddExpenseModal;
