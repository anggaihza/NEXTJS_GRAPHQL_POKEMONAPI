// pages/favorites.js
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/user';
import { getUserFavorites } from '@/services/firebaseFavoritesService';
import FavoritePokemonList from './FavoritePokemonList';

function Favorites() {
    const [favoritePokemons, setFavoritePokemons] = useState([]);

    const user = useUser()
    const { uid } = user

    useEffect(() => {
        const userId = uid; // Gantilah dengan ID pengguna yang sesuai
        getUserFavorites(userId)
            .then((favorites) => {
                setFavoritePokemons(favorites);
            })
            .catch((error) => {
                console.error('Error getting favorites:', error);
            });
    }, []);

    return (
        <div>
            <h1>Halaman Pokémon Favorit</h1>
            <FavoritePokemonList favoritePokemons={favoritePokemons} />
        </div>
    );
}

export default Favorites;
