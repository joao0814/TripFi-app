import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/Login/index.js';
import Register from './src/pages/Register/index.js';
import Home from './src/pages/home/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe o AsyncStorage correto

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      // Limpar dados de autenticação ao iniciar o aplicativo
      await AsyncStorage.removeItem('isLoggedIn');
      checkAuthentication();
    };
    initializeAuth();
  }, []);

  const checkAuthentication = async () => {
    try {
      const userLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (userLoggedIn) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    AsyncStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => <Login {...props} onLoginSuccess={handleLoginSuccess} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
