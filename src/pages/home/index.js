import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import Movements from '../../components/Movements';
import Balance from '../../components/Balance';
import CategoryModal from '../../components/CategoryModal';
import CustomButton from '../../components/Button';
import CategoryItem from '../../components/CategoryItem';

const initialMovements = [
  {
    id: 1,
    title: 'Hotel Rio Branco',
    value: 'R$ 850,00',
    date: '10/09/2021',
    type: 0 // despesa
  },
  {
    id: 2,
    title: 'Restaurante São José',
    value: 'R$ 1.800,00',
    date: '10/09/2021',
    type: 0 // despesa
  },
  {
    id: 3,
    title: 'Taxi',
    value: 'R$ 100,00',
    date: '10/09/2021',
    type: 0 // despesa
  },
];

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [movements, setMovements] = useState(initialMovements);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenModal = () => {
    setSelectedCategory(null);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCreateCategory = (newCategory) => {
    if (selectedCategory) {
      // Editing existing category
      const updatedCategories = categories.map((category) =>
        category.id === newCategory.id ? newCategory : category
      );
      setCategories(updatedCategories);
    } else {
      // Creating new category
      setCategories([...categories, newCategory]);
    }
    handleCloseModal();
  };

  const handleOpenEditModal = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter((category) => category.id !== categoryId);
    setCategories(updatedCategories);
  };

  return (
    <View style={styles.container}>
      <Header name="João" />
      <Balance saldo="15.820,52" gastos="- 250" />

      <CustomButton title="Criar Categoria" onPress={handleOpenModal} />
      <CategoryModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onCreate={handleCreateCategory}
        initialCategory={selectedCategory}
      />

      <Text style={styles.title}>Categorias</Text>
      <FlatList
        style={styles.list}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteCategory}
          />
        )}
      />

      <Text style={styles.title}>Suas últimas movimentações</Text>
      <FlatList
        style={styles.list}
        data={movements}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Movements item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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