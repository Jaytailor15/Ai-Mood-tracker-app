import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { MoodProvider } from './src/context/MoodContext';
import { ThemeContext, ThemeProvider } from './src/context/ThemeContext';
import HistoryScreen from './src/screens/HistoryScreen';
import HomeScreen from './src/screens/HomeScreen';
import IntroScreen from './src/screens/IntroScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Icon name={iconName ?? ''} size={24} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        headerStyle: {
          backgroundColor: theme.colors.card,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.colors.text,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MoodProvider>
        <AppContent />
      </MoodProvider>
    </ThemeProvider>
  );
}
