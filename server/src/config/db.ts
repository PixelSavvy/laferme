// src/config/db.ts
import { Sequelize } from 'sequelize';

const sqlOptions = {
  database: process.env.DB_NAME!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
};

// Initialize Sequelize with the correct environment configuration
export const sequelize = new Sequelize(sqlOptions.database, sqlOptions.username, sqlOptions.password, {
  host: sqlOptions.host,
  dialect: 'postgres',
  port: sqlOptions.port,
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('Database synchronized!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
