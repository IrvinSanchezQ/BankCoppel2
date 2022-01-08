const { Router } = require('express');
const bodyParser = require('body-parser');

const router = Router();

router.get('/test', (req, res) => {
    const data = {
        "Tittle": "SUUUKU",
        "website": "faztweb.com"
    };
    res.json(data);
});

module.exports = router;