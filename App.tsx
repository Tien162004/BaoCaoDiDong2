import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/(tabs)/index'; 
import ProductDetailScreen from './app/ProductDetailScreen';
import LoginScreen from './app/(tabs)/user'; 
import RegisterScreen from './app/register'; 
import CartScreen from './app/CartScreen';
import CheckoutScreen from './app/CheckoutScreen';
import PaymentMethodScreen from './app/PaymentMethodScreen';
import CategoryProductsScreen from './app/CategoryProductsScreen';
import { CartProvider } from './app/CartContext';
import OrderSuccessScreen from './app/OrderSuccessScreen';

export type RootStackParamList = {
  Home: undefined;
  CategoryProductsScreen: { products: any[] };
  ProductDetailScreen: { product: any };
  CartScreen: { cartItems: any[] }; 
  OTPScreen: { phoneNumber: string };
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
  <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen}/>
        <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
        <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />
        <Stack.Screen name="CategoryProductsScreen" component={CategoryProductsScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </CartProvider>
  );
}

export default App;
