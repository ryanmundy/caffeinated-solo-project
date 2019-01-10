const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    const newLocation = req.body;
    const queryText = `INSERT INTO "location" ("street_number", "street_name", "city", "state", "zip", "product_id")
VALUES ($1, $2, $3, $4, $5, $6);`;
    const queryValues = [
        newLocation.street_number,
        newLocation.street_name,
        newLocation.city,
        newLocation.state,
        newLocation.zip,
        newLocation.product_id
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end POST

router.get('/', (req, res) => {
    console.log('id = ', [req.query.id]);
    const queryText = `SELECT * FROM "location" WHERE "location".product_id = $1;`;
    pool.query(queryText, [req.query.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end GET

module.exports = router;