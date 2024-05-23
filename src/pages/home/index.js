import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import Movements from '../../components/Movements';
import Balance from '../../components/Balance';
import CategoryModal from '../../components/CategoryModal';
import CustomButton from '../../components/Button';

const list = [
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
  const [categories, setCategories] = useState([]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCreateCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    handleCloseModal();
  };

  return (
    <View style={styles.container}>
      <Header name="João" />
      <Balance saldo="15.820.52" gastos="- 250" />

      <CustomButton title="Criar Categoria" onPress={handleOpenModal} />

      <CategoryModal visible={isModalVisible} onClose={handleCloseModal} onCreate={handleCreateCategory} />

      <Text style={styles.title}>Categorias</Text>
      <FlatList
        style={styles.list}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Suas últimas movimentações</Text>
      <FlatList
        style={styles.list}
        data={list}
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
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Home;
