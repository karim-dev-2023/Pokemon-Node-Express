import { Sequelize, DataTypes } from "sequelize";
import { pokemon_model } from "../models/pokemon.js";
import { getUniqueId } from "./mock-pokemon.js";


const sequelize = new Sequelize("pokemon", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = pokemon_model(sequelize, DataTypes);
const initDb = (pokemonList) => {  // Ajouter pokemon en paramètre
  return sequelize.sync({ force: true }).then((_) => {
    return Promise.all(
      pokemonList.map((pokemon) => {
        return Pokemon.create({
          name: pokemon.name,
          hp: pokemon.hp,
          cp: pokemon.cp,
          picture: pokemon.picture,
          types: pokemon.types,
        }).then((pokemon) => console.log(pokemon.toJSON()));
      })
    );
  });
};
sequelize
  .authenticate()
  .then(() => console.log("La connexion à la DB est établie avec succès"))
  .catch((error) =>
    console.error("Impossible de se connecter à la base de données", error),
  );

export { sequelize, initDb, Pokemon };
