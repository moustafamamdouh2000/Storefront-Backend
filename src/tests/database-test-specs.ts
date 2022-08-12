import { User, UserStore } from '../models/user';
import { Order, Order_Products, OrderStore } from '../models/order';
import { Product, ProductStore } from '../models/product';

import client from '../database';
const productStore = new ProductStore();
const userStore = new UserStore();
const orderStore = new OrderStore();

describe('User Model', () => {
  const newUser: User = {
    id: 1,
    user_name: 'tester1234',
    first_name: 'Moustafa',
    last_name: 'Sabry',
    password: '1234',
  };

  const newProduct: Product = {
    id: 1,
    name: 'new product',
    price: 100,
  };

  const newOrder: Order = {
    id: 1,
    status: 'active',
    user_id: 1,
  };

  describe('User Model Auth', () => {
    it('Create New User test', async () => {
      const res = await userStore.addUser(newUser);
      expect(res.user_name).toEqual(newUser.user_name);
      expect(res.first_name).toEqual(newUser.first_name);
      expect(res.last_name).toEqual(newUser.last_name);
    });
    it('User Authentication test', async () => {
      const res = (await userStore.authenticate(newUser.user_name, newUser.password)) as User;
      expect(res.user_name).toEqual(newUser.user_name);
      expect(res.first_name).toEqual(newUser.first_name);
      expect(res.last_name).toEqual(newUser.last_name);
      expect(res.id).toEqual(newUser.id);
    });
  });

  describe('Product Model', () => {
    it('Add Product test', async () => {
      const res = await productStore.addProduct(newProduct);
      expect(res.name).toEqual(newProduct.name);
      expect(res.price).toEqual(newProduct.price);
      expect(res.id).toEqual(newProduct.id);
    });

    it('Getting all products test', async () => {
      const res = await productStore.getAllProducts();
      expect(res.length).toBe(1);
      expect(res[0].name).toEqual(newProduct.name);
      expect(res[0].price).toEqual(newProduct.price);
      expect(res[0].id).toEqual(newProduct.id);
    });

    it('Return requested product by ID test', async () => {
      const res = await productStore.getProductByID('1');
      expect(res.name).toEqual(newProduct.name);
      expect(res.price).toEqual(newProduct.price);
      expect(res.id).toEqual(newProduct.id);
    });
  });

  describe('Order Model', () => {
    beforeAll(async () => {
      await (
        await client.connect()
      ).query(`DELETE FROM users;
      ALTER SEQUENCE users_id_seq RESTART WITH 1;
      DELETE FROM products;
      ALTER SEQUENCE products_id_seq RESTART WITH 1;`);
      await userStore.addUser(newUser);
      await productStore.addProduct(newProduct);
    });

    it('Create new order test', async () => {
      const res = await orderStore.addOrder(newOrder);
      expect(res.user_id).toEqual(newOrder.user_id);
      expect(res.status).toEqual(newOrder.status);
      expect(res.id).toEqual(newOrder.id);
    });

    it('Return user orders by user_id test', async () => {
      const res = await orderStore.getUserOrders(newUser.id as number);
      expect(res.length).toBe(1);
      expect(res[0].user_id).toEqual(newOrder.user_id);
      expect(res[0].status).toEqual(newOrder.status);
      expect(res[0].id).toEqual(newOrder.id);
    });
  });
});
