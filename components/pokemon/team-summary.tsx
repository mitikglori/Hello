import { StyleSheet, Text, View } from 'react-native';

type TeamSummaryProps = {
  teamSize: number;
  power: number;
  typeSummary: string;
};

export function TeamSummary({ teamSize, power, typeSummary }: TeamSummaryProps) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.title}>Team Snapshot</Text>
      <Text style={styles.body}>Members recruited: {teamSize}</Text>
      <Text style={styles.body}>Total combined power: {power}</Text>
      <Text style={styles.body}>{typeSummary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  body: {
    fontSize: 14,
    color: '#f4f3f1',
  },
});
