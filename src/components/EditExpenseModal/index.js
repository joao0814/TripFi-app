import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const EditExpenseModal = ({ visible, onClose, onSave, onDelete, expense, categories }) => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

    useEffect(() => {
        if (expense) {
            setTitle(expense.title);
            setValue(expense.value);
            setDate(expense.date);
            setSelectedCategory(expense.category);
        }
    }, [expense]);

    const handleSave = () => {
        const updatedExpense = {
            ...expense,
            title,
            value,
            date,
            category: selectedCategory,
        };
        onSave(updatedExpense);
    };

    const handleDelete = () => {
        onDelete(expense.id);
    };

    const handleOpenCategoryModal = () => {
        setIsCategoryModalVisible(true);
    };

    const handleCloseCategoryModal = () => {
        setIsCategoryModalVisible(false);
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        handleCloseCategoryModal();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                <Text style={styles.title}>Editar Despesa</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Título"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Valor"
                    value={value}
                    onChangeText={setValue}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Data"
                    value={date}
                    onChangeText={setDate}
                />
                <TouchableOpacity onPress={handleOpenCategoryModal} style={styles.input}>
                    <Text>{selectedCategory ? selectedCategory.name : "Selecione uma Categoria"}</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <Button title="Cancelar" onPress={onClose} />
                    <Button title="Salvar" onPress={handleSave} />
                    <Button title="Apagar" onPress={handleDelete} color="red" />
                </View>
            </View>
            <Modal
                visible={isCategoryModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={handleCloseCategoryModal}
            >
                <View style={styles.categoryModalView}>
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectCategory(item)}>
                                <Text style={styles.categoryItem}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <Button title="Fechar" onPress={handleCloseCategoryModal} />
                </View>
            </Modal>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    categoryModalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        width: 250,
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
    },
    categoryItem: {
        padding: 10,
        fontSize: 16,
    },
});

export default EditExpenseModal;
