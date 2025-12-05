import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class usuarios extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: "email",
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        nombre_completo: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        id_rol: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "roles",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "usuarios",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "email",
            unique: true,
            using: "BTREE",
            fields: [{ name: "email" }],
          },
          {
            name: "id_rol",
            using: "BTREE",
            fields: [{ name: "id_rol" }],
          },
        ],
      }
    );
  }
}
