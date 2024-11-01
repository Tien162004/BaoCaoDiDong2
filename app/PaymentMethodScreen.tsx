import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg'; // Thêm thư viện QR code

const PaymentMethodScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { totalPayment } = route.params;

  const [showQRCode, setShowQRCode] = useState(false);

  const handlePaymentMethodSelect = (method) => {
    if (method === 'VNPAY_QR') {
      setShowQRCode(true); // Hiển thị mã QR khi chọn VNPAY_QR
    } else {
      Alert.alert(`Bạn đã chọn phương thức thanh toán: ${method}`);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phương thức Thanh toán</Text>

      <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentMethodSelect('Tiền mặt')}>
        <Icon name="attach-money" size={24} color="white" style={styles.icon} />
        <Text style={styles.paymentText}>Tiền mặt</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentMethodSelect('Thanh toán khi nhận hàng')}>
        <Icon name="payment" size={24} color="white" style={styles.icon} />
        <Text style={styles.paymentText}>Thanh toán khi nhận hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentMethodSelect('Thẻ Visa')}>
        <Icon name="credit-card" size={24} color="white" style={styles.icon} />
        <Text style={styles.paymentText}>Thẻ Visa, Master, JCB</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentMethodSelect('Ví Momo')}>
        <Icon name="monetization-on" size={24} color="white" style={styles.icon} />
        <Text style={styles.paymentText}>Ví Momo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentMethodSelect('VNPAY_QR')}>
        <Icon name="qr-code" size={24} color="white" style={styles.icon} />
        <Text style={styles.paymentText}>VNPAY_QR</Text>
      </TouchableOpacity>

      {/* Hiển thị tổng thanh toán */}
      <TouchableOpacity style={styles.checkoutButton} onPress={() => alert(`Thanh toán: $${totalPayment.toFixed(2)}`)}>
        <Text style={styles.checkoutButtonText}>Thanh toán: ${totalPayment.toFixed(2)}</Text>
      </TouchableOpacity>

      {/* Modal để hiển thị mã QR */}
      <Modal visible={showQRCode} transparent={true} animationType="slide">
        <View style={styles.qrModal}>
          <View style={styles.qrContainer}>
            <Text style={styles.qrTitle}>Quét mã để thanh toán</Text>
            <QRCode
              value={`VNPAY:${totalPayment}`} // Dữ liệu QR (có thể tùy chỉnh)
              size={200}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowQRCode(false)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    textAlign: 'center',
  },
  paymentOption: {
    backgroundColor: '#0cd6a8',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  paymentText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  qrModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  qrContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  qrTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF0000',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PaymentMethodScreen;
