const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

//GET featured product
router.get('/featured', (req, res) => {
    const queryText = `SELECT * FROM "products" WHERE "products".featured=true;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end GET


module.exports = router;