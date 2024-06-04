import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import Movements from '../../components/Movements';
import Balance from '../../components/Balance';
import CategoryModal from '../../components/CategoryModal';
import Button from '../../components/Button';
import CategoryItem from '../../components/CategoryItem';
import AddExpenseModal from '../../components/AddExpenseModal';
import EditExpenseModal from '../../components/EditExpenseModal';
import AddBalanceModal from '../../components/AddBalanceModal';
import EditCategoryModal from '../../components/EditCategoryModal';
import CategoryDetails from '../../components/CategoryDetails';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddExpenseModalVisible, setIsAddExpenseModalVisible] = useState(false);
  const [isAddBalanceModalVisible, setIsAddBalanceModalVisible] = useState(false);
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] = useState(false);
  const [isCategoryDetailsVisible, setIsCategoryDetailsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [movements, setMovements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [balance, setBalance] = useState(0); // Inicializando o saldo como zero

  // Função para calcular o total das despesas
  const totalExpenses = movements.reduce((total, movement) => {
    if (movement.type === 0) { // Despesa
      const value = parseFloat(movement.value.replace('R$', '').replace(/\./g, '').replace(',', '.'));
      if (!isNaN(value)) {
        return total + value;
      }
    }
    return total;
  }, 0);

  // Função para calcular o saldo
  const updatedBalance = balance - totalExpenses;

  const handleOpenModal = () => {
    setSelectedCategory(null);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCreateCategory = (newCategory) => {
    if (selectedCategory) {
      const updatedCategories = categories.map((category) =>
        category.id === newCategory.id ? newCategory : category
      );
      setCategories(updatedCategories);
    } else {
      setCategories([...categories, newCategory]);
    }
    handleCloseModal();
  };

  const handleOpenEditModal = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const handleOpenEditCategoryModal = (category) => {
    setSelectedCategory(category);
    setIsEditCategoryModalVisible(true);
  };

  const handleCloseEditCategoryModal = () => {
    setIsEditCategoryModalVisible(false);
  };

  const handleSaveCategory = (updatedCategory) => {
    const updatedCategories = categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
    setCategories(updatedCategories);
    handleCloseEditCategoryModal();
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategories(updatedCategories);
    // Também exclua os movimentos associados a esta categoria, se necessário
    const updatedMovements = movements.filter((movement) => movement.categoryId !== categoryId);
    setMovements(updatedMovements);
    handleCloseEditCategoryModal();
  };

  const handleOpenAddExpenseModal = () => {
    setIsAddExpenseModalVisible(true);
  };

  const handleCloseAddExpenseModal = () => {
    setIsAddExpenseModalVisible(false);
  };

  const handleAddExpense = (expense) => {
    setMovements((prevMovements) => [
      ...prevMovements,
      { ...expense, id: prevMovements.length + 1, type: 0, categoryId: expense.categoryId },
    ]);
    handleCloseAddExpenseModal();
  };

  const handleOpenEditExpenseModal = (expense) => {
    setSelectedExpense(expense);
    setIsEditModalVisible(true);
  };

  const handleCloseEditExpenseModal = () => {
    setIsEditModalVisible(false);
  };

  const handleSaveExpense = (updatedExpense) => {
    const updatedMovements = movements.map((movement) =>
      movement.id === updatedExpense.id ? updatedExpense : movement
    );
    setMovements(updatedMovements);
    handleCloseEditExpenseModal();
  };

  const handleDeleteExpense = (expenseId) => {
    const updatedMovements = movements.filter((movement) => movement.id !== expenseId);
    setMovements(updatedMovements);
    handleCloseEditExpenseModal();
  };

  const handleOpenAddBalanceModal = () => {
    setIsAddBalanceModalVisible(true);
  };

  const handleCloseAddBalanceModal = () => {
    setIsAddBalanceModalVisible(false);
  };

  const handleAddBalance = (newBalance) => {
    setBalance((prevBalance) => prevBalance + newBalance);
    handleCloseAddBalanceModal();
  };

  const handleOpenCategoryDetails = (category) => {
    setSelectedCategory(category);
    setIsCategoryDetailsVisible(true);
  };

  const handleCloseCategoryDetails = () => {
    setIsCategoryDetailsVisible(false);
  };

  const recentMovements = movements.slice(-4);

  return (
    <View style={styles.container}>
      <Header name="João" />
      <Balance saldo={updatedBalance.toFixed(2).replace('.', ',')} gastos={totalExpenses.toFixed(2).replace('.', ',')} />

      <View style={styles.buttons}>
        <Button title="+ Saldo" onPress={handleOpenAddBalanceModal} iconName="dollar" />
        <Button title="+ Categoria" onPress={handleOpenModal} iconName="list" />
        <Button title="+ Despesa" onPress={handleOpenAddExpenseModal} iconName="shopping-cart" />
        <CategoryModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          onCreate={handleCreateCategory}
          initialCategory={selectedCategory}
        />
        <AddExpenseModal
          visible={isAddExpenseModalVisible}
          onClose={handleCloseAddExpenseModal}
          onCreate={handleAddExpense}
          categories={categories}
        />
        <EditExpenseModal
          visible={isEditModalVisible}
          onClose={handleCloseEditExpenseModal}
          onSave={handleSaveExpense}
          onDelete={handleDeleteExpense}
          expense={selectedExpense}
          categories={categories}
        />
        <AddBalanceModal
          visible={isAddBalanceModalVisible}
          onClose={handleCloseAddBalanceModal}
          onSave={handleAddBalance}
        />
        <EditCategoryModal
          visible={isEditCategoryModalVisible}
          onClose={handleCloseEditCategoryModal}
          category={selectedCategory}
          onSave={handleSaveCategory}
          onDelete={handleDeleteCategory}
        />
      </View>

      {isCategoryDetailsVisible ? (
        <CategoryDetails
          category={selectedCategory}
          movements={movements}
          onClose={handleCloseCategoryDetails}
        />
      ) : (
        <>
          <Text style={styles.title}>Categorias</Text>
          <FlatList
            style={styles.list}
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CategoryItem
                category={item}
                onSelect={handleOpenCategoryDetails}
              />
            )}
          />

          <Text style={styles.title}>Suas últimas movimentações</Text>
          <FlatList
            style={styles.list}
            data={recentMovements}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Movements item={item} onPress={() => handleOpenEditExpenseModal(item)} />
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e293b',
    marginTop: 32,
    marginStart: 14,
  },
  list: {
    paddingHorizontal: 14,
  },
});

export default Home;
