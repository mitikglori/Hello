import { StyleSheet, Text, View } from 'react-native';

import type { Pokemon } from './types';
import { PokemonCard } from './pokemon-card';

type PokemonListProps = {
  pokemon: Pokemon[];
  actionLabel: string;
  onAction: (pokemon: Pokemon) => void;
};

export function PokemonList({ pokemon, actionLabel, onAction }: PokemonListProps) {
  if (pokemon.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Every Pokémon is already on your team. Time to train!</Text>
      </View>
    );
  }

  return (
    <View style={styles.cardStack}>
      {pokemon.map((item) => (
        <PokemonCard key={item.id} pokemon={item} actionLabel={actionLabel} onPress={onAction} />
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
    color: '#f4f3f1',
    fontSize: 14,
  },
});
