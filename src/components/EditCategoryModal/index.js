import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

const EditCategoryModal = ({ visible, onClose, category, onSave, onDelete }) => {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (category) {
            setCategoryName(category.name);
        }
    }, [category]);

    const handleSave = () => {
        onSave({ ...category, name: categoryName });
        onClose();
    };

    const handleDelete = () => {
        onDelete(category.id);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.container}>
                <Text style={styles.title}>Editar Categoria</Text>
                <TextInput
                    style={styles.input}
                    value={categoryName}
                    onChangeText={setCategoryName}
                />
                <Button title="Salvar" onPress={handleSave} />
                <Button title="Excluir" onPress={handleDelete} color="red" />
                <Button title="Cancelar" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        width: '80%',
        padding: 10,
        backgroundColor: '#dddddd',
        marginBottom: 10,
        borderRadius: 8,
    },
});

export default EditCategoryModal;
