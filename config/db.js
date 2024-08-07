// config/db.js
const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    const sequelize = new Sequelize(process.env.POSTGRES_URI, {
      dialect: 'postgres',
    });

    await sequelize.authenticate();
    console.log('PostgreSQL connected');

    return sequelize;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
