const { Pool, Client } = require("pg");
import { Sequelize } from "sequelize";

var types = require("pg").types;

const getDb = ({
  user = "",
  password = "",
  host = "",
  port = 5432,
  database = "",
}) => {
  const sequelize: Sequelize = new Sequelize(database, user, password, {
    host: "localhost",
    dialect: "postgres",
  });

  sequelize
    .authenticate()
    .then((res) => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  return sequelize;
};

const dbConnection: Sequelize = getDb({
  user: process.env.PGUSER!,
  host: process.env.PGHOST!,
  password: process.env.PGPASSWORD!,
  database: process.env.PGDATABASE,
  port: +process.env.PGPORT!,
});

export default dbConnection;
