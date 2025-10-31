import { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

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
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.meta}>{pokemon.type}</Text>
      <Text style={styles.meta}>Power: {pokemon.power}</Text>
      <Text style={styles.action}>{actionLabel}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    gap: 4,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  meta: {
    fontSize: 14,
    color: '#f4f3f1',
  },
  action: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '500',
    color: '#ffe066',
  },
});
