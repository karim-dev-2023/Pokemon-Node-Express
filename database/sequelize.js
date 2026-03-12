import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "pokedex",
  "balde",
  "161100",
  {
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
      timezone: "Etc/GMT-2"
    },
    logging: false
  }
);

sequelize.authenticate()
  .then(() => console.log("La connexion à la DB est établie avec succès"))
  .catch(error => console.error("Impossible de se connecter à la base de données", error));

export default sequelize;