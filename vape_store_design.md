# React Native Vape E-Commerce UI Design System & Component Library

This document provides a complete, copy-pasteable, mobile-responsive React Native UI architecture and screen components designed for a premium vape store based in Cairo, Egypt. 

The application uses standard React Native components (`View`, `Text`, `FlatList`, `TouchableOpacity`, `TextInput`, `ScrollView`, etc.) and basic React Navigation structures, rendering beautifully on both Android and iOS devices.

---

## 🎨 Theme & Design System

The brand identity uses a general, modern, high-contrast scheme using standard **Deep Indigo/Blue, Dark Gray, Matte Black, and Premium White** to evoke a sleek, high-end feel.

### `src/theme/theme.js`
```javascript
export const COLORS = {
  primary: '#0F4C81',        // Classic Deep Indigo Blue
  primaryLight: '#E8F0F8',   // Soft blue background tint
  accent: '#2F80ED',         // Electric Blue accent
  background: '#F9FAFC',     // Clean Off-White background
  cardBackground: '#FFFFFF', // Pristine White for cards
  textDark: '#1A1A1A',       // Matte Black for headings
  textMuted: '#666666',      // Slate Gray for descriptions and details
  border: '#E2E8F0',         // Soft border lines
  success: '#27AE60',        // Emerald Green (e.g. In Stock, Delivered)
  warning: '#F2994A',        // Amber Orange (e.g. Out for Delivery)
  danger: '#EB5757',         // Coral Red
  white: '#FFFFFF',
  black: '#000000',
};

export const TYPOGRAPHY = {
  h1: { fontSize: 24, fontWeight: '700', color: COLORS.textDark },
  h2: { fontSize: 20, fontWeight: '600', color: COLORS.textDark },
  subtitle: { fontSize: 16, fontWeight: '500', color: COLORS.textMuted },
  body: { fontSize: 14, color: COLORS.textDark, lineHeight: 20 },
  caption: { fontSize: 12, color: COLORS.textMuted },
  button: { fontSize: 16, fontWeight: '600', color: COLORS.white },
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3, // Android
  },
  medium: {
    shadowColor: '#0F4C81',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6, // Android
  },
};
```

---

## 🌐 Localization & Translation (English & Arabic RTL Support)

To provide seamless Arabic support, the app uses a custom translation hook and toggles text directions. In React Native, handling Right-to-Left (RTL) layout is done by switching layout settings and restarting the app environment, or using dynamic alignment flags based on language.

### `src/context/LocalizationContext.js`
```javascript
import React, { createContext, useState, useContext, useEffect } from 'react';
import { I18nManager } from 'react-native';

const translations = {
  en: {
    searchPlaceholder: "Search for vapes, e-liquids, pods...",
    deliveryTo: "Delivering to",
    cairoArea: "Cairo & Greater Cairo Area",
    categories: "Categories",
    featuredProducts: "Featured Products",
    bestSeller: "Best Seller",
    newArrival: "New",
    addToCart: "Add to Cart",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    nicotine: "Nicotine Level",
    flavor: "Flavor",
    specifications: "Specifications",
    battery: "Battery Capacity",
    capacity: "Liquid Capacity",
    resistance: "Resistance",
    reviews: "Reviews",
    cartTitle: "Your Shopping Cart",
    emptyCart: "Your cart is empty.",
    checkout: "Proceed to Checkout",
    selectAddress: "Select Delivery Address on Map",
    subtotal: "Subtotal",
    deliveryFee: "Cairo Flat Delivery Fee",
    total: "Total",
    cod: "Cash on Delivery (COD)",
    placeOrder: "Confirm Order via WhatsApp",
    orderTracking: "Order Status Tracking",
    orderReceived: "Order Received",
    preparing: "Preparing & Packing",
    outForDelivery: "Out for Delivery (Cairo Courier)",
    delivered: "Delivered",
    trackOrder: "Track Your Order",
    contactSupport: "Chat with Cairo HQ Support",
    egp: "EGP",
    confirmLocation: "Confirm Pin Location",
    searchLocation: "Search street, area in Cairo...",
    changeLang: "العربية",
  },
  ar: {
    searchPlaceholder: "ابحث عن أجهزة فيب، نكهات، بودات...",
    deliveryTo: "التوصيل إلى",
    cairoArea: "القاهرة وضواحيها الكبرى",
    categories: "الأقسام",
    featuredProducts: "المنتجات المميزة",
    bestSeller: "الأكثر مبيعاً",
    newArrival: "جديد",
    addToCart: "أضف إلى السلة",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    nicotine: "نسبة النيكوتين",
    flavor: "النكهة",
    specifications: "المواصفات",
    battery: "سعة البطارية",
    capacity: "سعة السائل",
    resistance: "المقاومة",
    reviews: "التقييمات",
    cartTitle: "سلة المشتريات",
    emptyCart: "سلتك فارغة حالياً.",
    checkout: "الذهاب للدفع",
    selectAddress: "حدد عنوان التوصيل على الخريطة",
    subtotal: "المجموع الفرعي",
    deliveryFee: "تكلفة التوصيل الموحدة للقاهرة",
    total: "الإجمالي",
    cod: "الدفع عند الاستلام (COD)",
    placeOrder: "تأكيد الطلب عبر الواتساب",
    orderTracking: "تتبع حالة الطلب",
    orderReceived: "تم استلام الطلب",
    preparing: "جاري التعبئة والتجهيز",
    outForDelivery: "خرج للتوصيل (مندوب القاهرة)",
    delivered: "تم التسليم",
    trackOrder: "تتبع طلبك",
    contactSupport: "المحادثة مع دعم المقر الرئيسي بالقاهرة",
    egp: "جنيه",
    confirmLocation: "تأكيد موقع الدبوس",
    searchLocation: "ابحث عن شارع، منطقة بالقاهرة...",
    changeLang: "English",
  }
};

const LocalizationContext = createContext({});

export const LocalizationProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  const t = (key) => {
    return translations[locale][key] || key;
  };

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    setLocale(nextLocale);
    
    // In production, to force RTL layout changes globally:
    // const isRTL = nextLocale === 'ar';
    // I18nManager.forceRTL(isRTL);
    // RNRestart.Restart(); // requires react-native-restart library
  };

  const isRTL = locale === 'ar';

  return (
    <LocalizationContext.Provider value={{ locale, t, toggleLanguage, isRTL }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);
```

---

## 🗄️ Application State & Mock Data

This state layer manages the Shopping Cart, Selected Delivery Address, and active Order history.

### `src/context/AppContext.js`
```javascript
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext({});

export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Vaporesso XROS 4 Pod System',
    category: 'devices',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=300', // Mock representation
    nicotineLevels: ['0mg', '20mg', '35mg', '50mg'],
    flavors: ['Classic Cyan', 'Matte Black', 'Silver Flare'],
    battery: '1000mAh Built-in',
    capacity: '2ml / 3ml',
    resistance: '0.4Ω / 0.6Ω / 0.8Ω MESH',
    description: 'The latest addition to the XROS family featuring upgraded Axon chip, full aluminum alloy unibody, and rapid Type-C charging.',
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: '2',
    name: 'Nasty Juice Cush Man (Mango Grape)',
    category: 'eliquids',
    price: 650,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=300',
    nicotineLevels: ['3mg', '6mg', '12mg', '20mg Salt', '50mg Salt'],
    flavors: ['Low Mint Mango', 'Mango Grape', 'Mango Strawberry'],
    battery: 'N/A',
    capacity: '60ml Freebase / 30ml SaltNic',
    resistance: 'N/A',
    description: 'Award-winning e-liquid blend featuring rich, sweet, ripe mangoes mixed with succulent grapes and finished with low mint.',
    rating: 4.8,
    reviewsCount: 310
  },
  {
    id: '3',
    name: 'Elf Bar BC5000 Disposable',
    category: 'disposables',
    price: 490,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=300',
    nicotineLevels: ['50mg (5%)'],
    flavors: ['Blue Razz Ice', 'Watermelon Ice', 'Strawberry Kiwi', 'Peach Mango'],
    battery: '650mAh (Rechargeable)',
    capacity: '13ml Pre-filled Juice',
    resistance: 'Dual Mesh Coil',
    description: 'Compact box style disposable pod device. Rechargeable via USB Type-C, supporting up to 5000 rich puffs.',
    rating: 4.7,
    reviewsCount: 890
  },
  {
    id: '4',
    name: 'Voopoo Argus P1 Pod Kit',
    category: 'devices',
    price: 1980,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300',
    nicotineLevels: ['0mg', '20mg', '50mg'],
    flavors: ['Gun Metal', 'Red Passion', 'Crystal Clear'],
    battery: '800mAh (15W PD Fast Charge)',
    capacity: '2ml ITO Pods',
    resistance: '0.7Ω / 1.2Ω',
    description: 'Futuristic mechanical design supporting PD lightning-fast charge (0 to 100% in 18 minutes) and automatic output adjustment.',
    rating: 4.8,
    reviewsCount: 78
  },
  {
    id: '5',
    name: 'OXVA Xlim V3 Replacement Pods',
    category: 'accessories',
    price: 450,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300',
    nicotineLevels: ['N/A'],
    flavors: ['Pack of 3 Pods'],
    battery: 'N/A',
    capacity: '2ml Top Fill',
    resistance: '0.6Ω / 0.8Ω / 1.2Ω',
    description: 'Anti-leak top-filling cartridges compatible with the OXVA Xlim Series (Xlim Pro, Xlim SQ Pro, Xlim SE).',
    rating: 4.6,
    reviewsCount: 201
  }
];

export const MOCK_CATEGORIES = [
  { id: 'all', labelEn: 'All Products', labelAr: 'الكل' },
  { id: 'devices', labelEn: 'Devices', labelAr: 'أجهزة الفيب' },
  { id: 'disposables', labelEn: 'Disposables', labelAr: 'ديسبوزابل' },
  { id: 'eliquids', labelEn: 'E-Liquids', labelAr: 'نكهات / ليكويد' },
  { id: 'accessories', labelEn: 'Accessories', labelAr: 'اكسسوارات وبودات' },
];

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); // { latitude, longitude, addressString }
  const [activeOrder, setActiveOrder] = useState(null); // tracking state

  const addToCart = (product, quantity = 1, nicotine, flavor) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.nicotine === nicotine && item.flavor === flavor
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity, nicotine, flavor }];
      }
    });
  };

  const removeFromCart = (productId, nicotine, flavor) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.nicotine === nicotine && item.flavor === flavor)
      )
    );
  };

  const updateQuantity = (productId, nicotine, flavor, amount) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.product.id === productId && item.nicotine === nicotine && item.flavor === flavor) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 50 : 0; // 50 EGP Flat Delivery Fee in Cairo
    return { subtotal, shipping, total: subtotal + shipping };
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      cart,
      selectedAddress,
      setSelectedAddress,
      activeOrder,
      setActiveOrder,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);
```

---

## 🗺️ Navigation & Setup

This setup ties our context and localizations together using React Navigation.

### `src/App.js`
```javascript
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './context/AppContext';
import { LocalizationProvider, useLocalization } from './context/LocalizationContext';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import MapPickerScreen from './screens/MapPickerScreen';
import OrderTrackingScreen from './screens/OrderTrackingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { t } = useLocalization();
  
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#0F4C81',
      tabBarInactiveTintColor: '#888',
      tabBarStyle: { height: 60, paddingBottom: 8 },
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Shop" component={ProductListScreen} options={{ tabBarLabel: 'Shop' }} />
      <Tab.Screen name="CartTab" component={CartScreen} options={{ tabBarLabel: 'Cart' }} />
      <Tab.Screen name="Tracking" component={OrderTrackingScreen} options={{ tabBarLabel: 'Track' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <LocalizationProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="MapPicker" component={MapPickerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </LocalizationProvider>
    </AppProvider>
  );
}
```

---

## 🏠 Screens Implementation

### 1. Homepage Screen
Features top localized header, search input, visual promotional banner, category filters, featured products grid, and the floating WhatsApp quick support button.

#### `src/screens/HomeScreen.js`
```javascript
import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';
import { useAppState, MOCK_PRODUCTS, MOCK_CATEGORIES } from '../context/AppContext';
import { COLORS, TYPOGRAPHY, SHADOWS } from '../theme/theme';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { t, toggleLanguage, isRTL } = useLocalization();
  const { addToCart } = useAppState();

  const featured = MOCK_PRODUCTS.slice(0, 3);

  const openWhatsApp = () => {
    const phoneNumber = '+201000000000'; // Cairo Vape Shop HQ Line
    const msg = encodeURIComponent(
      isRTL 
        ? "مرحباً فيب القاهرة، أود الاستفسار عن المنتجات المتوفرة حالياً وتوصيلها." 
        : "Hello Vape Cairo, I want to inquire about available products and delivery schedules."
    );
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${msg}`);
  };

  return (
    <View style={styles.container}>
      {/* Localized Header */}
      <View style={[styles.header, isRTL && styles.rtlRow]}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.deliveryText}>{t('deliveryTo')}</Text>
          <Text style={styles.locationText}>{t('cairoArea')} 📍</Text>
        </View>
        <TouchableOpacity style={styles.langBtn} onPress={toggleLanguage}>
          <Text style={styles.langBtnText}>{t('changeLang')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <View style={[styles.searchContainer, isRTL && styles.rtlRow]}>
          <TextInput
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={COLORS.textMuted}
            style={[styles.searchInput, isRTL && styles.rtlText]}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Promo Banner Card */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerBadge}>MID-YEAR SALE</Text>
            <Text style={styles.bannerTitle}>FAST CAIRO DELIVERY</Text>
            <Text style={styles.bannerSubtitle}>All Pods & Liquids delivered within 3 Hours</Text>
          </View>
        </View>

        {/* Categories Bar */}
        <View style={styles.sectionHeader}>
          <Text style={[TYPOGRAPHY.h2, isRTL && styles.rtlText]}>{t('categories')}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.categoryScroll, isRTL && styles.rtlRow]}>
          {MOCK_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryBadge}
              onPress={() => navigation.navigate('Shop', { activeCategory: cat.id })}
            >
              <Text style={styles.categoryLabel}>
                {isRTL ? cat.labelAr : cat.labelEn}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Products */}
        <View style={styles.sectionHeader}>
          <Text style={[TYPOGRAPHY.h2, isRTL && styles.rtlText]}>{t('featuredProducts')}</Text>
        </View>
        <View style={styles.productsGrid}>
          {featured.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            >
              <View style={styles.badgeWrapper}>
                <Text style={styles.productBadge}>{t('bestSeller')}</Text>
              </View>
              <Image source={{ uri: item.image }} style={styles.productImg} />
              <View style={styles.productDetails}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price} {t('egp')}</Text>
                
                <TouchableOpacity
                  style={styles.addToCartBtn}
                  onPress={() => {
                    addToCart(item, 1, item.nicotineLevels[0], item.flavors[0]);
                    alert(`${item.name} added to cart!`);
                  }}
                >
                  <Text style={styles.addToCartBtnText}>+ {t('addToCart')}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating WhatsApp Support Action Button */}
      <TouchableOpacity style={styles.whatsappFloat} onPress={openWhatsApp} activeOpacity={0.8}>
        <Text style={styles.whatsappFloatText}>💬</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitleContainer: {
    flexDirection: 'column',
  },
  deliveryText: {
    fontSize: 11,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 2,
  },
  langBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  langBtnText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 13,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    paddingHorizontal: 15,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: COLORS.textDark,
    fontSize: 14,
  },
  searchIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  bannerContainer: {
    marginHorizontal: 20,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 76, 129, 0.75)', // translucent theme blue overlay
    justifyContent: 'center',
    padding: 20,
  },
  bannerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accent,
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  categoryScroll: {
    paddingLeft: 20,
    paddingBottom: 5,
  },
  categoryBadge: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    marginRight: 10,
    ...SHADOWS.light,
  },
  categoryLabel: {
    fontWeight: '600',
    color: COLORS.textDark,
    fontSize: 13,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  productCard: {
    width: (width - 50) / 2, // responsive columns
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
    ...SHADOWS.light,
  },
  badgeWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  productBadge: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '700',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  productImg: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 10,
  },
  productDetails: {
    marginTop: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.accent,
    marginTop: 4,
    marginBottom: 8,
  },
  addToCartBtn: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartBtnText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  whatsappFloat: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#25D366', // Official WhatsApp green
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  whatsappFloatText: {
    fontSize: 30,
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  rtlText: {
    textAlign: 'right',
  },
});
```

---

### 2. Product Listing Screen
Handles search query inputs, category filtering, and lists matching elements in a clean vertical flow.

#### `src/screens/ProductListScreen.js`
```javascript
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';
import { useAppState, MOCK_PRODUCTS, MOCK_CATEGORIES } from '../context/AppContext';
import { COLORS, TYPOGRAPHY, SHADOWS } from '../theme/theme';

const { width } = Dimensions.get('window');

export default function ProductListScreen({ route, navigation }) {
  const { t, isRTL } = useLocalization();
  const { addToCart } = useAppState();

  const passedCategory = route.params?.activeCategory || 'all';
  const [selectedCat, setSelectedCat] = useState(passedCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS);

  useEffect(() => {
    setSelectedCat(passedCategory);
  }, [passedCategory]);

  useEffect(() => {
    let result = MOCK_PRODUCTS;

    if (selectedCat !== 'all') {
      result = result.filter(p => p.category === selectedCat);
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [selectedCat, searchQuery]);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.itemImg} />
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, isRTL && styles.rtlText]}>{item.name}</Text>
        <Text style={[styles.itemSpecs, isRTL && styles.rtlText]} numberOfLines={1}>
          {item.capacity} • {item.resistance}
        </Text>
        <View style={[styles.priceRow, isRTL && styles.rtlRow]}>
          <Text style={styles.itemPrice}>{item.price} {t('egp')}</Text>
          <TouchableOpacity 
            style={styles.quickAddBtn}
            onPress={() => {
              addToCart(item, 1, item.nicotineLevels[0], item.flavors[0]);
              alert(`${item.name} added!`);
            }}
          >
            <Text style={styles.quickAddBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[TYPOGRAPHY.h1, isRTL && styles.rtlText]}>{t('categories')}</Text>
      </View>

      {/* Search Field */}
      <View style={[styles.searchBox, isRTL && styles.rtlRow]}>
        <TextInput
          placeholder={t('searchPlaceholder')}
          placeholderTextColor={COLORS.textMuted}
          style={[styles.searchInput, isRTL && styles.rtlText]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✖️</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category Tabs */}
      <View style={styles.tabsContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={MOCK_CATEGORIES}
          keyExtractor={(item) => item.id}
          contentContainerStyle={isRTL && styles.rtlRow}
          renderItem={({ item }) => {
            const isSelected = selectedCat === item.id;
            return (
              <TouchableOpacity
                style={[styles.tab, isSelected && styles.tabActive]}
                onPress={() => setSelectedCat(item.id)}
              >
                <Text style={[styles.tabText, isSelected && styles.tabTextActive]}>
                  {isRTL ? item.labelAr : item.labelEn}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Product List Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        numColumns={2}
        columnWrapperStyle={[styles.columnWrapper, isRTL && styles.rtlRow]}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found matching filters.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.cardBackground,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  clearIcon: {
    padding: 5,
    color: COLORS.textMuted,
  },
  tabsContainer: {
    paddingBottom: 10,
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  listContent: {
    padding: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  itemCard: {
    backgroundColor: COLORS.cardBackground,
    width: (width - 40) / 2,
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  itemImg: {
    width: '100%',
    height: 110,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  itemInfo: {
    flexDirection: 'column',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  itemSpecs: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.accent,
  },
  quickAddBtn: {
    backgroundColor: COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAddBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  rtlText: {
    textAlign: 'right',
  },
});
```

---

### 3. Product Detail Screen
Allows selection of flavors and nicotine levels, previews detailed specs, and handles checkout preparation.

#### `src/screens/ProductDetailScreen.js`
```javascript
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';
import { useAppState, MOCK_PRODUCTS } from '../context/AppContext';
import { COLORS, TYPOGRAPHY, SHADOWS } from '../theme/theme';

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const { t, isRTL } = useLocalization();
  const { addToCart } = useAppState();

  const product = MOCK_PRODUCTS.find(p => p.id === productId);

  // States for options
  const [selectedNicotine, setSelectedNicotine] = useState(product?.nicotineLevels[0] || 'N/A');
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors[0] || 'N/A');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedNicotine, selectedFlavor);
    Alert.alert(
      isRTL ? "تمت الإضافة" : "Added to Cart",
      `${product.name} (${selectedFlavor}, ${selectedNicotine}) x${quantity} ${isRTL ? "تمت إضافته للسلة" : "added to shopping cart successfully."}`,
      [
        { text: isRTL ? "متابعة التسوق" : "Continue Shopping", onPress: () => navigation.goBack() },
        { text: isRTL ? "عرض السلة" : "View Cart", onPress: () => navigation.navigate('CartTab') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={[styles.navHeader, isRTL && styles.rtlRow]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{isRTL ? '➡️' : '⬅️'}</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{product.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Large Product Image Preview */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.mainImage} />
        </View>

        <View style={styles.contentCard}>
          {/* Title & Price */}
          <View style={[styles.titleRow, isRTL && styles.rtlRow]}>
            <View style={styles.titleInfo}>
              <Text style={[styles.productName, isRTL && styles.rtlText]}>{product.name}</Text>
              <View style={[styles.ratingRow, isRTL && styles.rtlRow]}>
                <Text style={styles.starIcon}>⭐</Text>
                <Text style={styles.ratingText}>{product.rating} ({product.reviewsCount} {t('reviews')})</Text>
              </View>
            </View>
            <Text style={styles.productPrice}>{product.price} {t('egp')}</Text>
          </View>

          <Text style={[styles.descriptionText, isRTL && styles.rtlText]}>
            {product.description}
          </Text>

          {/* Flavor Selection */}
          {product.flavors[0] !== 'N/A' && (
            <View style={styles.selectorSection}>
              <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t('flavor')}</Text>
              <View style={[styles.optionsRow, isRTL && styles.rtlRow]}>
                {product.flavors.map((flavor) => {
                  const isSelected = selectedFlavor === flavor;
                  return (
                    <TouchableOpacity
                      key={flavor}
                      style={[styles.optionBadge, isSelected && styles.optionBadgeActive]}
                      onPress={() => setSelectedFlavor(flavor)}
                    >
                      <Text style={[styles.optionLabel, isSelected && styles.optionLabelActive]}>
                        {flavor}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Nicotine Selection */}
          {product.nicotineLevels[0] !== 'N/A' && (
            <View style={styles.selectorSection}>
              <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t('nicotine')}</Text>
              <View style={[styles.optionsRow, isRTL && styles.rtlRow]}>
                {product.nicotineLevels.map((nic) => {
                  const isSelected = selectedNicotine === nic;
                  return (
                    <TouchableOpacity
                      key={nic}
                      style={[styles.optionBadge, isSelected && styles.optionBadgeActive]}
                      onPress={() => setSelectedNicotine(nic)}
                    >
                      <Text style={[styles.optionLabel, isSelected && styles.optionLabelActive]}>
                        {nic}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Tech Specifications */}
          <View style={styles.specsSection}>
            <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t('specifications')}</Text>
            
            <View style={[styles.specRow, isRTL && styles.rtlRow]}>
              <Text style={styles.specLabel}>{t('battery')}</Text>
              <Text style={styles.specVal}>{product.battery}</Text>
            </View>
            <View style={[styles.specRow, isRTL && styles.rtlRow]}>
              <Text style={styles.specLabel}>{t('capacity')}</Text>
              <Text style={styles.specVal}>{product.capacity}</Text>
            </View>
            <View style={[styles.specRow, isRTL && styles.rtlRow]}>
              <Text style={styles.specLabel}>{t('resistance')}</Text>
              <Text style={styles.specVal}>{product.resistance}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Cart Control Bottom Bar */}
      <View style={[styles.bottomControlBar, isRTL && styles.rtlRow]}>
        <View style={[styles.quantitySelector, isRTL && styles.rtlRow]}>
          <TouchableOpacity 
            style={styles.qtyBtn}
            onPress={() => setQuantity(q => Math.max(1, q - 1))}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyNumber}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.qtyBtn}
            onPress={() => setQuantity(q => q + 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.actionBtn} onPress={handleAddToCart}>
          <Text style={styles.actionBtnText}>{t('addToCart')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 20,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  imageContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  mainImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  contentCard: {
    padding: 20,
    backgroundColor: COLORS.cardBackground,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  titleInfo: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.accent,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 22,
    marginBottom: 20,
  },
  selectorSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    marginBottom: 10,
  },
  optionBadgeActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionLabel: {
    color: COLORS.textMuted,
    fontWeight: '600',
    fontSize: 13,
  },
  optionLabelActive: {
    color: COLORS.white,
  },
  specsSection: {
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginBottom: 40,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  specLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  specVal: {
    fontWeight: '600',
    color: COLORS.textDark,
    fontSize: 13,
  },
  bottomControlBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 25,
    backgroundColor: COLORS.cardBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.medium,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.background,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  qtyNumber: {
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 15,
    color: COLORS.textDark,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    marginLeft: 15,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  rtlText: {
    textAlign: 'right',
  },
});
```

---

### 4. Cart & Checkout Screen
Visualizes products in the active cart, summarizes totals including Cairo local shipping rates, enables Google Maps location review, and sets up WhatsApp ordering.

#### `src/screens/CartScreen.js`
```javascript
import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TextInput, Linking } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';
import { useAppState } from '../context/AppContext';
import { COLORS, TYPOGRAPHY, SHADOWS } from '../theme/theme';

export default function CartScreen({ navigation }) {
  const { t, isRTL } = useLocalization();
  const { cart, selectedAddress, updateQuantity, removeFromCart, getCartTotal, setActiveOrder, clearCart } = useAppState();

  const { subtotal, shipping, total } = getCartTotal();

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    if (!selectedAddress) {
      alert(isRTL ? "يرجى تحديد عنوان التوصيل على الخريطة أولاً" : "Please select your delivery address on the map first.");
      return;
    }

    // Define unique order ID
    const orderId = 'EGP' + Math.floor(1000 + Math.random() * 9000);
    
    // Set active order status for the Order Tracker
    setActiveOrder({
      id: orderId,
      status: 'received',
      timestamp: new Date().toLocaleTimeString(),
      address: selectedAddress.addressString,
      total: total,
    });

    // WhatsApp Message Text Formatting
    let itemsText = cart.map(item => 
      `• ${item.product.name} (${item.flavor}, ${item.nicotine}) x${item.quantity} = ${item.product.price * item.quantity} EGP`
    ).join('\n');

    const waMessage = 
`--- NEW ORDER: #${orderId} ---
*Items Ordered:*
${itemsText}

*Subtotal:* ${subtotal} EGP
*Cairo Delivery (Flat):* ${shipping} EGP
*Grand Total:* ${total} EGP

*Delivery Address:* 
${selectedAddress.addressString}
GPS coordinates: ${selectedAddress.latitude.toFixed(6)}, ${selectedAddress.longitude.toFixed(6)}

*Payment Method:* Cash on Delivery (COD)
Please dispatch my order. Thank you!`;

    const encodedWA = encodeURIComponent(waMessage);
    const shopWhatsAppPhone = '+201000000000'; // Cairo vape shop representative WhatsApp

    Linking.openURL(`https://wa.me/${shopWhatsAppPhone}?text=${encodedWA}`).then(() => {
      clearCart();
      // Navigate to order tracking screen
      navigation.navigate('Tracking');
    });
  };

  const renderCartItem = ({ item }) => (
    <View style={[styles.itemCard, isRTL && styles.rtlRow]}>
      <Image source={{ uri: item.product.image }} style={styles.itemImg} />
      <View style={styles.itemMeta}>
        <Text style={[styles.itemName, isRTL && styles.rtlText]}>{item.product.name}</Text>
        <Text style={[styles.itemSpecs, isRTL && styles.rtlText]}>
          {item.flavor} | {item.nicotine}
        </Text>
        <Text style={[styles.itemPrice, isRTL && styles.rtlText]}>{item.product.price} {t('egp')}</Text>
        
        {/* Quantity Controls */}
        <View style={[styles.qtyRow, isRTL && styles.rtlRow]}>
          <TouchableOpacity 
            style={styles.qtyBtn} 
            onPress={() => updateQuantity(item.product.id, item.nicotine, item.flavor, -1)}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity 
            style={styles.qtyBtn} 
            onPress={() => updateQuantity(item.product.id, item.nicotine, item.flavor, 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.deleteBtn}
            onPress={() => removeFromCart(item.product.id, item.nicotine, item.flavor)}
          >
            <Text style={styles.deleteBtnText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[TYPOGRAPHY.h1, isRTL && styles.rtlText]}>{t('cartTitle')}</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>{t('emptyCart')}</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.shopBtnText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item, index) => `${item.product.id}-${index}`}
          renderItem={renderCartItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View style={styles.checkoutFooter}>
              {/* Address Map Section */}
              <View style={styles.sectionHeaderContainer}>
                <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>Delivery Location</Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.mapSelectorBtn, isRTL && styles.rtlRow]} 
                onPress={() => navigation.navigate('MapPicker')}
              >
                <Text style={styles.mapPinIcon}>📍</Text>
                <View style={styles.mapTextContainer}>
                  <Text style={[styles.mapSelectorTitle, isRTL && styles.rtlText]}>
                    {selectedAddress ? 'Delivery Area Confirmed' : t('selectAddress')}
                  </Text>
                  <Text style={[styles.mapSelectorSub, isRTL && styles.rtlText]} numberOfLines={1}>
                    {selectedAddress ? selectedAddress.addressString : 'Cairo/Giza Location Selection'}
                  </Text>
                </View>
                <Text style={styles.arrowIcon}>{isRTL ? '⬅️' : '➡️'}</Text>
              </TouchableOpacity>

              {/* Order Notes / Instructions */}
              <TextInput
                placeholder={isRTL ? "ملاحظات التوصيل (مثال: رقم الشقة، رقم الدور...)" : "Delivery Notes (e.g. Apartment, floor, landmark...)"}
                placeholderTextColor={COLORS.textMuted}
                multiline
                style={[styles.noteInput, isRTL && styles.rtlText]}
              />

              {/* Bill Details */}
              <View style={styles.billCard}>
                <View style={[styles.billRow, isRTL && styles.rtlRow]}>
                  <Text style={styles.billLabel}>{t('subtotal')}</Text>
                  <Text style={styles.billValue}>{subtotal} {t('egp')}</Text>
                </View>
                <View style={[styles.billRow, isRTL && styles.rtlRow]}>
                  <Text style={styles.deliveryFee}>{t('deliveryFee')}</Text>
                  <Text style={styles.billValue}>{shipping} {t('egp')}</Text>
                </View>
                <View style={styles.billDivider} />
                <View style={[styles.billRow, isRTL && styles.rtlRow]}>
                  <Text style={styles.totalLabel}>{t('total')}</Text>
                  <Text style={styles.totalValue}>{total} {t('egp')}</Text>
                </View>
              </View>

              {/* Payment Info */}
              <View style={[styles.paymentCard, isRTL && styles.rtlRow]}>
                <Text style={styles.paymentDot}>🟢</Text>
                <Text style={[styles.paymentLabel, isRTL && styles.rtlText]}>{t('cod')}</Text>
              </View>

              {/* Checkout CTA */}
              <TouchableOpacity style={styles.checkoutBtn} onPress={handlePlaceOrder}>
                <Text style={styles.checkoutBtnText}>{t('placeOrder')}</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  listContent: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 20,
  },
  shopBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  shopBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  itemImg: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 12,
  },
  itemMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  itemSpecs: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.accent,
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  qtyBtn: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: 28,
    height: 28,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 12,
    color: COLORS.textDark,
  },
  deleteBtn: {
    marginLeft: 'auto',
    paddingHorizontal: 8,
  },
  deleteBtnText: {
    fontSize: 16,
  },
  checkoutFooter: {
    marginTop: 15,
    paddingBottom: 40,
  },
  sectionHeaderContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    textTransform: 'uppercase',
  },
  mapSelectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    ...SHADOWS.light,
  },
  mapPinIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  mapTextContainer: {
    flex: 1,
  },
  mapSelectorTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  mapSelectorSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  arrowIcon: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  noteInput: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    height: 60,
    fontSize: 13,
    color: COLORS.textDark,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  billCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 15,
    ...SHADOWS.light,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  billLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  billValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  billDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.accent,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  paymentDot: {
    marginRight: 8,
    fontSize: 10,
  },
  paymentLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  checkoutBtn: {
    backgroundColor: COLORS.success,
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  checkoutBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  rtlText: {
    textAlign: 'right',
  },
});
```

---

### 5. Google Maps Address Selection Screen
Simulates dynamic address selection over Cairo districts using a custom visual sheet and marker interface.

#### `src/screens/MapPickerScreen.js`
```javascript
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';
import { useAppState } from '../context/AppContext';
import { COLORS, TYPOGRAPHY, SHADOWS } from '../theme/theme';

const { width, height } = Dimensions.get('window');

// Mock districts in Cairo for address simulations
const MOCK_CAIRO_LOCATIONS = [
  { name: 'Road 9, Maadi, Cairo', lat: 29.9602, lng: 31.2625 },
  { name: '90th Street (South), New Cairo, Cairo', lat: 30.0166, lng: 31.4913 },
  { name: 'Zamalek, Cairo Island', lat: 30.0634, lng: 31.2223 },
  { name: 'Heliopolis, Cairo', lat: 30.0901, lng: 31.3229 },
];

export default function MapPickerScreen({ navigation }) {
  const { t, isRTL } = useLocalization();
  const { setSelectedAddress } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPin, setSelectedPin] = useState(MOCK_CAIRO_LOCATIONS[1]); // Default to New Cairo

  const handleSearch = () => {
    // Basic search filtering simulated
    const match = MOCK_CAIRO_LOCATIONS.find(loc => 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      setSelectedPin(match);
    } else {
      alert("No match in simulated Cairo database. Showing default pins.");
    }
  };

  const handleConfirmAddress = () => {
    setSelectedAddress({
      latitude: selectedPin.lat,
      longitude: selectedPin.lng,
      addressString: selectedPin.name
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Search overlay inside the Map View */}
      <View style={[styles.searchOverlay, isRTL && styles.rtlRow]}>
        <TextInput
          placeholder={t('searchLocation')}
          placeholderTextColor={COLORS.textMuted}
          style={[styles.searchInput, isRTL && styles.rtlText]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnTxt}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Simulated Map View Screen (Background Image representing Maps layout) */}
      <View style={styles.mapMockBackground}>
        {/* Mocked grid coordinates representing Cairo */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800' }} // representation of maps grids
          style={styles.mapImage}
        />
        
        {/* Animated Location Center Pin Mock */}
        <View style={styles.pinWrapper}>
          <Text style={styles.mapPin}>📍</Text>
          <View style={styles.pinPulse} />
        </View>

        {/* Floating current locate button */}
        <TouchableOpacity 
          style={styles.locateMeBtn}
          onPress={() => setSelectedPin(MOCK_CAIRO_LOCATIONS[0])} // jump to Maadi
        >
          <Text style={styles.locateIcon}>🎯</Text>
        </TouchableOpacity>
      </View>

      {/* Interactive Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />
        
        <Text style={[styles.sheetTitle, isRTL && styles.sheetTitle && styles.rtlText]}>Select Delivery Pin Location</Text>
        
        <View style={[styles.addressDisplayCard, isRTL && styles.rtlRow]}>
          <Text style={styles.addressIcon}>📍</Text>
          <View style={styles.addressTextWrapper}>
            <Text style={[styles.selectedLocationTitle, isRTL && styles.rtlText]}>{selectedPin.name}</Text>
            <Text style={[styles.selectedLocationCoords, isRTL && styles.rtlText]}>
              Lat: {selectedPin.lat.toFixed(4)}, Lng: {selectedPin.lng.toFixed(4)}
            </Text>
          </View>
        </View>

        {/* Confirm Address Button */}
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmAddress}>
          <Text style={styles.confirmBtnTxt}>{t('confirmLocation')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  searchOverlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 48,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  searchBtn: {
    padding: 8,
  },
  searchBtnTxt: {
    fontSize: 16,
  },
  mapMockBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  pinWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: height / 2 - 60,
  },
  mapPin: {
    fontSize: 48,
    marginBottom: -4,
  },
  pinPulse: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  locateMeBtn: {
    position: 'absolute',
    bottom: 240, // sit right above the bottom sheet
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  locateIcon: {
    fontSize: 20,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
    ...SHADOWS.medium,
  },
  sheetHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginBottom: 15,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 15,
  },
  addressDisplayCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  addressIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  addressTextWrapper: {
    flex: 1,
  },
  selectedLocationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  selectedLocationCoords: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  confirmBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtnTxt: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  rtlText: {
    textAlign: 'right',
  },
});
```

---

### 6. Order Tracking & WhatsApp Support Screen
Highlights progress indicators for order cycles inside Cairo logistics, linking support threads.

#### `src/screens/OrderTrackingScreen.js`
```javascript
import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';
import { useAppState } from '../context/AppContext';
import { COLORS, TYPOGRAPHY, SHADOWS } from '../theme/theme';

export default function OrderTrackingScreen() {
  const { t, isRTL } = useLocalization();
  const { activeOrder } = useAppState();

  const handleSupportWhatsApp = () => {
    const phone = '+201000000000';
    const textMsg = encodeURIComponent(
      activeOrder 
        ? `Hello Vape Cairo HQ. I want to inquire about order #${activeOrder.id} status. Placed address: ${activeOrder.address}.`
        : `Hello Vape Cairo HQ. I have a question regarding delivery timelines.`
    );
    Linking.openURL(`https://wa.me/${phone}?text=${textMsg}`);
  };

  const getStatusWeight = (current, stage) => {
    const stages = ['received', 'preparing', 'out_for_delivery', 'delivered'];
    const currentIndex = stages.indexOf(current);
    const stageIndex = stages.indexOf(stage);
    
    if (currentIndex >= stageIndex) {
      return 'completed';
    }
    if (currentIndex + 1 === stageIndex) {
      return 'next';
    }
    return 'pending';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[TYPOGRAPHY.h1, isRTL && styles.rtlText]}>{t('orderTracking')}</Text>
      </View>

      {!activeOrder ? (
        <View style={styles.noActiveContainer}>
          <Text style={styles.noActiveIcon}>📦</Text>
          <Text style={styles.noActiveText}>No active orders to track right now.</Text>
          <TouchableOpacity style={styles.supportBtn} onPress={handleSupportWhatsApp}>
            <Text style={styles.supportBtnTxt}>{t('contactSupport')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Order Snapshot Card */}
          <View style={styles.card}>
            <View style={[styles.orderInfoRow, isRTL && styles.rtlRow]}>
              <Text style={styles.orderLabel}>Order ID:</Text>
              <Text style={styles.orderValue}>#{activeOrder.id}</Text>
            </View>
            <View style={[styles.orderInfoRow, isRTL && styles.rtlRow]}>
              <Text style={styles.orderLabel}>Placed At:</Text>
              <Text style={styles.orderValue}>{activeOrder.timestamp}</Text>
            </View>
            <View style={[styles.orderInfoRow, isRTL && styles.rtlRow]}>
              <Text style={styles.orderLabel}>Shipping Destination:</Text>
              <Text style={[styles.orderValue, { flex: 1, textAlign: isRTL ? 'left' : 'right' }]} numberOfLines={1}>
                {activeOrder.address}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={[styles.orderInfoRow, isRTL && styles.rtlRow]}>
              <Text style={styles.totalLabel}>Total Bill Amount:</Text>
              <Text style={styles.totalValue}>{activeOrder.total} {t('egp')}</Text>
            </View>
          </View>

          {/* Timeline Visual Status Tracker */}
          <Text style={[styles.timelineHeader, isRTL && styles.rtlText]}>Delivery Status Timeline</Text>
          
          <View style={styles.timelineContainer}>
            {/* Step 1: Received */}
            <View style={[styles.timelineStep, isRTL && styles.rtlRow]}>
              <View style={styles.indicatorCol}>
                <View style={[
                  styles.circleNode, 
                  getStatusWeight(activeOrder.status, 'received') === 'completed' && styles.circleCompleted
                ]}>
                  <Text style={styles.checkIcon}>✓</Text>
                </View>
                <View style={[styles.connectorLine, getStatusWeight(activeOrder.status, 'preparing') === 'completed' && styles.lineCompleted]} />
              </View>
              <View style={styles.textCol}>
                <Text style={styles.stepTitle}>{t('orderReceived')}</Text>
                <Text style={styles.stepDesc}>Your order was routed to our Cairo processing center.</Text>
              </View>
            </View>

            {/* Step 2: Preparing */}
            <View style={[styles.timelineStep, isRTL && styles.rtlRow]}>
              <View style={styles.indicatorCol}>
                <View style={[
                  styles.circleNode, 
                  getStatusWeight(activeOrder.status, 'preparing') === 'completed' && styles.circleCompleted,
                  getStatusWeight(activeOrder.status, 'preparing') === 'next' && styles.circleNext
                ]}>
                  {getStatusWeight(activeOrder.status, 'preparing') === 'completed' ? <Text style={styles.checkIcon}>✓</Text> : <Text style={styles.dotIcon}>•</Text>}
                </View>
                <View style={[styles.connectorLine, getStatusWeight(activeOrder.status, 'out_for_delivery') === 'completed' && styles.lineCompleted]} />
              </View>
              <View style={styles.textCol}>
                <Text style={styles.stepTitle}>{t('preparing')}</Text>
                <Text style={styles.stepDesc}>Liquid flavors and pods are sealed and packaged securely.</Text>
              </View>
            </View>

            {/* Step 3: Out for Delivery */}
            <View style={[styles.timelineStep, isRTL && styles.rtlRow]}>
              <View style={styles.indicatorCol}>
                <View style={[
                  styles.circleNode, 
                  getStatusWeight(activeOrder.status, 'out_for_delivery') === 'completed' && styles.circleCompleted,
                  getStatusWeight(activeOrder.status, 'out_for_delivery') === 'next' && styles.circleNext
                ]}>
                  {getStatusWeight(activeOrder.status, 'out_for_delivery') === 'completed' ? <Text style={styles.checkIcon}>✓</Text> : <Text style={styles.dotIcon}>•</Text>}
                </View>
                <View style={[styles.connectorLine, getStatusWeight(activeOrder.status, 'delivered') === 'completed' && styles.lineCompleted]} />
              </View>
              <View style={styles.textCol}>
                <Text style={styles.stepTitle}>{t('outForDelivery')}</Text>
                <Text style={styles.stepDesc}>Our motorcycle courier is dispatching your packages across Cairo.</Text>
              </View>
            </View>

            {/* Step 4: Delivered */}
            <View style={[styles.timelineStep, isRTL && styles.rtlRow]}>
              <View style={styles.indicatorCol}>
                <View style={[
                  styles.circleNode, 
                  getStatusWeight(activeOrder.status, 'delivered') === 'completed' && styles.circleCompleted,
                  getStatusWeight(activeOrder.status, 'delivered') === 'next' && styles.circleNext
                ]}>
                  {getStatusWeight(activeOrder.status, 'delivered') === 'completed' ? <Text style={styles.checkIcon}>✓</Text> : <Text style={styles.dotIcon}>•</Text>}
                </View>
              </View>
              <View style={styles.textCol}>
                <Text style={styles.stepTitle}>{t('delivered')}</Text>
                <Text style={styles.stepDesc}>Deliveries are confirmed against cash payments at your doorstep.</Text>
              </View>
            </View>
          </View>

          {/* Quick Chat Support Button */}
          <TouchableOpacity style={styles.whatsappSupportBtn} onPress={handleSupportWhatsApp}>
            <Text style={styles.supportLabel}>💬 Contact Cairo Support on WhatsApp</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  noActiveContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noActiveIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  noActiveText: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 20,
    textAlign: 'center',
  },
  supportBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  supportBtnTxt: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 25,
    ...SHADOWS.light,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  orderLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  orderValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.accent,
  },
  timelineHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timelineContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 25,
    ...SHADOWS.light,
  },
  timelineStep: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  indicatorCol: {
    alignItems: 'center',
    marginRight: 15,
    width: 24,
  },
  circleNode: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCompleted: {
    backgroundColor: COLORS.success,
  },
  circleNext: {
    backgroundColor: COLORS.primary,
  },
  checkIcon: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  dotIcon: {
    color: COLORS.white,
    fontSize: 16,
  },
  connectorLine: {
    width: 2,
    height: 48,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  lineCompleted: {
    backgroundColor: COLORS.success,
  },
  textCol: {
    flex: 1,
    paddingTop: 2,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  stepDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
    lineHeight: 16,
  },
  whatsappSupportBtn: {
    backgroundColor: '#25D366',
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  supportLabel: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  rtlText: {
    textAlign: 'right',
  },
});
```

---

## ⚡ Integration Details & Custom Add-ons

### 📱 Responsive Layout Strategy in React Native
React Native handles scaling inherently using density-independent pixels (`dp`). However, layouts must adapt properly across tablet formats and varied screens (e.g. small Android screens to iPhone Max models).
1. **Dynamic Dimensions API**: In `HomeScreen` and `ProductListScreen`, product cards dynamically query screen width (`const { width } = Dimensions.get('window')`) to calculate card sizes dynamically, ensuring layout density is kept identical on any screen size.
2. **Flexbox Architecture**: Avoiding absolute position sizing; utilizing alignment utilities (`justifyContent: 'space-between'`, `flexWrap: 'wrap'`) ensures fluid wrapping of listings.
3. **ScrollContainers**: Form layouts and detail sheets are wrapped in `ScrollView` with safe margins, preventing overlap issues on notched or smaller screens.

### 🗺️ Google Maps API Integration Strategy
In production, the mock `MapPickerScreen` should be replaced with `react-native-maps` and standard APIs:
1. **Library Installation**:
   `npm install react-native-maps`
2. **MapView Component**:
   ```javascript
   import MapView, { Marker } from 'react-native-maps';
   
   // In code:
   <MapView
     style={StyleSheet.absoluteFillObject}
     initialRegion={{
       latitude: 30.0444, // Cairo Center Coordinates
       longitude: 31.2357,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     }}
     onPress={(e) => updateMarkerCoordinate(e.nativeEvent.coordinate)}
   >
     <Marker coordinate={selectedCoordinates} />
   </MapView>
   ```
3. **Address Search Autocomplete**:
   Integrate Google Places API to dynamically autocomplete Cairo addresses:
   `https://maps.googleapis.com/maps/api/place/autocomplete/json?input={searchQuery}&location=30.0444,31.2357&radius=50000&key=YOUR_API_KEY`

### 📱 WhatsApp Shipping & Support Hook
In Cairo/Egypt, WhatsApp order confirmations drastically increase conversion rates. The integration utilizes React Native's `Linking` API.
- **Support Chat Trigger**:
  `Linking.openURL('https://wa.me/201000000000?text=Hello...')`
- **Fallback Verification**:
  It is recommended to run a fallback checker before calling URLs to safeguard execution:
  ```javascript
  import { Linking } from 'react-native';

  const triggerWhatsApp = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("WhatsApp not installed", "Please install WhatsApp to place orders.");
    }
  };
  ```
