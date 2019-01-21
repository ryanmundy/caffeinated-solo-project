CREATE TABLE person
(
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL,
    admin boolean DEFAULT false
);


CREATE TABLE reviews
(
    id SERIAL PRIMARY KEY,
    review_content character varying(5000) NOT NULL,
    product_id integer NOT NULL REFERENCES products(product_table_id) ON DELETE CASCADE,
    rating integer NOT NULL
);



CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    category character varying(100) NOT NULL
);



CREATE TABLE location
(
    id SERIAL PRIMARY KEY,
    store character varying(1000) NOT NULL,
    street_address character varying(1000) NOT NULL,
    city character varying(500) NOT NULL,
    state character varying(500) NOT NULL,
    zip integer NOT NULL,
    lat character varying(500),
    lng character varying(500),
    product_id integer REFERENCES products(product_table_id) ON DELETE CASCADE
);



CREATE TABLE products
(
    product_table_id integer DEFAULT nextval('products_id_seq'
    ::regclass) PRIMARY KEY,
    name character varying
    (100) NOT NULL,
    description character varying
    (5000),
    caffeine_content integer,
    image_url character varying
    (5000),
    featured boolean NOT NULL DEFAULT false,
    added_by integer NOT NULL REFERENCES person
    (id),
    category_id integer NOT NULL REFERENCES categories
    (id)
);