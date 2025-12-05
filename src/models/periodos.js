import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class periodos extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        fecha_inicio: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        fecha_fin: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        activo: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: "periodos",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
