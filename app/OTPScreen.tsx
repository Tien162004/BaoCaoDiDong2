import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function OTPScreen() {
  const route = useRoute(); // Lấy đối tượng route từ React Navigation
  const { phoneNumber } = route.params; // Truy cập params từ route
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();

  // Hiển thị thông báo OTP đã gửi
  const showOtpSentAlert = () => {
    Alert.alert('Thông báo', `Mã OTP đã được gửi đến số điện thoại: ${phoneNumber}`);
  };

  const handleVerifyOtp = () => {
    const fakeOtp = '1606'; // OTP giả lập

    if (otp === fakeOtp) {
      Alert.alert('Success', 'Xác minh OTP thành công!');
      navigation.navigate('index');
    } else {
      Alert.alert('Error', 'Mã OTP không đúng!');
    }
  };

  // Gọi hàm hiển thị thông báo khi component được render
  useEffect(() => {
    showOtpSentAlert();
  }, []);

  // Hàm xử lý gửi lại mã OTP
  const handleResendOtp = () => {
    setOtp(''); // Xóa nội dung của ô nhập
    showOtpSentAlert(); // Hiển thị lại thông báo đã gửi OTP
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Nhập mã OTP</Text>
        <Text style={styles.instructions}>Mã OTP đã được gửi đến số {phoneNumber}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mã OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />
        {/* Nút Gửi mã OTP */}
        <TouchableOpacity onPress={handleResendOtp} style={styles.resendButton}>
          <Text style={styles.resendText}>Gửi lại mã OTP?</Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
          <Text style={styles.verifyButtonText}>Xác minh OTP</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Để đảm bảo nội dung có thể cuộn được khi cần
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Căn giữa các thành phần
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
    width: '80%',
    backgroundColor: '#fff',
  },
  verifyButton: {
    backgroundColor: '#0cd6a8',
    borderRadius: 6,
    paddingVertical: 15,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendButton: {
    alignSelf: 'flex-end',
    marginVertical: 10,
    marginLeft: 90,
  },
  resendText: {
    color: '#0cd6a8',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 30,
  },
});
