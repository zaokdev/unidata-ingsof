import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class estudiantes extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        matricula: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: "matricula",
        },
        semestre: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        promedio: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: true,
          defaultValue: 0.0,
        },
        estado: {
          type: DataTypes.ENUM("activo", "baja"),
          allowNull: true,
          defaultValue: "activo",
        },
        id_usuario: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "usuarios",
            key: "id",
          },
          unique: "estudiantes_ibfk_1",
        },
        id_carrera: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "carreras",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "estudiantes",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "matricula",
            unique: true,
            using: "BTREE",
            fields: [{ name: "matricula" }],
          },
          {
            name: "id_usuario",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id_usuario" }],
          },
          {
            name: "fk_estudiantes_carreras",
            using: "BTREE",
            fields: [{ name: "id_carrera" }],
          },
        ],
      }
    );
  }
}
