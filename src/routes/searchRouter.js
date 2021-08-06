const Router = require('express');
const router = new Router();

const searchController = require('../controllers/searchController')

router.post('/:size/:searchText', searchController.apiSearch); //
router.get('/:size/:searchText', searchController.elasticSearch);

module.exports = router;