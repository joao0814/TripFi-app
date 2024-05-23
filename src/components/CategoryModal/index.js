import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CategoryModal = ({ visible, onClose, onCreate }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleCreate = () => {
        if (categoryName.trim().length > 0) {
            onCreate({ id: Math.random().toString(), name: categoryName });
            setCategoryName('');
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Criar Categoria</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome da Categoria"
                        value={categoryName}
                        onChangeText={setCategoryName}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Cancelar" onPress={onClose} />
                        <Button title="Criar" onPress={handleCreate} />
                    </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default CategoryModal;
