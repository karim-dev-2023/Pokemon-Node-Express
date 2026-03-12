import app from "./server.js";
import { initDb } from "./src/database/sequelize.js";
import { pokemons } from "./server.js";
import * as pokemonsRoutes from "./src/routes/pokemons-routes.js";

const port = 3000;

initDb(pokemons);
app.use(pokemonsRoutes.findAllPokemons());
pokemonsRoutes.findAllPokemons(app);
pokemonsRoutes.createPokemon(app);
pokemonsRoutes.findPokemonByPk(app);
pokemonsRoutes.updatePokemon(app);
pokemonsRoutes.deletePokemon(app);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
