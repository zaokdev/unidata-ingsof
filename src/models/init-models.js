import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _carreras from "./carreras.js";
import _cursos from "./cursos.js";
import _estudiantes from "./estudiantes.js";
import _estudiantes_cursos from "./estudiantes_cursos.js";
import _periodos from "./periodos.js";
import _roles from "./roles.js";
import _usuarios from "./usuarios.js";

export default function initModels(sequelize) {
  const carreras = _carreras.init(sequelize, DataTypes);
  const cursos = _cursos.init(sequelize, DataTypes);
  const estudiantes = _estudiantes.init(sequelize, DataTypes);
  const estudiantes_cursos = _estudiantes_cursos.init(sequelize, DataTypes);
  const periodos = _periodos.init(sequelize, DataTypes);
  const roles = _roles.init(sequelize, DataTypes);
  const usuarios = _usuarios.init(sequelize, DataTypes);

  estudiantes.belongsTo(carreras, {
    as: "id_carrera_carrera",
    foreignKey: "id_carrera",
  });
  carreras.hasMany(estudiantes, {
    as: "estudiantes",
    foreignKey: "id_carrera",
  });
  estudiantes_cursos.belongsTo(cursos, {
    as: "detalles_curso",
    foreignKey: "id_curso",
  });
  cursos.hasMany(estudiantes_cursos, {
    as: "estudiantes_cursos",
    foreignKey: "id_curso",
  });
  estudiantes_cursos.belongsTo(estudiantes, {
    as: "id_estudiante_estudiante",
    foreignKey: "id_estudiante",
  });
  estudiantes.hasMany(estudiantes_cursos, {
    as: "estudiantes_cursos",
    foreignKey: "id_estudiante",
  });
  estudiantes_cursos.belongsTo(periodos, {
    as: "id_periodo_periodo",
    foreignKey: "id_periodo",
  });
  periodos.hasMany(estudiantes_cursos, {
    as: "estudiantes_cursos",
    foreignKey: "id_periodo",
  });
  usuarios.belongsTo(roles, { as: "id_rol_role", foreignKey: "id_rol" });
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "id_rol" });
  cursos.belongsTo(usuarios, {
    as: "datos_profesor",
    foreignKey: "id_profesor",
  });
  usuarios.hasMany(cursos, { as: "cursos", foreignKey: "id_profesor" });
  estudiantes.belongsTo(usuarios, {
    as: "id_usuario_usuario",
    foreignKey: "id_usuario",
  });
  usuarios.hasOne(estudiantes, { as: "estudiante", foreignKey: "id_usuario" });

  return {
    carreras,
    cursos,
    estudiantes,
    estudiantes_cursos,
    periodos,
    roles,
    usuarios,
  };
}
