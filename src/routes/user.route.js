import express from 'express'
import { login, createUser, getUser } from '../controllers/user.controller.js'
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router()


router.route('/getUser').get(auth, getUser)
router.route('/register').post(createUser)
router.route('/login').post(login)

export default router;