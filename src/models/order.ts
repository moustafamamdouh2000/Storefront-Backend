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
      const sql = 'SELECT * FROM orders WHERE user_id=' + user_id;

      const res = await connection.query(sql);

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
    } catch (err) {
      throw new Error(`Could not add new order to user . Error: ${(err as Error).message}`);
    }
  }

  // async addProductToOrder(
  //   quantity: number,
  //   orderId: number,
  //   productId: number
  // ): Promise<Order_Products> {
  //   try {
  //     const sql =
  //       'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
  //     const connection = await Client.connect();

  //     const res = await connection.query(sql, [quantity, orderId, productId]);

  //     const order: Order_Products = res.rows[0];

  //     connection.release();

  //     return order;
  //   } catch (error) {
  //     throw new Error(`Could not add product to order, Error: ${(error as Error).message}`);
  //   }
  // }
}
