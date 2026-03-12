export const pokemon_model = (sequelize, DataTypes) => {
    return sequelize.define("Pokemon", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
};