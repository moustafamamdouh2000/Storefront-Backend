# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index '/get_products' GET
- Show (args: product id) '/get_product/:id' GET
- Create (args: Product)[token required] '/add_product' POST

#### Users

- Index [token required] '/get_users' GET
- Show (args: id)[token required] '/get_user/:id' GET
- Create (args: User) '/add_user' POST
- Authentication ( if user wants token to do auth actions ) '/authenticate' POST(must login with username and password)

#### Orders

- Current Order by user (args: user id)[token required] '/get_user_orders/:id' GET
- Create Order '/add_order' POST

## Data Shapes

#### Product

- id
- name
- price

| Column |          Type         | Nullable |                Default               |
|:------:|:---------------------:|:--------:|:------------------------------------:|
|   id   |        integer        | not null | nextval('products_id_seq'::regclass) |
|  name  | character varying(50) | not null |                                      |
|  price |        integer        | not null |                                      |

#### User

- id
- username ( for easier authentication )
- firstName
- lastName
- password

|   Column   |          Type          | Nullable |                Default               |
|:----------:|:----------------------:|:--------:|:------------------------------------:|
|     id     |         integer        | not null | nextval('products_id_seq'::regclass) |
|  user_name |  character varying(30) | not null |                                      |
| first_name |  character varying(30) | not null |                                      |
| last_name  | character varying(30)  | not null |                                      |
| password   | character varying(255) | not null |                                      |

#### Orders

- id
- user_id
- status of order (active or complete)

|  Column |    Type   | Nullable |                Default               |
|:-------:|:---------:|:--------:|:------------------------------------:|
|    id   |  integer  | not null | nextval('products_id_seq'::regclass) |
| status  |   state   | not null |                                      |
| user_id |  integer  | not null |                                      |

#### Order_Products

- id
- id of each product in the order
- quantity of each product in the order
- product id

|   Column   |   Type  | Nullable |                Default               |
|:----------:|:-------:|:--------:|:------------------------------------:|
|     id     | integer | not null | nextval('products_id_seq'::regclass) |
|  quantity  | integer | not null |                                      |
| order_id   | integer | not null |                                      |
| product_id | integer | not null |                                      |
