import app from "./server.js";
import { initDb } from "./src/database/sequelize.js";
import * as pokemonsRoutes from "./src/routes/pokemons-routes.js";
import * as userRoutes from "./src/routes/user-routes.js";
import authMdlr from "./src/auth/auth.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

// initialization of DB can be done inside server.js or via explicit seeder if needed
userRoutes.userLogin(app);
app.use(authMdlr);

app.use(pokemonsRoutes.findAllPokemons());
pokemonsRoutes.findAllPokemons(app);
pokemonsRoutes.createPokemon(app);
pokemonsRoutes.findPokemonByPk(app);
pokemonsRoutes.updatePokemon(app);
pokemonsRoutes.deletePokemon(app);


// Initialize database with initial data
const initialPokemons = [
  {
    name: "Bulbizarre",
    hp: 25,
    cp: 5,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    types: ["plante", "poison"],
  },
  {
    name: "Salamèche",
    hp: 25,
    cp: 5,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
    types: ["feu"],
  },
  {
    name: "Carapuce",
    hp: 25,
    cp: 5,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
    types: ["eau"],
  },
];

initDb(initialPokemons).then(() => {
  console.log("Base de données initialisée avec les données de test");
  // Start server only after DB is initialized
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((error) => {
  console.error("Erreur lors de l'initialisation de la base :", error);
  process.exit(1);
});

// Middleware pour gérer les erreurs 404
app.use((req, res) => {
  const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({message});
});
