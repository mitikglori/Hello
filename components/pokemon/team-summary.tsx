import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type TeamSummaryProps = {
  teamSize: number;
  power: number;
  typeSummary: string;
};

export function TeamSummary({ teamSize, power, typeSummary }: TeamSummaryProps) {
  return (
    <ThemedView style={styles.summaryCard}>
      <ThemedText type="subtitle">Team Snapshot</ThemedText>
      <ThemedText>Members recruited: {teamSize}</ThemedText>
      <ThemedText>Total combined power: {power}</ThemedText>
      <ThemedText>{typeSummary}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    gap: 4,
  },
});
