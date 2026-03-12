import express from "express";
import { success } from "./helper.js";
import { logger } from "./middlewares/logger.js";
import { getUniqueId } from "./model/mock-pokemon.js";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();

app.use(logger);
app.use(morgan("dev")).use(bodyParser.json());

let pokemon = [
  {
    id: 1,
    name: "bullbizarre",
    hp: 25,
    cp: 5,
    picture:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    type: ["plante", "poison"],
    created: new Date(),
  },
  {
    id: 2,
    name: "Salamècge",
    hp: 25,
    cp: 5,
    picture:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
    type: ["plante", "poison"],
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/pokemon/", (req, res) => {
  console.log(`nombre de pokemon dans notre db : ${pokemon.length}`);
  //   res.send(`nombre de pokemon dans notre db : ${pokemon.length}`);
  res
    .status(200)
    .json(success("La liste de pokémon a été récupérée avec succès", pokemon));
});
app.get("/api/pokemon/:id", (req, res) => {
  let id = req.params.id;
  const foundPokemon = pokemon.find((p) => p.id === parseInt(id));
  const message = foundPokemon
    ? "Un pokémon a été trouvé"
    : "Aucun pokémon trouvé avec l'id " + id;
  res.json(success(message, foundPokemon));
});

app.post("/api/pokemon/", (req, res) => {
  const id = getUniqueId(pokemon);
  const pokemonCreated = { ...req.body, ...{ id, created: new Date() } };
  pokemon.push(pokemonCreated);
  const message = "Pokémon ajouté avec succès";
  res.json(success(message, pokemonCreated));
});

app.put("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  const index = pokemon.findIndex((p) => p.id === id);
  if (index !== -1) {
    pokemon[index] = pokemonUpdated;
  }
  const message = `Le pokemon  ${pokemonUpdated.name} a bien été mis à jour avec succès`;
  res.json(success(message, pokemonUpdated));
});

export default app;
