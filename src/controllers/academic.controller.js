import asyncHandler from "express-async-handler";
import { models, sequelize } from "../db/mysql.js";

export const createSubject = asyncHandler(async (req, res) => {
  const { nombre_curso, creditos, id_profesor } = req.body;

  if (!nombre_curso || !creditos || !id_profesor) {
    res.status(400);
    throw new Error("Faltan datos");
  }

  const verifyTeacher = await models.usuarios.findOne({
    where: { id: id_profesor },
  });

  console.log(verifyTeacher);

  if (!verifyTeacher) {
    res.status(404);
    throw new Error("Profesor no encontrado");
  }

  if (verifyTeacher.id_rol != 2) {
    res.status(400);
    throw new Error("No es un profesor");
  }

  const response = await models.cursos.create({
    nombre_curso,
    creditos,
    id_profesor,
  });

  res.status(201).json(response);
});

export const registerForTheClass = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { id_curso, id_periodo } = req.body;

  await sequelize.transaction(async (t) => {
    const curso = await models.cursos.findByPk(id_curso, {
      lock: true,
      transaction: t,
    });

    if (!curso) {
      res.status(404);
      throw new Error("Curso no encontrado");
    }

    if (curso.cupo <= 0) {
      res.status(400);
      throw new Error("Cupo lleno");
    }

    await models.estudiantes_cursos.create(
      {
        id_estudiante: id,
        id_curso,
        id_periodo,
      },
      { transaction: t }
    );

    curso.cupo -= 1;
    await curso.save({ transaction: t });
  });

  res.status(201).json({ mensaje: "Inscripción exitosa" });
});

export const getTeacherClasses = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const response = await models.cursos.findAll({
    where: { id_profesor: id },
  });

  res.status(200).json(response);
});

export const getStudentClasses = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const response = await models.estudiantes_cursos.findAll({
    where: { id_estudiante: id },
    attributes: { exclude: ["id_estudiante", "id_periodo"] },

    include: {
      model: models.cursos,
      as: "detalles_curso",
      attributes: {},
      include: [
        {
          model: models.usuarios,
          as: "datos_profesor",
          attributes: {
            exclude: ["password", "id_rol"],
          },
        },
      ],
    },
  });

  res.status(200).json(response);
});
