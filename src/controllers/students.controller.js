import asyncHandler from "express-async-handler";
import { models } from "../db/mysql.js";

export const getAllStudents = asyncHandler(async (req, res) => {
  const { semestre, matricula, id_carrera, estado } = req.query;

  const filtro = {
    ...(semestre && { semestre }),
    ...(matricula && { matricula }),
    ...(id_carrera && { id_carrera }),
    ...(estado && { estado }),
  };

  const response = await models.usuarios.findAll({
    where: { id_rol: 3 },
    attributes: { exclude: ["password", "id_rol"] },
    include: {
      model: models.estudiantes,
      as: "estudiante",
    },
  });

  res.status(200).json(response);
});

export const modifyStudentData = asyncHandler(async (req, res) => {
  const { matricula, semestre, id_carrera, promedio, estado } = req.body;
  const { id } = req.params;

  const data = {
    ...(semestre && { semestre }),
    ...(matricula && { matricula }),
    ...(id_carrera && { id_carrera }),
    ...(promedio && { promedio }),
    ...(estado && { estado }),
  };

  if (!id) {
    res.status(400);
    throw new Error("No se envio id");
  }
  if (Object.keys(data).length === 0) {
    res.status(400);
    throw new Error("No se envio ningun dato");
  }

  const response = await models.estudiantes.update(data, { where: { id } });

  res.status(204).json(response);
});

export const dismissStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const darBaja = {
    estado: "baja",
  };

  if (!id) {
    res.status(400);
    throw new Error("No se envio id");
  }

  const response = await models.estudiantes.update(darBaja, { where: { id } });

  res.status(202).json({ mensaje: "DADO DE BAJA", response });
});
