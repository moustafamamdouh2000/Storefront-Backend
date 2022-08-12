import express, { Request, Response } from 'express';
import { authentication } from '../middlewares/authentication';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const addOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };

    const newOrder = await store.addOrder(order);

    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json((error as Error).message);
  }
};

// const addProductToOrder = async (req: Request, res: Response) => {
//   try {
//     const orderId: number = parseInt(req.params.id);
//     const productId: number = parseInt(req.body.product_id);
//     const quantity: number = parseInt(req.body.quantity);
//     const addedProduct = await store.addProductToOrder(quantity, orderId, productId);
//     res.json(addedProduct);
//   } catch (error) {
//     res.status(400);
//     res.json((error as Error).message);
//   }
// };

const getUserOrders = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  try {
    const addedProduct = await store.getUserOrders(userId);
    res.json(addedProduct);
  } catch (error) {
    res.status(400);
    res.json((error as Error).message);
  }
};

const orderRoutes = (app: express.Application): void => {
  app.post('/add_order', authentication, addOrder);
  // app.post('/add_product_order/:id', authentication, addProductToOrder);
  app.get('/get_user_orders/:id', authentication, getUserOrders);
};

export default orderRoutes;
