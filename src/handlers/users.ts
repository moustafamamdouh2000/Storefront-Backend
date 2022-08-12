import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authentication } from '../middlewares/authentication';
dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;

const store = new UserStore();

const addUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      password: req.body.password,
    };
    console.log(user);

    const newUser = await store.addUser(user);
    const token = jwt.sign(
      {
        user: {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          user_name: newUser.user_name,
          id: newUser.id,
        },
      },
      tokenSecret as string
    );
    res.json(token);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = (await store.authenticate(req.body.user_name, req.body.password)) as User;
    const token = jwt.sign(
      {
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          user_name: user.user_name,
          id: user.id,
        },
      },
      tokenSecret as string
    );
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error: 'wrong password or username' });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    res.json(await store.getAllUsers());
  } catch (error) {
    res.status(400);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    res.json(await store.getUser(parseInt(req.params.id)));
  } catch (error) {
    res.status(401);
  }
};

const userRoutes = (app: express.Application): void => {
  app.post('/add_user', addUser);
  app.post('/authenticate', authenticate);
  app.get('/get_users', authentication, getAllUsers);
  app.get('/get_user/:id', authentication, getUser);
};

export default userRoutes;
