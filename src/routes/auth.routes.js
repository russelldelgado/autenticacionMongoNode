import {Router} from 'express'
import * as authController from '../controllers/auth.controllers'
const router = Router();



router.post(`/singup` , authController.singup )
router.post(`/singin` , authController.singin)

export default router; 