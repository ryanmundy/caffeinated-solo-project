const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET featured product
router.get('/featured', (req, res) => {
    const queryText = `SELECT * FROM "products"
    JOIN "person" ON "products".added_by = "person".id
    WHERE "products".featured=true;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end GET

//GET products
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "products"
    
    JOIN "person" ON "products".added_by = "person".id
    ORDER BY "products".name ASC;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end GET

//POST review
router.post('/review', (req, res) => {
    const newReview = req.body;
    const queryText = `INSERT INTO "reviews" ("review_content", "rating", "product_id")
VALUES ($1, $2, $3);`;
    const queryValues = [
        newReview.review_content,
        newReview.rating,
        newReview.product_id
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end POST

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


module.exports = router;