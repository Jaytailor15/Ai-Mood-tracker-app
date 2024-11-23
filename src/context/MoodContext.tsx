import { format, subDays } from 'date-fns';
import React, { createContext, ReactNode, useState } from 'react';
import { MoodEntry } from '../types';

// Sample data for the last 7 days
const sampleData: MoodEntry[] = [
  {
    scale: 4.5,
    note: "Had a great day! Completed all my tasks and enjoyed time with family.",
    timestamp: subDays(new Date(), 0),
    mood: "Happy",
    date: format(subDays(new Date(), 0), 'yyyy-MM-dd'),
  },
  {
    scale: 3.5,
    note: "Normal day at work, feeling okay.",
    timestamp: subDays(new Date(), 1),
    mood: "Neutral",
    date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
  },
  {
    scale: 4.0,
    note: "Started a new project, feeling excited!",
    timestamp: subDays(new Date(), 2),
    mood: "Excited",
    date: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
  },
  {
    scale: 3.0,
    note: "Bit tired today, but managing well.",
    timestamp: subDays(new Date(), 3),
    mood: "Neutral",
    date: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
  },
  {
    scale: 4.8,
    note: "Amazing day! Got great news about my project.",
    timestamp: subDays(new Date(), 4),
    mood: "Happy",
    date: format(subDays(new Date(), 4), 'yyyy-MM-dd'),
  },
  {
    scale: 3.8,
    note: "Productive day, achieved my goals.",
    timestamp: subDays(new Date(), 5),
    mood: "Neutral",
    date: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
  },
  {
    scale: 4.2,
    note: "Relaxing weekend, feeling refreshed.",
    timestamp: subDays(new Date(), 6),
    mood: "Relaxed",
    date: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
  },
];

type MoodContextType = {
  entries: MoodEntry[];
  addEntry: (entry: MoodEntry) => void;
};

export const MoodContext = createContext<MoodContextType>({
  entries: [],
  addEntry: () => {},
});

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with sample data
  const [entries, setEntries] = useState<MoodEntry[]>(sampleData);

  const addEntry = (entry: MoodEntry) => {
    setEntries([...entries, entry]);
  };

  return (
    <MoodContext.Provider value={{ entries, addEntry }}>
      {children}
    </MoodContext.Provider>
  );
}; 