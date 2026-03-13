import { Sequelize, DataTypes } from "sequelize";
import { pokemon_model } from "../models/pokemon.js";
import { getUniqueId } from "./mock-pokemon.js";
import user_model from "../models/user.js";
import bcrypt from "bcrypt";

const sequelize = new Sequelize("pokemon", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = pokemon_model(sequelize, DataTypes);
const User = user_model(sequelize, DataTypes);

// hashing automatique des mots de passe
const SALT_ROUNDS = 10;
User.beforeCreate(async (user, options) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
});
User.beforeUpdate(async (user, options) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
});

const initDb = async (pokemonList) => {
  // Synchroniser la base de données sans forcer
  await sequelize.sync();

  // Vérifier si la base est déjà initialisée
  const pokemonCount = await Pokemon.count();
  const userCount = await User.count();
  if (pokemonCount > 0 && userCount > 0) {
    console.log("Base de données déjà initialisée");
    // Mettre à jour le mot de passe admin si nécessaire
    const adminUser = await User.findOne({ where: { username: "admin" } });
    if (adminUser) {
      adminUser.password = "admin";
      await adminUser.save();
      console.log("Mot de passe admin mis à jour");
    }
    return;
  }

  // compute admin hash synchronously before creating
  const adminHash = await bcrypt.hash("admin", SALT_ROUNDS);

  await Promise.all([
    ...pokemonList.map((pokemon) => {
      return Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    }),
    // insertion d'un utilisateur par défaut
    User.create({
      username: "admin",
      password: "admin",
    }).then((user) => console.log(user.toJSON())),
  ]);
};
sequelize
  .authenticate()
  .then(() => console.log("La connexion à la DB est établie avec succès"))
  .catch((error) =>
    console.error("Impossible de se connecter à la base de données", error),
  );

export { sequelize, initDb, Pokemon, User };
