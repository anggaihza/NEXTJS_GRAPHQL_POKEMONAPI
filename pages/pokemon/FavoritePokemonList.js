// components/FavoritePokemonList.js
import React from 'react';

function FavoritePokemonList({ favoritePokemons }) {
    return (
        <div>
            <h2>Daftar Pokémon Favorit</h2>
            <ul>
                {favoritePokemons.map((pokemon) => (
                    <li key={pokemon.id}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default FavoritePokemonList;
