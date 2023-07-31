import express from 'express';
import doteenv from 'dotenv';
import { envs, Client } from 'stytch';
import cors from 'cors';

doteenv.config();

const app = express();

const client = new Client({
  project_id: process.env.PROJECT_ID,
  secret: process.env.SECRET,
  envs: envs.test,
});

const port = 1212;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.json({
//     sucess: true,
//     message: 'Welcome to the Stytch API',
//   });
// });
// routes
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await client.passwords.create({
      email,
      password,
      session_duration_minutes: 60,
    });
    res.json({
      success: true,
      message: 'User created',
      token: response.session_token,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
      error: err,
    });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await client.passwords.authenticate({
      email,
      password,
      session_duration_minutes: 60,
    });
    res.json({
      sucess: true,
      message: 'User logged in successfully',
      token: response.session_token,
    });
  } catch (err) {
    console.log(err);
    res.json({
      sucess: false,
      message: err.message,
      error: err,
    });
  }
});
app.post('/authenticate', async (req, res) => {
  const { session_token } = req.body;

  try {
    await client.sessions.authenticate({
      session_token,
    });
    res.json({
      sucess: true,
      message: 'Token authenticated successfully',
    });
  } catch (err) {
    console.log(err);
    res.json({
      sucess: false,
      message: err.message,
      error: err,
    });
  }
});
app.post('/logout', async (req, res) => {
  const { session_token } = req.body;

  try {
    await client.sessions.revoke({
      session_token,
    });
    res.json({
      sucess: true,
      message: 'successfully logged out',
    });
  } catch (err) {
    console.log(err);
    res.json({
      sucess: false,
      message: err.message,
      error: err,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
