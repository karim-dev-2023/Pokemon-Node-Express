export const pokemon_model = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Le champ name est une propriété requise." },
          notEmpty: { msg: "Le champ name ne peut pas être vide." },
        },
      },

      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Le champ hp doit être un nombre entier." },
          notNull: { msg: "Le champ hp est une propriété requise." },
          min: {
            args: [0],
            msg: "Les points de dégâts hp doivent être supérieurs ou égaux à 0."
          },
          max: {
            args: [99],
            msg: "Les points de dégâts hp doivent être inférieurs ou égaux à 99."
          }
        }
      },

      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Le champ cp doit être un nombre entier." },
          notNull: { msg: "Le champ cp est une propriété requise." },
          min: {
            args: [0],
            msg: "Les points cp doivent être supérieurs ou égaux à 0."
          },
          max: {
            args: [99],
            msg: "Les points cp doivent être inférieurs ou égaux à 99."
          }
        }
      },

      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const types = this.getDataValue("types");
          return types ? types.split(",") : [];
        },
        set(types) {
          const typesString = Array.isArray(types)
            ? types.join(",")
            : types || "normal";
          this.setDataValue("types", typesString);
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};