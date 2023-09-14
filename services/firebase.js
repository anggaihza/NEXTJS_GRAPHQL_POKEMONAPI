import { initializeApp, getApps } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBPfAyfiEkXQotEwrWwvwaj-v8a80aYGtQ",
    authDomain: "pokemon-gql.firebaseapp.com",
    projectId: "pokemon-gql",
    storageBucket: "pokemon-gql.appspot.com",
    messagingSenderId: "309863414629",
    appId: "1:309863414629:web:3944ac76d6ba1ddb7f3f8c"
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth()
export const db = getFirestore(app);

export const Authentication = () => {
    return FirebaseAuth
}

export const Signup = async (email, password) => {
    await createUserWithEmailAndPassword(FirebaseAuth, email, password)
}

export const SignIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(FirebaseAuth, email, password)
    } catch (error) {
        console.log(error);
        if (error.code === 'auth/invalid-login-credentials') {
            console.log('Invalid login credentials.');
        } else {
            console.log('An error occurred while signing in:', error.message);
        }
    }
}

export const SignOut = async () => {
    await signOut(FirebaseAuth)
}

// Mengambil daftar Pokémon favorit pengguna
export const getUserFavorites = async (userId) => {
    try {
        // Ambil data favorit dari Firestore
        const snapshot = await db.collection('users').doc(userId).collection('pokemon').get();

        // Ubah data snapshot ke dalam bentuk array JavaScript
        const favorites = snapshot.docs.map((doc) => doc.data());

        return favorites;
    } catch (error) {
        throw error;
    }
};

export const addUserFavorite = async (favoritePokemon) => {
    const currentUser = FirebaseAuth.currentUser;

    if (!currentUser) {
        throw new Error('User is not authenticated.'); // Anda dapat menangani ini sesuai kebutuhan
    }

    const userId = currentUser.uid;
    try {
        let docRef = await addDoc(collection(db, "pokemon"), {
            num: favoritePokemon.num,
            color: favoritePokemon.color,
            name: favoritePokemon.__typename,
            species: favoritePokemon.species,
            userId: userId,
        });

        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        throw error;
    }
};