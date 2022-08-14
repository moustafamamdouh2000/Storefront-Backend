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
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const getOrder = await store.getUserOrders(parseInt(req.params.id));
    res.json(getOrder);
  } catch (error) {
    res.status(400);
    res.json((error as Error).message);
  }
};

const orderRoutes = (app: express.Application): void => {
  app.post('/add_order', authentication, addOrder);
  app.get('/get_user_orders/:id', authentication, getUserOrders);
};

export default orderRoutes;
