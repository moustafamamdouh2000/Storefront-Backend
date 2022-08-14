import { User, UserStore } from '../../src/models/user';
import { Order, Order_Products, OrderStore } from '../../src/models/order';
import { Product, ProductStore } from '../../src/models/product';

import client from '../../src/database';
const productStore = new ProductStore();
const userStore = new UserStore();
const orderStore = new OrderStore();

const newUser: User = {
  user_name: 'tester1234',
  first_name: 'Moustafa',
  last_name: 'Sabry',
  password: '1234',
  id: 1,
};
const newProduct: Product = {
  name: 'new product',
  price: 100,
};

const newOrder: Order = {
  id: 1,
  status: 'active',
  user_id: 1,
};

describe('User Model', () => {
  it('Add user', async () => {
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
  });
});

describe('Product Model', () => {
  it('Add Product test', async () => {
    const res = await productStore.addProduct(newProduct);
    expect(res.name).toEqual(newProduct.name);
    expect(res.price).toEqual(newProduct.price);
  });
  it('Return requested product by ID test', async () => {
    const res = await productStore.getProductByID('1');
    expect(res.name).toEqual(newProduct.name);
    expect(res.price).toEqual(newProduct.price);
  });
  it('Getting all products test', async () => {
    const res = await productStore.getAllProducts();
    expect(res.length).toBe(1);
    expect(res[0].name).toEqual(newProduct.name);
    expect(res[0].price).toEqual(newProduct.price);
  });
});
describe('Order Model', () => {
  beforeAll(async () => {
    const connection = await client.connect();
    const sql = `
    DELETE FROM users;
    ALTER SEQUENCE users_id_seq RESTART WITH 1;
    DELETE FROM products;
    ALTER SEQUENCE products_id_seq RESTART WITH 1;
    DELETE FROM orders;
    ALTER SEQUENCE orders_id_seq RESTART WITH 1;
    `;
    await connection.query(sql);
    await userStore.addUser(newUser);
    await productStore.addProduct(newProduct);
  });
  it('Create new order test', async () => {
    const res = await orderStore.addOrder(newOrder);
    expect(res.user_id).toEqual(newOrder.user_id);
    expect(res.status).toEqual(newOrder.status);
  });
  it('Return user orders by user_id test', async () => {
    const res = await orderStore.getUserOrders(newUser.id as number);
    expect(res.length).toBe(1);
    expect(res[0].user_id).toEqual(newOrder.user_id);
    expect(res[0].status).toEqual(newOrder.status);
  });
});
