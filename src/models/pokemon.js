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
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt: {msg: "Le champ hp doit être un nombre entier."},
          notNull: {msg: "Le champ hp est une propriété requise."},
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
         validate:{
          isInt: {msg: "Le champ cp doit être un nombre entier."},
          notNull: {msg: "Le champ cp est une propriété requise."},
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
          const typesString = Array.isArray(types) ? types.join(",") : (types || "normal");
          this.setDataValue("types", typesString);
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    },
  );
};
