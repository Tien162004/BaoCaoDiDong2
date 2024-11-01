import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'; 
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

const CategoryProductsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'CategoryProductsScreen'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CategoryProductsScreen'>>();
  

  console.log('Route:', route);
  const { products } = route.params || {};


  if (!products) {
    return <Text>No products found.</Text>; // Hiển thị thông báo nếu không có sản phẩm
  }

  console.log(products);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').width / 2) - 24,
  },
  itemImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CategoryProductsScreen;
