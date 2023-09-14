import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { client } from '@/components/Apollo/ApolloClient';
import AuthLayout from '@/components/Layout/Authenticated';
import Link from 'next/link';
import { addUserFavorite } from '@/services/firebase';
import Swal from 'sweetalert2';

const GET_ALL_POKEMON = gql`
  {
    getAllPokemon(take: 100) {
      sprite
      num
      species
      color
    }
  }
`;

function comparePokemonNumbers(a, b) {
  const numA = parseInt(a.num, 10);
  const numB = parseInt(b.num, 10);
  return Math.abs(numA) - Math.abs(numB);
}

const Pokemon = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(GET_ALL_POKEMON, {
    client: client,
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToFavorites = async (pokemon) => {
    try {
      await addUserFavorite(pokemon);
      Swal.fire({
        icon: 'success',
        title: 'Sukses',
        text: 'Pokemon berhasil ditambahkan ke favorit',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const pokemonList = data && data.getAllPokemon;

  const uniquePokemonList = Array.from(
    new Map(pokemonList.map((pokemon) => [pokemon.num, pokemon])).values()
  );

  const filteredPokemonList = uniquePokemonList.filter((pokemon) =>
    pokemon.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredPokemonList.sort(comparePokemonNumbers);

  return (
    <AuthLayout>
      <div className="my-4">
        <input
          type="text"
          placeholder="Cari Pokémon..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-auto" style={{ maxWidth: "900px" }}>
        {filteredPokemonList.map((pokemon, index) => (
          <div key={index} className="max-w-sm bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg p-4 m-2 transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <Link href={`/pokemon/${pokemon.num}`}>
              <div className="relative">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.species}
                  className="w-32 h-32 mx-auto"
                />
                <div className="absolute top-0 left-0 bg-white p-2 rounded-full">
                  <p className="text-sm text-gray-600">#{pokemon.num}</p>
                </div>
              </div>
              <p className="text-center text-xl font-semibold text-white mt-2">
                {pokemon.species}
              </p>
              <div className="text-center text-gray-200">
                <p>Color: {pokemon.color}</p>
              </div>
            </Link>
            <button
              onClick={() => handleAddToFavorites(pokemon)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4 transition-colors duration-300 ease-in-out"
            >
              Tambahkan ke Favorit
            </button>
          </div>
        ))}
      </div>
    </AuthLayout>
  );
};

export default Pokemon;
