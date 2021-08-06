const Router = require('express');
const router = new Router();

//Routs
const searchRouter = require('./searchRouter');

router.use('/search', searchRouter);
router.use('/get',searchRouter)
router.use('/update',searchRouter)
router.use('/delete',searchRouter)


module.exports = router;