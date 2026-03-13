import { Pokemon } from "../database/sequelize.js";
import express from "express";

const app = express.Router();

export function findAllPokemons() {
  app.get("/api/pokemons", (req, res) => {
    Pokemon.findAll()
      .then((pokemons) => {
        const message = "La liste des pokémons a bien été récupérée.";
        res.json({ message, data: pokemons });
      })
      .catch((error) => {
        const message = "Erreur lors de la récupération des pokémons.";
        res.status(500).json({ message, data: error });
      });
  });
  return app;
}

export function findPokemonByPk(app) {
  app.get("/api/pokemons/:id", (req, res) => {
    let pokemonId = req.params.id;

    Pokemon.findByPk(pokemonId)
      .then((pokemon) => {
        if (pokemon === null) {
          const message = "Aucun pokemon n'a été trouvé !";
          return res.status(404).json({ message });
        }

        const message = "Un pokémon a bien été trouvé.";
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message = "Erreur lors de la récupération du pokemon.";
        res.status(500).json({ message, data: error });
      });
  });
}

export function createPokemon(app) {
  app.post("/api/pokemons/", (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `Le pokémon ${req.body.name} a bien été créé.`;
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message = "Erreur lors de la création du pokemon.";
        res.status(500).json({ message, data: error });
      });
  });
}

export function updatePokemon(app) {
  app.put("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Pokemon.update(req.body, { where: { id } })
      .then(([affectedCount]) => {
        if (affectedCount === 0) {
          const message = "Le pokémon n'existe pas.";
          return res.status(404).json({ message });
        }
        Pokemon.findByPk(id).then((pokemon) => {
          const message = `Le pokémon ${pokemon.name} a bien été mis à jour.`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((error) => {
        const message = "Le pokémon n'a pas pu être mis à jour.";
        res.status(500).json({ message, data: error });
      });
  });
}

export function deletePokemon(app) {
  app.delete("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
      const pokemonDeleted = pokemon;
      Pokemon.destroy({ where: { id: req.params.id } })
        .then((_) => {
          const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
          res.json({ message, data: pokemonDeleted });
        })
        .catch((error) => {
          const message = "Le pokémon n'a pas pu être supprimé.";
          res.status(500).json({ message, data: error });
        });
    });
  });
}
