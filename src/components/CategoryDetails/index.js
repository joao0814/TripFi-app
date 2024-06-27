import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Movements from '../../components/Movements';

const CategoryDetails = ({ category, movements, onClose }) => {
    const [selectedMovement, setSelectedMovement] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const handleSelectMovement = (movementId) => {
        if (!isDeleteModalVisible) {
            setSelectedMovement(movementId);
        }
    };

    const handleConfirmDelete = () => {
        // Implemente a lógica para excluir o item selecionado da categoria
        setIsDeleteModalVisible(false);
        setSelectedMovement(null); // Limpa o estado do item selecionado após a exclusão
    };

    // Filtra os movimentos pertencentes à categoria selecionada
    const categoryMovements = movements.filter((movement) => movement.categoryId === category.id);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{category.name}</Text>
            <FlatList
                data={categoryMovements}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectMovement(item.id)}>
                        <View style={styles.itemContainer}>
                            <Movements item={item} />
                        </View>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Text style={styles.buttonText}>Fechar</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for confirming delete */}
            <Modal visible={isDeleteModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.deleteModal}>
                        <Text style={styles.deleteModalText}>Selecione o item a ser excluído:</Text>
                        <FlatList
                            data={categoryMovements}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelectMovement(item.id)}>
                                    <View style={styles.itemContainer}>
                                        <Text>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        <View style={styles.deleteModalButtons}>
                            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleConfirmDelete}>
                                <Text style={styles.buttonText}>Confirmar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={() => setIsDeleteModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '45%',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f2f2f2',
        borderColor: '#bbbbbb',
        borderStyle: 'solid',
        borderWidth: 2, // Adicione esta linha para definir a largura da borda
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        padding: 10,
        backgroundColor: 'rgb(37, 53, 78)',
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    deleteModal: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    deleteModalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    deleteModalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    closeButton: {
        backgroundColor: '#1e90ff',
    },
});

export default CategoryDetails;