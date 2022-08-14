import supertest from 'supertest';
import app from '../../src/app';
import { User, UserStore } from '../../src/models/user';
import { Product } from '../../src/models/product';
import { Order } from '../../src/models/order';
import jwt_decode from 'jwt-decode';

const request = supertest(app);
const userStore = new UserStore();
let token: string;
const mainUser: User = {
  user_name: 'mainUser',
  first_name: 'Jasmine',
  last_name: 'tests',
  password: 'normalpassword',
};
const newUser: User = {
  user_name: 'newUser',
  first_name: 'Are',
  last_name: 'pain,',
  password: 'slightly_normal_password',
};
const createdUserCheck: User = { ...newUser, id: 2 };

let product: Product = {
  name: 'testProduct',
  price: 500,
};

let order: Order = {
  user_id: 1,
  status: 'active',
};
let orderCompleted: Order = {
  user_id: 5,
  status: 'complete',
};

type DecodedJWT = {
  user: User;
};

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

describe('routes test: ', () => {
  beforeAll(async () => {
    await userStore.addUser(mainUser);
  });
  it('gets the main endpoint', async () => {
    const res = await request.get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('moustafamamdouh2000');
  });

  it('authenticate user given a correct login information', async () => {
    const res = await request
      .post('/authenticate')
      .set(jsonHeaders)
      .send({ user_name: mainUser.user_name, password: mainUser.password });
    expect(res.status).toBe(200);
    token = 'Bearer ' + res.body;
    const decodedUser: User = (jwt_decode(res.body) as DecodedJWT).user;
    expect(decodedUser.first_name).toEqual(mainUser.first_name);
    expect(decodedUser.last_name).toEqual(mainUser.last_name);
    expect(decodedUser.id).toEqual(1);
    expect(decodedUser.user_name).toEqual(mainUser.user_name);
    expect(decodedUser.password).toBeUndefined();
  });

  describe('Authentiation tests, ', () => {
    it('not authorizsed, add order', async () => {
      const res = await request.post('/add_order');
      expect(res.status).toBe(401);
    });
    it('not authorizsed, get user order', async () => {
      const res = await request.get('/get_user_orders/1');
      expect(res.status).toBe(401);
    });
    it('not authorizsed, add product', async () => {
      const res = await request.post('/add_product');
      expect(res.status).toBe(401);
    });
  });

  describe('Creation routes test', () => {
    it('user can create a user', async () => {
      const res = await request
        .post('/add_user')
        .set({ ...jsonHeaders, Authorization: token })
        .send(newUser);
      expect(res.status).toBe(200);
      const decodedUser: User = (jwt_decode(res.body) as DecodedJWT).user;
      expect(decodedUser.first_name).toEqual(createdUserCheck.first_name);
      expect(decodedUser.last_name).toEqual(createdUserCheck.last_name);
      expect(decodedUser.id).toEqual(createdUserCheck.id);
      expect(decodedUser.password).toBeUndefined();
    });

    it('user can create a product', async () => {
      const res = await request
        .post('/add_product')
        .set({ ...jsonHeaders, Authorization: token })
        .send(product);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ...product, id: 1 });
      product = { ...product, id: 1 };
    });

    it('user can create an order', async () => {
      const res = await request
        .post('/add_order')
        .set({ ...jsonHeaders, Authorization: token })
        .send(order);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ...order, id: 1 });
      order = { ...order, id: 1 };
      orderCompleted = { ...order, id: 2 };
    });
  });
  it('user get orders of by order_id', async () => {
    const res = await request
      .get('/get_user_orders/1')
      .set({ ...jsonHeaders, Authorization: token });
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].id).toEqual(order.id);
    expect(res.body[0].status).toEqual(order.status);
    expect(res.body[0].user_id).toEqual(order.user_id);
  });
  describe('Retreiving users info', () => {
    it('get all users', async () => {
      const res = await request
        .get('/get_users')
        .set({ ...jsonHeaders, Authorization: token });
      expect(res.status).toBe(200);
    });
    it('get user by id', async () => {
      const res = await request
        .get(`/get_user/${createdUserCheck.id}`)
        .set({ ...jsonHeaders, Authorization: token });
      expect(res.body.id).toBe(createdUserCheck.id);
      expect(res.body.user_name).toBe(createdUserCheck.user_name);
      expect(res.body.first_name).toBe(createdUserCheck.first_name);
    });
  });
  describe('Product routes test', () => {
    it('user can get all products', async () => {
      const res = await request
        .get('/get_products')
        .set({ ...jsonHeaders, Authorization: token });
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].id).toEqual(product.id);
      expect(res.body[0].name).toEqual(product.name);
      expect(res.body[0].price).toEqual(product.price);
    });
    it('user can get specific products', async () => {
      const res = await request
        .get('/get_product/1')
        .set({ ...jsonHeaders, Authorization: token });
      expect(res.status).toBe(200);
      expect(res.body.id).toEqual(product.id);
      expect(res.body.name).toEqual(product.name);
      expect(res.body.price).toEqual(product.price);
    });
  });
});
