import { Sequelize } from "sequelize";
require("dotenv").config({ __dirname: "../.env" });

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
  user: process.env.PG_USER!,
  host: process.env.PG_HOST!,
  password: process.env.PG_PASSWORD!,
  database: process.env.PG_DATABASE,
  port: +process.env.PG_PORT!,
});

export default dbConnection;
