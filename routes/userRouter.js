import express from 'express';
import { deleteUser, getAllUsers, getUser, saveUser, updateUser } from '../controller/userController.js';

const userRouter = express.Router();

// Route to render the form page (index) and display users
userRouter.get('/', getAllUsers); // Call getAllUsers to fetch users and render the page with users
userRouter.post('/submit-user', saveUser); // Call the saveUser function to handle form submission
userRouter.get('/get-user-to-edit/:userid', getUser); // Call the saveUser function to handle form submission
userRouter.post('/update-user/:userid', updateUser);
userRouter.get('/delete-user/:userid', deleteUser); // Delete user by id



export default userRouter;
