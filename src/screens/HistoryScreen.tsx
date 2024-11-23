import { format, subDays } from 'date-fns';
import React, { useContext, useMemo } from 'react';
import {
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { MoodContext } from '../context/MoodContext';
import { ThemeContext } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const HistoryScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { entries } = useContext(MoodContext);

  const moodStats = useMemo(() => {
    if (!entries.length) return null;
    
    const average = entries.reduce((acc, curr) => acc + curr.scale, 0) / entries.length;
    const highest = Math.max(...entries.map(e => e.scale));
    const lowest = Math.min(...entries.map(e => e.scale));
    
    return { average, highest, lowest };
  }, [entries]);

  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), i);
      const dayEntries = entries.filter(entry => 
        format(new Date(entry.timestamp), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );
      
      return {
        date: format(date, 'MM/dd'),
        value: dayEntries.length 
          ? dayEntries.reduce((acc, curr) => acc + curr.scale, 0) / dayEntries.length 
          : 0
      };
    }).reverse();

    return {
      labels: last7Days.map(d => d.date),
      datasets: [{
        data: last7Days.map(d => d.value || 0)
      }]
    };
  }, [entries]);

  const renderStatCard = (title: string, value: number | string, icon: string) => (
    <Animated.View 
      entering={FadeInDown.delay(200)}
      style={[styles.statCard, { backgroundColor: theme.colors.card }]}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
        <Icon name={icon} size={24} color={theme.colors.primary} />
      </View>
      <Text style={[styles.statValue, { color: theme.colors.text }]}>
        {typeof value === 'number' ? value.toFixed(1) : value}
      </Text>
      <Text style={[styles.statTitle, { color: `${theme.colors.text}80` }]}>
        {title}
      </Text>
    </Animated.View>
  );

  if (!entries.length) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
        <Icon name="analytics-outline" size={80} color={theme.colors.primary} />
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
          No Mood Data Yet
        </Text>
        <Text style={[styles.emptyText, { color: `${theme.colors.text}80` }]}>
          Start tracking your mood to see your history and insights here
        </Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <View style={styles.statsContainer}>
          {moodStats && (
            <>
              {renderStatCard('Average Mood', moodStats.average, 'stats-chart')}
              {renderStatCard('Highest Mood', moodStats.highest, 'trending-up')}
              {renderStatCard('Lowest Mood', moodStats.lowest, 'trending-down')}
            </>
          )}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Last 7 Days</Text>
        <View style={[styles.chartCard, { backgroundColor: theme.colors.card }]}>
          <LineChart
            data={chartData}
            width={width - 48}
            height={220}
            chartConfig={{
              backgroundColor: theme.colors.card,
              backgroundGradientFrom: theme.colors.card,
              backgroundGradientTo: theme.colors.card,
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(${theme.dark ? '99, 179, 237' : '43, 108, 176'}, ${opacity})`,
              labelColor: (opacity = 1) => theme.colors.text,
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: theme.colors.primary
              }
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Entries</Text>
        {entries.slice(-5).reverse().map((entry, index) => (
          <Animated.View 
            key={index}
            entering={FadeInDown.delay(index * 100)}
            style={[styles.entryCard, { backgroundColor: theme.colors.card }]}
          >
            <View style={styles.entryHeader}>
              <Text style={[styles.entryDate, { color: theme.colors.text }]}>
                {format(new Date(entry.timestamp), 'MMM dd, yyyy')}
              </Text>
              <Text style={[styles.entryMood, { color: theme.colors.primary }]}>
                {entry.scale.toFixed(1)}
              </Text>
            </View>
            {entry.note && (
              <Text style={[styles.entryNote, { color: `${theme.colors.text}80` }]}>
                {entry.note}
              </Text>
            )}
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: width * 0.04,
    paddingTop: Platform.OS === 'ios' ? 0 : width * 0.02,
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 13 : 14,
    fontWeight: '600',
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    marginLeft: width * 0.02,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  statCard: {
    flex: 1,
    margin: width * 0.01,
    padding: width * 0.04,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    padding: width * 0.02,
    borderRadius: 12,
    marginBottom: height * 0.01,
    width: width * 0.1,
    height: width * 0.1,
    minWidth: 36,
    minHeight: 36,
    maxWidth: 44,
    maxHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: isSmallDevice ? 18 : 20,
    fontWeight: 'bold',
    marginBottom: height * 0.005,
  },
  statTitle: {
    fontSize: isSmallDevice ? 11 : 12,
    textAlign: 'center',
  },
  chartCard: {
    padding: width * 0.04,
    borderRadius: 16,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  entryCard: {
    padding: width * 0.04,
    borderRadius: 16,
    marginBottom: height * 0.015,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  entryDate: {
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '500',
  },
  entryMood: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: 'bold',
  },
  entryNote: {
    fontSize: isSmallDevice ? 13 : 14,
    lineHeight: isSmallDevice ? 18 : 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.08,
  },
  emptyTitle: {
    fontSize: isSmallDevice ? 22 : 24,
    fontWeight: 'bold',
    marginTop: height * 0.03,
    marginBottom: height * 0.01,
  },
  emptyText: {
    fontSize: isSmallDevice ? 14 : 16,
    textAlign: 'center',
    lineHeight: isSmallDevice ? 22 : 24,
  },
});

export default HistoryScreen; 