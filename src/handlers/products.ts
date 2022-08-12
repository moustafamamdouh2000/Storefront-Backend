import { Application, Request, Response } from 'express';
import { authentication } from '../middlewares/authentication';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const getAllProducts = async (_req: Request, res: Response) => {
  const products = await store.getAllProducts();
  res.json(products);
};

const getProductByID = async (req: Request, res: Response) => {
  const product = await store.getProductByID(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('product not found');
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price
    };

    const newProduct = await store.addProduct(product);

    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

const productRoutes = (app: Application): void => {
  app.get('/get_products', getAllProducts);
  app.get('/get_product/:id', getProductByID);
  app.post('/add_product', authentication, addProduct);
};

export default productRoutes;
