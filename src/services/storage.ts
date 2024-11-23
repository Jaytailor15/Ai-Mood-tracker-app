import AsyncStorage from '@react-native-async-storage/async-storage';
import { AIInsight, MoodEntry } from '../types';

const MOOD_ENTRIES_KEY = 'mood_entries';
const AI_INSIGHTS_KEY = 'ai_insights';

export const StorageService = {
  saveMoodEntry: async (entry: MoodEntry) => {
    try {
      const existingEntries = await StorageService.getMoodEntries();
      const updatedEntries = [...existingEntries, entry];
      await AsyncStorage.setItem(MOOD_ENTRIES_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error saving mood entry:', error);
      throw error;
    }
  },

  getMoodEntries: async (): Promise<MoodEntry[]> => {
    try {
      const entries = await AsyncStorage.getItem(MOOD_ENTRIES_KEY);
      return entries ? JSON.parse(entries) : [];
    } catch (error) {
      console.error('Error getting mood entries:', error);
      return [];
    }
  },

  saveAIInsight: async (insight: AIInsight) => {
    try {
      const existingInsights = await StorageService.getAIInsights();
      const updatedInsights = [...existingInsights, insight];
      await AsyncStorage.setItem(AI_INSIGHTS_KEY, JSON.stringify(updatedInsights));
    } catch (error) {
      console.error('Error saving AI insight:', error);
      throw error;
    }
  },

  getAIInsights: async (): Promise<AIInsight[]> => {
    try {
      const insights = await AsyncStorage.getItem(AI_INSIGHTS_KEY);
      return insights ? JSON.parse(insights) : [];
    } catch (error) {
      console.error('Error getting AI insights:', error);
      return [];
    }
  },
}; 