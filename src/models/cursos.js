import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class cursos extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        nombre_curso: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        creditos: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_profesor: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "usuarios",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "cursos",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "id_profesor",
            using: "BTREE",
            fields: [{ name: "id_profesor" }],
          },
        ],
      }
    );
  }
}
