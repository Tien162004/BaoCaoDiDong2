import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [cartItems, setCartItems] = useState(Array.isArray(route.params?.cartItems) ? route.params.cartItems : []);
  const [quantities, setQuantities] = useState(cartItems.map(item => item.quantity || 1));
  const [selectedItems, setSelectedItems] = useState(new Array(cartItems.length).fill(false));

  if (!cartItems.length) {
    return <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>;
  }

  const handleQuantityChange = (index, change) => {
    const newQuantities = [...quantities];
    const newQuantity = Math.max(1, newQuantities[index] + change);
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);
  };

  const toggleSelectItem = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
  };

  const handleRemoveFromCart = async (item) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    Alert.alert('Success', 'Sản phẩm đã được xóa khỏi giỏ hàng!');
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.cartItem}>
      <TouchableOpacity onPress={() => toggleSelectItem(index)} style={styles.checkboxContainer}>
        <Text style={[styles.checkbox, selectedItems[index] ? styles.checkboxSelected : null]}>
          {selectedItems[index] ? '☑️' : '☐'}
        </Text>
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} resizeMode="contain" />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle}>{item.title}</Text>
        <Text style={styles.cartItemPrice}>${(item.price * quantities[index]).toFixed(2)}</Text>
        <Text style={styles.cartItemQuantity}>Số lượng: {quantities[index]}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleQuantityChange(index, -1)} style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantities[index]}</Text>
            <TouchableOpacity onPress={() => handleQuantityChange(index, 1)} style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleRemoveFromCart(item)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item, index) => {
      if (selectedItems[index]) {
        return total + (item.price * quantities[index]);
      }
      return total;
    }, 0);
  };

  const toggleSelectAll = () => {
    const allSelected = selectedItems.every(item => item);
    const updatedSelectedItems = allSelected ? new Array(cartItems.length).fill(false) : new Array(cartItems.length).fill(true);
    setSelectedItems(updatedSelectedItems);
  };

  const handleCheckout = () => {
    const selectedCartItems = cartItems.filter((_, index) => selectedItems[index]);
    const selectedQuantities = quantities.filter((_, index) => selectedItems[index]);

    if (selectedCartItems.length === 0) {
      Alert.alert('Chưa chọn sản phẩm nào để thanh toán!');
      return;
    }
    navigation.navigate('CheckoutScreen', { cartItems: selectedCartItems, quantities: selectedQuantities });
  };

  const calculateTotalQuantity = () => {
    return quantities.reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng ({calculateTotalQuantity()} sản phẩm)</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
      />

      <View style={styles.totalContainer}>
        <TouchableOpacity onPress={toggleSelectAll} style={styles.selectAllButton}>
          <Text style={styles.selectAllCircle}>{selectedItems.every(item => item) ? '◉' : '⭘'}</Text>
          <Text style={styles.selectAllButtonText}>Chọn tất cả</Text>
        </TouchableOpacity>

        <Text style={styles.totalText}>Tổng tiền: ${calculateTotalPrice().toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  cartItem: {
    marginBottom: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',  
  },
  cartItemImage: {
    width: 50,
    height: 50, 
    marginRight: 16,
  },
  cartItemDetails: {
    flex: 1, 
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#333',
  },
  cartItemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  checkbox: {
    fontSize: 20,
    marginRight: 8,
  },
  checkboxSelected: {
    color: '#0cd6a8',
  },
  removeButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 3,
    paddingHorizontal: 15, 
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#FF0000', 
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 15, 
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  checkoutButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectAllButton: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  selectAllCircle: {
    fontSize: 24,
    marginRight: 8, 
  },
  selectAllButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});

export default CartScreen;
