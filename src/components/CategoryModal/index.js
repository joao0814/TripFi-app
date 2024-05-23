// components/CategoryModal.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const CategoryModal = ({ visible, onClose, onCreate }) => {
    const [categoryName, setCategoryName] = useState('');
    const [color, setColor] = useState('#000000');

    const handleCreate = () => {
        onCreate({ name: categoryName, color });
        setCategoryName('');
        setColor('#000000');
        onClose();
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
                    <Text style={styles.title}>Criar Nova Categoria</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome da Categoria"
                        value={categoryName}
                        onChangeText={setCategoryName}
                    />
                    <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#000000"
                        maximumTrackTintColor="#000000"
                        onValueChange={(value) => setColor(`rgba(0, 0, 0, ${value})`)}
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default CategoryModal;
