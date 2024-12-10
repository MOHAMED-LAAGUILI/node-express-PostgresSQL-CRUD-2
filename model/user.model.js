// Assuming you pass in a client from the pool to run queries
export const createUserModel = async (client) => {
  // Create table query if it doesn't exist, with additional fields
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          designation VARCHAR(255) NOT NULL,
          phone_number VARCHAR(20),
          address TEXT,
          date_of_birth DATE,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  `;
  
  // Execute the query to create the table 
  await client.query(createTableQuery);
  console.log('User table created or already exists');
};
