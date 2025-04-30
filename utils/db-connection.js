const {Sequelize}=require('sequelize');
const mysql=require('mysql2');

const sequelize = new Sequelize('expense_db', 'root', 'Poornima@3787', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectdb=async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been created");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports=sequelize;