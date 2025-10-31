import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import type { Pokemon } from './types';
import { PokemonCard } from './pokemon-card';

type PokemonTeamProps = {
  team: Pokemon[];
  onRelease: (id: string) => void;
  emptyHint: string;
};

export function PokemonTeam({ team, onRelease, emptyHint }: PokemonTeamProps) {
  if (team.length === 0) {
    return (
      <ThemedView style={styles.emptyState}>
        <ThemedText>{emptyHint}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <View style={styles.cardStack}>
      {team.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          actionLabel="Release"
          onPress={(member) => onRelease(member.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cardStack: {
    gap: 12,
  },
  emptyState: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});
