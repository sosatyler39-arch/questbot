import pg from 'pg';
import pgvector from 'pgvector/pg';

// Pool is created lazily-connected; pg only opens a connection on first query.
export const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
pool.on('connect', (client) => {
  pgvector.registerType(client);
});
