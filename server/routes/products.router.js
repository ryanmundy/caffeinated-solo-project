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
    JOIN "reviews" ON "products".id = "reviews".product_id
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
    const queryText = `INSERT INTO reviews ()
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const queryValues = [
        newProject.name,
        newProject.description
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end POST


module.exports = router;