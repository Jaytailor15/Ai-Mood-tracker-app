import Slider from '@react-native-community/slider';
import React, { useContext, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { MoodEntry } from '../types';

interface Props {
  onSubmit: (entry: MoodEntry) => Promise<void>;
}

export const MoodInput: React.FC<Props> = ({ onSubmit }) => {
  const { theme } = useContext(ThemeContext);
  const [scale, setScale] = useState(3);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) return;

    setLoading(true);
    try {
      await onSubmit({
        scale,
        description,
        timestamp: new Date(),
      });
      setDescription('');
    } catch (error) {
      console.error('Error submitting mood:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (scale: number) => {
    switch (Math.floor(scale)) {
      case 1: return '😢';
      case 2: return '😕';
      case 3: return '😐';
      case 4: return '😊';
      case 5: return '😄';
      default: return '😐';
    }
  };

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.colors.card,
      borderColor: theme.dark ? theme.colors.border : 'transparent',
      borderWidth: theme.dark ? 1 : 0,
    }]}>
      <Text style={[styles.label, { color: theme.colors.text }]}>Rate your mood</Text>
      <Text style={styles.emojiScale}>{getMoodEmoji(scale)}</Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={5}
          step={0.5}
          value={scale}
          onValueChange={setScale}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.dark ? '#4A5568' : '#E2E8F0'}
          thumbTintColor={theme.colors.primary}
        />
        <View style={styles.scaleLabels}>
          <Text style={[styles.scaleLabel, { color: theme.colors.text }]}>Very Bad</Text>
          <Text style={[styles.scaleLabel, { color: theme.colors.text }]}>Very Good</Text>
        </View>
      </View>
      
      <TextInput
        style={[styles.input, { 
          backgroundColor: theme.dark ? theme.colors.background : '#F8F9FD',
          borderColor: theme.colors.border,
          color: theme.colors.text,
        }]}
        placeholder="How are you feeling today?"
        placeholderTextColor={theme.dark ? '#718096' : '#64748B'}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Get AI Insight</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    margin: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
    color: '#1A2138',
    fontWeight: '600',
    textAlign: 'center',
  },
  emojiScale: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 20,
  },
  slider: {
    height: 40,
    marginBottom: 10,
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  scaleLabel: {
    color: '#64748B',
    fontSize: 14,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    minHeight: 120,
    backgroundColor: '#F8F9FD',
    fontSize: 16,
    color: '#4A5568',
  },
  button: {
    backgroundColor: '#2B6CB0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2B6CB0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
}); 