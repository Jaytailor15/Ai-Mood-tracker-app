import { MoodEntry } from '../types';

const API_URL = 'YOUR_API_ENDPOINT';
const API_KEY = 'YOUR_OPENAI_API_KEY';

export const getAIInsight = async (moodEntry: MoodEntry): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/analyze-mood`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(moodEntry),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI insight');
    }

    const data = await response.json();
    return data.insight;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}; 