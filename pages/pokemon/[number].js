import React from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { client } from '@/components/Apollo/ApolloClient';
import AuthLayout from '@/components/Layout/Authenticated';

const GET_POKEMON_DETAILS = gql`
  query GetPokemonByDexNumber($number: Int!) {
    getPokemonByDexNumber(number: $number) {
      key
      backSprite
      baseForme
      baseSpecies
      baseStatsTotal
      bulbapediaPage
      color
      cosmeticFormes
      eggGroups
      evolutionLevel
      forme
      formeLetter
      height
      isEggObtainable
      levellingRate
      maximumHatchTime
      minimumHatchTime
      num
      otherFormes
      serebiiPage
      shinyBackSprite
      shinySprite
      smogonPage
      smogonTier
      species
      sprite
      weight
      mythical
      legendary
    }
  }
`;

const Pokemon = () => {
  const router = useRouter();
  const { number } = router.query; // Mengambil nomor Pokémon dari URL

  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    client: client,
    variables: {
      number: parseInt(number) || 1, // Menggunakan nomor Pokémon dari URL atau 1 jika tidak ada dalam URL
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const pokemon = data && data.getPokemonByDexNumber;

  return (
    <AuthLayout>
      <div className="bg-gradient-to-r from-yellow-300 via-red-500 to-blue-500 rounded-lg shadow-lg p-6 mx-auto mt-10 max-w-md mb-14">
        <h1 className="text-4xl font-bold text-center text-white mb-4">{pokemon.species}</h1>
        <div className="flex justify-center">
          <img src={pokemon.sprite} alt={pokemon.species} className="w-64 h-64 rounded-full border-4 border-white" />
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold text-white">Number: {pokemon.num}</p>
          <p className="text-lg font-semibold text-white">Color: {pokemon.color}</p>
          <p className="text-lg font-semibold text-white">Height: {pokemon.height} m</p>
          <p className="text-lg font-semibold text-white">Weight: {pokemon.weight} kg</p>
          <p className="text-lg font-semibold text-white">Base Stats Total: {pokemon.baseStatsTotal}</p>
          <p className="text-lg font-semibold text-white">Is Egg Obtainable: {pokemon.isEggObtainable ? 'Yes' : 'No'}</p>
          <p className="text-lg font-semibold text-white">Mythical: {pokemon.mythical ? 'Yes' : 'No'}</p>
          <p className="text-lg font-semibold text-white">Legendary: {pokemon.legendary ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Pokemon;
