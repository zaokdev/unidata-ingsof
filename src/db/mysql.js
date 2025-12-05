import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import initModels from "../models/init-models.js";

const { MYSQL_DB_NAME, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_HOST } =
  process.env;

const sequelize = new Sequelize(
  MYSQL_DB_NAME,
  MYSQL_DB_USER,
  MYSQL_DB_PASSWORD,
  {
    host: MYSQL_DB_HOST,
    dialect: "mysql",
    logging: true,
  }
);

const models = initModels(sequelize);

export { sequelize, models };
