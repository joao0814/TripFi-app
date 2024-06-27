import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const EditExpenseModal = ({ visible, onClose, onSave, onDelete, expense, categories }) => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (expense) {
            setTitle(expense.title);
            setValue(expense.value);
            setDate(expense.date);
            setSelectedCategory(expense.category);
        }
    }, [expense]);

    const handleSaveExpense = () => {
        onSave({ ...expense, title, value, date, category: selectedCategory });
        onClose();
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
                    <Text style={styles.title}>Editar Despesa</Text>
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
                        <TouchableOpacity onPress={() => onDelete(expense.id)} style={styles.button}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Deletar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSaveExpense} style={styles.button}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Salvar</Text>
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
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: '#dddddd',
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
        borderColor: 'rgb(37, 53, 78)',
        borderWidth: 3, // Define a largura da borda
        borderRadius: 8,
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

export default EditExpenseModal;
