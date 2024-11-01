import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const CheckoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); 
  const { cartItems = [], quantities = [] } = route.params || {}; 

  // Tính tổng số lượng sản phẩm
  const totalQuantity = quantities.reduce((total, quantity) => total + quantity, 0);

  const totalPrice = cartItems.reduce((total, item, index) => total + item.price * quantities[index], 0);
  const shippingCost = 23;
  const discount = 10;
  const totalPayment = totalPrice + shippingCost - discount;

  const [message, setMessage] = useState('');

  const handlePaymentMethodPress = () => {
    navigation.navigate('PaymentMethodScreen', { totalPayment });
  };

  const handleOrderSuccess = () => {
    Alert.alert(
      "Đặt hàng thành công",
      "Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn sẽ được xử lý ngay.",
      [{ text: "OK", onPress: () => navigation.navigate('OrderSuccessScreen', { cartItems, quantities, totalPayment }) }]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thanh toán</Text>
      <View style={styles.messageContainer}>
        <Text style={styles.messageLabel1}>Võ Thị Kiều Tiên (+84)26*****40</Text>
      </View>
      <Text style={styles.messageLite1}>103 Tăng Nhơn Phú , Phước Long B, Quận 9, Tp.Hồ Chí Minh</Text>
      
      <View style={styles.productListContainer}>
        {cartItems.length === 0 ? (
          <Text>Giỏ hàng trống</Text>
        ) : (
          <FlatList
            data={cartItems}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemQuantity}>Số lượng: {quantities[index]}</Text>
                  <Text style={styles.itemPrice}>${(item.price * quantities[index]).toFixed(2)}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
          />
        )}
      </View>

      <Text style={styles.shippingTitle}>Đơn vị vận chuyển</Text>
      <View style={styles.shippingContainer}>
        <Text style={styles.shippingFast}>Giao hàng nhanh</Text>
        <View style={styles.shippingRow}>
          <Text style={styles.shippingText}>Giao hàng trong 2-4 giờ</Text>
          <Text style={styles.shippingCost}>${shippingCost.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.messageLabel}>Tin nhắn:</Text>
        <TextInput
          style={styles.messageInput}
          placeholder="Để lại lời nhắn cho người gửi..."
          value={message}
          onChangeText={setMessage} 
          multiline
        />
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryh2}>Tổng số tiền ({totalQuantity} sản phẩm):</Text>
        <Text style={styles.summaryAmountBold}>${totalPayment.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.paymentMethodButton} onPress={handlePaymentMethodPress}>
        <Text style={styles.paymentMethodText}>Phương thức Thanh toán </Text>
      </TouchableOpacity>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTitle}>Tổng tiền hàng:</Text>
          <Text style={styles.summaryAmountLight}>${totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTitle}>Tổng phí vận chuyển:</Text>
          <Text style={styles.summaryAmountLight}>${shippingCost.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTitle}>Giảm giá phí vận chuyển:</Text>
          <Text style={styles.summaryAmountLight}>-${discount.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryh1}>Tổng thanh toán:</Text>
          <Text style={styles.summaryAmountBold}>${totalPayment.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.orderButton} 
        onPress={handleOrderSuccess}
      >
        <Text style={styles.orderButtonText}>Đặt hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    marginBottom: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  flatList: {
    maxHeight: 300, // Đặt chiều cao tối đa cho danh sách sản phẩm
  },
  shippingContainer: {
    marginVertical: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  shippingFast: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0cd6a8',
  },
  shippingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  shippingText: {
    fontSize: 14,
    color: '#999',
  },
  shippingCost: {
    fontSize: 20,
    color: '#333',
  },
  shippingTitle: {
    fontSize: 18,
    color: '#0cd6a8',
  },
  messageContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  messageLabel: {
    fontSize: 20,
    marginVertical: 8,
  },
  messageLite: {
    fontSize: 20,
    marginVertical: 8,
    color: '#999',
  },
  summaryContainer: {
    marginVertical: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryTitle: {
    fontSize: 20,
    color: '#808080',
  },
  summaryh1: {
    fontSize: 30,
  },
  summaryh2: {
    fontSize: 20,
  },
  summaryAmountLight: {
    fontSize: 20,
    color: '#999',
  },
  summaryAmountBold: {
    fontSize: 25,
    color: 'red',
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentMethodButton: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 12,
    borderRadius: 60,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentMethodText: {
    color: '#000000',
    fontSize: 18,
  },
  messageLabel1: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  messageLite1: {
    fontSize: 19,
    margin: 0,
    marginBottom: 20,
  },
  messageInput: {
    borderColor: '#ccc',
    color: '#999',
    padding: 10,
    fontSize: 16,
    flex: 1,
  },
});

export default CheckoutScreen;
