import { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';

import type { Pokemon } from './types';

type PokemonCardProps = {
  pokemon: Pokemon;
  actionLabel: string;
  onPress?: (pokemon: Pokemon) => void;
};

export function PokemonCard({ pokemon, actionLabel, onPress }: PokemonCardProps) {
  const handlePress = useCallback(() => {
    onPress?.(pokemon);
  }, [onPress, pokemon]);

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <ThemedText type="defaultSemiBold">{pokemon.name}</ThemedText>
      <ThemedText>{pokemon.type}</ThemedText>
      <ThemedText>Power: {pokemon.power}</ThemedText>
      <ThemedText style={styles.cardAction}>{actionLabel}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.8,
  },
  cardAction: {
    marginTop: 8,
  },
});
