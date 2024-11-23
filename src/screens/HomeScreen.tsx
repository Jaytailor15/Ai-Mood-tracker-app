import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import {
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { MoodContext } from '../context/MoodContext';
import { ThemeContext } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const MoodCard = ({ onSubmit }: { onSubmit: (entry: any) => void }) => {
  const { theme } = useContext(ThemeContext);
  const [moodValue, setMoodValue] = useState(3);
  const [note, setNote] = useState('');
  const [insight, setInsight] = useState<{ message: string } | null>(null);
  const [lastMoodValue, setLastMoodValue] = useState<number | null>(null);

  const getMoodDescription = (value: number) => {
    switch (value) {
      case 1: return 'Very Bad';
      case 2: return 'Bad';
      case 3: return 'Okay';
      case 4: return 'Good';
      case 5: return 'Excellent';
      default: return 'Okay';
    }
  };

  const getMoodEmoji = (value: number) => {
    switch (value) {
      case 1: return '😢';
      case 2: return '🙁';
      case 3: return '😊';
      case 4: return '😃';
      case 5: return '😄';
      default: return '😊';
    }
  };

  const getInsightMessage = (moodValue: number) => {
    const messages = {
      1: "I notice you're experiencing a challenging moment. Remember that difficult feelings are temporary, and it's okay to take time for self-care.",
      2: "Your mood appears to be lower than usual. Small positive actions can help shift your perspective.",
      3: "You're maintaining a balanced emotional state. This is a good opportunity to engage in activities that nurture your well-being.",
      4: "You're experiencing positive emotions! This energy can be channeled into meaningful activities.",
      5: "Your excellent mood is wonderful to see! These peak moments are perfect for tackling important goals!"
    };
    return messages[moodValue as keyof typeof messages] || "Share how you're feeling to receive personalized insights.";
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(400)}
      style={[
        styles.moodCard,
        {
          backgroundColor: theme.colors.card,
          shadowColor: theme.dark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'
        }
      ]}
    >
      <View style={styles.cardSection}>
        <View style={styles.moodHeader}>
          <Text style={[styles.moodValue, { color: theme.colors.primary }]}>
            {getMoodEmoji(moodValue)} {getMoodDescription(moodValue)}
          </Text>
          <Text style={[styles.moodScale, { color: theme.colors.text }]}>
            {moodValue.toFixed(1)}
          </Text>
        </View>

        <View style={styles.customSliderContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity
              key={value}
              onPress={() => setMoodValue(value)}
              style={[
                styles.moodButton,
                moodValue === value && styles.selectedMoodButton,
                {
                  backgroundColor: moodValue === value ? `${theme.colors.primary}12` : 'transparent',
                  borderWidth: 1.5,
                  borderColor: moodValue === value ? theme.colors.primary : `${theme.colors.text}15`
                }
              ]}
            >
              <Text style={[styles.moodButtonText, { 
                color: theme.colors.text,
                opacity: moodValue === value ? 1 : 0.6,
              }]}>
                {getMoodEmoji(value)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.moodLabelsContainer}>
          <Text style={[styles.moodLabel, { color: `${theme.colors.text}80` }]}>Very Bad</Text>
          <Text style={[styles.moodLabel, { color: `${theme.colors.text}80` }]}>Excellent</Text>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => {
            onSubmit({ scale: moodValue, timestamp: new Date(), note });
            setLastMoodValue(moodValue);
          }}
        >
          <Text style={styles.submitButtonText}>Track Mood</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.aiSection, { borderTopColor: `${theme.colors.text}15` }]}>
        <View style={styles.aiInsightHeader}>
          <View style={styles.aiInsightTitleContainer}>
            <View style={[styles.aiIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Icon name="analytics-outline" size={20} color={theme.colors.primary} />
            </View>
            <Text style={[styles.aiInsightTitle, { color: theme.colors.text }]}>
              AI Mood Analysis
            </Text>
          </View>
          {lastMoodValue && (
            <View style={[styles.lastMoodBadge, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Text style={[styles.lastMoodText, { color: theme.colors.primary }]}>
                Level: {lastMoodValue}
              </Text>
            </View>
          )}
        </View>
        <Text style={[styles.aiInsightText, { color: `${theme.colors.text}90` }]}>
          {insight ? insight.message : lastMoodValue ? getInsightMessage(lastMoodValue) : getInsightMessage(moodValue)}
        </Text>
      </View>
    </Animated.View>
  );
};

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { entries, addEntry } = useContext(MoodContext);
  const [insight, setInsight] = useState<{ message: string } | null>(null);
  const [lastMoodValue, setLastMoodValue] = useState<number | null>(null);

  const averageMood = entries.length 
    ? (entries.reduce((acc, curr) => acc + curr.scale, 0) / entries.length).toFixed(1)
    : '0';

  const todaysMoods = entries.filter(entry => 
    format(new Date(entry.timestamp), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const renderStatCard = (title: string, value: string | number, icon: string) => (
    <Animated.View 
      entering={FadeInDown.delay(300)} 
      style={[
        styles.statCard, 
        { 
          backgroundColor: theme.colors.card,
          shadowColor: theme.dark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'
        }
      ]}
    >
      <View style={[
        styles.iconContainer, 
        { backgroundColor: theme.dark ? `${theme.colors.primary}30` : `${theme.colors.primary}15` }
      ]}>
        <Icon name={icon} size={isSmallDevice ? 20 : 24} color={theme.colors.primary} />
      </View>
      <Text style={[styles.statValue, { color: theme.colors.primary }]}>
        {value}
      </Text>
      <Text style={[styles.statTitle, { color: `${theme.colors.text}80` }]}>
        {title}
      </Text>
    </Animated.View>
  );

  async function handleMoodSubmit(entry: {scale: number, timestamp: Date, note?: string}): Promise<void> {
    try {
      const moodEntry = {
        scale: entry.scale,
        timestamp: entry.timestamp,
        note: entry.note,
        mood: 'default' as const,
        date: format(entry.timestamp, 'yyyy-MM-dd')
      };
      addEntry(moodEntry);
      setLastMoodValue(entry.scale);
      setInsight({ 
        message: "Analyzing your emotional patterns and generating personalized insights..." 
      });
      
      // Simulate AI analysis delay
      setTimeout(() => {
        setInsight(null); // This will trigger the conditional message based on mood
      }, 2000);
    } catch (error) {
      console.error('Error submitting mood:', error);
    }
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(200)} style={styles.headerSection}>
          <Text style={[styles.welcomeText, { color: `${theme.colors.text}80` }]}>
            Welcome Back 👋
          </Text>
          <Text style={[styles.greeting, { color: theme.colors.text }]}>
            How are you feeling today?
          </Text>
        </Animated.View>

        <View style={styles.mainSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Today's Overview
          </Text>
          <View style={styles.statsContainer}>
            {renderStatCard('Average Mood', averageMood, 'analytics')}
            {renderStatCard('Today\'s Entries', todaysMoods.length, 'today')}
          </View>

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Track Your Mood
          </Text>
          <View style={styles.moodInputContainer}>
            <MoodCard onSubmit={handleMoodSubmit} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: width * 0.04,
    paddingTop: Platform.OS === 'ios' ? height * 0.02 : width * 0.02,
  },
  headerSection: {
    marginBottom: height * 0.03,
  },
  welcomeText: {
    fontSize: isSmallDevice ? 14 : 16,
    marginBottom: height * 0.005,
  },
  greeting: {
    fontSize: isSmallDevice ? 24 : 28,
    fontWeight: 'bold',
  },
  mainSection: {
    marginBottom: height * 0.03,
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '600',
    marginBottom: height * 0.015,
    marginLeft: width * 0.01,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.025,
  },
  statCard: {
    flex: 1,
    margin: width * 0.01,
    padding: width * 0.04,
    borderRadius: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: width * 0.1,
    height: width * 0.1,
    minWidth: 36,
    minHeight: 36,
    maxWidth: 44,
    maxHeight: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  statTitle: {
    fontSize: isSmallDevice ? 11 : 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  statValue: {
    fontSize: isSmallDevice ? 24 : 28,
    fontWeight: 'bold',
    marginBottom: height * 0.005,
  },
  moodInputContainer: {
    marginBottom: height * 0.02,
  },
  moodCard: {
    borderRadius: 20,
    marginHorizontal: width * 0.01,
    marginBottom: height * 0.02,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  cardSection: {
    padding: width * 0.05,
  },
  aiSection: {
    padding: width * 0.05,
    borderTopWidth: 1,
  },
  aiInsightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  aiInsightTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  aiInsightTitle: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '600',
  },
  aiInsightText: {
    fontSize: isSmallDevice ? 14 : 15,
    lineHeight: isSmallDevice ? 20 : 22,
    letterSpacing: 0.3,
  },
  lastMoodBadge: {
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.006,
    borderRadius: 8,
  },
  lastMoodText: {
    fontSize: isSmallDevice ? 12 : 13,
    fontWeight: '600',
  },
  moodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  moodValue: {
    fontSize: isSmallDevice ? 24 : 28,
    fontWeight: 'bold',
  },
  moodScale: {
    fontSize: isSmallDevice ? 14 : 16,
    opacity: 0.8,
  },
  customSliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: height * 0.025,
    paddingHorizontal: 4,
  },
  moodButton: {
    width: Math.min(width * 0.14, 52),
    height: Math.min(width * 0.14, 52),
    borderRadius: Math.min(width * 0.07, 26),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedMoodButton: {
    transform: [{ scale: 1.02 }],
  },
  moodButtonText: {
    fontSize: Math.min(width * 0.07, 28),
    height: Math.min(width * 0.08, 32),
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    padding: 0,
  },
  moodLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
    marginBottom: height * 0.02,
  },
  moodLabel: {
    fontSize: isSmallDevice ? 12 : 14,
    opacity: 0.8,
  },
  submitButton: {
    padding: width * 0.04,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen; 