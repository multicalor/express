const Router = require('express');
const router = new Router();

const searchController = require('../controllers/searchController')

router.post('/', searchController.search); //

module.exports = router;