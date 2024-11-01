import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GreenCheckmark from '../app/GreenCheckmark';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';


const OrderSuccessScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { cartItems, quantities, totalPayment } = route.params; 

  useEffect(() => {
    setLoading(false); // Không cần fetch sản phẩm từ API vì đã có thông tin trong params
  }, []);

  const handleGoToHome = () => {
    navigation.navigate('index');
  };

  const truncate = (str, max) => {
    return str.length > max ? str.slice(0, max) + '...' : str;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#008CBA" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
      <View style={styles.iconContainer}>
        <GreenCheckmark />
      </View>
      <Text style={styles.title}>Mua hàng thành công!</Text>
      <Text style={styles.transactionCode}>Mã giao dịch: FD12456</Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Tên sản phẩm</Text>
          <Text style={styles.headerText}>Số lượng</Text>
          <Text style={styles.headerText}>Thành tiền</Text>
        </View>

        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.productName}>{truncate(item.title || 'Tên sản phẩm không xác định', 20)}</Text>
              <Text style={styles.quantity}>x {quantities[index]}</Text>
              <Text style={styles.price}>{(item.price * quantities[index]).toLocaleString()}$</Text>
            </View>
          ))
        ) : (
          <Text style={styles.message}>Không có thông tin sản phẩm.</Text>
        )}
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
          <Text style={styles.totalAmount}>{totalPayment.toLocaleString()}$</Text>
        </View>
      </View>

      <Text style={styles.message}>Chúng tôi sẽ liên hệ với bạn ngay sau khi nhận được đơn đặt hàng này.</Text>
      <Text style={styles.hotline}>Mọi thắc mắc xin vui lòng liên hệ hotline: 0975 754 874</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleGoToHome}>
          <Icon name="home-outline" size={20} color="#008CBA" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Trở về trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('index')}>
          <Text style={styles.secondaryButtonText}>Mua thêm sản phẩm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4CAF50',
  },
  transactionCode: {
    fontSize: 16,
    marginBottom: 16,
  },
  tableContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    fontSize:15,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  productName: {
    flex: 3,
  },
  quantity: {
    flex: 1,
    textAlign: 'center',
  },
  price: {
    flex: 1,
    color: 'red',
    fontSize: 15,
    textAlign: 'right',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  hotline: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontWeight: 'bold',
    flex: 3,
    fontSize: 18,
  },
  totalAmount: {
    flex: 1,
    color: 'red',
    textAlign: 'right',
    fontSize: 19,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginRight: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#008CBA',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFD700',
    borderRadius: 20,
    padding: 12,
    marginLeft: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 5,
  },
  secondaryButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#008CBA',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderSuccessScreen;
