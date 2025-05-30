import { DataSource } from 'typeorm';
import * as entities from '@entities'
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: Object.values(entities), // Auto-load all entities
  migrations: ['src/migrations/*.ts'],
  migrationsRun: true, // Automatically run migrations on startup
  synchronize: false,
  logging: true,
});
