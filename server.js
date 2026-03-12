import express from "express";
import { success } from "./helper.js";
import { logger } from "./middlewares/logger.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import { DataTypes } from "sequelize";
import { pokemon_model } from "./src/models/pokemon.js";
import { sequelize } from "./src/database/sequelize.js";
import {
  findAllPokemons,
  findPokemonByPk,
  createPokemon,
  updatePokemon,
  deletePokemon,
} from "./src/routes/pokemons-routes.js";

const app = express();

app.use(logger);
app.use(morgan("dev"));
app.use(bodyParser.json());

// on enregistre les routes Sequelize qui utilisent notre modèle
findAllPokemons(app);
findPokemonByPk(app);
createPokemon(app);
updatePokemon(app);
deletePokemon(app);

// création du modèle
const Pokemon = pokemon_model(sequelize, DataTypes);

// synchronisation avec la base
sequelize
  .sync({ force: true })
  .then(() => {
    console.log(
      "La synchronisation de notre modèle dans la base de données est réussie",
    );

    // vous pouvez remplir la base initialement ici si besoin
    console.log("La base de données a été réinitialisée");
  })
  .catch((error) =>
    console.error(`Erreur de synchronisation : ${error.message}`),
  );

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// les routes CRUD sont désormais définies dans src/routes/pokemons-routes.js
// aucune logique de tableau en mémoire ici


export default app;
