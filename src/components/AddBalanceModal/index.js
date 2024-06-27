import React, { useState } from 'react';
import { Modal, View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const AddBalanceModal = ({ visible, onClose, onSave }) => {
    const [value, setValue] = useState('');

    const handleAddBalance = () => {
        const maskedValue = value.replace('R$', '').replace(/\s/g, '').replace('.', '').replace(',', '.');
        const numericValue = parseFloat(maskedValue);
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
                    <TextInputMask
                        style={styles.input}
                        type={'money'}
                        placeholder="Valor"
                        value={value}
                        onChangeText={setValue}
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={onClose} style={styles.button}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleAddBalance} style={styles.button}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Adicionar</Text>
                        </TouchableOpacity>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 20,
    },
});

export default AddBalanceModal;
