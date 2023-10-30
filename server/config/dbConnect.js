const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ql_phongtro", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (err) {
    console.log("Unable to connect the database:", err);
  }
};

module.exports = connectDB;
