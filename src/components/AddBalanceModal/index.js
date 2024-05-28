import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

const AddBalanceModal = ({ visible, onClose, onSave }) => {
    const [value, setValue] = useState('');

    const handleAddBalance = () => {
        const numericValue = parseFloat(value.replace(',', '.'));
        if (!isNaN(numericValue)) {
            onSave(numericValue);
        }
        setValue('');
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Adicionar Saldo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Valor"
                        keyboardType="numeric"
                        value={value}
                        onChangeText={setValue}
                    />
                    <View style={styles.buttonRow}>
                        <Button title="Adicionar" onPress={handleAddBalance} />
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default AddBalanceModal;
