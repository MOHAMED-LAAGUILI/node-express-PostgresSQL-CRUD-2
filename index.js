import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({

}))

const PORT = process.env.PORT || 3000;

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.warn(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("Error Running Server: ", e);
    process.exit(1);
  }
};


startServer();
