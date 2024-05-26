import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const BalanceModal = ({
    visible,
    onClose,
    onSave,
    balances,
    onEdit,
    onDelete,
}) => {
    const [balanceName, setBalanceName] = useState("");
    const [balanceValue, setBalanceValue] = useState("");
    const [selectedBalance, setSelectedBalance] = useState(null);

    useEffect(() => {
        if (selectedBalance) {
            setBalanceName(selectedBalance.name);
            setBalanceValue(selectedBalance.value.toString());
        } else {
            setBalanceName("");
            setBalanceValue("");
        }
    }, [selectedBalance]);

    const handleSave = () => {
        if (balanceName.trim() && balanceValue.trim()) {
            const newBalance = {
                id: selectedBalance ? selectedBalance.id : Date.now(),
                name: balanceName,
                value: parseFloat(balanceValue),
            };
            onSave(newBalance);
            setBalanceName("");
            setBalanceValue("");
            setSelectedBalance(null);
        }
    };

    const handleEdit = (balance) => {
        setSelectedBalance(balance);
    };

    const handleDelete = (balanceId) => {
        onDelete(balanceId);
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Gerenciar Saldo</Text>
                    <TextInput
                        style={styles.input}
                        value={balanceName}
                        onChangeText={setBalanceName}
                        placeholder="Digite o nome do saldo"
                    />
                    <TextInput
                        style={styles.input}
                        value={balanceValue}
                        onChangeText={setBalanceValue}
                        placeholder="Digite o valor do saldo"
                        keyboardType="numeric"
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Salvar" onPress={handleSave} />
                        <Button title="Cancelar" onPress={onClose} />
                    </View>
                    <FlatList
                        data={balances}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.balanceItem}>
                                <Text>
                                    {item.name}: {item.value}
                                </Text>
                                <View style={styles.balanceActions}>
                                    <TouchableOpacity onPress={() => handleEdit(item)}>
                                        <Text style={styles.editButton}>Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                        <Text style={styles.deleteButton}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        color: "#000",
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 20,
        backgroundColor: "#fff",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    balanceItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    balanceActions: {
        flexDirection: "row",
    },
    editButton: {
        marginRight: 10,
        color: "blue",
    },
    deleteButton: {
        color: "red",
    },
});

export default BalanceModal;