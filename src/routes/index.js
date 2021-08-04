const Router = require('express');
const router = new Router();

//Routs
const searchRouter = require('./searchRouter');

router.use('/search', searchRouter);

module.exports = router;