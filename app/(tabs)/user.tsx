import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import * as Linking from 'expo-linking';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    console.log("Username:", trimmedUsername);
    console.log("Password:", trimmedPassword);

    if (trimmedUsername === '0326115340' && trimmedPassword === '1') {
      setModalVisible(true);
      navigation.navigate('OTPScreen', { phoneNumber: trimmedUsername });
    } else {
      Alert.alert('Error', 'Mật khẩu không đúng!');
    }
  };

  const handleRegister = () => {
    navigation.navigate('register'); 
  };

  const handleFacebook = () => {
    Linking.openURL('https://www.facebook.com');
  };

  const handleInstagram = () => {
    Linking.openURL('https://www.instagram.com'); 
  };

  const handleTwitter = () => {
    Linking.openURL('https://www.twitter.com'); 
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/lalabu.webp')} // Correctly reference the image
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={handleFacebook} style={styles.iconButton}>
          <Icon name="facebook" size={30} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInstagram} style={styles.iconButton}>
          <Icon name="instagram" size={30} color="#C13584" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTwitter} style={styles.iconButton}>
          <Icon name="twitter" size={30} color="#1DA1F2" />
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>or use your phone number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={username}
        onChangeText={setUsername}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.row}>
        <TouchableOpacity onPress={toggleRememberMe} style={styles.rememberMeContainer}>
          <View style={[styles.checkbox, rememberMe && styles.checked]}>
            {rememberMe && <Text style={styles.checkmark}>✔</Text>}
          </View>
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: '80%', marginVertical: 5 }}>
        <TouchableOpacity style={styles.signUpButton} onPress={handleLogin}>
          <Text style={styles.signUpText}>LOGIN</Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: '80%', marginVertical: 5 }}>
        <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
          <Text style={styles.signUpText}>REGISTER</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity>
          <Text style={styles.termsText}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> | </Text>
        <TouchableOpacity>
          <Text style={styles.termsText}>Terms & Condition</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for OTP Notification */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Thông báo</Text>
          <Text style={styles.modalMessage}>
            Mã OTP của bạn là: <Text style={styles.otpCode}>1606</Text>
          </Text>
          <Text style={styles.modalMessage}>
            Tuyệt đối KHÔNG chia sẻ mã xác thực {`(OTP)`} cho bất kỳ ai dưới bất kỳ hình thức nào. Mã xác thực có hiệu lực trong 5 phút.
          </Text>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150, 
    height: 150,
    marginBottom: 20, 
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconButton: {
    marginHorizontal: 10,
  },
  orText: {
    fontSize: 16,
    color: '#000',
    marginVertical: 10,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
    alignItems: 'center',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '80%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    backgroundColor: '#0000ff',
    borderColor: '#0000ff',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
  },
  rememberMeText: {
    color: '#333',
    fontSize: 12,
  },
  forgotPasswordText: {
    color: '#333',
    fontSize: 15,
  },
  signUpButton: {
    backgroundColor: '#0cd6a8',
    borderRadius: 6,
    paddingVertical: 15,
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  termsText: {
    color: '#333',
    fontSize: 12,
  },
  separator: {
    marginHorizontal: 8,
    color: '#333',
  },
  // Styles for Modal
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
  },
  otpCode: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#0cd6a8',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

