import pkg from 'pg';
import { createUserModel } from './../model/user.model.js';

const { Pool } = pkg;

// Create a new Pool instance
const pool = new Pool({
    user: process.env.PG_USER || 'postgres', // Database username
    host: process.env.PG_HOST || 'localhost', // Database host
    database: process.env.PG_DATABASE || 'postgres', // Database name
    password: process.env.PG_PASSWORD || 'pg', // Database password
    port: process.env.PG_PORT || 5432, // Database port
    max: 20, // Max number of connections in the pool
    idleTimeoutMillis: 30000, // Idle connection timeout
    connectionTimeoutMillis: 2000, // Connection timeout
});

// Define a function to check the database connection
export const connection = async () => {
    try {
        // Try to connect to the PostgreSQL database
        const client = await pool.connect();
        console.log('Connected to PostgreSQL successfully');
        createUserModel(client);
        client.release(); // Release the client back to the pool after use
    } catch (e) {
        console.error('Unable to connect to PostgreSQL:', e);
        process.exit(1); // Exit the process if the database connection fails
    }
};

export { pool };
