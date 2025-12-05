import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class estudiantes_cursos extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id_estudiante: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "estudiantes",
            key: "id",
          },
        },
        id_curso: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "cursos",
            key: "id",
          },
        },
        id_periodo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "periodos",
            key: "id",
          },
        },
        calificacion: {
          type: DataTypes.DECIMAL(4, 2),
          allowNull: true,
        },
        estado: {
          type: DataTypes.ENUM("cursando", "reprobado", "aprobado"),
          allowNull: true,
          defaultValue: "cursando",
        },
      },
      {
        sequelize,
        tableName: "estudiantes_cursos",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "id_estudiante" },
              { name: "id_curso" },
              { name: "id_periodo" },
            ],
          },
          {
            name: "id_curso",
            using: "BTREE",
            fields: [{ name: "id_curso" }],
          },
          {
            name: "id_periodo",
            using: "BTREE",
            fields: [{ name: "id_periodo" }],
          },
        ],
      }
    );
  }
}
