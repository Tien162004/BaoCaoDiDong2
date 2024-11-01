import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Thêm trạng thái cho sản phẩm tìm kiếm
  const [categories, setCategories] = useState([]); 
  const [cartItems, setCartItems] = useState([]); 
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [sliderImages, setSliderImages] = useState([
    require('../../assets/images/anh2.webp'),
    require('../../assets/images/logo.webp'),
    require('../../assets/images/logo2.webp'),
    require('../../assets/images/logo1.jpg'),
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  
  const [searchTerm, setSearchTerm] = useState(''); // Thêm trạng thái cho từ khóa tìm kiếm

  const handleAddToCart = (item) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
};

useEffect(() => {
  if (cartItems.length > 0) {
      navigation.navigate('CartScreen', { cartItems });
  }
}, [cartItems]);


  const handleLogin = () => {
    Alert.alert('Success', 'Login successful!');
    navigation.navigate('user'); 
  };
  
  const handleRegister = () => {
    Alert.alert('Success', 'Login successful!');
    navigation.navigate('register'); 
  };
  
  const handleCategorySelect = async (category) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      navigation.navigate('CategoryProductsScreen', { products: json });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setData(json);
      setFilteredData(json); // Khởi tạo danh sách sản phẩm tìm kiếm
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setCategories(json);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: currentIndex * screenWidth, animated: true });
    }
  }, [currentIndex, screenWidth]);

  // Xử lý thay đổi từ khóa tìm kiếm
  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const filtered = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
      setFilteredData(filtered); // Cập nhật danh sách sản phẩm tìm kiếm
    } else {
      setFilteredData(data); // Nếu không có từ khóa, hiển thị tất cả sản phẩm
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}
    >
        <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
                handleAddToCart(item);
                // Không điều hướng ở đây
            }}
        >
            <Icon name="cart-plus" size={20} color="white" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
    </TouchableOpacity>
);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategorySelect(item)}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
              <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton} onPress={handleRegister}>
              <Text style={styles.authButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color="#888" style={styles.icon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChangeText={handleSearch} // Cập nhật từ khóa tìm kiếm
          />
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen', { cartItems })}>
            <Icon name="shopping-cart" size={24} color="#0cd6a8" style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* Image Slider */} 
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.sliderContainer}
          ref={scrollViewRef}
        >
          {sliderImages.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={[styles.sliderImage, { width: screenWidth, height: 200 }]}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Category List */}
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />
        
        {/* Product List */}
        <FlatList
          data={filteredData} // Sử dụng danh sách sản phẩm đã lọc
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop:30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  authButtons: {
    flexDirection: 'row',
  },
  authButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  authButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    marginBottom: 16, // Add margin to separate from the slider
  },
  searchBar: {
    flex: 1,
    height: 40,
    marginHorizontal: 8, // Space between icons and text input
  },
  icon: {
    marginHorizontal: 6, // Space between icons
  },
  sliderContainer: {
    flex: 1,
    marginBottom: 16,
    marginTop: 10, // Optional: add margin above the slider
  },
  sliderImage: {
    borderRadius: 8,
    marginRight: 0, // No margin between images for full width
  },

  categoryList: {
    marginBottom: 20, // Increase spacing between slider and category
    paddingHorizontal: 0, // Remove padding from the list
  },
 categoryButton: {
  paddingVertical: 10, // Tăng chiều cao để tạo không gian
  backgroundColor: '#007bff',
  borderRadius: 50,
  marginRight: 10,
  minWidth: 120, // Đặt chiều rộng tối thiểu
  alignItems: 'center', // Căn giữa theo chiều dọc
  justifyContent: 'center', // Căn giữa theo chiều ngang
},

categoryText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 14,
  textAlign: 'center', // Căn giữa chữ
},

  listContainer: {
    paddingHorizontal: 8,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').width / 2) - 24, // Chia đều màn hình cho 2 sản phẩm
  },
  itemImage: {
    width: '100%',
    height: 150, // Tăng chiều cao hình ảnh để cân đối với diện tích
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 14, // Tăng kích thước chữ để dễ đọc hơn
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
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 4,
  },
  addToCartText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 12,
  },
});

