import { Image } from 'expo-image';
import { useCallback, useMemo, useReducer } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PokemonList } from './pokemon-list';
import { PokemonTeam } from './pokemon-team';
import { TeamSummary } from './team-summary';
import type { Pokemon } from './types';

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

export function PokemonPlannerScreen() {
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
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pokémon Team Planner</Text>
          <Text style={styles.subtitle}>Build your dream squad with strategy in mind.</Text>
        </View>
        <Image source={require('@/assets/images/partial-react-logo.png')} style={styles.headerImage} />
      </View>

      <TeamSummary power={totalPower} typeSummary={teamTypeSummary} teamSize={state.team.length} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Pokémon</Text>
        <PokemonList pokemon={availablePokemon} actionLabel="Catch" onAction={handleCatch} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Team</Text>
        <PokemonTeam
          team={state.team}
          onRelease={handleRelease}
          emptyHint="Your Poké Balls are ready. Catch a Pokémon to see it here!"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#15141a',
  },
  content: {
    padding: 24,
    gap: 24,
  },
  hero: {
    backgroundColor: '#2f2a45',
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
  },
  titleContainer: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#f4f3f1',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerImage: {
    height: 140,
    width: 140,
    position: 'absolute',
    bottom: -12,
    right: -12,
    opacity: 0.75,
  },
});
