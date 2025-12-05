import { models, sequelize } from "../db/mysql.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //verificamos que el usuario existe
  const user = await models.usuarios.findOne({ where: { email } });

  //si el usuario existe verifico el hash
  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      _id: user.id,
      nombre_completo: user.nombre_completo,
      email: user.email,
      id_rol: user.id_rol,
      token: generarToken({
        id: user.id,
        id_rol: user.id_rol,
        email: user.email,
        nombre_completo: user.nombre_completo,
      }),
    });
  }

  res.status(404);
  throw new Error("Usuario no encontrado");
});

export const registerStudent = asyncHandler(async (req, res) => {
  const { email, password, nombre_completo, matricula, id_carrera, semestre } =
    req.body;

  if (!email || !password || !nombre_completo || !matricula || !id_carrera) {
    res.status(400);
    throw new Error("Faltan datos");
  }

  const result = await sequelize.transaction(async (t) => {
    const verifyUser = await models.usuarios.findOne({
      where: { [Op.or]: [{ email }, { nombre_completo }] },
      transaction: t,
    });

    const verifyStudent = await models.estudiantes.findOne({
      where: { matricula },
      transaction: t,
    });

    if (verifyUser || verifyStudent) {
      res.status(400);
      throw new Error("Este usuario o matrícula ya existe.");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const createUser = await models.usuarios.create(
      {
        email,
        password: passwordHashed,
        id_rol: 3,
        nombre_completo,
        estado: "activo",
      },
      { transaction: t }
    );

    const createStudent = await models.estudiantes.create(
      {
        matricula,
        id_carrera,
        semestre: semestre || "1ero",
        promedio: 0,
        id_usuario: createUser.id,
      },
      { transaction: t }
    );

    return { createUser, createStudent };
  });

  res.status(201).json({
    message: "Estudiante registrado con éxito",
    usuario: {
      id: result.createUser.id,
      nombre: result.createUser.nombre_completo,
      email: result.createUser.email,
      matricula: result.createStudent.matricula,
    },
  });
});

export const registerTeacher = asyncHandler(async (req, res) => {
  const { email, password, nombre_completo } = req.body;

  if (!email || !password || !nombre_completo) {
    res.status(400);
    throw new Error("Faltan datos");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  const response = await models.usuarios.create({
    id_rol: 2,
    email,
    password: passwordHashed,
    nombre_completo,
  });

  res.status(201).json(response);
});

const generarToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
