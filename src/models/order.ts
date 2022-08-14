import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export type Order_Products = {
  id?: number;
  quantity: number;
  product_id: number;
  order_id: number;
};

export class OrderStore {
  async getUserOrders(user_id: number): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=$1';

      const res = await connection.query(sql, [user_id]);

      connection.release();

      return res.rows;
    } catch (error) {
      throw new Error(`Could not get orders. Error: ${(error as Error).message}`);
    }
  }
  async addOrder(order: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (user_id,status) VALUES($1, $2) RETURNING *';
      const connection = await Client.connect();

      const res = await connection.query(sql, [order.user_id, order.status]);

      connection.release();

      return res.rows[0];
    } catch (error) {
      throw new Error(`Could not add new order to user . Error: ${(error as Error).message}`);
    }
  }
}
