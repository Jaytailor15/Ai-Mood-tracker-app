import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        headerStyle: {
          backgroundColor: theme.colors.card,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.colors.text,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="analytics" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 