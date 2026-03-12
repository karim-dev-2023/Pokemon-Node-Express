import express from "express";
import { success } from "./helper.js";
import { logger } from "./middlewares/logger.js";
import { getUniqueId } from "./src/database/mock-pokemon.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import { DataTypes } from "sequelize";
import { pokemon_model } from "./src/models/pokemon.js";
import { sequelize } from "./src/database/sequelize.js";
import { findPokemonByPk } from "./src/routes/pokemons-routes.js";

const app = express();

app.use(logger);
app.use(morgan("dev"));
app.use(bodyParser.json());
findPokemonByPk(app);
let pokemons = [
  {
    id: 1,
    name: "Bulbizarre",
    hp: 25,
    cp: 5,
    picture:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    type: ["plante", "poison"],
    created: new Date(),
  },
  {
    id: 2,
    name: "Salamèche",
    hp: 25,
    cp: 5,
    picture:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
    type: ["feu"],
    created: new Date(),
  },
  {
    id: 3,
    name: "Carapuce",
    hp: 25,
    cp: 5,
    picture:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
    type: ["eau"],
    created: new Date(),
  },
];

// création du modèle
const Pokemon = pokemon_model(sequelize, DataTypes);

// synchronisation avec la base
sequelize
  .sync({ force: true })
  .then(() => {
    console.log(
      "La synchronisation de notre modèle dans la base de données est réussie",
    );

    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.type || ["normal"],
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    console.log("Les données de la base ont bien été réinitialisées");
  })
  .catch((error) =>
    console.error(`Erreur de synchronisation : ${error.message}`),
  );

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/pokemon/", (req, res) => {
  console.log(`nombre de pokemon dans notre db : ${pokemons.length}`);
  res
    .status(200)
    .json(success("La liste de pokémon a été récupérée avec succès", pokemons));
});

app.get("/api/pokemon/:id", (req, res) => {
  let id = parseInt(req.params.id);
  const foundPokemon = pokemons.find((p) => p.id === id);
  const message = foundPokemon
    ? "Un pokémon a été trouvé"
    : "Aucun pokémon trouvé avec l'id " + id;
  res.json(success(message, foundPokemon));
});

app.post("/api/pokemon/", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, id, created: new Date() };
  pokemons.push(pokemonCreated);
  const message = "Pokémon ajouté avec succès";
  res.json(success(message, pokemonCreated));
});

app.put("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  const index = pokemons.findIndex((p) => p.id === id);

  if (index !== -1) {
    pokemons[index] = pokemonUpdated;
  }

  const message = `Le pokemon ${pokemonUpdated.name} a bien été mis à jour avec succès`;
  res.json(success(message, pokemonUpdated));
});
app.delete("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((p) => p.id === id);
  
  if (!pokemonDeleted) {
    const message = `Aucun pokémon trouvé avec l'id ${id}`;
    return res.status(404).json(success(message, null));
  }
  
  pokemons = pokemons.filter((p) => p.id !== id);
  const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé avec succès`;
  res.json(success(message, pokemonDeleted));
});

export default app;
export { pokemons };
