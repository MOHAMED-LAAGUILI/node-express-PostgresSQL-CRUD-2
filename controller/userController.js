import { pool } from '../db/postgres.js';  
// Import the connection function
const isValidDate = (date) => {
    return !isNaN(Date.parse(date));  // Check if the date can be parsed
  }
  export const saveUser = async (req, res) => {
    const { name, email, designation, phone_number, address, date_of_birth, is_active } = req.body;
  
    // If the date is invalid, set it to null
    const formattedDateOfBirth = isValidDate(date_of_birth) ? date_of_birth : null;
  
    const query = `
      INSERT INTO users (name, email, designation, phone_number, address, date_of_birth, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [name, email, designation, phone_number, address, formattedDateOfBirth, is_active];
  
    try {
      const result = await pool.query(query, values);
      console.log(result);
      res.redirect('/');  // Redirect to the homepage or wherever you want after saving
    } catch (e) {
      console.error('Error saving user: ', e);
      res.status(500).json({ success: false, message: e.detail || 'Error saving user' });
    }
  };
  
export const getAllUsers = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      const users = result.rows;
      // Make sure you pass `users` as part of the render data
      res.render('index', { users });  // Render the page with users data
    } catch (e) {
      console.error('Error fetching users:', e);
      res.status(500).json(`Server error ${e}`);
    }
  };
export const getUser = async (req, res) => {
    const { userid } = req.params;
    const query = 'SELECT * FROM users WHERE id = $1';
    
    try {
      const result = await pool.query(query, [userid]);
      const user = result.rows[0];
      
      if (!user) {
        return res.status(404).send('User not found');
      }
      
      // Pass user data to the EJS template
      res.render('edit', { user });
    } catch (e) {
      console.error('Error fetching user: ', e);
      res.status(500).json({ success: false, error: e });
    }
  };
export const updateUser = async (req, res) => {
    const { userid } = req.params;
    const { name, email, designation, phone_number, address, date_of_birth, is_active } = req.body;
  
    const query = `
      UPDATE users 
      SET name = $1, email = $2, designation = $3, phone_number = $4, address = $5, 
          date_of_birth = $6, is_active = $7
      WHERE id = $8
      RETURNING *;
    `;
    const formattedDateOfBirth = isValidDate(date_of_birth) ? date_of_birth : null;

    const values = [name, email, designation, phone_number, address, formattedDateOfBirth, is_active, userid];
    
    try {
      const result = await pool.query(query, values);
      res.redirect('/');  // Redirect to the homepage or wherever you want after saving
    } catch (e) {
      console.error('Error updating user: ', e);
      res.status(500).json({ success: false, error: e });
    }
  };
  export const deleteUser = async (req, res) => {
    const { userid } = req.params; // Extract user id from the route parameter
  
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  
    try {
      const result = await pool.query(query, [userid]);
  
      // If no user is found to delete, respond with an error message
      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Redirect back to the list of users after deleting
      res.redirect('/'); // This can be redirected to any desired page
    } catch (e) {
      console.error('Error deleting user: ', e);
      res.status(500).json({ success: false, message: 'Error deleting user' });
    }
  };
