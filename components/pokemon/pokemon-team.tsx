import { StyleSheet, Text, View } from 'react-native';

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
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>{emptyHint}</Text>
      </View>
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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  emptyText: {
    fontSize: 14,
    color: '#f4f3f1',
  },
});
