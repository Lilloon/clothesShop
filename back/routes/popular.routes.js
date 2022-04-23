import Router from 'express';
import PopularController from '../controller/popular.controller.js'

const router = new Router();
router.get('/popular', PopularController.getPopular);




export default router;