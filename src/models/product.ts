import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async getAllProducts(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products';
      const res = await connection.query(sql);
      connection.release();

      return res.rows;
    } catch (error) {
      throw new Error(`Couldnt get all products, Error: ${(error as Error).message}`);
    }
  }

  async getProductByID(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const connection = await Client.connect();

      const res = await connection.query(sql, [id]);

      connection.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`Couldnt find product, Error: ${(error as Error).message}`);
    }
  }

  async addProduct(p: Product): Promise<Product> {
    try {
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const connection = await Client.connect();

      const res = await connection.query(sql, [p.name, p.price]);

      const product = res.rows[0];

      connection.release();

      return product;
    } catch (error) {
      throw new Error(`Couldnt add new product, Error: ${(error as Error).message}`);
    }
  }
}
