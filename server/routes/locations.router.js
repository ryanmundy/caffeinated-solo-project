const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: process.env.REACT_APP_FILESTACK_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);



router.post('/', (req, res) => {
    const newLocation = req.body;

    console.log('new location', `${newLocation.street_address} ${newLocation.city}`);

    geocoder.geocode(newLocation.street_address)
        .then(function (result) {
            console.log(result);
        

    const queryText = `INSERT INTO "location" ("store", "street_address", "city", "state", "zip", "product_id", "lat", "lng")
VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    const queryValues = [
        newLocation.store,
        newLocation.street_address,
        newLocation.city,
        newLocation.state,
        newLocation.zip,
        newLocation.product_id,
        result[0].latitude,
        result[0].longitude
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
});


module.exports = router;