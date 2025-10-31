import { Image } from 'expo-image';
import { useCallback, useMemo, useReducer } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type Pokemon = {
  id: string;
  name: string;
  type: string;
  power: number;
};

type TeamState = {
  team: Pokemon[];
};

type TeamAction =
  | { type: 'catch'; pokemon: Pokemon }
  | { type: 'release'; id: string };

const POKEMON_LIST: Pokemon[] = [
  { id: '001', name: 'Bulbasaur', type: 'Grass / Poison', power: 42 },
  { id: '004', name: 'Charmander', type: 'Fire', power: 48 },
  { id: '007', name: 'Squirtle', type: 'Water', power: 44 },
  { id: '025', name: 'Pikachu', type: 'Electric', power: 50 },
  { id: '039', name: 'Jigglypuff', type: 'Fairy', power: 38 },
  { id: '133', name: 'Eevee', type: 'Normal', power: 46 },
];

function teamReducer(state: TeamState, action: TeamAction): TeamState {
  switch (action.type) {
    case 'catch':
      if (state.team.some((member) => member.id === action.pokemon.id)) {
        return state;
      }
      return { team: [...state.team, action.pokemon] };
    case 'release':
      return { team: state.team.filter((member) => member.id !== action.id) };
    default:
      return state;
  }
}

export default function HomeScreen() {
  const [state, dispatch] = useReducer(teamReducer, { team: [] });

  const availablePokemon = useMemo(
    () => POKEMON_LIST.filter((pokemon) => !state.team.some((member) => member.id === pokemon.id)),
    [state.team],
  );

  const totalPower = useMemo(
    () => state.team.reduce((sum, pokemon) => sum + pokemon.power, 0),
    [state.team],
  );

  const teamTypeSummary = useMemo(() => {
    if (state.team.length === 0) {
      return 'No Pokémon recruited yet. Catch a partner to start your team!';
    }

    const typeCounts = state.team.reduce<Record<string, number>>((acc, pokemon) => {
      const key = pokemon.type;
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(typeCounts)
      .map(([type, count]) => `${type} ×${count}`)
      .join(' • ');
  }, [state.team]);

  const handleCatch = useCallback(
    (pokemon: Pokemon) => {
      dispatch({ type: 'catch', pokemon });
    },
    [dispatch],
  );

  const handleRelease = useCallback(
    (id: string) => {
      dispatch({ type: 'release', id });
    },
    [dispatch],
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFD76F', dark: '#1D1A0F' }}
      headerImage={
        <Image source={require('@/assets/images/partial-react-logo.png')} style={styles.headerImage} />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pokémon Team Planner</ThemedText>
        <ThemedText>Build your dream squad with strategy in mind.</ThemedText>
      </ThemedView>

      <TeamSummary power={totalPower} typeSummary={teamTypeSummary} teamSize={state.team.length} />

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Available Pokémon</ThemedText>
        <PokemonList pokemon={availablePokemon} actionLabel="Catch" onAction={handleCatch} />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Your Team</ThemedText>
        <PokemonTeam
          team={state.team}
          onRelease={handleRelease}
          emptyHint="Your Poké Balls are ready. Catch a Pokémon to see it here!"
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

type PokemonListProps = {
  pokemon: Pokemon[];
  actionLabel: string;
  onAction: (pokemon: Pokemon) => void;
};

function PokemonList({ pokemon, actionLabel, onAction }: PokemonListProps) {
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

type PokemonTeamProps = {
  team: Pokemon[];
  onRelease: (id: string) => void;
  emptyHint: string;
};

function PokemonTeam({ team, onRelease, emptyHint }: PokemonTeamProps) {
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

type TeamSummaryProps = {
  teamSize: number;
  power: number;
  typeSummary: string;
};

function TeamSummary({ teamSize, power, typeSummary }: TeamSummaryProps) {
  return (
    <ThemedView style={styles.summaryCard}>
      <ThemedText type="subtitle">Team Snapshot</ThemedText>
      <ThemedText>Members recruited: {teamSize}</ThemedText>
      <ThemedText>Total combined power: {power}</ThemedText>
      <ThemedText>{typeSummary}</ThemedText>
    </ThemedView>
  );
}

type PokemonCardProps = {
  pokemon: Pokemon;
  actionLabel: string;
  onPress?: (pokemon: Pokemon) => void;
};

function PokemonCard({ pokemon, actionLabel, onPress }: PokemonCardProps) {
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
  titleContainer: {
    gap: 4,
    marginBottom: 16,
  },
  section: {
    gap: 12,
    marginBottom: 24,
  },
  cardStack: {
    gap: 12,
  },
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
  summaryCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    gap: 4,
  },
  emptyState: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerImage: {
    height: 160,
    width: 160,
    bottom: 0,
    right: 24,
    position: 'absolute',
    opacity: 0.8,
  },
});
