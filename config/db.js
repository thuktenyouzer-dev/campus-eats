const db = pgp({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'campus_eats_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'yourpassword',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

module.exports = db;