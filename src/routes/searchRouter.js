const Router = require('express');
const router = new Router();

const searchController = require('../controllers/searchController')

router.post('/:size/:searchText', searchController.apiSearch); //
router.get('/:size/:searchText', searchController.elasticSearch);
router.put('/', searchController.update);
router.delete('/', searchController.delete);
router.get('/one', searchController.getOne)

module.exports = router;