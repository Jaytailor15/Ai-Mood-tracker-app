import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  Main: undefined;
  // ... other screens ...
};

const IntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.delay(200)} style={styles.logoContainer}>
        <Icon 
          name="happy-outline" 
          size={80} 
          color="#007ACC" // Assuming primary color is blue
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400)} style={styles.contentContainer}>
        <Text style={styles.title}>MoodTracker AI</Text>
        <Text style={styles.subtitle}>Track, Understand, and Improve</Text>
        <Text style={styles.description}>
          Your personal AI-powered mood companion that helps you understand your emotional patterns and provides personalized insights.
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  contentContainer: {
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2B6CB0',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#4A5568',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#2B6CB0',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default IntroScreen; 