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
    "review_content" varchar(5000) NOT NULL
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
    "zip" int NOT NULL
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
    "review_id" int references "reviews",
    "added_by" int NOT NULL references "person",
    "category_id" int NOT NULL references "categories",
    "location_id" int references "location"
);

SELECT *
FROM "products"
ORDER BY "products".name ASC;