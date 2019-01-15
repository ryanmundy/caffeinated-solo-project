const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET featured product
router.get('/featured', (req, res) => {
    const queryText = `SELECT "products".product_table_id, "products"."name", "products".added_by,
"products".caffeine_content, "products".description, "products".category_id,
"products".image_url, "products".featured,
"person".username, "categories".category,
ROUND(AVG("rating"), 1) FROM "products"
LEFT JOIN "reviews" on "products".product_table_id = "reviews".product_id
JOIN "person" on "products".added_by = "person".id
JOIN "categories" on "products".category_id = "categories".id
WHERE "products".featured=true
GROUP BY "person".username, "products".product_table_id, "categories".id
ORDER BY "products".name ASC
;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end GET

//Clear featured
router.put('/featured/clear', (req, res) => {
    const query = `UPDATE products SET featured=false;`;
    pool.query(query)
        .then(() => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});//end PUT

//Set featured product
router.put('/featured/set/:id', (req, res) => {
    console.log('route id: ', [req.params.id]);
    const query = `UPDATE products SET featured=true
        WHERE product_table_id=$1;`;
    pool.query(query, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});//end PUT


//GET products
router.get('/', (req, res) => {
    const queryText = `SELECT "products".product_table_id, "products"."name", "products".added_by,
"products".caffeine_content, "products".description, "products".category_id,
"products".image_url, "products".featured,
"person".username, "categories".category,
ROUND(AVG("rating"), 1) FROM "products"
LEFT JOIN "reviews" on "products".product_table_id = "reviews".product_id
JOIN "person" on "products".added_by = "person".id
JOIN "categories" on "products".category_id = "categories".id
GROUP BY "person".username, "products".product_table_id, "categories".id
ORDER BY "products".name ASC
;
`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end GET

//POST new product
router.post('/', (req, res) => {
    const newProduct = req.body;
    const queryText = `INSERT INTO "products" ("name", "description", "caffeine_content", "image_url", "added_by", "category_id")
VALUES ($1, $2, $3, $4, $5, $6);`;
    const queryValues = [
        newProduct.name,
        newProduct.description,
        newProduct.caffeine_content,
        newProduct.image_url,
        newProduct.added_by,
        newProduct.category_id
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end POST

//DELETE product
router.delete('/:id', (req, res) => {
    console.log('route id: ', [req.params.id]);
    const query = `DELETE FROM "products" WHERE "products".product_table_id=$1`;
    pool.query(query, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});//end DELETE

//GET user products
router.get('/user/:id', (req, res) => {
    const queryText = `SELECT "products".product_table_id, "products"."name", "products".added_by,
"products".caffeine_content, "products".description, "products".category_id,
"products".image_url, "products".featured,
"person".username, "categories".category,
ROUND(AVG("rating"), 1) FROM "products"
LEFT JOIN "reviews" on "products".product_table_id = "reviews".product_id
JOIN "person" on "products".added_by = "person".id
JOIN "categories" on "products".category_id = "categories".id
WHERE "products".added_by=$1
GROUP BY "person".username, "products".product_table_id, "categories".id
ORDER BY "products".name ASC
;
`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end GET

//UPDATE product
router.put('/', (req, res) => {
    const editProduct = req.body;
    const queryText = `UPDATE "products" SET 
    ("name", "description", "caffeine_content", "image_url", "category_id")=
    ($1, $2, $3, $4, $5)
    WHERE "products".product_table_id = $6;`;
    const queryValues = [
        editProduct.name,
        editProduct.description,
        editProduct.caffeine_content,
        editProduct.image_url,
        editProduct.category_id,
        editProduct.product_table_id
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end POST

//GET store products
router.get('/store', (req, res) => {
    console.log(req.query);
    
    const queryText = `SELECT "products".name, "location".id, "location".store, "location".street_address, "location".city,
"location".state, "location".zip, "location".lat, "location".lng FROM "location"
JOIN "products" ON "products".product_table_id = "location".product_id
WHERE "location".lat = $1 AND "location".lng = $2;`;
    pool.query(queryText, [req.query.lat, req.query.lng])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end GET

module.exports = router;