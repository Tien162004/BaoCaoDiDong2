import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import * as Linking from 'expo-linking';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function REGISTERScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    // Navigate to the index screen after successful registration
    Alert.alert('Success', 'Registration successful!', [
      { text: 'OK', onPress: () => navigation.navigate('index') },
    ]);
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

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.jpg')} // Correct reference for the logo
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

      <Text style={styles.orText}>or use your email</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <View style={styles.row}>
        <TouchableOpacity onPress={toggleRememberMe} style={styles.rememberMeContainer}>
          <View style={[styles.checkbox, rememberMe && styles.checked]}>
            {rememberMe && <Text style={styles.checkmark}>✔</Text>}
          </View>
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('user')}>
          <Text>Have an Account? <Text style={styles.loginLinkText}>Login Here</Text></Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
        <Text style={styles.signUpText}>REGISTER</Text>
      </TouchableOpacity>

      <View style={styles.termsContainer}>
        <TouchableOpacity>
          <Text style={styles.termsText}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> | </Text>
        <TouchableOpacity>
          <Text style={styles.termsText}>Terms & Condition</Text>
        </TouchableOpacity>
      </View>
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
  loginLinkText: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#0cd6a8',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 80,
    marginVertical: 20,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
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
});
