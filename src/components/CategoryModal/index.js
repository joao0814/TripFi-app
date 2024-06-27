import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const CategoryModal = ({ visible, onClose, onCreate, initialCategory }) => {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (initialCategory) {
            setCategoryName(initialCategory.name);
        }
    }, [initialCategory]);

    const handleCreate = () => {
        if (categoryName.trim()) {
            const newCategory = {
                id: initialCategory ? initialCategory.id : Date.now(),
                name: categoryName,
            };
            onCreate(newCategory);
            setCategoryName('');
        }
    };

    const handleCancel = () => {
        setCategoryName('');
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Nome da Categoria</Text>
                    <TextInput
                        style={styles.input}
                        value={categoryName}
                        onChangeText={setCategoryName}
                        placeholder="Digite o nome da categoria"
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={handleCancel} style={styles.button}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCreate} style={styles.button}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Criar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        height: 30,
        width: 120,
        backgroundColor: 'rgb(37, 53, 78)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default CategoryModal;
