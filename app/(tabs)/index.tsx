import { Image } from 'expo-image';
import { useCallback, useMemo, useReducer } from 'react';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PokemonList } from '@/components/pokemon/pokemon-list';
import { PokemonTeam } from '@/components/pokemon/pokemon-team';
import { TeamSummary } from '@/components/pokemon/team-summary';
import type { Pokemon } from '@/components/pokemon/types';

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

const styles = StyleSheet.create({
  titleContainer: {
    gap: 4,
    marginBottom: 16,
  },
  section: {
    gap: 12,
    marginBottom: 24,
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
