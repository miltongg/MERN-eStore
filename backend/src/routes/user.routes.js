import {Router} from "express";
import signin from "../controllers/signin.controller.js";
import signup from "../controllers/signup.controller.js";

const router = Router();

router.post('/user/signin', signin);

router.post('/user/signup', signup)

export default router;