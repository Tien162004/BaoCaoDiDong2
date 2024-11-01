import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../App';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetailScreen'>;

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { product } = route.params;
  const navigation = useNavigation();
  
  const [quantity, setQuantity] = useState(1);
  const [isPurchased, setIsPurchased] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from AsyncStorage when the component mounts
    const loadCartItems = async () => {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    };

    loadCartItems();
  }, []);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handlePurchase = async () => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Save updated cart
    } else {
      const newItem = { ...product, quantity };
      const updatedCartItems = [...cartItems, newItem];
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Save new cart
    }
    
    setIsPurchased(true);
    Alert.alert('Success', 'Sản phẩm đã được thêm vào giỏ hàng!');
  };

  const handleRemoveFromCart = async () => {
    const updatedCartItems = cartItems.filter(item => item.id !== product.id);
    setCartItems(updatedCartItems);
    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Save updated cart
    Alert.alert('Success', 'Sản phẩm đã được xóa khỏi giỏ hàng!');
  };

  const handleCart = () => {
    navigation.navigate('CartScreen', { cartItems }); 
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>${(product.price * quantity).toFixed(2)}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handlePurchase}
        style={[styles.purchaseButton, isPurchased && styles.purchasedButton]}
      >
        <Text style={styles.purchaseButtonText}>{isPurchased ? 'Đã mua' : 'Mua hàng'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRemoveFromCart} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Xóa khỏi giỏ hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCart} style={styles.cartButton}>
        <Text style={styles.cartButtonText}>Giỏ hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20, // Added margin for better spacing
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  purchaseButton: {
    backgroundColor: '#0cd6a8', 
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchasedButton: {
    backgroundColor: '#007700',
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:40,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
