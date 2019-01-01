CREATE TABLE "person"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN default false
);

CREATE TABLE "reviews"
(
    "id" serial primary key NOT NULL,
    "review_content" varchar(5000) NOT NULL,
    "product_id" int NOT NULL references "products"
);


CREATE TABLE "categories"
(
    "id" serial primary key NOT NULL,
    "category" varchar(100) NOT NULL
);


CREATE TABLE "location"
(
    "id" serial primary key NOT NULL,
    "street_number" int NOT NULL,
    "street_name" varchar(500) NOT NULL,
    "city" varchar(500) NOT NULL,
    "state" varchar(500) NOT NULL,
    "zip" int NOT NULL,
    "product_id" int references "products" NOT NULL
);


CREATE TABLE "products"
(
    "id" serial primary key NOT NULL,
    "name" varchar(100) NOT NULL,
    "description" varchar(5000),
    "caffeine_content" int,
    "rating" int,
    "image_url" varchar(5000),
    "featured" BOOLEAN default false NOT NULL,
    "added_by" int NOT NULL references "person",
    "category_id" int NOT NULL references "categories"
);

--See all products
SELECT *
FROM "products"
ORDER BY "products".name ASC;

--See reviews and rating
SELECT "products".name, "products".rating, "reviews".review_content
FROM "products"
    JOIN "reviews" ON "products".id = "reviews".product_id
ORDER BY "products".name ASC;

--See who added products
SELECT "products".name, "person".username
FROM "products"
    JOIN "person" ON "products".added_by = "person".id
ORDER BY "person".username ASC;

--See admin
SELECT *
FROM "person"
WHERE "person".admin=true;

--See featured product
SELECT *
FROM "products"
WHERE "products".featured=true;

--See locations
SELECT "products".name, "location".street_number, "location".street_name, "location".city,
    "location".state, "location".zip
FROM "products"
    JOIN "location" ON "products".id = "location".product_id
ORDER BY "products".name ASC;