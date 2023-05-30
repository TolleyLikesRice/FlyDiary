require('dotenv').config();

/** @type {import('kanel').Config} */
module.exports = {
    connection: {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE
    },

  preDeleteOutputFolder: true,
  outputPath: './src/models',

  customTypeMap: {
    'pg_catalog._text': 'string[]',
    'pg_catalog.time': 'string'
  }
};
