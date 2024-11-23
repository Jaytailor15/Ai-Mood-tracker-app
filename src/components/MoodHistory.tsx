import { format } from 'date-fns';
import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';
import { MoodEntry } from '../types';

interface Props {
  entries: MoodEntry[];
}

export const MoodHistory: React.FC<Props> = ({ entries }) => {
  const { theme } = useContext(ThemeContext);

  if (entries.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.card }]}>
        <Icon name="analytics-outline" size={60} color={theme.colors.primary} />
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
          No Mood Data Yet
        </Text>
        <Text style={[styles.emptyText, { color: theme.colors.text }]}>
          Start tracking your mood to see your history here
        </Text>
      </View>
    );
  }

  const chartData = {
    labels: entries.slice(-7).map(entry => 
      format(new Date(entry.timestamp), 'MM/dd')
    ),
    datasets: [{
      data: entries.slice(-7).map(entry => entry.scale)
    }]
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Mood History</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: theme.colors.card,
          backgroundGradientFrom: theme.colors.card,
          backgroundGradientTo: theme.colors.card,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(${theme.dark ? '99, 179, 237' : '43, 108, 176'}, ${opacity})`,
          labelColor: (opacity = 1) => theme.colors.text,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: theme.colors.primary
          },
          propsForLabels: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
        style={styles.chart}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#1A2138',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyContainer: {
    padding: 20,
    margin: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
}); 