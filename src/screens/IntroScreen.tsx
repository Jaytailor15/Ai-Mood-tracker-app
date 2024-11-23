import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Dimensions,
    PanResponder,
    Animated as RNAnimated,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const SLIDER_WIDTH = width * 0.8;
const SLIDER_HEIGHT = 60;

type RootStackParamList = {
  Main: undefined;
  // ... other screens ...
};

const IntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [slidePosition] = useState(new RNAnimated.Value(0));
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsDragging(true);
    },
    onPanResponderMove: (_, gestureState) => {
      const newPosition = Math.max(0, Math.min(gestureState.dx, SLIDER_WIDTH - SLIDER_HEIGHT));
      slidePosition.setValue(newPosition);
      
      if (newPosition >= SLIDER_WIDTH - SLIDER_HEIGHT - 10) {
        navigation.navigate('Main');
      }
    },
    onPanResponderRelease: () => {
      setIsDragging(false);
      RNAnimated.spring(slidePosition, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.delay(200)} style={styles.headerContainer}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>MT</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400)} style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.title}>MoodTracker</Text>
          <Text style={styles.titleAccent}>AI</Text>
          <Text style={styles.subtitle}>Your Emotional Journey Begins Here</Text>
        </View>
        
        <View style={styles.featuresContainer}>
          {[
            { icon: 'analytics-outline', text: 'Track your daily moods and emotions' },
            { icon: 'bulb-outline', text: 'Get personalized AI-powered insights' },
            { icon: 'trending-up-outline', text: 'Monitor your emotional growth' },
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Icon name={feature.icon} size={20} color="#007ACC" />
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(600)} style={styles.sliderContainer}>
        <View style={styles.sliderBackground}>
          <View style={styles.sliderInnerShadow}>
            <View style={styles.slider}>
              <RNAnimated.View
                {...panResponder.panHandlers}
                style={[
                  styles.sliderButton,
                  { transform: [{ translateX: slidePosition }] }
                ]}
              >
                <Icon name="chevron-forward" size={24} color="#FFFFFF" />
              </RNAnimated.View>
              <Text style={styles.sliderText}>Slide to continue</Text>
            </View>
          </View>
        </View>
      </Animated.View>
      
      <Animated.View entering={FadeInUp.delay(800)} style={styles.signatureContainer}>
        <Text style={styles.signatureText}>Made with ❤️ by</Text>
        <Text style={styles.signatureName}>Jay Tailor</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.08,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  brandContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#2B6CB0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    width: '85%',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  welcomeText: {
    fontSize: 18,
    color: '#718096',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2B6CB0',
    letterSpacing: 0.5,
  },
  titleAccent: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#007ACC',
    marginTop: -10, // Overlap with title
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#4A5568',
    marginTop: 12,
    letterSpacing: 0.3,
  },
  featuresContainer: {
    width: '100%',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  featureText: {
    fontSize: 15,
    color: '#4A5568',
    flex: 1,
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sliderBackground: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: SLIDER_HEIGHT / 2,
    backgroundColor: '#F0F4F8',
    padding: 3,
    borderWidth: 1.5,
    borderColor: 'rgba(43, 108, 176, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sliderInnerShadow: {
    width: '100%',
    height: '100%',
    borderRadius: SLIDER_HEIGHT / 2,
    backgroundColor: '#F8F9FD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    overflow: 'hidden',
  },
  slider: {
    width: '100%',
    height: '100%',
    borderRadius: SLIDER_HEIGHT / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  sliderButton: {
    width: SLIDER_HEIGHT - 10,
    height: SLIDER_HEIGHT - 10,
    borderRadius: (SLIDER_HEIGHT - 10) / 2,
    backgroundColor: '#2B6CB0',
    position: 'absolute',
    left: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sliderText: {
    color: '#718096',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.8,
    opacity: 0.9,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    transform: [{ translateX: 8 }],
  },
  signatureContainer: {
    position: 'absolute',
    bottom: height * 0.02,
    alignItems: 'center',
  },
  signatureText: {
    fontSize: 12,
    color: '#718096',
    letterSpacing: 0.5,
    opacity: 0.8,
  },
  signatureName: {
    fontSize: 13,
    color: '#2B6CB0',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 2,
  },
});

const InnerShadowAndroid = () => (
  <View 
    style={{
      ...StyleSheet.absoluteFillObject,
      borderRadius: SLIDER_HEIGHT / 2,
      borderWidth: 3,
      borderColor: 'rgba(0, 0, 0, 0.05)',
      backgroundColor: 'transparent',
    }} 
  />
);

export default IntroScreen; 