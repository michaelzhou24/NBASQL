var express = require('express');
var router = express.Router();

let query = "select * from teamplayers"; //display players with teams
db.query(query, (err, result) => {
    if (err) {
        router.send(err);
    }
    router.
});
router.get('/', function(req, res, next) {
    res.send('API working properly');
});

module.exports = router;