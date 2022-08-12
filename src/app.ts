import express, { Application, Request, Response } from 'express';
import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import bodyParser from 'body-parser';
const app: Application = express();
const port = 3000;
const address = `localhost:${port}`;
const github = 'github.com/moustafamamdouh2000/Storefront-Backend';
app.get('/', (req: Request, res: Response) => {
  res.send(`welcome to the storefront api , check the github link for instructions on the api:
   ${github}`);
});
app.use(bodyParser.json());
userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(port, function () {
  const msg: string = 'starting app on: ' + address;
  console.log(msg);
});

export default app;
