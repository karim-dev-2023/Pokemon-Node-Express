import app from "./server.js";
import { initDb } from "./src/database/sequelize.js";
import * as pokemonsRoutes from "./src/routes/pokemons-routes.js";

const port = 3000;

// initialization of DB can be done inside server.js or via explicit seeder if needed
app.use(pokemonsRoutes.findAllPokemons());
pokemonsRoutes.findAllPokemons(app);
pokemonsRoutes.createPokemon(app);
pokemonsRoutes.findPokemonByPk(app);
pokemonsRoutes.updatePokemon(app);
pokemonsRoutes.deletePokemon(app);
// Middleware pour gérer les erreurs 404
app.use((req, res) => {
  const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({message});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
