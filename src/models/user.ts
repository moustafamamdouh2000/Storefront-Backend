import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import client from '../database';
dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const salt_rounds = process.env.SALT_ROUNDS;

export type User = {
  id?: number;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async getAllUsers(): Promise<User[]> {
    try {
      return (await (await Client.connect()).query('SELECT * FROM users')).rows;
    } catch (error) {
      throw new Error(`Could not get all users, Error: ${(error as Error).message}`);
    }
  }
  async getUser(user_id: number): Promise<User> {
    try {
      return (
        await (await Client.connect()).query('SELECT * FROM users WHERE id=$1', [user_id])
      ).rows[0];
    } catch (error) {
      throw new Error(`Could not get the user, Error: ${(error as Error).message}`);
    }
  }
  async addUser(user: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (first_name, last_name,user_name,password) VALUES($1, $2, $3, $4) RETURNING *';
      const connection = await Client.connect();
      const hash: string = bcrypt.hashSync(
        user.password + pepper,
        parseInt(salt_rounds as string)
      );

      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        user.user_name,
        hash,
      ]);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new user, Error: ${(err as Error).message}`);
    }
  }
  async authenticate(user_name: string, password: string): Promise<User | string> {
    const sql = 'SELECT * FROM users WHERE user_name=$1';
    const connection = await Client.connect();

    const res = await connection.query(sql, [user_name]);
    connection.release();

    if (res.rows.length) {
      if (bcrypt.compareSync(password + pepper, res.rows[0].password)) {
        return res.rows[0];
      }
    }
    return 'wrong password or username';
  }
}
