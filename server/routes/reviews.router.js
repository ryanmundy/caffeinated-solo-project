const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//POST review
router.post('/', (req, res) => {
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

//GET reviews
router.get('/product', (req, res) => {
    const queryText = `SELECT "reviews".review_content, "reviews".rating, "reviews".product_id, "products".name, "products".product_table_id FROM "reviews"
JOIN "products" ON "reviews".product_id = "products".product_table_id
WHERE "reviews".product_id = $1
;`;
    pool.query(queryText, [req.query.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end GET

//GET reviews
router.get('/', (req, res) => {
    const queryText = `SELECT "reviews".id, "products".name, "reviews".review_content FROM "reviews"
JOIN "products" ON "reviews".product_id = "products".product_table_id
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


module.exports = router;