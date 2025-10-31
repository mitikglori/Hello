import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

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
      <ThemedView style={styles.emptyState}>
        <ThemedText>Every Pokémon is already on your team. Time to train!</ThemedText>
      </ThemedView>
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
  },
});
